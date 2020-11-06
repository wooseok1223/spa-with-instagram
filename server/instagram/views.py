from django.shortcuts import render
from .models import Post
from rest_framework.viewsets import ModelViewSet
from .serializers import PostSerializer
from rest_framework.permissions import AllowAny
from django.db.models import Q
from django.utils import timezone
from datetime import timedelta

class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


    def get_queryset(self):
        timesince = timezone.now() - timedelta(days=3 )
        qs = super().get_queryset()
        qs = qs.filter(
            Q(author=self.request.user) |
            Q(author__in=self.request.user.following_set.all())
        )
        qs = qs.filter(created_at__gte=timesince)
        return qs