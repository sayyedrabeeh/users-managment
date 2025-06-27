from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
# Create your views here.

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return{
        'refresh':str(refresh),
        'access' :str(refresh.access_token)
    }

class RegisterView(APIView):
    def post(self, request):
        data = request.data
        print("REGISTER DATA RECEIVED:", data)
        required = ['username', 'email', 'password']
        for field in required:
            if field not in data or not data[field]:
                return Response({'error': f"{field} is required."}, status=400)
 
        from django.core.validators import validate_email
        from django.core.exceptions import ValidationError
        try:
            validate_email(data['email'])
        except ValidationError:
            return Response({'error': 'Invalid email format.'}, status=400)

    
        if User.objects.filter(username=data['username']).exists():
            return Response({'error': 'Username already exists.'}, status=400)

        if User.objects.filter(email=data['email']).exists():
            return Response({'error': 'Email already exists.'}, status=400)

    
        if len(data['password']) < 5:
            return Response({'error': 'Password must be at least 5 characters.'}, status=400)

        try:
            user = User.objects.create_user(
                username=data['username'],
                email=data['email'],
                password=data['password']
            )
            return Response(UserSerializer(user).data, status=201)

        except Exception as e:
            return Response({'error': str(e)}, status=500)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        print(f"LOGIN ATTEMPT: {username=}, {password=}")

        user = authenticate(username=username, password=password)

        if user:
            token = get_tokens_for_user(user)
            return Response({
                'user': UserSerializer(user).data,
                'token': token
            })

        print("AUTHENTICATION FAILED")
        return Response({'error': 'Invalid credentials'}, status=401)
    
class ProfileView(APIView):
    parser_classes =[MultiPartParser]
    permission_classes = [permissions.IsAuthenticated]

    def get(self,request):
        return Response(UserSerializer(request.user).data)
    def put(self,request):
        user = request.user
        user.profile_image = request.data.get('profile_image', user.profile_image)
        user.save()
        return Response(UserSerializer(user).data)

class AdminUserListView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self,request):
        q = request.GET.get('q','')
        users = User.objects.filter(username__icontains = q)
        return Response(UserSerializer(users,many=True).data)

    def put(self,request):
        user = User.objects.get(id = request.data['id'])
        user.email = request.data.get('email',user.email)
        user.save()
        return Response(UserSerializer(user).data)

    def delete(self,request):
        user = User.objects.get(id = request.data['id'])
        user.delete()
        return Response({'status': 'deleted'})