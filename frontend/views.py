from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.forms import AuthenticationForm
from users.models import User
from django.contrib.auth.decorators import login_required
from rest_framework.views import APIView
from django.shortcuts import redirect
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import JsonResponse

def login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                auth_login(request, user)
                refresh = RefreshToken.for_user(user)
                response = JsonResponse({
                    'detail': '로그인 성공',
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'username': user.username  # 사용자 이름을 추가하여 반환
                })
                response.set_cookie('access_token', str(refresh.access_token), httponly=True)
                response.set_cookie('refresh_token', str(refresh), httponly=True)
                return response
            else:
                return JsonResponse({'detail': 'Invalid login details'}, status=401)
        else:
            return JsonResponse({'detail': 'Invalid form details'}, status=400)
    else:
        form = AuthenticationForm()
    return render(request, 'frontend/login.html', {'form': form})

def signup(request):
    return render(request, 'frontend/signup.html')

@login_required
def user_detail(request, username):
    user = get_object_or_404(User, username=username)
    return render(request, 'frontend/user_detail.html', {'user': user})

def logout(request):
    auth_logout(request)
    return redirect('frontend:index')

class UserEditView(APIView):
    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        return render(request, 'frontend/useredit.html', {'user': user})

def index(request):
    return render(request, 'frontend/index.html')
