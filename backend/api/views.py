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
    def POST(self,request):
        data = request.data
        if User.objects.filter(username = data['username']).exist():
            return Response({'error':'username already exist'},status=400)
        user = User.objects.create_user(
            username = data['username'],
            email = data['email'],
            password = data['password']
        )
        return Response(UserSerializer(user).data)

class LoginView(APIView):
    def post(self,request):
        user = authenticate(username=request.data['username'],password=request.data['password'])
        if user:
            token = get_tokens_for_user(user)
            return Response({'user':UserSerializer(user).data,'token':token})
        return Response({'error':'invalid credential'},status = 401)
    
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

        