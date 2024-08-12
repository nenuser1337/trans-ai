from django.shortcuts import render, redirect
from django.http import JsonResponse
import random

tournament_data = {
    'players': [],
    'matches': [],
    'current_match': None,
    'match_order': [],
    'results': {}
}

def index(request):
    return render(request, 'game/index.html')

def play(request):
    return render(request, 'game/play.html', {'tournament_data': tournament_data})

def tournament(request):
    return render(request, 'game/tournament.html', {'tournament_data': tournament_data})

def add_player(request):
    player = request.GET.get('name')
    if player and player not in tournament_data['players']:
        tournament_data['players'].append(player)
    return JsonResponse(tournament_data)

def start_tournament(request):
    players = tournament_data['players']
    random.shuffle(players)
    tournament_data['matches'] = [(players[i], players[i+1]) for i in range(0, len(players)-1, 2)]
    tournament_data['match_order'] = tournament_data['matches'].copy()
    tournament_data['current_match'] = tournament_data['matches'].pop(0) if tournament_data['matches'] else None
    tournament_data['results'] = {player: 0 for player in players}
    return JsonResponse(tournament_data)

def update_score(request):
    winner = request.GET.get('winner')
    if winner and tournament_data['current_match']:
        if winner not in tournament_data['current_match']:
            return JsonResponse({'error': 'Invalid winner'}, status=400)
        tournament_data['results'][winner] += 1
        tournament_data['current_match'] = tournament_data['matches'].pop(0) if tournament_data['matches'] else None
    return JsonResponse(tournament_data)

def get_tournament_status(request):
    return JsonResponse(tournament_data)

def reset_tournament(request):
    global tournament_data
    tournament_data = {
        'players': [],
        'matches': [],
        'current_match': None,
        'match_order': [],
        'results': {}
    }
    return JsonResponse(tournament_data)