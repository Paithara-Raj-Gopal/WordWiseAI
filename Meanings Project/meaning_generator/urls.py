from django.urls import path
from .views import MeaningView

urlpatterns = [
    path('meaning/<str:word>/', MeaningView.as_view(), name='meaning'),
]
