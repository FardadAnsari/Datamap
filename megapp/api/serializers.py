from rest_framework import serializers
from company.models import (
    Foodhub,
    Justeat,
    WhatTheFork,
    UberEats,
    Foodhouse,
    MenuList,
    ScoffableList,
    Deliveroo,
    Straightfrom,
    Kuick,
)

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# api serializer foothub


class FoothubSerializers(serializers.ModelSerializer):
        class Meta:
            model = Foodhub
            fields = '__all__'


class JusteatSerializers(serializers.ModelSerializer):

    class Meta:
        model = Justeat
        fields = '__all__'


class FoodhouseSerializers(serializers.ModelSerializer):
    class Meta:
        model = Foodhouse
        fields = '__all__'



class WsSerializers(serializers.ModelSerializer):

    class Meta:
        model = WhatTheFork
        fields = '__all__'


class UberEatsSerializers(serializers.ModelSerializer):
    class Meta:
        model = UberEats
        fields = '__all__'



class MenuListSerializers(serializers.ModelSerializer):
    class Meta:
        model = MenuList
        fields = '__all__'


class ScoffableSerializers(serializers.ModelSerializer):
    class Meta:
        model = ScoffableList
        fields = '__all__'

class DeliverooSerializers(serializers.ModelSerializer):
    class Meta:
        model = Deliveroo
        fields = '__all__'



class StraightfromSerializers(serializers.ModelSerializer):
    class Meta:
        model = Straightfrom
        fields = '__all__'



class KuickSerializers(serializers.ModelSerializer):
    class Meta:
        model = Kuick
        fields = '__all__'

        






class FastapiTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email

        return token