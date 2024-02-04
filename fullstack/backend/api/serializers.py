from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.tokens import RefreshToken


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'password', 'email', 'user_img', 'username']

    def create(self, validated_data):
        password = validated_data["password"]
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()

        # Kullanıcı oluşturulduktan sonra refresh ve access tokenları al
        refresh = RefreshToken.for_user(instance)
        access_token = refresh.access_token

        return instance
    

class CardsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cards
        fields = ["id","image","text"]

   

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["user","card","comment"]
    



