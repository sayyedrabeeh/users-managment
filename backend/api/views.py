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

def get_tokens_for_use(user):
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