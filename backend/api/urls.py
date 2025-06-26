
 
from django.urls import path 
 from .views import RegisterView, LoginView, ProfileView, AdminUserListView

urlpatterns = [
    
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/', ProfileView.as_view()),
    path('admin/users/', AdminUserListView.as_view()),
]  