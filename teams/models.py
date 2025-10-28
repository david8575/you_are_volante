from django.db import models
# Create your models here.

class Team(models.Model):
    team_name = models.CharField(max_length=50)
    team_uniform_color = models.CharField(max_length=50)

    class Meta:
        db_table = "teams"
        verbose_name = "팀"
        verbose_name_plural = "팀들"

    def __str__(self):
        return self.team_name
    
class Player(models.Model):
    PLAYER_POSITION_CHOICES = [
        ('CF', 'center forward'),
        ('SS', 'second striker'),
        ('LWF', 'left wing forward'),
        ('AM', 'attack midfielder'),
        ('RWF', 'right wing forward'),
        ('LM', 'left midfielder'),
        ('CM', 'center midfielder'),
        ('RM', 'right midfielder'),
        ('LWB', 'left wing back'),
        ('DM', 'defend midfielder'),
        ('RWB', 'right wing back'),
        ('LB', 'left back'),
        ('CB', 'center back'),
        ('RB', 'right back'),
        ('GK', 'goal keeper'), 
    ]
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='players')
    player_name = models.CharField(max_length=50)
    player_number = models.IntegerField()
    player_main_position = models.CharField(max_length=10, choices=PLAYER_POSITION_CHOICES)
    player_sub_position = models.CharField(max_length=10, blank=True, choices=PLAYER_POSITION_CHOICES)

    class Meta:
        db_table = 'players'
        verbose_name = '선수'
        verbose_name_plural = '선수들'
        constraints = [
            models.UniqueConstraint(fields=['team', 'player_number'], name='unique_player_number_per_team')
        ]
    
    def __str__(self):
        return f"{self.player_name} ({self.team.team_name})"