from django.urls import path

from .auth_views import UserLoginView, UserRegistrationView
from .views import DividendsView, InvestmentDetailsView, InvestmentsView

urlpatterns = [
    # Auth views
    path(
        "auth/register",
        UserRegistrationView.as_view(),
        name="auth-register-view",
    ),
    path(
        "auth/login",
        UserLoginView.as_view(),
        name="auth-login-view",
    ),
    # Investment views
    path(
        "investments/",
        InvestmentsView.as_view(),
        name="investments-view",
    ),
    path(
        "investments/<int:investment_id>",
        InvestmentDetailsView.as_view(),
        name="investments-details-view",
    ),
    # Dividend views
    path(
        "dividends/",
        DividendsView.as_view(),
        name="dividends-view",
    ),
]
