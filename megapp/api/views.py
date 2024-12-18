from rest_framework.generics import ListAPIView
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
from .serializers import (
    FoothubSerializers,
    JusteatSerializers,
    WsSerializers,
    UberEatsSerializers,
    FoodhouseSerializers,
    MenuListSerializers,
    ScoffableSerializers,
    DeliverooSerializers,
    StraightfromSerializers,
    KuickSerializers,
)

from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import FastapiTokenSerializer

# Create your views here.


class FoothubApiView(ListAPIView):
    queryset = Foodhub.objects.all()
    serializer_class = FoothubSerializers

    permission_classes = [IsAuthenticated]



class JusteatApiView(ListAPIView):
    queryset = Justeat.objects.all()
    serializer_class = JusteatSerializers
    permission_classes = [IsAuthenticated]


class FoodhouseApiView(ListAPIView):
    queryset = Foodhouse.objects.all()
    serializer_class = FoodhouseSerializers
    permission_classes = [IsAuthenticated]



class UberEatsApiView(ListAPIView):
    queryset = UberEats.objects.all()
    serializer_class = UberEatsSerializers
    permission_classes = [IsAuthenticated]


class WsApiView(ListAPIView):
    queryset = WhatTheFork.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = WsSerializers



class MenuListApiView(ListAPIView):
    queryset = MenuList.objects.all()
    serializer_class = MenuListSerializers
    permission_classes = [IsAuthenticated]


class ScoffableApiView(ListAPIView):
    queryset = ScoffableList.objects.all()
    serializer_class = ScoffableSerializers
    permission_classes = [IsAuthenticated]

class DeliverooApiView(ListAPIView):
    queryset = Deliveroo.objects.all()
    serializer_class = DeliverooSerializers
    permission_classes = [IsAuthenticated]


class KuickApiView(ListAPIView):
    queryset = Kuick.objects.all()
    serializer_class = KuickSerializers
    permission_classes = [IsAuthenticated]


class StraightfromApiView(ListAPIView):
    queryset = Straightfrom.objects.all()
    serializer_class = StraightfromSerializers
    permission_classes = [IsAuthenticated]



class FastApiTokenView(TokenObtainPairView):
    serializer_class = FastapiTokenSerializer


