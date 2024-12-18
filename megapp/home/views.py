from django.shortcuts import render
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView

# Create your views here.
class HomeView(LoginRequiredMixin, View):
    template_name = 'index.html'
    def get(self, request):
        return render(request, self.template_name)



class ValidationSslView(TemplateView):
    template_name = './.well-known/pki-validation/31254999F419C5FD7B801C677268369D.txt'
    content_type = "text/plain"
    
    


