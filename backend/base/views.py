from django.shortcuts import render
from .products import products

from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def getRoutes(request):
    return Response("hello")


@api_view(['GET'])
def getProducts(request):
    return Response(products)

@api_view(['GET'])
def getProduct(request, pk):
    product = None
    for p in products:
        if p["_id"] == pk:
            product = p
            break
    return Response(product)