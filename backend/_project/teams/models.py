from django.db import models
from django.conf import settings
# Create your models here.

class Team(models.Model):
    team_name = models.CharField(max_length=50, verbose_name='팀명')
    description = models.TextField(blank=True, verbose_name='팀 설명')
    team_owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='team',
        unique=True,
        verbose_name='팀 생성자'
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='생성일시')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='수정일시')

    class Meta:
        verbose_name = '팀'
        verbose_name_plural = '팀들'
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.team_name} (by {self.team_owner.username})"
    
class TeamMember(models.Model):
    POSITIONS = [
        ('GK', '골키퍼'),
        ('LB', '레프트백'),
        ('CB', '센터백'),
        ('RB', '라이트백'),
        ('LWB', '레프트 윙백'),
        ('DM', '수비형 미드필더'),
        ('RWB', '라이트 윙백'),
        ('LM', '레프트 미드필더'),
        ('CM', '센터 미드필더'),
        ('RM', '라이트 미드필더'),
        ('LW', '레프트 윙'),
        ('AM', '공격형 미드필더'),
        ('RW', '라이트 윙'),
        ('ST', '스트라이커'),
    ]

    name = models.CharField(max_length=50, verbose_name="선수이름")
    number = models.PositiveIntegerField(verbose_name='등번호')
    main_position = models.CharField(
        max_length=3,
        choices=POSITIONS,
        verbose_name='주포지션'    
    )
    sub_position = models.CharField(
        max_length=3,
        choices=POSITIONS,
        verbose_name='부포지션',
        blank=True,
        null=True 
    )
    team = models.ForeignKey(
        Team,
        on_delete=models.CASCADE,
        related_name='members',
        verbose_name='소속팀'
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='생성일시')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='수정일시')

    class Meta:
        verbose_name = '선수'
        verbose_name_plural = '선수들'
        ordering = ["number"]
        unique_together = [['team', 'number']]

    def __str__(self):
        return f"{self.name}({self.number}) (in {self.team})"