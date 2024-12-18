from django.db import models


class Foodhub(models.Model):
    shop_id = models.CharField(max_length=25, blank=True, null=True)
    shop_name = models.CharField(max_length=128, blank=True, null=True)
    latitude = models.CharField(max_length=64, blank=True, null=True)
    longitude = models.CharField(max_length=64, blank=True, null=True)
    country = models.CharField(max_length=256, blank=True, null=True)
    region = models.CharField(max_length=256, blank=True, null=True)
    city = models.CharField(max_length=128, blank=True, null=True)
    street = models.CharField(max_length=128, blank=True, null=True)
    number = models.CharField(max_length=64, blank=True, null=True)
    town = models.CharField(max_length=256, blank=True, null=True)
    region_state = models.CharField(max_length=64, blank=True, null=True)
    postcode = models.CharField(max_length=64, blank=True, null=True)
    phone = models.CharField(max_length=64, blank=True, null=True)
    rating = models.CharField(max_length=16, blank=True, null=True)
    total_reviews = models.CharField(max_length=64, blank=True, null=True)
    cuisines = models.CharField(max_length=256, blank=True, null=True)
    url = models.CharField(max_length=128, blank=True, null=True)
    host = models.CharField(max_length=128, blank=True, null=True)
    description = models.CharField(max_length=1024, blank=True, null=True)
    opening_hours = models.CharField(max_length=512, blank=True, null=True)
    review_categories = models.CharField(max_length=256, blank=True, null=True)
    merchant_id = models.CharField(max_length=32, blank=True, null=True)
    delivery_time = models.CharField(max_length=32, blank=True, null=True)
    collection_time = models.CharField(max_length=32, blank=True, null=True)
    facebook = models.CharField(max_length=256, blank=True, null=True)
    twitter = models.CharField(max_length=256, blank=True, null=True)
    android_link  = models.CharField(max_length=256, blank=True, null=True)
    title = models.CharField(max_length=256, blank=True, null=True)
    keywords = models.CharField(max_length=1024, blank=True, null=True)
    seo = models.CharField(max_length=512, blank=True, null=True)


    class Meta:
        db_table = 'foodhub'

    def __str__(self):
        return self.shop_name


class Justeat(models.Model):
    shop_id = models.CharField(max_length=16, unique=True)
    shop_name = models.CharField(max_length=32, blank=True, null=True)
    latitude = models.CharField(max_length=32, blank=True, null=True)
    longitude = models.CharField(max_length=32, blank=True, null=True)
    city = models.CharField(max_length=16, blank=True, null=True)
    area = models.CharField(max_length=32, blank=True, null=True)
    address = models.CharField(max_length=64, blank=True, null=True)
    region_state = models.CharField(max_length=64, blank=True, null=True)
    postcode = models.CharField(max_length=32, blank=True, null=True)
    rating = models.CharField(max_length=16, blank=True, null=True)
    total_reviews = models.CharField(max_length=16, blank=True, null=True)
    cuisines = models.CharField(max_length=256, blank=True, null=True)
    unique_name = models.CharField(max_length=32, blank=True, null=True)
    is_new = models.CharField(max_length=16, blank=True, null=True)

    class Meta:
        db_table = 'justeat'



class WhatTheFork(models.Model):
    shop_id = models.CharField(max_length=16, unique=True)
    shop_name = models.CharField(max_length=32, blank=True, null=True)
    latitude = models.CharField(max_length=50, blank=True, null=True)
    longitude = models.CharField(max_length=50, blank=True, null=True)
    country = models.CharField(max_length=64, blank=True, null=True)
    region = models.CharField(max_length=64, blank=True, null=True)
    city = models.CharField(max_length=16, blank=True, null=True)
    notes = models.CharField(max_length=255, blank=True, null=True)
    region_state = models.CharField(max_length=64, blank=True, null=True)
    postcode = models.CharField(max_length=16, blank=True, null=True)
    phone  = models.CharField(max_length=16, blank=True, null=True)
    rating = models.CharField(max_length=16, blank=True, null=True)
    total_reviews = models.CharField(max_length=16, blank=True, null=True)
    cuisines = models.CharField(max_length=100, blank=True, null=True)
    url_map = models.CharField(max_length=64, blank=True, null=True)
    map_preview_url = models.CharField(max_length=64, blank=True, null=True)
    about_text = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=32, blank=True, null=True)
    email_business = models.CharField(max_length=32, blank=True, null=True)
    unique_name = models.CharField(max_length=32, blank=True, null=True)
    instagram_url = models.CharField(max_length=64, blank=True, null=True)
    facebook_url = models.CharField(max_length=64, blank=True, null=True)
    twitter_url = models.CharField(max_length=64, blank=True, null=True)
    google_play_link = models.CharField(max_length=64, blank=True, null=True)
    app_store_link = models.CharField(max_length=64, blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    main_text = models.CharField(max_length=255, blank=True, null=True)
    opening_hours_readable = models.CharField(max_length=100, blank=True, null=True)
    currency = models.CharField(max_length=50, blank=True, null=True)
    class Meta:
        db_table = 'whatthefork'



class UberEats(models.Model):
    shop_id = models.CharField(max_length=256, blank=True, null=True)
    shop_name = models.CharField(max_length=100, blank=True, null=True)
    latitude = models.CharField(max_length=64, blank=True, null=True)
    longitude = models.CharField(max_length=64, blank=True, null=True)
    country  = models.CharField(max_length=16, blank=True, null=True)
    region = models.CharField(max_length=64, blank=True, null=True)
    city_slug = models.CharField(max_length=64, blank=True, null=True)
    city = models.CharField(max_length=128, blank=True, null=True)
    address = models.CharField(max_length=256, blank=True, null=True)
    street_address = models.CharField(max_length=128, blank=True, null=True)
    region_state = models.CharField(max_length=64, blank=True, null=True)
    postcode = models.CharField(max_length=64, blank=True, null=True)
    phone = models.CharField(max_length=64, blank=True, null=True)
    rating = models.CharField(max_length=32, blank=True, null=True)
    total_reviews = models.CharField(max_length=32, blank=True, null=True)
    cuisines = models.CharField(max_length=256, blank=True, null=True)
    location_type = models.CharField(max_length=64, blank=True, null=True)
    shop_name_unique = models.CharField(max_length=128, blank=True, null=True)
    class Meta:
        db_table = 'ubereats'

    def __str__(self):
        return self.shop_name if self.shop_name else f'Shop {self.shop_id}'


class Foodhouse(models.Model):
    shop_name = models.CharField(max_length=64, blank=True, null=True)
    latitude = models.CharField(max_length=64, blank=True, null=True)
    longitude = models.CharField(max_length=64, blank=True, null=True)
    address = models.CharField(max_length=128, blank=True, null=True)
    region_state = models.CharField(max_length=64, blank=True, null=True)
    postcode = models.CharField(max_length=32, blank=True, null=True)
    phone = models.CharField(max_length=64, blank=True, null=True)
    website = models.CharField(max_length=128, blank=True, null=True)
    social_media = models.CharField(max_length=256, blank=True, null=True)
    apps = models.CharField(max_length=256, blank=True, null=True)
    map_url = models.CharField(max_length=256, blank=True, null=True)


    class Meta:
        db_table = 'foodhouse'

    def __str__(self):
        return self.shop_name



class MenuList(models.Model):
    shop_id = models.CharField(max_length=64)
    shop_name = models.CharField(max_length=256, blank=True, null=True)
    latitude = models.CharField(max_length=32, blank=True, null=True)
    longitude = models.CharField(max_length=32, blank=True, null=True)
    city = models.CharField(max_length=128, blank=True, null=True)
    rating = models.CharField(max_length=32, blank=True, null=True)
    total_reviews = models.CharField(max_length=32, blank=True, null=True)
    cuisines = models.CharField(max_length=512, blank=True, null=True)
    url = models.CharField(max_length=512, blank=True, null=True)
    social_media = models.CharField(max_length=512, blank=True, null=True)
    description = models.CharField(max_length=512, blank=True, null=True)
    address = models.CharField(max_length=512, blank=True, null=True)
    phone = models.CharField(max_length=256, blank=True, null=True)

    class Meta:
        db_table = 'menulist'

    def __str__(self):
        return self.shop_name








class ScoffableList(models.Model):
    #shop_name = models.CharField(max_length=256, blank=True, null=True)
    shop_name = models.CharField(max_length=256)
    latitude = models.CharField(max_length=64, blank=True, null=True)
    longitude = models.CharField(max_length=64, blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    street = models.CharField(max_length=255, blank=True, null=True)
    postcode = models.CharField(max_length=64, blank=True, null=True)
    rating = models.CharField(max_length=64, blank=True, null=True)
    rating_percent = models.CharField(max_length=64, blank=True, null=True)
    total_reviews = models.CharField(max_length=64, blank=True, null=True)
    cuisines = models.CharField(max_length=256, blank=True, null=True)
    url = models.CharField(max_length=512, blank=True, null=True)
    title = models.CharField(max_length=512, blank=True, null=True)
    description = models.CharField(max_length=1024, blank=True, null=True)
    #rating = models.FloatField(blank=True, null=True)
    address = models.CharField(max_length=256, blank=True, null=True)


    class Meta:
        db_table = 'scoffable'


    def __str__(self):
        return self.shop_name




class Deliveroo(models.Model):
    shop_id = models.CharField(max_length=16, blank=True, null=True)
    shop_name = models.CharField(max_length=256, blank=True, null=True)
    latitude = models.CharField(max_length=128, blank=True, null=True)
    longitude = models.CharField(max_length=128, blank=True, null=True)
    address = models.CharField(max_length=512, blank=True, null=True)
    city = models.CharField(max_length=64, blank=True, null=True)
    postcode = models.CharField(max_length=32, blank=True, null=True)
    phone = models.CharField(max_length=128, blank=True, null=True)
    rating = models.CharField(max_length=16, blank=True, null=True)
    total_reviews = models.CharField(max_length=16, blank=True, null=True)
    cuisines = models.CharField(max_length=510, blank=True, null=True)
    url = models.CharField(max_length=512, blank=True, null=True)
    map_url = models.CharField(max_length=512, blank=True, null=True)

    class Meta:
        db_table = 'deliveroo'

    def __str__(self):
        return self.shop_name


class Straightfrom(models.Model):
    shop_id = models.CharField(unique=True, max_length=64)
    shop_name = models.CharField(max_length=256, blank=True, null=True)
    latitude = models.CharField(max_length=128, blank=True, null=True)
    longitude = models.CharField(max_length=128, blank=True, null=True)
    country = models.CharField(max_length=128, blank=True, null=True)
    region = models.CharField(max_length=128, blank=True, null=True)
    city = models.CharField(max_length=128, blank=True, null=True)
    street = models.CharField(max_length=256, blank=True, null=True)
    postcode = models.CharField(max_length=128, blank=True, null=True)
    phone = models.CharField(max_length=128, blank=True, null=True)
    rating = models.CharField(max_length=64, blank=True, null=True)
    total_reviews = models.CharField(max_length=64, blank=True, null=True)
    cuisines = models.CharField(max_length=512, blank=True, null=True)
    created_at = models.CharField(max_length=128, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'straightfrom'

    def str(self):
        return self.shop_name


class Kuick(models.Model):
    shop_id = models.CharField(max_length=32)
    shop_name = models.CharField(max_length=256, blank=True, null=True)
    latitude = models.CharField(max_length=64, blank=True, null=True)
    longitude = models.CharField(max_length=64, blank=True, null=True)
    country = models.CharField(max_length=128, blank=True, null=True)
    city = models.CharField(max_length=128, blank=True, null=True)
    address = models.CharField(max_length=512, blank=True, null=True)
    postcode = models.CharField(max_length=32, blank=True, null=True)
    phone = models.CharField(max_length=64, blank=True, null=True)
    rating = models.CharField(max_length=32, blank=True, null=True)
    total_reviews = models.CharField(max_length=32, blank=True, null=True)
    keywords = models.CharField(max_length=1024, blank=True, null=True)
    description = models.CharField(max_length=512, blank=True, null=True)
    website = models.CharField(max_length=128, blank=True, null=True)
    apps = models.CharField(max_length=512, blank=True, null=True)
    seo_name = models.CharField(max_length=512, blank=True, null=True)

    class Meta:
        db_table = 'kuick'

    def __str__(self):
        return self.shop_name
 
