from pathlib import Path
from datetime import timedelta
from decouple import config
import os


##################################################################################
from .config.appmanagement import *
from .config.Corspolicy import *
from .config.database import *
from .config.jwt import *
from .config.logging import *
#from .media import *
from .config.middle import *
from .config.passwordmanager import *
from .config.production import *
from .config.restapi import *
#from .staticfiles import *
from .config.templates import *
from .config.timezone import *


BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config('SECRET_KEY')










CSRF_TRUSTED_ORIGINS = [
    'https://datamap.mealzo.co.uk',
]

ROOT_URLCONF = 'megapp.urls'



WSGI_APPLICATION = 'megapp.wsgi.application'




MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'


STATIC_URL = '/static/'
#STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATICFILES_DIRS = [ BASE_DIR / 'static/']








DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


AUTH_USER_MODEL = "accounts.User"










# SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Lax'
CSRF_COOKIE_HTTPONLY = True
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = 'DENY'
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SESSION_COOKIE_AGE = 3600




LOGIN_REDIRECT_URL = "accounts:login"
LOGIN_URL = "accounts:login"
LOGOUT_REDIRECT_URL = "accounts:login"


AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'accounts.authentication.EmailAuthBackend',
]

CAPTCHA_FONT_SIZE = 40
CAPTCHA_LENGTH = 5


