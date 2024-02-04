from django.urls import path
from .views import *



urlpatterns = [
    path('register/', RegisterView.as_view(), name="register"),
    path('login/', LoginView.as_view(), name="login"),
    path('logout/', LogoutView.as_view(), name="logout"),
    path('cards/', CardsView.as_view(), name="cards"),
    path('cards/<int:id>/', CardDetailView.as_view(), name="card-detail"),
    path('cardscomment/', CommentView.as_view(), name="card-comment"),
    path('cardscomment/<int:id>/', CommentDetailView.as_view(), name="card-commentfull"),
]
