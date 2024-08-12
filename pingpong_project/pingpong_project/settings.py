# Add 'game' to INSTALLED_APPS
INSTALLED_APPS = [
    'django.contrib.staticfiles',
    'game',
]

# Make sure these settings are present
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'