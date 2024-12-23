# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AccountsUser(models.Model):
    id = models.BigAutoField(primary_key=True)
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    username = models.CharField(unique=True, max_length=50)
    email = models.CharField(unique=True, max_length=255)
    is_active = models.IntegerField()
    is_admin = models.IntegerField()
    is_superuser = models.IntegerField()
    is_developer = models.IntegerField()
    is_marketing = models.IntegerField()
    is_support = models.IntegerField()
    is_onboarding = models.IntegerField()
    is_management = models.IntegerField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    full_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'accounts_user'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class CaptchaCaptchastore(models.Model):
    challenge = models.CharField(max_length=32)
    response = models.CharField(max_length=32)
    hashkey = models.CharField(unique=True, max_length=40)
    expiration = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'captcha_captchastore'


class Cuisine(models.Model):
    cuisine_name = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cuisine'


class Deliveroo(models.Model):
    shop_id = models.CharField(unique=True, max_length=16, blank=True, null=True)
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
        managed = False
        db_table = 'deliveroo'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AccountsUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Foodhouse(models.Model):
    id = models.IntegerField(db_column='ID', primary_key=True)  # Field name made lowercase.
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
        managed = False
        db_table = 'foodhouse'


class Foodhub(models.Model):
    shop_id = models.CharField(max_length=25)
    shop_name = models.CharField(max_length=128)
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
    total_reviews = models.CharField(max_length=16, blank=True, null=True)
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
    android_link = models.CharField(max_length=256, blank=True, null=True)
    title = models.CharField(max_length=256, blank=True, null=True)
    keywords = models.CharField(max_length=1024, blank=True, null=True)
    seo = models.CharField(max_length=512, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'foodhub'


class Justeat(models.Model):
    id = models.IntegerField(primary_key=True)
    shop_id = models.CharField(unique=True, max_length=16)
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
        managed = False
        db_table = 'justeat'


class Kuick(models.Model):
    shop_id = models.CharField(unique=True, max_length=32)
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
        managed = False
        db_table = 'kuick'


class Menulist(models.Model):
    shop_id = models.CharField(unique=True, max_length=64)
    shop_name = models.CharField(max_length=256, blank=True, null=True)
    latitude = models.CharField(max_length=32, blank=True, null=True)
    longitude = models.CharField(max_length=32, blank=True, null=True)
    city = models.CharField(max_length=128, blank=True, null=True)
    address = models.CharField(max_length=512, blank=True, null=True)
    phone = models.CharField(max_length=256, blank=True, null=True)
    rating = models.CharField(max_length=32, blank=True, null=True)
    total_reviews = models.CharField(max_length=32, blank=True, null=True)
    cuisines = models.CharField(max_length=512, blank=True, null=True)
    url = models.CharField(max_length=512, blank=True, null=True)
    website = models.CharField(max_length=256, blank=True, null=True)
    social_media = models.CharField(max_length=512, blank=True, null=True)
    description = models.CharField(max_length=512, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'menulist'


class Scoffable(models.Model):
    shop_name = models.CharField(max_length=256)
    latitude = models.CharField(max_length=64, blank=True, null=True)
    longitude = models.CharField(max_length=64, blank=True, null=True)
    city = models.CharField(max_length=256, blank=True, null=True)
    street = models.CharField(max_length=256, blank=True, null=True)
    postcode = models.CharField(max_length=64, blank=True, null=True)
    rating_percent = models.CharField(max_length=64, blank=True, null=True)
    total_reviews = models.CharField(max_length=64, blank=True, null=True)
    cuisines = models.CharField(max_length=512, blank=True, null=True)
    url = models.CharField(max_length=256, blank=True, null=True)
    title = models.CharField(max_length=512, blank=True, null=True)
    description = models.CharField(max_length=1024, blank=True, null=True)
    rating = models.FloatField(blank=True, null=True)
    address = models.CharField(max_length=256, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'scoffable'


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


class Ubereats(models.Model):
    shop_id = models.CharField(unique=True, max_length=256, blank=True, null=True)
    shop_name = models.CharField(max_length=100, blank=True, null=True)
    latitude = models.CharField(max_length=64, blank=True, null=True)
    longitude = models.CharField(max_length=64, blank=True, null=True)
    country = models.CharField(max_length=16, blank=True, null=True)
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
    cuisines = models.CharField(max_length=512, blank=True, null=True)
    location_type = models.CharField(max_length=64, blank=True, null=True)
    shop_name_unique = models.CharField(max_length=128, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ubereats'


class Whatthefork(models.Model):
    id = models.IntegerField(db_column='ID', primary_key=True)  # Field name made lowercase.
    shop_id = models.CharField(max_length=16, blank=True, null=True)
    shop_name = models.CharField(max_length=32, blank=True, null=True)
    latitude = models.CharField(max_length=50, blank=True, null=True)
    longitude = models.CharField(max_length=50, blank=True, null=True)
    country = models.CharField(max_length=64, blank=True, null=True)
    region = models.CharField(max_length=64, blank=True, null=True)
    city = models.CharField(max_length=16, blank=True, null=True)
    notes = models.CharField(max_length=255, blank=True, null=True)
    region_state = models.CharField(max_length=64, blank=True, null=True)
    postcode = models.CharField(max_length=16, blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
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
        managed = False
        db_table = 'whatthefork'
