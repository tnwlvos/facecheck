from django.db import models
from django.contrib.auth.models import User

class Student(models.Model):
    student_id = models.CharField(max_length=20)  # 학번
    name = models.CharField(max_length=100)      # 이름
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="students")

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'student_id'], name='unique_student_for_user')
        ]

    def __str__(self):
        return f"{self.student_id} - {self.name}"