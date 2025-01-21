# Django: accounts/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Student
import openpyxl

# Custom Token Serializer
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['name'] = user.first_name
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['name'] = self.user.first_name
        return data

# Custom Login View
class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        name = request.data.get('name')
        if not username or not password or not name:
            return Response({"error": "모든 필드를 입력하세요."}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(username=username).exists():
            return Response({"error": "이미 존재하는 사용자입니다."}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password, first_name=name)
        user.save()
        return Response({"message": "회원가입 성공"}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_students(request):
    user = request.user
    if request.method == 'POST' and request.FILES.get('file'):
        excel_file = request.FILES['file']
        wb = openpyxl.load_workbook(excel_file)
        sheet = wb.active
        # 기존 데이터 삭제 (현재 사용자 데이터만)
        Student.objects.filter(user=user).delete()
        for row in sheet.iter_rows(min_row=2, values_only=True):
            student_id, name = row
            if student_id and name:
                Student.objects.update_or_create(
                    user=user,
                    student_id=student_id,
                    defaults={'name': name},
                )
        return Response({"message": "파일 업로드 성공!"}, status=status.HTTP_200_OK)

    return Response({"error": "파일이 없습니다."}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_students(request):
    user = request.user
    students = Student.objects.filter(user=user).values('student_id', 'name')
    return Response(students, status=status.HTTP_200_OK)
