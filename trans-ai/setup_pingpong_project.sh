#!/bin/bash

# Exit on error
set -e

# Create project directory
mkdir pingpong_project
cd pingpong_project

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install Django
pip install django

# Create Django project
django-admin startproject pingpong_project .

# Create Django app
python manage.py startapp game

# Create necessary directories
mkdir -p game/static/css game/static/js game/templates/game

# Create necessary files
touch game/static/css/style.css
touch game/static/js/game.js
touch game/static/js/tournament.js
touch game/templates/game/index.html
touch game/templates/game/play.html
touch game/templates/game/tournament.html

# Update pingpong_project/settings.py
sed -i "s/INSTALLED_APPS = \[/INSTALLED_APPS = [\n    'game',/" pingpong_project/settings.py

# Update pingpong_project/urls.py
echo "from django.urls import path, include

urlpatterns = [
    path('', include('game.urls')),
]" > pingpong_project/urls.py

# Create game/urls.py
echo "from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('play/', views.play, name='play'),
    path('tournament/', views.tournament, name='tournament'),
]" > game/urls.py

# Update game/views.py
echo "from django.shortcuts import render

def index(request):
    return render(request, 'game/index.html')

def play(request):
    return render(request, 'game/play.html')

def tournament(request):
    return render(request, 'game/tournament.html')
" > game/views.py

echo "Project setup complete. Activate the virtual environment with:"
echo "source venv/bin/activate"
echo "Then run the server with:"
echo "python manage.py runserver"