
from django.contrib import admin # Django 관리자 페이지 관련 모듈
from django.urls import path, include # URL 라우팅과 앱 URL 포함을 위한 모듈
from django.conf import settings
from django.conf.urls.static import static
# 프로젝트의 URL 패턴 정의
urlpatterns = [
    path('admin/', admin.site.urls),  # 관리자 페이지 URL (예: /admin/)
    path('api/accounts/', include('accounts.urls')),
    # 'accounts' 앱의 URL을 포함. 
    # accounts 앱 안의 urls.py 파일에서 추가적으로 라우팅 설정을 처리함.
]

# 미디어 파일 서빙 설정
if settings.DEBUG:  # DEBUG 모드일 때만 작동
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
