from rest_framework import serializers
from .models import User
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    is_admin = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_admin', 'profile_image']

    def get_is_admin(self, obj):
        return obj.is_staff or obj.is_superuser
