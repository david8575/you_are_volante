from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Team, TeamMember
from .serializer import TeamMemberSerializer, TeamSerializer
# Create your views here.

class TeamViewSet(viewsets.ModelViewSet):
    serializer_class = TeamSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return
    def create(self, request, *arg, **kwargs):
        pass
    def perform_create(self, serializer):
        return super().perform_create(serializer)
    
class TeamMemberViewSet(viewsets.ModelViewSet):
    serializer_class = TeamMemberSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # 내 팀의 팀원만 반환
        pass
    
    def perform_create(self, serializer):
        # team 자동 설정
        pass