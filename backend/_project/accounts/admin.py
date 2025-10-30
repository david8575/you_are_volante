from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
# Register your models here.

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ['username', 'email', 'is_staff', 'created_at']
    fieldsets = UserAdmin.fieldsets + (
        ('추가 정보', {'fields': ('bio', 'created_at', 'updated_at')}),
    )
    readonly_fields = ['created_at', 'updated_at']