from django import forms
from django.contrib.auth.forms import UserCreationForm
from.models import User

class SignUpForm(UserCreationForm):
    email = forms.EmailField(required=True)
    display_name = forms.CharField(max_length=50, required=True)


    class Meta:
        model = User
        fields = (
            "username",
            "email", 
            "display_name", 
            "password1", 
            "password2"
        )

    def clean_email(self):
        email = self.cleaned_data["email"]

        if User.objects.filter(email=email).exists():
            raise forms.ValidationError("이미 등록된 이메일입니다.")

        return email       
