from django.urls import path
from .views import LoginView, LogoutView
from django.contrib.auth.views import PasswordChangeDoneView
from accounts.views import  EditProfilerView, RegisterView
from .views import ChengPassword

app_name = 'accounts'
urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
    # path('edit/', EditProfilerView.as_view(), name='edit-profile'),
    path('change-password/<int:pk>/', ChengPassword.as_view(), name='change_password'),

]