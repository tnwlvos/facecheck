from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

# 학생 정보를 저장하는 모델
class Student(models.Model):
    student_id = models.CharField(max_length=20)  # 학번
    name = models.CharField(max_length=100)      # 이름
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="students") # User 모델과의 외래키 관계, User 삭제 시 연결된 학생 데이터도 삭제됨
    is_present = models.BooleanField(default=False)  # 출석 상태 (True: 출석, False: 결석)
    attendance_time = models.DateTimeField(null=True, blank=True) # 출석 시간 (출석 시 기록)
    class Meta:
         # 특정 사용자의 student_id가 중복되지 않도록 유니크 제약 조건 추가
        constraints = [
            models.UniqueConstraint(fields=['user', 'student_id'], name='unique_student_for_user')
        ]
    def save(self, *args, **kwargs):
        # 출석 상태가 True일 경우 출석 시간을 현재 시간으로 설정
        if self.is_present:
            self.attendance_time = now()
         # 부모 클래스의 save 메서드 호출
        super().save(*args, **kwargs)
    def __str__(self):
        return f"{self.student_id} - {self.name}" # 객체를 문자열로 표현할 때 학번과 이름 반환
    
# 출석 기록을 저장하는 모델
class AttendanceRecord(models.Model):
    
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="attendance_records", null=True, blank=True)
     # Student 모델과의 외래키 관계, 연결된 학생 삭제 시 출석 기록도 삭제됨
    date = models.DateTimeField(default=now)# 출석 날짜 (기본값: 현재 날짜와 시간)
    time = models.TimeField(default=now)  # 출석 시간 (기본값: 현재 시간)
    
    def __str__(self):
        return f"{self.student.student_id} - {self.date} - {self.time}"
        # 객체를 문자열로 표현할 때 학번, 날짜, 시간 반환
