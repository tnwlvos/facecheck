# Django: accounts/urls.py

from django.urls import path# URL 라우팅을 위해 path 함수 가져옴
from .views import RegisterView, LoginView, upload_students, get_students,mark_attendance,export_attendance,detect_face_api
# views.py에서 필요한 뷰 함수와 클래스 가져옴
from rest_framework_simplejwt.views import TokenRefreshView
# JWT 토큰 갱신을 위한 뷰 가져옴




# URL 패턴 정의
urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    # 회원가입 URL. RegisterView 클래스 뷰를 사용
    path('login/', LoginView.as_view(), name='login'),
    # 로그인 URL. LoginView 클래스 뷰를 사용
    path('upload-students/', upload_students, name='upload_students'),
    # 학생 데이터를 업로드하는 URL. upload_students 함수 뷰 사용
    path('dashboard/', get_students, name='dashboard'),
    # 학생 데이터를 가져오는 대시보드 URL. get_students 함수 뷰 사용
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # JWT 토큰 갱신 URL. SimpleJWT에서 제공하는 기본 뷰 사용
    path('attendance/',mark_attendance, name='mark_attendance'),
    # 출석 체크 URL. mark_attendance 함수 뷰 사용
    path('export-attendance/', export_attendance, name='export_attendance'),
    # 출석 기록을 내보내는 URL. export_attendance 함수 뷰 사용  
    path('detect-face/', detect_face_api, name='detect_face'),
]
