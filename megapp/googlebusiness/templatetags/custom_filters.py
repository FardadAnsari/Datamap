# my_app/templatetags/custom_filters.py
from django import template

register = template.Library()

@register.filter
def hours_range(_):
    return range(24)

@register.filter
def minutes_range(_):
    return [0, 30]
