from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from .serializers import SignupSerializer


class SignView(CreateAPIView):
    model = get_user_model()
    serializer_class = SignupSerializer
    permission_classes = [permissions.AllowAny]

