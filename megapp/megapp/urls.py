from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .settings import DEBUG


urlpatterns = [
    # path('admin/', admin.site.urls),
    # api urls
    path('api/', include('api.urls')),
    path('account/', include('accounts.urls')),
    path('panel/', include('company.urls')),
    path('captcha/', include('captcha.urls')),
    path('', include('home.urls')),
    path('', include('social_django.urls', namespace='social')),


]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
