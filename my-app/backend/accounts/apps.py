from django.apps import AppConfig

# Django 애플리케이션을 설정하기 위한 클래스 정의
class AccountsConfig(AppConfig):
    # 기본적으로 사용할 자동 필드 유형 설정
    # BigAutoField는 64비트 정수를 기본 키로 사용하는 필드
    default_auto_field = 'django.db.models.BigAutoField'
    # 애플리케이션의 이름을 설정
    # 이 이름은 settings.py의 INSTALLED_APPS에 추가된 이름과 일치해야 함
    name = 'accounts'
