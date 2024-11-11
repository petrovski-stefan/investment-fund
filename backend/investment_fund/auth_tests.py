from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class UserRegistrationViewTests(APITestCase):

    def setUp(self) -> None:
        self.url = reverse("auth-register-view")
        self.valid_payload = {
            "username": "username",
            "password": "password",
        }
        self.invalid_payload = {
            "password": "password",
        }

    def test_register_user_with_valid_data(self) -> None:
        """Test user registration with valid data"""
        response = self.client.post(self.url, data=self.valid_payload)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("username", response.data)
        self.assertEqual(response.data["username"], self.valid_payload["username"])

    def test_register_user_with_invalid_data(self) -> None:
        """Test user registration with invalid data"""
        response = self.client.post(self.url, data=self.invalid_payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("username", response.data)


class UserLoginViewTests(APITestCase):

    def setUp(self) -> None:
        self.url = reverse("auth-login-view")
        self.user = User.objects.create_user(
            username="username",
            password="password",
        )
        self.valid_credentials = {
            "username": "username",
            "password": "password",
        }
        self.invalid_credentials = {
            "username": "username",
            "password": "wrongpassword",
        }

    def test_login_with_valid_credentials(self) -> None:
        """Test user login with valid credentials"""
        response = self.client.post(self.url, data=self.valid_credentials)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("username", response.data)
        self.assertEqual(response.data["username"], self.valid_credentials["username"])

    def test_login_with_invalid_credentials(self) -> None:
        """Test user login with invalid credentials"""
        response = self.client.post(self.url, data=self.invalid_credentials)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
