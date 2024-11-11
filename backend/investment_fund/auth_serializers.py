from typing import cast

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token


class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for handling user registration. Inherits from `ModelSerializer` and
    includes additional validations and custom methods for secure user creation.

    Fields:
        - username (str): The unique username for the new user.
        - password (str): The password for the new user (write-only for security).
        - is_superuser (bool): A read-only field indicating if the user has superuser status.

    Methods:
        - validate_username: Checks that the username is unique.
        - create: Creates a new user and generates an authentication token.
        - to_representation: Customizes the serialized output to include the token.
    """

    class Meta:
        model = User
        fields = ["username", "password", "is_superuser"]
        read_only_fields = ["is_superuser"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate_username(self, value: str) -> str:

        if User.objects.values("username").filter(username=value).exists():
            raise serializers.ValidationError("The username already exists.")

        return value

    def create(self, validated_data) -> User:
        user_instance = User.objects.create_user(**validated_data)
        Token.objects.create(user=user_instance)

        return user_instance

    def to_representation(self, instance: User) -> dict:

        return {
            "username": instance.username,
            "isSuperuser": instance.is_superuser,
            "token": Token.objects.get(user=instance).key,
        }


class UserLoginSerializer(serializers.Serializer):
    """
    Serializer for user login, authenticating based on provided credentials and
    returning user-specific data and token upon successful authentication.

    Fields:
        - username (str): The username provided for login.
        - password (str): The password provided for login (write-only for security).

    Methods:
        - validate: Authenticates the user and attaches relevant data if successful.
        - to_representation: Defines the structure of serialized data in the response.
    """

    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, validated_data: dict) -> dict:

        username = validated_data.pop("username")
        password = validated_data.pop("password")

        user_instance = authenticate(username=username, password=password)

        if user_instance is None:
            raise serializers.ValidationError("Wrong username or password")

        # Mypy errors
        user_instance = cast(User, user_instance)

        validated_data["username"] = user_instance.username
        validated_data["is_superuser"] = user_instance.is_superuser
        token_instance, _ = Token.objects.get_or_create(user=user_instance)
        validated_data["token"] = token_instance.key

        return validated_data

    def to_representation(self, instance: dict) -> dict:

        return {
            "username": instance.get("username"),
            "token": instance.get("token"),
            "isSuperuser": instance.get("is_superuser"),
        }
