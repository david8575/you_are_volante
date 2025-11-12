from django.contrib import admin
from .models import Team, TeamMember
# Register your models here.

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ['team_name', 'team_owner', 'member_count', 'created_at']
    search_fields = ['team_name', 'team_owner__username']
    list_filter = ['created_at']
    readonly_fields = ['created_at', "updated_at"]

    def member_count(self, obj):
        return obj.members.count()
    member_count.short_description = '팀원 수'


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'number', 'main_position', 'sub_position', 'team', 'created_at']
    list_filter = ['main_position', 'team']
    search_fields = ['name', 'team__team_name']
    ordering = ['team', 'number']
    readonly_fields = ['created_at', 'updated_at']