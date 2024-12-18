from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, logout, authenticate
from django.views import View
from .forms import UserLoginForm, ProfileEditUserForm, ProfileForm, RegisterForm, SetPasswordForm
from django.contrib import messages
from .models import User
from company.mixin import SuperUserAccessMixin
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.contrib.auth.hashers import make_password



class LoginView(View):
    form_class = UserLoginForm
    template_name = 'accounts/login.html'

    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('/')
        return super().dispatch(request, *args, **kwargs)



    def get(self, request):
        form = self.form_class
        return render(request, self.template_name, {'form': form})

    def post(self, request):
        form = self.form_class(request.POST)

        if form.is_valid():
            cd = form.cleaned_data
            user = authenticate(request, username=cd['username'], password=cd['password'])


            if user is not None:
                login(request, user)
                messages.success(request, 'You are now logged in!')
                next_url = request.GET.get('next')
                if next_url:
                    return redirect(next_url)
                else:
                    return redirect('/')
            else:
                messages.warning(request, 'Your account is incorrect or not verified !')
                return redirect('/')

        return render(request, self.template_name, {'form': form})


class LogoutView(LoginRequiredMixin, View):
    def get(self, request):
        logout(request)
        messages.error(request, 'You have been logged out.')
        return redirect('accounts:login')


class EditProfilerView(LoginRequiredMixin, View):
    form_class = ProfileEditUserForm
    template_name = 'accounts/editprofile.html'

    def get(self, request):
        form = self.form_class(instance=request.user, initial={'username': request.user.username, 'full_name': request.user.full_name})
        return render(request, self.template_name, {'form': form})

    def post(self, request):
        form = self.form_class(instance=request.user, data=request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your profile has been updated.')
            return redirect('/')
        return render(request, self.template_name, {'form': form})




class UserProfileView(SuperUserAccessMixin, ListView):
    queryset = User.objects.all().order_by('?')
    template_name = 'accounts/profile.html'
    context_object_name = 'users'
    paginate_by = 10


class UserUpdateView(SuperUserAccessMixin, UpdateView):
    model = User
    template_name = 'accounts/profile_update.html'
    form_class = ProfileForm
    context_object_name = 'user'
    success_url = reverse_lazy('company:profile-all')


class UserDeleteView(SuperUserAccessMixin, DeleteView):
    model = User
    template_name = 'accounts/profile_delete.html'
    success_url = reverse_lazy('company:profile-all')


class AccountNotActive(SuperUserAccessMixin, ListView):
    template_name = 'accounts/account_not_active.html'
    queryset = User.objects.filter(is_active=False)
    context_object_name = 'users'
    paginate_by = 10


class AccountDevloper(SuperUserAccessMixin, ListView):
    template_name = 'accounts/account_developer.html'
    queryset = User.objects.filter(is_developer=True)
    context_object_name = 'users'
    paginate_by = 10

class AccountMarketing(SuperUserAccessMixin, ListView):
    template_name = 'accounts/account_marketing.html'
    queryset = User.objects.filter(is_marketing=True)
    context_object_name = 'users'
    paginate_by = 10

class AccountSupport(SuperUserAccessMixin, ListView):
    template_name = 'accounts/account_support.html'
    queryset = User.objects.filter(is_support=True)
    context_object_name = 'users'
    paginate_by = 10


class AccountOnboarding(SuperUserAccessMixin, ListView):
    template_name = 'accounts/account_onboarding.html'
    queryset = User.objects.filter(is_onboarding=True)
    context_object_name = 'users'
    paginate_by = 10

class AccountManagement(SuperUserAccessMixin, ListView):
    template_name = 'accounts/account_management.html'
    queryset = User.objects.filter(is_management=True)
    context_object_name = 'users'
    paginate_by = 10






class RegisterView(SuperUserAccessMixin, View):
    form_class = RegisterForm
    template_name = 'accounts/profile_register.html'

    # def dispatch(self, request, *args, **kwargs):
    #     if request.user.is_superuser:
    #         return super().dispatch(request, *args, **kwargs)
    #     return redirect('/')

    def get(self, request):
        form = self.form_class()
        return render(request, self.template_name, {'form': form})

    def post(self, request):
        form = self.form_class(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            User.objects.create_user(username=cd['username'], email=cd['email'], password=cd['password2'],
                                     full_name=cd['full_name'],
                                     is_active=cd['is_active'],
                                     is_admin=cd['is_admin'],
                                     is_superuser=cd['is_superuser'],
                                     is_developer=cd['is_developer'],
                                     is_marketing=cd['is_marketing'],
                                     is_support=cd['is_support'],
                                     is_onboarding=cd['is_onboarding'],
                                     is_management=cd['is_management'],
                                     )
            messages.success(request, 'your registered.', 'success')
            return redirect('company:profile-all')
        return render(request, self.template_name, {'form': form})

class ChengPassword(SuperUserAccessMixin, View):
    form_class = SetPasswordForm
    template_name = 'accounts/password.html'
    success_url = reverse_lazy('home:index')

    def get(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        form = self.form_class()
        return render(request, self.template_name, {'form': form, 'user': user})

    def post(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        form = self.form_class(request.POST)
        if form.is_valid():
            password = form.cleaned_data['password']
            user.password = make_password(password)
            user.save()
            messages.success(request, 'Password has been changed successfully for the selected user.')
            return redirect('accounts:login')
        else:
            messages.error(request, 'Please correct the error below.')
            return render(request, self.template_name, {'form': form, 'user': user})

