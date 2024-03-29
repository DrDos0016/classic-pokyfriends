from django.template import Template, Context, Library
from django.template.defaultfilters import stringfilter

register = Library()

@register.filter
@stringfilter
def as_template(raw):
    raw = "{% load staticfiles %}\n{% load zzt_tags %}"+raw
    return Template(raw).render(Context())