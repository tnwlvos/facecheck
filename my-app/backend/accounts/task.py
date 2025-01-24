from celery import shared_task

# Celery를 통해 비동기 작업을 생성하기 위해 필요한 데코레이터를 가져옴  
from .models import Student
# 현재 앱의 models.py에서 Student 모델을 가져옴 

# 두 숫자를 더하는 작업을 정의(테스트용 )
@shared_task
def add_numbers(a, b):
    return a + b


# 이메일을 전송하는 작업을 정의
@shared_task
def send_email(to_email):
    # 이메일 전송 로직
    return f"Email sent to {to_email}"

# 모든 학생의 출석 상태를 초기화하는 작업을 정의
@shared_task
def reset_attendance():
    """
    모든 학생의 출석 상태를 초기화합니다.
    """
    students = Student.objects.all()
    # 각 학생의 출석 상태를 초기화
    for student in students:
        student.is_present = False
        student.attendance_time = None
        student.save()  # 변경 사항을 데이터베이스에 저장
    return "Attendance reset completed"
