from rest_framework import serializers

from .models import Dividend, Investment


class InvestmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investment
        fields = "__all__"
        read_only_fields = ["id", "invested_at", "investor"]

    def validate(self, validated_data: dict) -> dict:

        user_instance = self.context.get("user_instance")
        if user_instance is None:
            raise serializers.ValidationError("User not present in context")

        validated_data["investor"] = user_instance

        return validated_data

    def to_representation(self, instance: Investment) -> dict:

        return {
            "id": instance.pk,
            "investedAt": instance.invested_at,
            "userId": instance.investor.pk,
            "amount": instance.amount,
        }


class DividendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dividend
        fields = "__all__"

    def to_representation(self, instance: Dividend) -> dict:
        return {
            "id": instance.pk,
            "distributedAt": instance.distributed_at,
            "userId": instance.user.pk,
            "amount": instance.amount,
        }
