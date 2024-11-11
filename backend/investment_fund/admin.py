from django.contrib import admin

from .models import Dividend, Investment

admin.site.register(Investment)
admin.site.register(Dividend)
