from django import forms
from .models import Realtors


class RealtorsForm(forms.ModelForm):
    class Meta:
        model = Realtors
        fields = ['name', 'photo', 'cv', 'description',
                  'phone', 'email', 'buyers_agent', 'listing_agent', 'relocation_agent', 'forclosure_agent', 'is_verified']
