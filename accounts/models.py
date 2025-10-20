from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    display_name = models.CharField(max_length=50, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['email'], name='unique_user_email')
        ]

    def __str__(self):
        return self.username

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True)
    # 아바타 추후 추가 -> Pillow 이용 예정 
    # avartar = models.ImageField(upload_to="avartars/", blank=True, null=True) 

    def __str__(self):
        return f"Profile({self.user.username})"