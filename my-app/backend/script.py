import os
import django

# Django 설정 초기화
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth.models import User
from accounts.models import Student

# 기본 사용자 설정
default_user = User.objects.get(id=dltkdgns)
Student.objects.filter(user__isnull=True).update(user=default_user)

print("Default user assigned to all students without a user.")
