# Django: backend/settings.py
import os
from pathlib import Path # 경로 작업을 위한 모듈

# 프로젝트의 베이스 디렉토리 설정
BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'your-secret-key' # Django 보안 키 (배포 시에는 반드시 안전한 값으로 설정해야 함)
DEBUG = True # 디버그 모드 (개발 환경에서만 True로 설정, 배포 시 반드시 False로 변경)
ALLOWED_HOSTS = [] # 허용된 호스트 목록 (배포 시 도메인 또는 IP를 추가해야 함)


# 설치된 앱 목록 (Django 기본 앱 + 커스텀 앱 및 패키지)
INSTALLED_APPS = [
    'django.contrib.admin', # 관리자 페이지
    'django.contrib.auth', # 인증 시스템
    'django.contrib.contenttypes',  # 컨텐츠 유형
    'django.contrib.sessions', # 세션 관리
    'django.contrib.messages', # 메시지 프레임워크
    'django.contrib.staticfiles',  # 정적 파일 관리
    'django_celery_beat',  # Celery 비트 스케줄러
    'corsheaders',  # CORS 처리를 위한 앱
    'rest_framework',  # Django REST Framework
    'accounts', # 사용자 정의 앱 (계정 관련)
      
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', # CORS 허용 미들웨어
    'django.middleware.security.SecurityMiddleware', # 보안 관련 미들웨어
    'django.contrib.sessions.middleware.SessionMiddleware', # 세션 미들웨어
    'django.middleware.common.CommonMiddleware', # 공통 HTTP 처리를 위한 미들웨어
    'django.middleware.csrf.CsrfViewMiddleware', # CSRF 방어
    'django.contrib.auth.middleware.AuthenticationMiddleware', # 인증 처리 미들웨어
    'django.contrib.messages.middleware.MessageMiddleware', # 메시지 미들웨어
    'django.middleware.clickjacking.XFrameOptionsMiddleware', # Clickjacking 방지
]
# 루트 URL 설정
ROOT_URLCONF = 'backend.urls'
TIME_ZONE = 'Asia/Seoul'  # 한국 시간대 설정
USE_TZ = False  # 타임존 지원 활성화

# 템플릿 설정
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],  # 추가 템플릿 디렉토리를 설정할 수 있음
        'APP_DIRS': True,  # 앱의 템플릿 디렉토리를 자동으로 탐색
        'OPTIONS': {
            'context_processors': [ # 템플릿에서 사용할 컨텍스트 프로세서
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
# WSGI 설정
WSGI_APPLICATION = 'backend.wsgi.application'

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",  # React 개발 서버
    "http://127.0.0.1:3000",  # React 개발 서버의 IP
]



# 데이터베이스 설정 (SQLite 사용)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',# SQLite 엔진
        'NAME': BASE_DIR / 'db.sqlite3', # 데이터베이스 파일 경로
    }
}
# 비밀번호 검증 설정
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]
# 언어 및 시간대 설정
LANGUAGE_CODE = 'en-us'

USE_I18N = True # 국제화 활성화

STATIC_URL = 'static/' # 정적 파일 URL 경로

# 기본 자동 필드 설정
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Django REST Framework 설정
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}
# CORS 설정 (모든 도메인 허용, 배포 시에는 보안 설정 필요)
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React 개발 서버 URL
    "http://127.0.0.1:3000",  # React 개발 서버의 IP
]
CELERY_TIMEZONE = 'Asia/Seoul'
CELERY_ENABLE_UTC = False
# Celery 설정 (Redis를 브로커와 백엔드로 사용)
CELERY_BROKER_URL = 'redis://localhost:6379/0'  # Redis URL
CELERY_RESULT_BACKEND = 'redis://127.0.0.1:6379/1'  # 결과 백엔드
CELERY_ACCEPT_CONTENT = ['json']  # Celery가 처리할 데이터 포맷
CELERY_TASK_SERIALIZER = 'json' # 작업 직렬화 포맷
CELERY_BROKER_CONNECTION_RETRY_ON_STARTUP = True # 브로커 연결 재시도 활성화
USE_DEPRECATED_PYTZ = True



BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

RAW_IMAGES_DIR = os.path.join(BASE_DIR, 'media/raw_images')  # 원본 이미지 저장 경로
PROCESSED_IMAGES_DIR = os.path.join(BASE_DIR, 'media/processed_images')  # 전처리된 이미지 저장 경로
FEATURES_CSV_PATH = os.path.join(BASE_DIR, 'media/processed_images/features.csv')  # 특징 CSV 파일 경로
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
# 미디어 디렉토리 생성 (없으면 생성)
os.makedirs(os.path.join(MEDIA_ROOT, 'raw_images'), exist_ok=True)
os.makedirs(os.path.join(MEDIA_ROOT, 'processed_images'), exist_ok=True)
