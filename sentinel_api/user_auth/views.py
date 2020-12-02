import json

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

# Create your views here.

def index(request):
    return  JsonResponse(data={ "content": 'Hello, world. You\'re at the user_auth index.' })