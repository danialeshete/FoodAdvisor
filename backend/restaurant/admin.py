from django.contrib import admin
from .models import Restaurant


class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'ratings', 'personalList')


# Register your models here.

admin.site.register(Restaurant, RestaurantAdmin)
