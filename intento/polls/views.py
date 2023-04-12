from django.shortcuts import render
from .chat import get_response
from django.http import JsonResponse


def index(request):
    if request.method== 'POST':
       input_usuario = request.POST.get('input_usuario')
       resultado = get_response(input_usuario)
       return JsonResponse({'input_usuario': input_usuario, 'resultado': resultado})
    return render(request, 'index.html')