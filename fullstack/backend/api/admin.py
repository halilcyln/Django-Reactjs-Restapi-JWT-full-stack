from django.contrib import admin
from api.models import *


class MyModelAdmin(admin.ModelAdmin):
    list_display = ('user', 'text')



class MyModelAdminc(admin.ModelAdmin):
    list_display = ('user', 'card', 'comment')

admin.site.register(User)
admin.site.register(Cards, MyModelAdmin)
admin.site.register(Comment, MyModelAdminc)
# Register your models here.


