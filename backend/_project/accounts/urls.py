from django.urls import path
from .views import *

app_name = 'accounts'

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'), # 회원가입
    path('login/', LoginView.as_view(), name='login'), # 로그인
    path('logout/', LogoutView.as_view(), name='logout'), # 로그아웃
    path('me/', UserDetailView.as_view(), name='user-detail'), # 내정보 조회
    path('change-password/', ChangePasswordView.as_view(), name='change-password'), # 비밀번호 변경
]

