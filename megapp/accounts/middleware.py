from django.http import HttpResponse
from datetime import datetime
import pytz

class TimeRestrictedMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated and (request.user.is_superuser or request.user.is_staff):
            return self.get_response(request)

        iran_tz = pytz.timezone('Asia/Tehran')
        current_time_utc = datetime.now(pytz.utc)
        current_time_iran = current_time_utc.astimezone(iran_tz)

        allowed_start_time = current_time_iran.replace(hour=13, minute=0, second=0, microsecond=0)
        allowed_end_time = current_time_iran.replace(hour=21, minute=0, second=0, microsecond=0)

        if not (allowed_start_time <= current_time_iran <= allowed_end_time):
            return HttpResponse("Access to the system is not allowed at this time.", status=403)

        response = self.get_response(request)
        return response
