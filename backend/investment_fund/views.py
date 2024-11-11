from django.contrib.auth.models import User
from django.db.models.aggregates import Sum
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Dividend, Investment
from .serializers import DividendSerializer, InvestmentSerializer


class InvestmentsView(APIView):
    """
    Manages all investment records for the authenticated user, allowing retrieval, creation,
    and deletion of investment data.

    Methods:
        - get(request): Retrieves all investments associated with the authenticated user.
        - post(request): Allows the authenticated user to create a new investment.
        - delete(request): Deletes all investments associated with the authenticated user.

    Authentication:
        This view requires authentication. Unauthorized users will receive a 401 response.

    Usage:
        - GET: Returns a list of all investments for the authenticated user.
        - POST: Allows creating a new investment for the authenticated user.
        - DELETE: Deletes all investments for the authenticated user.
    """

    def get(self, request: Request) -> Response:

        if request.user is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        all_investments = Investment.objects.filter(investor=request.user)

        all_investments_serializer = InvestmentSerializer(
            instance=all_investments, many=True
        )
        return Response(all_investments_serializer.data, status=status.HTTP_200_OK)

    def post(self, request: Request) -> Response:
        investment_serializer = InvestmentSerializer(
            data=request.data, context={"user_instance": request.user}
        )

        investment_serializer.is_valid(raise_exception=True)

        investment_serializer.save()

        return Response(investment_serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request: Request) -> Response:
        if request.user is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        all_investments = Investment.objects.filter(investor=request.user)

        [investment.delete() for investment in all_investments]

        return Response(status=status.HTTP_204_NO_CONTENT)


class InvestmentDetailsView(APIView):
    """
    Manages individual investment records for the authenticated user,
    allowing deletion of a specific investment by ID.

    Methods:
        - delete(request, investment_id): Deletes a specific investment by its ID if it exists.

    Authentication:
        This view requires authentication. Unauthorized users will receive a 401 response.

    Usage:
        - DELETE: Deletes the specified investment for the authenticated user.
    """

    def delete(self, request: Request, investment_id: int) -> Response:
        if request.user is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        investment_instance = Investment.objects.filter(pk=investment_id).first()

        if investment_instance is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        investment_instance.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class DividendsView(APIView):
    """
    This view handles the retrieval and creation of dividend records for users.

    Methods:
        - get(request): Retrieves all dividend records associated with the authenticated user.
        - post(request): Calculates and distributes dividends to all non-superuser users,
        based on a percentage of their total investments. This action is restricted to superusers.

    Authentication:
        Requires the request to be authenticated. Unauthorized users will receive a 401 response.

    Attributes:
        DIVIDEND_PERCENT (float): A constant representing the percentage of the
        total invested amount to be distributed as dividends.

    Usage:
        - GET: Retrieves dividend information for the authenticated user.
        - POST: Superusers only. Calculates and distributes dividends for all non-superuser users.
    """

    def get(self, request: Request) -> Response:
        if request.user is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        dividend_serializer = DividendSerializer(
            Dividend.objects.filter(user=request.user), many=True
        )

        return Response(dividend_serializer.data, status=status.HTTP_200_OK)

    def post(self, request: Request) -> Response:
        user_instance = request.user
        if user_instance is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        if not user_instance.is_superuser:  # type: ignore
            return Response(status=status.HTTP_403_FORBIDDEN)

        all_users = User.objects.filter(is_superuser=False).annotate(
            total_invested=Sum("investments__amount")
        )

        DIVIDEND_PERCENT = 0.1  # Fixed percentage for dividend calculation

        for user in all_users:
            if user.total_invested is None:  # type: ignore
                # User has 0 investments
                continue

            Dividend.objects.create(
                user=user,
                amount=user.total_invested * DIVIDEND_PERCENT,  # type: ignore
            )

        return Response(status=status.HTTP_201_CREATED)
