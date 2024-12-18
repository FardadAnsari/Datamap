from django.shortcuts import render
from django.http import  JsonResponse
from django.db.models import Q
from django.contrib.auth.decorators import login_required

import logging
import json
import time
from bs4 import BeautifulSoup
from datetime import datetime, timedelta


from .models import  BusinessInformation
from .create_service import create_service, update_open_hours, get_daily_metrics_response, get_all_business_performance_data

def extract_shop_name(content):
    if content:
        soup = BeautifulSoup(content, 'html.parser')
        return soup.find('b').text if soup.find('b') else ''
    return ''

def extract_location_id(content):
    if content:
        soup = BeautifulSoup(content, 'html.parser')
        location_id_tag = soup.find(string=lambda text: 'Location_ID' in text)
        if location_id_tag:
            location_id = location_id_tag.split('Location_ID: ')[1].strip()
            return location_id
    return ''
def get_opening_hours(shop_name, location_id):
    opening_hours = {}
    if shop_name and location_id:
        try:
            business_info = BusinessInformation.objects.get(
                (Q(title__iexact=shop_name) | Q(title__icontains=shop_name)) & Q(name=location_id)
            )
            days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
            for day in days:
                hours = getattr(business_info, day)
                periods = []
                if hours:
                    try:
                        open_times = hours.strip('[]').split('", "')
                        for period in open_times:
                            times = period.split(' - ')
                            if len(times) == 2:
                                periods.append({
                                    'open': times[0].strip('" '),
                                    'close': times[1].strip('" ')
                                })
                    except ValueError:
                        pass
                opening_hours[day] = periods
        except BusinessInformation.DoesNotExist:
            print("No BusinessInformation matches the given shop name and location ID.")
    return opening_hours

def sort_opening_hours_by_current_day(opening_hours):
    current_day_index = (datetime.datetime.today().weekday() + 1) % 7  # Monday is 0 and Sunday is 6
    days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    day_order = days[current_day_index:] + days[:current_day_index]
    sorted_hours = {}
    for day in day_order:
        periods = opening_hours.get(day, [])
        sorted_hours[day] = {
            'periods': periods,
            'has_opening_times': bool(periods)
        }
    return sorted_hours

@login_required
def map_detail(request):
    content = request.GET.get('content', '')
    shop_name = extract_shop_name(content)
    location_id = extract_location_id(content)

    if not shop_name:
        shop_name = request.GET.get('shop_name', '').strip()
    
    if not location_id:
        location_id = request.GET.get('location_id', '').strip()

    print("Extracted Shop Name:", shop_name)
    print("Extracted Location ID:", location_id)

    opening_hours = get_opening_hours(shop_name, location_id)
    sorted_opening_hours = sort_opening_hours_by_current_day(opening_hours)

    # Process the opening hours data to split times into hours and minutes
    for day, data in sorted_opening_hours.items():
        for period in data['periods']:
            period['open_hour'], period['open_minute'] = period['open'].split(':')
            period['close_hour'], period['close_minute'] = period['close'].split(':')

    context = {
        'shop_name': shop_name,
        'location_id': location_id,
        'opening_hours': sorted_opening_hours,
    }

    return render(request, 'googlebusiness/openhours.html', context)

def edit_function(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            # print("Received data:", data)

            location_id = data['locationId'].split('|')[0]

            periods = []
            for day, details in data['opening_hours'].items():
                for period in details['periods']:
                    open_time_parts = period['open'].split(':')
                    close_time_parts = period['close'].split(':')

                    periods.append({
                        "openDay": day,
                        "openTime": {
                            "hours": int(open_time_parts[0]),
                            "minutes": int(open_time_parts[1])
                        },
                        "closeDay": day,
                        "closeTime": {
                            "hours": int(close_time_parts[0]),
                            "minutes": int(close_time_parts[1])
                        }
                    })

            request_body = {
                "regularHours": {
                    "periods": periods
                }
            }

            # Assuming you have a function `create_service` to authenticate and create a Google My Business client
            business_info, business_performance = create_service()

            if business_info is None:
                return JsonResponse({'status': 'error', 'message': 'Failed to create Google Business client'}, status=500)

            try:
                # Ensure all required arguments are passed
                update_open_hours(business_info, location_id, request_body)
            except Exception as e:
                print(f"Error during updating open hours: {e}")
                return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

            return JsonResponse({
                'status': 'success',
                'message': 'Edit completed!',
                'received_data': data,
                'request_body': request_body,
                'location_id': location_id
            })
        
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
        except Exception as e:
            print(f"Unexpected error: {e}")
            return JsonResponse({'status': 'error', 'message': 'An error occurred'}, status=500)
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=400)

# Set up logging

import logging
import json
from datetime import datetime, timedelta
from django.shortcuts import render
from django.http import JsonResponse

logger = logging.getLogger(__name__)

def combined_business_metrics_view(request):
    if request.method != 'GET':
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=400)

    try:
        # Extract shop_name and location_id from the request parameters
        shop_name = request.GET.get('shop_name', 'Default Shop')
        location_id = request.GET.get('location_id', '')
        
        # Check if date parameters are provided
        dailyRange_endDate_day = request.GET.get('dailyRange_endDate_day')
        dailyRange_endDate_month = request.GET.get('dailyRange_endDate_month')
        dailyRange_endDate_year = request.GET.get('dailyRange_endDate_year')
        dailyRange_startDate_day = request.GET.get('dailyRange_startDate_day')
        dailyRange_startDate_month = request.GET.get('dailyRange_startDate_month')
        dailyRange_startDate_year = request.GET.get('dailyRange_startDate_year')

        # Check if all date parameters are present for an AJAX request
        if all([dailyRange_endDate_day, dailyRange_endDate_month, dailyRange_endDate_year,
                dailyRange_startDate_day, dailyRange_startDate_month, dailyRange_startDate_year]):
            try:
                # Convert date parameters to integers
                dailyRange_endDate_day = int(dailyRange_endDate_day)
                dailyRange_endDate_month = int(dailyRange_endDate_month)
                dailyRange_endDate_year = int(dailyRange_endDate_year)
                dailyRange_startDate_day = int(dailyRange_startDate_day)
                dailyRange_startDate_month = int(dailyRange_startDate_month)
                dailyRange_startDate_year = int(dailyRange_startDate_year)
                
                pageSize = int(request.GET.get('pageSize', 10))
                
                # Log the extracted dates for debugging
                logger.info(f"Start Date: {dailyRange_startDate_year}-{dailyRange_startDate_month}-{dailyRange_startDate_day}")
                logger.info(f"End Date: {dailyRange_endDate_year}-{dailyRange_endDate_month}-{dailyRange_endDate_day}")
                logger.info(f"Page Size: {pageSize}")
                
                # Fetch your data logic here based on the provided date range
                # Example: For demonstration purposes, let's use dynamic dummy data
                daily_metrics_data = {
                    "dummy_metric": [
                        {"date": f"{dailyRange_startDate_year}-{dailyRange_startDate_month}-{dailyRange_startDate_day}", "value": 150},
                        {"date": f"{dailyRange_endDate_year}-{dailyRange_endDate_month}-{dailyRange_endDate_day}", "value": 200}
                    ]
                }
                
                performance_data = {
                    "performance_metric": [
                        {"date": f"{dailyRange_startDate_year}-{dailyRange_startDate_month}-{dailyRange_startDate_day}", "value": 300},
                        {"date": f"{dailyRange_endDate_year}-{dailyRange_endDate_month}-{dailyRange_endDate_day}", "value": 450}
                    ]
                }

                # Return the data as a JSON response for the AJAX request
                return JsonResponse({'status': 'success', 'data': {
                    "dailyMetricsData": daily_metrics_data,
                    "performanceData": performance_data
                }}, status=200)
            
            except ValueError as e:
                logger.error(f"Invalid parameter value: {e}")
                return JsonResponse({'status': 'error', 'message': f'Invalid parameter value: {e}'}, status=400)
        
        else:
            # If date parameters are not provided, handle it as the initial page load
            end_date = datetime.now()
            start_date = end_date - timedelta(days=30)

            # Log default date range used for initial load
            logger.info(f"Default Start Date: {start_date}")
            logger.info(f"Default End Date: {end_date}")

            # Use the default date range for initial data load
            daily_metrics_data = {
                "dummy_metric": [{"date": str(start_date.date()), "value": 123}]
            }
            performance_data = {
                "performance_metric": [{"date": str(end_date.date()), "value": 456}]
            }

            # Pass data to the template for the initial page load
            combined_data = {
                "shop_name": shop_name,
                "locationId": location_id,
                "dailyMetricsData": json.dumps(daily_metrics_data),  # Convert to JSON string for template
                "performanceData": json.dumps(performance_data)     # Convert to JSON string for template
            }

            return render(request, 'googlebusiness/test.html', combined_data)

    except Exception as e:
        logger.error(f"Unexpected error occurred: {e}")
        return JsonResponse({'status': 'error', 'message': f'An unexpected error occurred: {str(e)}'}, status=500)
