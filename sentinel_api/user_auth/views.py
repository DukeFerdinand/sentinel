import json

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpRequest,Http404
from utils.results import Result

from .models import User

# Create your views here.

def index(request):
    return  JsonResponse(data={ "content": 'Hello, world. You\'re at the user_auth index.' })

def create_user(request: HttpRequest):
    if request.method == 'POST':
        test = request.body
        if test == None:
            print(Result(False, 'Request.body is None. Cannot create user'))
            return 'oops'
        else:
            print(Result(True, test))
            return JsonResponse(data=test)
    else:
        raise Http404()