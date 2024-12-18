# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # api
    'rest_framework',
    'corsheaders',
    'rest_framework_simplejwt',
    'django_filters',

    # add app internal
    "accounts.apps.AccountsConfig",
    "company.apps.CompanyConfig",
    "api.apps.ApiConfig",

    # captcha
    'captcha',
]