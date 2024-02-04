    
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

class UserManager(BaseUserManager):
    def _create_user(self,email,password=None, **extra_fields):
        if not email:
            raise ValueError('Email alanı boş bırakılmaz')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_user(self, email,password=None, **extra_fields):
        extra_fields.setdefault('is_staff',False)
        extra_fields.setdefault('is_superuser',False)
        return self._create_user(email,password, **extra_fields)
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        if extra_fields.get("is_staff") is not True:
            raise ValueError('Superuser must be assigned to staff')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Super user must be assigned to superuser')
        return self.create_user(email,password, **extra_fields)
    
class User(AbstractUser):
    email = models.CharField(max_length = 200, unique=True)
    password = models.CharField(max_length=200)
    username = models.CharField(max_length = 150, unique=True)
    user_img = models.ImageField(upload_to='user_images/', null=True, blank=True,default="img/Default_pfp.jpg")
    bio = models.TextField(max_length= 1000,blank=True)
    twitter = models.TextField(max_length= 1000,blank=True)
    instagram = models.TextField(max_length= 1000,blank=True)
    github = models.TextField(max_length= 1000,blank=True)
    linkedin = models.TextField(max_length= 1000,blank=True)

    USERNAME_FIELD='email'
    REQUIRED_FIELDS = ['username']
    objects = UserManager()
    
    def __str__(self):
        return str(self.username)

class Cards(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True) 
    image = models.ImageField()
    text = models.CharField(max_length=200)
    def __str__(self):
        return str(self.text)
    
class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    card = models.ForeignKey(Cards, on_delete=models.CASCADE)
    comment = models.TextField(max_length=200)

    def __str__(self):
        return str(self.card)

