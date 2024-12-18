
from django import forms
from .models import Foodhouse, Foodhub, UberEats, Justeat, WhatTheFork

class FoodhouseCraeteForm(forms.ModelForm):
    class Meta:
        model = Foodhouse
        fields = '__all__'
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'url': forms.TextInput(attrs={'class': 'form-control'}),
            'city' : forms.TextInput(attrs={'class': 'form-control'}),
            'address' : forms.TextInput(attrs={'class': 'form-control'}),
            'postcode' : forms.TextInput(attrs={'class': 'form-control'}),
            'phone' : forms.TextInput(attrs={'class': 'form-control'}),
            'social_media' : forms.TextInput(attrs={'class': 'form-control'}),
            'apps' : forms.TextInput(attrs={'class': 'form-control'}),
        }


class FoodhubCraeteForm(forms.ModelForm):
    class Meta:
        model = Foodhub
        fields = '__all__'
        
        widgets = {

            'foodhub_id': forms.TextInput(attrs={'class': 'form-control'}),
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'description' : forms.TextInput(attrs={'class': 'form-control'}),
            'phone' : forms.TextInput(attrs={'class': 'form-control'}),
            'host': forms.TextInput(attrs={'class': 'form-control'}),
            'url': forms.TextInput(attrs={'class': 'form-control'}),
            'country' : forms.TextInput(attrs={'class': 'form-control'}),
            'region' : forms.TextInput(attrs={'class': 'form-control'}),
            'city': forms.TextInput(attrs={'class': 'form-control'}),
            'street': forms.TextInput(attrs={'class': 'form-control'}),
            'number' : forms.TextInput(attrs={'class': 'form-control'}),
            'postcode' : forms.TextInput(attrs={'class': 'form-control'}),
            'Latitude': forms.TextInput(attrs={'class': 'form-control'}),
            'Longitude': forms.TextInput(attrs={'class': 'form-control'}),
            'rating' : forms.TextInput(attrs={'class': 'form-control'}),
            'total_reviews' : forms.TextInput(attrs={'class': 'form-control'}),
            'opening_hours' : forms.TextInput(attrs={'class': 'form-control'}),
            'review_categories' : forms.TextInput(attrs={'class': 'form-control'}),
            'cuisines': forms.TextInput(attrs={'class': 'form-control'}),
            'merchant_id': forms.TextInput(attrs={'class': 'form-control'}),
            'delivery_time' : forms.TextInput(attrs={'class': 'form-control'}),
            'collection_time' : forms.TextInput(attrs={'class': 'form-control'}),
            'town' : forms.TextInput(attrs={'class': 'form-control'}),
            'facebook' : forms.TextInput(attrs={'class': 'form-control'}),
            'twitter' : forms.TextInput(attrs={'class': 'form-control'}),
            'android_link' : forms.TextInput(attrs={'class': 'form-control'}),
            'title' : forms.TextInput(attrs={'class': 'form-control'}),
            'keywords' : forms.Textarea(attrs={'class': 'form-control'}),
            'seo' : forms.Textarea(attrs={'class': 'form-control'}),
            
        }


class UberEatsCraeteForm(forms.ModelForm):
    class Meta:
        model = UberEats
        fields = '__all__'
        
        widgets = {
            'shop_id': forms.TextInput(attrs={'class': 'form-control'}),
            'shop_url': forms.TextInput(attrs={'class': 'form-control'}),
            'name' : forms.TextInput(attrs={'class': 'form-control'}),
            'rating' : forms.TextInput(attrs={'class': 'form-control'}),
            'Latitude' : forms.TextInput(attrs={'class': 'form-control'}),
            'Longitude' : forms.TextInput(attrs={'class': 'form-control'}),
        }
        


class JusteatCraeteForm(forms.ModelForm):
    class Meta:
        model = Justeat
        fields = '__all__'
        
        widgets = {
            'shop_id': forms.TextInput(attrs={'class': 'form-control'}),
            'name' : forms.TextInput(attrs={'class': 'form-control'}),
            'uniqueName' : forms.TextInput(attrs={'class': 'form-control'}),
            'city' : forms.TextInput(attrs={'class': 'form-control'}),
            'area' : forms.TextInput(attrs={'class': 'form-control'}),
            'address' : forms.TextInput(attrs={'class': 'form-control'}),
            'postcode' : forms.TextInput(attrs={'class': 'form-control'}),
            'lng' : forms.TextInput(attrs={'class': 'form-control'}),
            'lat' : forms.TextInput(attrs={'class': 'form-control'}),
            'rating' : forms.TextInput(attrs={'class': 'form-control'}),
            'starRating' : forms.TextInput(attrs={'class': 'form-control'}),
            'isNew' : forms.TextInput(attrs={'class': 'form-control'}),
            'openingTimeLocal' : forms.TextInput(attrs={'class': 'form-control'}),
            'cuisines' : forms.TextInput(attrs={'class': 'form-control'}),
            'deliveryFees' : forms.TextInput(attrs={'class': 'form-control'}),
        }
        
class WhatTheForkCraeteForm(forms.ModelForm):
    class Meta:
        model = WhatTheFork
        fields = '__all__'
        
        widgets = {
            'shop_id': forms.TextInput(attrs={'class': 'form-control'}),
            'name' : forms.TextInput(attrs={'class': 'form-control'}),
            'uniqueName' : forms.TextInput(attrs={'class': 'form-control'}),
            'url_map' : forms.TextInput(attrs={'class': 'form-control'}),
            'map_preview_url' : forms.TextInput(attrs={'class': 'form-control'}),
            'about_text' : forms.TextInput(attrs={'class': 'form-control'}),
            'email_business' : forms.TextInput(attrs={'class': 'form-control'}),
            'email' : forms.TextInput(attrs={'class': 'form-control'}),
            'instagram_url' : forms.TextInput(attrs={'class': 'form-control'}),
            'facebook_url' : forms.TextInput(attrs={'class': 'form-control'}),
            'twitter_url' : forms.TextInput(attrs={'class': 'form-control'}),
            'google_play_link' : forms.TextInput(attrs={'class': 'form-control'}),
            'app_store_link' : forms.TextInput(attrs={'class': 'form-control'}),
            'description' : forms.TextInput(attrs={'class': 'form-control'}),
            'main_text' : forms.TextInput(attrs={'class': 'form-control'}),
            'telephone' : forms.TextInput(attrs={'class': 'form-control'}),
            'openingHoursReadable' : forms.TextInput(attrs={'class': 'form-control'}),
            'categories' : forms.TextInput(attrs={'class': 'form-control'}),
            'country' : forms.TextInput(attrs={'class': 'form-control'}),
            'region' : forms.TextInput(attrs={'class': 'form-control'}),
            'city' : forms.TextInput(attrs={'class': 'form-control'}),
            'postcode' : forms.TextInput(attrs={'class': 'form-control'}),
            'lat' : forms.TextInput(attrs={'class': 'form-control'}),
            'lng' : forms.TextInput(attrs={'class': 'form-control'}),
            'notes' : forms.TextInput(attrs={'class': 'form-control'}),
            'currency' : forms.TextInput(attrs={'class': 'form-control'}),
            'rating_count' : forms.TextInput(attrs={'class': 'form-control'}),
            'rating_average' : forms.TextInput(attrs={'class': 'form-control'}),
        }


