from django.apps import AppConfig


class RealtorsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'realtors'

    def ready(self):
        import realtors.signals
