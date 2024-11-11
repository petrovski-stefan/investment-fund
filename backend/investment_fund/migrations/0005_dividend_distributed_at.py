# Generated by Django 5.0.2 on 2024-11-11 01:34

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("investment_fund", "0004_alter_investment_investor"),
    ]

    operations = [
        migrations.AddField(
            model_name="dividend",
            name="distributed_at",
            field=models.DateTimeField(
                auto_now_add=True, default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),
    ]