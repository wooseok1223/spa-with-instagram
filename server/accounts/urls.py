from django.urls import path
from . import views
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token

urlpatterns = [
    path('signup/', views.SignView.as_view(), name='login'),
    path('profile/', views.ProfileListAPIView.as_view(), name='profile'),
    path('profile/<int:pk>/edit/', views.UserUpdateView.as_view(), name='profile_edit'),
    path('token/', obtain_jwt_token),
    path('token/refresh', refresh_jwt_token),
    path('token/verify', verify_jwt_token),
    path('suggestions/', views.SuggestionListAPIView.as_view(), name="suggestion_user_list"),
    path('follow/', views.user_follow ,name='user_follow'),
    path('unfollow/', views.user_unfollow, name='user_unfollow'),
]