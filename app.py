from flask import Flask, render_template, session, redirect, url_for, g, request
from database import get_db, close_db
from flask_session import Session
from functools import wraps
from datetime import datetime

app = Flask(__name__)

@app.route('/', methods = ['GET','POST'])
def index():
    
    weather = {
        'description': 'sunny',
        'temp': '15',
        'location': 'Cork'
    }

    now = datetime.now()
    clock = {
        'time': now.strftime('%H:%M:%S')
    }

    spotify = {
        'track' : 'currentSong',
        'artist' : 'artistName'
    }

    return render_template('base.html',weather=weather,clock=clock,spotify=spotify)
