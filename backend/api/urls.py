
 
from django.urls import path 
from .views import RegisterView, LoginView, ProfileView, AdminUserListView,AdminUserDetailView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/', ProfileView.as_view()),
    path('admin/users/', AdminUserListView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
     path('admin/users/<int:pk>/', AdminUserDetailView.as_view()), 

]  