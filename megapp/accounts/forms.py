from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.core.exceptions import ValidationError
from .models import User
from captcha.fields import CaptchaField
from captcha.models import CaptchaStore


class UserCreationForm(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""

    password1 = forms.CharField(label="Password", widget=forms.PasswordInput)
    password2 = forms.CharField(
label="Password confirmation", widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ["email", "username"]

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class UserChangeForm(forms.ModelForm):
    """A form for updating users. Includes all the fields on
    the user, but replaces the password field with admin's
    disabled password hash display field.
    """

    password = ReadOnlyPasswordHashField()

    class Meta:
        model = User
        fields = ["username", "email", "password", "is_active", "is_admin"]


class UserLoginForm(forms.Form):
    username = forms.CharField(label="username", widget=forms.TextInput(attrs={"placeholder": "Username or Email"}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={"placeholder": "Password"}), label="Password")
    captcha = CaptchaField(error_messages={'invalid': 'Captcha is wrong, please try again.'})

    # def clean_username(self):
    #     username = self.cleaned_data.get('username')
    #     email = self.cleaned_data.get('email')
    #     if not User.objects.filter(username__iexact=username).exists() or not  User.objects.filter(username__iexact=email).exists():
    #         raise ValidationError("Username or Email is Wrong")
    #
    #     return username

    def clean_password(self):
        password = self.cleaned_data.get('password')
        if len(password) <= 8:
            raise ValidationError("The password is less than 8 characters")
        if password.isdigit():
            raise ValidationError("Password must contain numbers 0-9")
        if password.isalpha():
            raise ValidationError("Password must contain special characters a-z")
        if password.isupper():
            raise ValidationError("Password must contain special characters A_Z")
        return password

    # def clean_captcha(self):
    #     captcha = self.cleaned_data.get('captcha')
    #     if  CaptchaStore.challenge != captcha:
    #         raise ValidationError("Captcha is Wrong")
    #     return captcha




class ProfileForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'full_name', 'is_active','is_admin', 'is_superuser', 'is_developer', 'is_marketing', 'is_support',
                  'is_onboarding', 'is_management', ]
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.TextInput(attrs={'class': 'form-control'}),
            'full_name': forms.TextInput(attrs={'class': 'form-control'}),

        }


class ProfileEditUserForm(forms.ModelForm):

    class Meta:
        model = User
        fields = ['full_name']



class RegisterForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput(), label="Password")
    password2 = forms.CharField(widget=forms.PasswordInput(), label="Password confirmation")
    class Meta:
        model = User
        fields = ('username', 'email', 'full_name' , 'password', 'password2', 'is_active', 'is_admin', 'is_superuser', 'is_developer', 'is_marketing', 'is_support', 'is_onboarding', 'is_management', 'password')
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.TextInput(attrs={'class': 'form-control'}),
            'full_name': forms.TextInput(attrs={'class': 'form-control'}),


        }



    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email__iexact=email).exists():
            raise ValidationError("Email already registered")
        return email


    def clean_username(self):
        username = self.cleaned_data.get('username')
        if User.objects.filter(username__iexact=username).exists():
            raise ValidationError("Username already registered")
        return username

    def clean_password2(self):
        password = self.cleaned_data.get("password")
        password2 = self.cleaned_data.get("password2")
        if password and password2 and password != password2:
            raise ValidationError("Passwords don't match")
        return password2

    def clean_password(self):
        password = self.cleaned_data.get('password')

        if len(password) <= 8:
            raise ValidationError("Password must not contain special characters")
        if password.isdigit():
            raise ValidationError("Password must contain numbers")
        if password.isalpha():
            raise ValidationError("Password must contain special characters")
        if password.isupper():
            raise ValidationError("Password must contain special characters")

        return password


class SetPasswordForm(forms.Form):
    password = forms.CharField(widget=forms.PasswordInput)

    def clean_password(self):
        password = self.cleaned_data.get('password')

        if len(password) <= 8:
            raise ValidationError("Password must not contain special characters")
        if password.isdigit():
            raise ValidationError("Password must contain numbers")
        if password.isalpha():
            raise ValidationError("Password must contain special characters")
        if password.isupper():
            raise ValidationError("Password must contain special characters")

        return password