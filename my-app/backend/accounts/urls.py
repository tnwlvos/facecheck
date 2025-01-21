# Django: accounts/urls.py

from django.urls import path
from .views import RegisterView, LoginView, upload_students, get_students
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('upload-students/', upload_students, name='upload_students'),
    path('dashboard/', get_students, name='dashboard'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]