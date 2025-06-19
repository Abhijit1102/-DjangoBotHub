from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import home_view, signup_view, profile_view, health_check_view

urlpatterns = [
    path('home/', home_view, name='home'),
    path('sign-up/', signup_view, name='sign-up'),
    path('profile/', profile_view, name='profile'),
    path('health-check/', health_check_view, name='health-check'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
