from django.urls import path
from api import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import FastApiTokenView


app_name = "api"

urlpatterns = [
    path('foodhub/', views.FoothubApiView.as_view()),
    path('justeat/', views.JusteatApiView.as_view()),
    path('foodhouse/', views.FoodhouseApiView.as_view()),
    path('whatthefork/',views.WsApiView.as_view()),
    path('ubereats/', views.UberEatsApiView.as_view()),
    
    path('menulist/', views.MenuListApiView.as_view()),
    path('scoffable/', views.ScoffableApiView.as_view()),
    path('deliveroo/', views.DeliverooApiView.as_view()),
    path('straightfrom/', views.StraightfromApiView.as_view()),
    path('kuick/', views.KuickApiView.as_view()),
    


    # jwt
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]


urlpatterns += [
    path('token/fastapi/', FastApiTokenView.as_view(), name='token_obtain_pair'),
]
