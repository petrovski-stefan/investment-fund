from django.contrib.auth.models import User
from django.db import models


class Investment(models.Model):
    investor = models.ForeignKey(
        to=User, on_delete=models.CASCADE, related_name="investments"
    )
    amount = models.PositiveIntegerField()
    invested_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.investor} invested {self.amount} on {self.invested_at}"


class Dividend(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    amount = models.FloatField()
    distributed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return (
            f"Dividend of {self.amount} return to {self.user} at {self.distributed_at} "
        )
