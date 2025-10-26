from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.urls import reverse_lazy
from django.views.generic import CreateView
from django.shortcuts import render, redirect
from django.db import transaction
from django.contrib import messages

from .forms import SignUpForm, UserBasicForm, ProfileForm

class SignUpView(CreateView):
    form_class = SignUpForm
    template_name = "accounts/signup.html"
    success_url = reverse_lazy("dashboard")

    def form_valid(self, form):
        response = super().form_valid(form)
        login(self.request, self.object)
        return response

@login_required
def dashboard(request):
    return render(request, "accounts/dashboard.html")

@login_required
def profile_detail(request):
    return render(request, "accounts/profile.html", {
        "user_obj": request.user,
        "profile": request.user.profile,
    })

@login_required
@transaction.atomic
def profile_edit(request):
    user = request.user
    if request.method == "POST":
        user_form = UserBasicForm(request.POST, instance=user)
        profile_form = ProfileForm(request.POST, instance=user.profile)
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            messages.success(request, "프로필을 저장했습니다.")
            return redirect("accounts:profile")
    else:
        user_form = UserBasicForm(instance=user)
        profile_form = ProfileForm(instance=user.profile)

    return render(request, "accounts/profile_edit.html", {
        "user_form": user_form,
        "profile_form": profile_form,
    })
