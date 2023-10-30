from django.shortcuts import render
from django.http import HttpResponse
from .products import products

def getRoutes(request):
    
    return HttpResponse("hello")


def getProducts(request):
    return HttpResponse(products)