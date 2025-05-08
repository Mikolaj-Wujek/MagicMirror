from flask import Flask, render_template, session, redirect, url_for, g, request
from database import get_db, close_db
from flask_session import Session
from functools import wraps

app = Flask(__name__)

@app.route('/', methods = ['GET','POST'])
def index():
    return render_template('index.html')