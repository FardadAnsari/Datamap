
# google libraries
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient import discovery
from googleapiclient.http import build_http
from oauth2client import client, file, tools
import os 
import time 

SCOPES = ['https://www.googleapis.com/auth/business.manage']
CLIENT_SECRETS_FILE = r'./googlebusiness/docs/client_secrets.json'
# BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# # Path to client_secrets.json
# CLIENT_SECRETS_FILE = os.path.join(BASE_DIR, 'docs', 'client_secrets.json')

# print("Client secrets file path:", CLIENT_SECRETS_FILE)  # Log the path to verify

MYBUSINESSMANAGEMENT_FILE = r'./googlebusiness/docs/mybusinessbusinessinformation.dat'
# MYBUSINESSMANAGEMENT_FILE = os.path.join(BASE_DIR, 'docs', 'mybusinessbusinessinformation.dat')
BUSINESSPERFORMANCE_FILE =  r'./googlebusiness/docs/businessprofileperformance.dat'
def create_service():
    """Fetches business information from Google My Business API."""
    try:
        scope = 'https://www.googleapis.com/auth/business.manage'
        client_secrets = CLIENT_SECRETS_FILE
        flow = client.flow_from_clientsecrets(client_secrets, scope=scope, message=tools.message_if_missing(client_secrets))

        # Google Business 
        storage_business_info = file.Storage(MYBUSINESSMANAGEMENT_FILE)
        credentials_business_info = storage_business_info.get()
        http_business_info = credentials_business_info.authorize(http=build_http())
        business_info = discovery.build("mybusinessbusinessinformation", 'v1', http=http_business_info)
        
        print("Successfully created business_info:", business_info)

        # Performance
        storage_performance = file.Storage(BUSINESSPERFORMANCE_FILE)
        credentials_performance = storage_performance.get()
        http_performance = credentials_performance.authorize(http=build_http())
        business_performance = discovery.build("businessprofileperformance", 'v1', http=http_performance)
        
        print("Successfully created business_performance:", business_performance)

        return business_info, business_performance

    except Exception as e:
        print(f"Error occurred while creating service: {e}")
        raise


def update_open_hours(google_business_info, location_id, request_body, update_mask="regularHours.periods"):
    max_retries = 3
    retry_delay = 10  # seconds
    for attempt in range(max_retries):
        try:
            request = google_business_info.locations().patch(
                name=location_id,
                updateMask=update_mask,
                body=request_body
            )
            result = request.execute()
  
            break  # Exit loop if successful

        except Exception as e:
            if attempt < max_retries - 1:
                print(f"Attempt {attempt+1}/{max_retries}: {e}")
                print("Retrying in {} seconds...".format(retry_delay))
                time.sleep(retry_delay)
            else:
                print("Maximum retries exceeded. Unable to update open hours.")
                raise e
            
def get_all_business_performance_data(business_performance, location_id, monthlyRange_endMonth_day, monthlyRange_endMonth_month,
                                      monthlyRange_endMonth_year, monthlyRange_startMonth_day, monthlyRange_startMonth_month,
                                      monthlyRange_startMonth_year, pageSize=10):
    max_retries = 3
    retry_delay = 10  # seconds
    pageToken = ''  # Start with an empty pageToken for the first request
    all_results = []  # Initialize an empty list to accumulate all results

    while True:
        for attempt in range(max_retries):
            try:
                # Make the API request
                request = business_performance.locations().searchkeywords().impressions().monthly().list(
                    parent=location_id,
                    monthlyRange_endMonth_day=monthlyRange_endMonth_day,
                    monthlyRange_endMonth_month=monthlyRange_endMonth_month,
                    monthlyRange_endMonth_year=monthlyRange_endMonth_year,
                    monthlyRange_startMonth_day=monthlyRange_startMonth_day,
                    monthlyRange_startMonth_month=monthlyRange_startMonth_month,
                    monthlyRange_startMonth_year=monthlyRange_startMonth_year,
                    pageSize=pageSize,
                    pageToken=pageToken
                )
                result = request.execute()
                
                # Append the results from this page to the all_results list
                all_results.extend(result.get('searchKeywordsCounts', []))

                # Check if there's a nextPageToken; if not, break out of the loop
                pageToken = result.get('nextPageToken')
                if not pageToken:
                    return {"allResults": all_results}  # Return all accumulated results

                break  # Exit the retry loop if successful

            except Exception as e:
                if attempt < max_retries - 1:
                    print(f"Attempt {attempt + 1}/{max_retries}: {e}")
                    print(f"Retrying in {retry_delay} seconds...")
                    time.sleep(retry_delay)
                else:
                    print("Maximum retries exceeded. Unable to fetch all business performance data.")
                    raise e


# Utility function to get daily metrics with retry logic
def get_daily_metrics_response(business_performance, name, dailyMetric, dailyRange_endDate_day, dailyRange_endDate_month,
                               dailyRange_endDate_year, dailyRange_startDate_day, dailyRange_startDate_month,
                               dailyRange_startDate_year):
    max_retries = 3
    retry_delay = 10  # seconds
    for attempt in range(max_retries):
        try:
            request = business_performance.locations().getDailyMetricsTimeSeries(
                name=name,
                dailyMetric=dailyMetric,
                dailyRange_endDate_day=dailyRange_endDate_day,
                dailyRange_endDate_month=dailyRange_endDate_month,
                dailyRange_endDate_year=dailyRange_endDate_year,
                dailyRange_startDate_day=dailyRange_startDate_day,
                dailyRange_startDate_month=dailyRange_startDate_month,
                dailyRange_startDate_year=dailyRange_startDate_year
            )
            result = request.execute()
            return result

        except Exception as e:
            if attempt < max_retries - 1:
                print(f"Attempt {attempt + 1}/{max_retries}: {e}")
                print(f"Retrying in {retry_delay} seconds...")
                time.sleep(retry_delay)
            else:
                print("Maximum retries exceeded. Unable to fetch daily metrics.")
                raise e
