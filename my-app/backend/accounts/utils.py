from django.utils.timezone import now
from .models import AttendanceRecord,Student

def save_attendance(student_id):
    try:
        student = Student.objects.get(student_id=student_id)
        
        # AttendanceRecord 저장
        AttendanceRecord.objects.create(
            student=student,
            date=now(),
            time=now().time(),
        )
        
        # Student 모델 업데이트
        student.is_present = True
        student.attendance_time = now()  # 현재 시간 저장
        student.save()

        print(f"✅ 출석 처리 완료: {student_id}")
    except Student.DoesNotExist:
        print(f"❌ 해당 학번의 학생이 존재하지 않습니다: {student_id}")
    except Exception as e:
        print(f"❌ 출석 처리 중 오류: {e}")
