from django.urls import path

from  accounts.views import (
    UserProfileView,
    UserUpdateView,
    UserDeleteView,
    AccountNotActive,
    AccountDevloper,
    AccountMarketing,
    AccountOnboarding,
    AccountManagement,
)

app_name = 'company'

urlpatterns = [
    # Profile URLs
    path('', UserProfileView.as_view(), name='profile-all'),
    path('profile/update/<int:pk>/', UserUpdateView.as_view(), name='profile-update'),
    path('profile/delete/<int:pk>/', UserDeleteView.as_view(), name='profile-delete'),
    path('account-not-active', AccountNotActive.as_view(), name='account-not-active'),
    path('account-developer', AccountDevloper.as_view(), name='account-developer'),
    path('account-marketing', AccountMarketing.as_view(), name='account-marketing'),
    path('account-support', AccountMarketing.as_view(), name='account-support'),
    path('account-onboarding', AccountOnboarding.as_view(), name='account-onboarding'),
    path('account-management', AccountManagement.as_view(), name='account-management'),

]
