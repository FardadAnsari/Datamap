# Generated by Django 5.1.1 on 2024-11-26 13:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0002_menulist'),
    ]

    operations = [
        migrations.CreateModel(
            name='ScoffableList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('shop_name', models.CharField(blank=True, max_length=256, null=True)),
                ('latitude', models.CharField(blank=True, max_length=64, null=True)),
                ('longitude', models.CharField(blank=True, max_length=64, null=True)),
                ('city', models.CharField(blank=True, max_length=255, null=True)),
                ('street', models.CharField(blank=True, max_length=255, null=True)),
                ('postcode', models.CharField(blank=True, max_length=64, null=True)),
                ('rating', models.CharField(blank=True, max_length=64, null=True)),
                ('total_reviews', models.CharField(blank=True, max_length=64, null=True)),
                ('cuisines', models.CharField(blank=True, max_length=256, null=True)),
                ('url', models.CharField(blank=True, max_length=512, null=True)),
                ('title', models.CharField(blank=True, max_length=512, null=True)),
                ('description', models.CharField(blank=True, max_length=1024, null=True)),
            ],
            options={
                'db_table': 'scoffable',
            },
        ),
    ]
