from django.shortcuts import render
from rest_framework import viewsets
from .serializers import RestaurantSerializer
from .models import Restaurant


# Create your views here.
class RestaurantView(viewsets.ModelViewSet):
    serializer_class = RestaurantSerializer
    queryset = Restaurant.objects.all()
