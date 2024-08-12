from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('play/', views.play, name='play'),
    path('tournament/', views.tournament, name='tournament'),
    path('add_player/', views.add_player, name='add_player'),
    path('start_tournament/', views.start_tournament, name='start_tournament'),
    path('update_score/', views.update_score, name='update_score'),
    path('get_tournament_status/', views.get_tournament_status, name='get_tournament_status'),
    path('reset_tournament/', views.reset_tournament, name='reset_tournament'),
]