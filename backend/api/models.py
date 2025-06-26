from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

class User(AbstractUser):
    is_admin = models.BooleanField(default=False )
    profile_image = models.ImageField(upload_to='profiles/', null=True, blank=True) 

    def __str__(self):
        return self.username
    
  