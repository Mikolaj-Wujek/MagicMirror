from flask import Flask, render_template, session, redirect, url_for, g, request, jsonify
from database import get_db, close_db
from flask_session import Session
from functools import wraps
from dotenv import load_dotenv
from datetime import datetime
import requests
import os
import json

# from google_auth_oauthlib.flow import Flow
# from googleapiclient.discovery import build
# from google.oauth2.credentials import Credentials

load_dotenv()
api_key = os.getenv("OPENWEATHER_API_KEY")

app = Flask(__name__)

@app.route('/', methods = ['GET','POST'])
def index():
    
    weather = getWeather()

    now = datetime.now()
    clock = {
        'time': now.strftime('%H:%M:%S')
    }

    spotify = {
        'track': 'Blinding Lights',
        'artist': 'The Weeknd',
        'duration': '3:20',
        'is_playing': False
    }

    return render_template('base.html',weather=weather,clock=clock,spotify=spotify)

def getWeather(location='Cork'):
    api_key = os.getenv('OPENWEATHER_API_KEY')
    url = f"http://api.openweathermap.org/data/2.5/weather?q={location}&appid={api_key}&units=metric"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        weather_icon = data['weather'][0]['icon']
        icon_url = f"https://openweathermap.org/img/wn/{weather_icon}.png"  


        return {
            'location': data['name'],
            'temp': round(data['main']['temp']),
            'description': data['weather'][0]['description'].capitalize(),
            'icon_url': icon_url,
        }
    else:  
        return {
            'location': location,
            'temp': 'N/A',
            'description': 'Error fetching weather',
            'icon_url': None,
            'emoji': '🌥️'  
        }