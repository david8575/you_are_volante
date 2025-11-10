from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers
from .models import Team, TeamMember
from .serializer import TeamMemberSerializer, TeamSerializer
# Create your views here.

class TeamViewSet(viewsets.ModelViewSet):
    serializer_class = TeamSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Team.objects.filter(team_owner=self.request.user)
    
    def create(self, request, *args, **kwargs):
        if Team.objects.filter(team_owner=self.request.user).exists():
            return Response(
                {'error': '팀이 이미 존재합니다.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        return super().create(request, *args, **kwargs)
    
    def perform_create(self, serializer):
        serializer.save(team_owner=self.request.user)
    
class TeamMemberViewSet(viewsets.ModelViewSet):
    serializer_class = TeamMemberSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        try:
            my_team = Team.objects.get(team_owner=self.request.user)
            return TeamMember.objects.filter(team=my_team)
        except Team.DoesNotExist:
            return TeamMember.objects.none()
    
    def perform_create(self, serializer):
        try:
            my_team = Team.objects.get(team_owner=self.request.user)
            serializer.save(team=my_team)
        except Team.DoesNotExist:
            raise serializers.ValidationError("팀을 먼저 생성해주세요")