import re

from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import User


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create(username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = get_user_model()
        fields = ['pk', 'username', 'password']


class SuggestionUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ['username', 'name', 'avatar_url']


class ProfileSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField("avatar_url_field")

    def avatar_url_field(self, author):
        print(author)
        if re.match(r"^https?://", author.avatar_url):
            return author.avatar_url

        if "request" in self.context:
            scheme = self.context["request"].scheme
            host = self.context["request"].get_host()
            return scheme + "://" + host + author.avatar_url

    class Meta:
        model = get_user_model()
        fields = ['avatar_url', 'first_name', 'last_name', 'website_url', 'bio', 'phone_number', 'gender']