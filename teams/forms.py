from django import forms
from .models import Team, Player

class TeamForm(forms.ModelForm):
    class Meta:
        model = Team
        fields = ["team_name", "team_uniform_color"]
        widgets = {
            "team_name": forms.TextInput(attrs={"placeholder": "팀 이름"}),
            "team_uniform_color": forms.TextInput(attrs={"placeholder": "팀 유니폼 색상"}),
        }

class PlayerForm(forms.ModelForm):
    class Meta:
        model = Player
        fields = ["player_name", "player_number", "player_main_position", "player_sub_position", "team"]
        widgets = {}