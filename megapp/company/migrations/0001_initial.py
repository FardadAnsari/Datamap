# Generated by Django 5.1.1 on 2024-11-08 10:49

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Foodhouse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('shop_name', models.CharField(blank=True, max_length=64, null=True)),
                ('latitude', models.CharField(blank=True, max_length=64, null=True)),
                ('longitude', models.CharField(blank=True, max_length=64, null=True)),
                ('address', models.CharField(blank=True, max_length=128, null=True)),
                ('region_state', models.CharField(blank=True, max_length=64, null=True)),
                ('postcode', models.CharField(blank=True, max_length=32, null=True)),
                ('phone', models.CharField(blank=True, max_length=64, null=True)),
                ('website', models.CharField(blank=True, max_length=128, null=True)),
                ('social_media', models.CharField(blank=True, max_length=256, null=True)),
                ('apps', models.CharField(blank=True, max_length=256, null=True)),
                ('map_url', models.CharField(blank=True, max_length=256, null=True)),
            ],
            options={
                'db_table': 'foodhouse',
            },
        ),
        migrations.CreateModel(
            name='Foodhub',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('shop_id', models.CharField(blank=True, max_length=25, null=True)),
                ('shop_name', models.CharField(blank=True, max_length=128, null=True)),
                ('latitude', models.CharField(blank=True, max_length=64, null=True)),
                ('longitude', models.CharField(blank=True, max_length=64, null=True)),
                ('country', models.CharField(blank=True, max_length=256, null=True)),
                ('region', models.CharField(blank=True, max_length=256, null=True)),
                ('city', models.CharField(blank=True, max_length=128, null=True)),
                ('street', models.CharField(blank=True, max_length=128, null=True)),
                ('number', models.CharField(blank=True, max_length=64, null=True)),
                ('town', models.CharField(blank=True, max_length=256, null=True)),
                ('region_state', models.CharField(blank=True, max_length=64, null=True)),
                ('postcode', models.CharField(blank=True, max_length=64, null=True)),
                ('phone', models.CharField(blank=True, max_length=64, null=True)),
                ('rating', models.CharField(blank=True, max_length=16, null=True)),
                ('total_reviews', models.CharField(blank=True, max_length=64, null=True)),
                ('cuisines', models.CharField(blank=True, max_length=256, null=True)),
                ('url', models.CharField(blank=True, max_length=128, null=True)),
                ('host', models.CharField(blank=True, max_length=128, null=True)),
                ('description', models.CharField(blank=True, max_length=1024, null=True)),
                ('opening_hours', models.CharField(blank=True, max_length=512, null=True)),
                ('review_categories', models.CharField(blank=True, max_length=256, null=True)),
                ('merchant_id', models.CharField(blank=True, max_length=32, null=True)),
                ('delivery_time', models.CharField(blank=True, max_length=32, null=True)),
                ('collection_time', models.CharField(blank=True, max_length=32, null=True)),
                ('facebook', models.CharField(blank=True, max_length=256, null=True)),
                ('twitter', models.CharField(blank=True, max_length=256, null=True)),
                ('android_link', models.CharField(blank=True, max_length=256, null=True)),
                ('title', models.CharField(blank=True, max_length=256, null=True)),
                ('keywords', models.CharField(blank=True, max_length=1024, null=True)),
                ('seo', models.CharField(blank=True, max_length=512, null=True)),
            ],
            options={
                'db_table': 'foodhub',
            },
        ),
        migrations.CreateModel(
            name='Justeat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('shop_id', models.CharField(max_length=16, unique=True)),
                ('shop_name', models.CharField(blank=True, max_length=32, null=True)),
                ('latitude', models.CharField(blank=True, max_length=32, null=True)),
                ('longitude', models.CharField(blank=True, max_length=32, null=True)),
                ('city', models.CharField(blank=True, max_length=16, null=True)),
                ('area', models.CharField(blank=True, max_length=32, null=True)),
                ('address', models.CharField(blank=True, max_length=64, null=True)),
                ('region_state', models.CharField(blank=True, max_length=64, null=True)),
                ('postcode', models.CharField(blank=True, max_length=32, null=True)),
                ('rating', models.CharField(blank=True, max_length=16, null=True)),
                ('total_reviews', models.CharField(blank=True, max_length=16, null=True)),
                ('cuisines', models.CharField(blank=True, max_length=256, null=True)),
                ('unique_name', models.CharField(blank=True, max_length=32, null=True)),
                ('is_new', models.CharField(blank=True, max_length=16, null=True)),
            ],
            options={
                'db_table': 'justeat',
            },
        ),
        migrations.CreateModel(
            name='UberEats',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('shop_id', models.CharField(blank=True, max_length=256, null=True)),
                ('shop_name', models.CharField(blank=True, max_length=100, null=True)),
                ('latitude', models.CharField(blank=True, max_length=64, null=True)),
                ('longitude', models.CharField(blank=True, max_length=64, null=True)),
                ('country', models.CharField(blank=True, max_length=16, null=True)),
                ('region', models.CharField(blank=True, max_length=64, null=True)),
                ('city_slug', models.CharField(blank=True, max_length=64, null=True)),
                ('city', models.CharField(blank=True, max_length=128, null=True)),
                ('address', models.CharField(blank=True, max_length=256, null=True)),
                ('street_address', models.CharField(blank=True, max_length=128, null=True)),
                ('region_state', models.CharField(blank=True, max_length=64, null=True)),
                ('postcode', models.CharField(blank=True, max_length=64, null=True)),
                ('phone', models.CharField(blank=True, max_length=64, null=True)),
                ('rating', models.CharField(blank=True, max_length=32, null=True)),
                ('total_reviews', models.CharField(blank=True, max_length=32, null=True)),
                ('cuisines', models.CharField(blank=True, max_length=256, null=True)),
                ('location_type', models.CharField(blank=True, max_length=64, null=True)),
                ('shop_name_unique', models.CharField(blank=True, max_length=128, null=True)),
            ],
            options={
                'db_table': 'ubereats',
            },
        ),
        migrations.CreateModel(
            name='WhatTheFork',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('shop_id', models.CharField(max_length=16, unique=True)),
                ('shop_name', models.CharField(blank=True, max_length=32, null=True)),
                ('latitude', models.CharField(blank=True, max_length=50, null=True)),
                ('longitude', models.CharField(blank=True, max_length=50, null=True)),
                ('country', models.CharField(blank=True, max_length=64, null=True)),
                ('region', models.CharField(blank=True, max_length=64, null=True)),
                ('city', models.CharField(blank=True, max_length=16, null=True)),
                ('notes', models.CharField(blank=True, max_length=255, null=True)),
                ('region_state', models.CharField(blank=True, max_length=64, null=True)),
                ('postcode', models.CharField(blank=True, max_length=16, null=True)),
                ('phone', models.CharField(blank=True, max_length=16, null=True)),
                ('rating', models.CharField(blank=True, max_length=16, null=True)),
                ('total_reviews', models.CharField(blank=True, max_length=16, null=True)),
                ('cuisines', models.CharField(blank=True, max_length=100, null=True)),
                ('url_map', models.CharField(blank=True, max_length=64, null=True)),
                ('map_preview_url', models.CharField(blank=True, max_length=64, null=True)),
                ('about_text', models.CharField(blank=True, max_length=255, null=True)),
                ('email', models.CharField(blank=True, max_length=32, null=True)),
                ('email_business', models.CharField(blank=True, max_length=32, null=True)),
                ('unique_name', models.CharField(blank=True, max_length=32, null=True)),
                ('instagram_url', models.CharField(blank=True, max_length=64, null=True)),
                ('facebook_url', models.CharField(blank=True, max_length=64, null=True)),
                ('twitter_url', models.CharField(blank=True, max_length=64, null=True)),
                ('google_play_link', models.CharField(blank=True, max_length=64, null=True)),
                ('app_store_link', models.CharField(blank=True, max_length=64, null=True)),
                ('description', models.CharField(blank=True, max_length=255, null=True)),
                ('main_text', models.CharField(blank=True, max_length=255, null=True)),
                ('opening_hours_readable', models.CharField(blank=True, max_length=100, null=True)),
                ('currency', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'db_table': 'whatthefork',
            },
        ),
    ]
