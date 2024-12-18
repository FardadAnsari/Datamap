from django.db import models

# Create your models here.


class Account(models.Model):
    account_id = models.CharField(max_length=255, null=True, unique=True)
    account_name = models.CharField(max_length=255, null=True)

    class Meta:
        db_table = 'Account'


class BusinessInformation(models.Model):
    account_name = models.CharField(max_length=255, null=True)
    name = models.CharField(max_length=255, null=True)
    title = models.CharField(max_length=255, null=True)
    phone = models.CharField(max_length=255, null=True)
    url = models.CharField(max_length=255, null=True)
    address = models.CharField(max_length=255, null=True)
    city = models.CharField(max_length=255, null=True)
    duplicated = models.CharField(max_length=255, null=True)
    sunday = models.TextField(null=True)
    monday = models.TextField(null=True)
    tuesday = models.TextField(null=True)
    wednesday = models.TextField(null=True)
    thursday = models.TextField(null=True)
    friday = models.TextField(null=True)
    saturday = models.TextField(null=True)
    latitude = models.FloatField(null=True)
    longitude = models.FloatField(null=True)
    account_id = models.CharField(max_length=255, null=True)
    postcode = models.CharField(null=True, max_length=7)

    class Meta:
        db_table = 'business_information'  # Define the database table name
        indexes = [
            models.Index(fields=['account_id']),
        ]
