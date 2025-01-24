
from __future__ import absolute_import, unicode_literals # Python 2/3 호환을 위해 추가
import os  # 운영체제 관련 작업을 위한 모듈
from celery import Celery # Celery 객체를 생성하기 위한 모듈
from kombu import serialization # 직렬화 설정을 위한 모듈 (필요에 따라 사용)

# Django의 기본 settings 모듈을 Celery에 설정
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')  # your_project_name을 프로젝트 이름으로 변경

app = Celery('backend')

# Celery 설정을 Django 설정에서 가져오기
app.config_from_object('django.conf:settings', namespace='CELERY')
# 'CELERY_'로 시작하는 설정을 Celery가 인식할 수 있도록 함

# 자동으로 task 모듈을 탐색
app.autodiscover_tasks()


# 디버그용 기본 태스크 정의
@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')

@app.on_after_finalize.connect
def setup_periodic_tasks(sender, **kwargs):
    """
    Celery Beat의 PeriodicTask를 정의합니다.
    """
    from django_celery_beat.models import PeriodicTask, CrontabSchedule

    # 매일 자정에 실행되는 스케줄 추가
    schedule, created = CrontabSchedule.objects.get_or_create(
        minute="0", hour="0"  # 매일 00:00
    )

    # PeriodicTask 생성 또는 업데이트
    PeriodicTask.objects.update_or_create(
        crontab=schedule,
        name="Reset Attendance Task",  # 고유 이름
        defaults={"task": "accounts.tasks.reset_attendance"},  # 실행할 Task 이름
    )
