from rest_framework import serializers
from .models import Team, TeamMember


class TeamMemberSerializer(serializers.ModelSerializer):
    position_display = serializers.CharField(
        source='get_position_display',
        read_only=True
    )

    class Meta:
        model = TeamMember
        fields = [
            'id',
            'name',
            'number',
            'position',
            'position_display',
            'created_at',
            'updated_at'
        ],
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_number(self, value):
        if value < 1 or value > 99:
            raise serializers.ValidationError("등번호는 1~99사이의 숫자입니다.")
        return value
    
class TeamSerializer(serializers.ModelSerializer):
    owner_username = serializers.CharField(
        source='team_owner.username',
        read_only=True
    )
    member_count = serializers.IntegerField(
        source='members.count',
        read_only=True
    )
    members = TeamMemberSerializer(many=True, read_only=True)
    
    class Meta:
        model = Team
        fields = [
            'id',
            'team_name',
            'description',
            'team_owner',
            'owner_username',
            'member_count',
            'members',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'team_owner', 'created_at', 'updated_at']