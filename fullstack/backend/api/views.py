from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import generics, status
from django.shortcuts import get_object_or_404
from rest_framework.decorators import permission_classes
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes


class RegisterView(APIView):
    
    def post(self,request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    
# token gelmesini istediğin bilgiler
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['username'] = user.username
        token ['id'] = user.id
        return token
# token gelmesini istediğin bilgiler
    

class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        print(password)
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise AuthenticationFailed("Hesap bulunamadı")
        print(user.check_password(password))
        if not user.check_password(password):
            raise AuthenticationFailed("Şifre yanlış")

        serializer = CustomTokenObtainPairSerializer(data={'email': email, 'password': password})
        serializer.is_valid(raise_exception=True)
        access_token = serializer.validated_data['access']

        refresh_token = str(RefreshToken.for_user(user))

        return Response({
            'message': 'giriş yapıldı',
            'access_token': access_token,
            'refresh_token': refresh_token,
            'email': user.email,
            'username': user.username,
            
        })
    def get(self, request):
        return Response({'message': 'veri geldi'})  
    
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        try:
            refresh_token = request.data['refreh_token']
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            return Response("Çıkış yapıldı", status=status.HTTP_200_OK)
        except:
            raise AuthenticationFailed("Token bulunamadı")
        
class CardsView(APIView):
    def get(self, request, format=None):
        cards = Cards.objects.all()
        serializer = CardsSerializer(cards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CardDetailView(APIView):
    def get(self, request, id, format=None):
        card = get_object_or_404(Cards, id=id)
        serializer = CardsSerializer(card)
        return Response(serializer.data, status=status.HTTP_200_OK)

      
class CommentView(APIView):
    def get(self, request, format=None):
        cards = Comment.objects.all()
        serializer = CommentSerializer(cards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
    
class CommentDetailView(APIView):
    def get(self, request,id, format=None):
        comments = Comment.objects.filter(card_id=id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, id, format=None):
        user = request.user
        card_id = id
        comment_text = request.data.get('comment', '')  # Assuming your request has a 'comment' field

        # Validate the data
        if not comment_text:
            return Response({'error': 'Comment cannot be empty.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new comment
        comment = Comment(user=user, card_id=card_id, comment=comment_text)
        comment.save()

        # Serialize and return the new comment
        serializer = CommentSerializer(comment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    


   
        
    

