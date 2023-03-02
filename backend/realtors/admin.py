from django.contrib import admin
from .forms import RealtorsForm
from realtors.models import Realtors


class RealtorAdmin(admin.ModelAdmin):
    form = RealtorsForm


admin.site.register(Realtors, RealtorAdmin)
