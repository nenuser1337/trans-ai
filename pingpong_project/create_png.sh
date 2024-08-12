#!/bin/bash

# Create the main project directory
mkdir -p pingpong_project

# Navigate to the project directory
cd pingpong_project

# Create Django project directories and files
mkdir -p pingpong_project
touch pingpong_project/__init__.py
touch pingpong_project/settings.py
touch pingpong_project/urls.py
touch pingpong_project/wsgi.py

# Create the 'game' app directories and files
mkdir -p game/static/css
mkdir -p game/static/js
mkdir -p game/templates/game
touch game/__init__.py
touch game/views.py
touch game/urls.py
touch game/static/css/style.css
touch game/static/js/game.js
touch game/templates/game/index.html
touch game/templates/game/play.html
touch game/templates/game/tournament.html

# Create the Django manage.py file
touch manage.py

# Populate the settings.py file
cat <<EOL > pingpong_project/settings.py
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'your-secret-key'

DEBUG = True

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.staticfiles',
    'game',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions
