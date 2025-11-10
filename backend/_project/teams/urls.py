from django.urls import path
from .views import TeamViewSet, TeamMemberViewSet

app_name = 'teams'

urlpatterns = [
    path('my/', TeamViewSet.as_view({
        'get': 'retrieve',     
        'put': 'update',       
        'delete': 'destroy',   
    }), name='my-team'),
    
    path('', TeamViewSet.as_view({
        'post': 'create',      
    }), name='team-create'),
    
    path('my/members/', TeamMemberViewSet.as_view({
        'get': 'list',         
        'post': 'create',      
    }), name='members-list'),
    
    path('my/members/<int:pk>/', TeamMemberViewSet.as_view({
        'get': 'retrieve',     
        'put': 'update',       
        'delete': 'destroy',   
    }), name='member-detail'),
]