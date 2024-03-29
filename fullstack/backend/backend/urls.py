
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('api.urls')),
    path("token/",  jwt_views.TokenObtainPairView.as_view(),name="token_ob"),
    path("token/refresh/", jwt_views.TokenRefreshView.as_view(), name="token_refresh")
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

