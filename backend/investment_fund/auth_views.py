from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .auth_serializers import (
    UserLoginSerializer,
    UserRegistrationSerializer,
)


class UserRegistrationView(APIView):
    """
    API view to handle user registration. This view processes a POST request
    to create a new user account. It uses the `UserRegistrationSerializer`
    to validate and save the user data.
    """

    def post(self, request: Request) -> Response:

        user_serializer = UserRegistrationSerializer(data=request.data)

        user_serializer.is_valid(raise_exception=True)

        user_serializer.save()

        return Response(user_serializer.data, status=status.HTTP_201_CREATED)


class UserLoginView(APIView):
    """
    API view to handle user login. This view processes a POST request
    to authenticate a user based on provided credentials (username and password).
    It uses the `UserLoginSerializer` to validate and authenticate the login data.
    """

    def post(self, request: Request) -> Response:

        user_serializer = UserLoginSerializer(data=request.data)

        user_serializer.is_valid(raise_exception=True)

        return Response(user_serializer.data, status=status.HTTP_200_OK)
