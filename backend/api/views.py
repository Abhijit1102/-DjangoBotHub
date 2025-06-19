import json
from pathlib import Path
from django.http import JsonResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


@api_view(['GET'])
@renderer_classes([JSONRenderer]) 
def health_check_view(request):
    return Response({'status': 'ok'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
def home_view(request):
    json_path = Path(__file__).resolve().parent / 'data' / 'home.json'
    
    try:
        with open(json_path, 'r') as file:
            data = json.load(file)
        return JsonResponse(data, safe=False)
    except FileNotFoundError:
        return JsonResponse({'error': 'home.json file not found'}, status=404)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON format in home.json'}, status=500)



@api_view(['POST'])
def signup_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already taken'}, status=status.HTTP_400_BAD_REQUEST)
    user = User.objects.create_user(username=username, password=password, email=email)
    return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    return Response({'message': f'Welcome {request.user.username}'})
