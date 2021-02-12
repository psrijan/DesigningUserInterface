# Srijan Pandey, sp3557@drexel.edu
# CS530: DUI, Assignment 1

import os
from db import Database
from flask import Flask, g, json, render_template, request, jsonify

app = Flask(__name__)

DATABASE_PATH = 'bikes.db'

def get_db():
    db = getattr(g, '_database', None)
    if (db is None):
        db = Database(DATABASE_PATH)
    return db

@app.route('/')
def home():
    return render_template('home.html')


@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/rent')
def rent():
  return render_template('rent.html')

# @app.route('/bikes')
# def bikes():
#     return render_template('bikes.html', data=data)

def generate_response():
    bikes = get_db().get_bikes()
    return jsonify(bikes)

@app.route('/api/get_bikes')
def get_bikes():
    bikes = get_db().get_bikes()
    return jsonify(bikes)

@app.route('/api/update_bike', methods = ['POST'])
def update_bikes():
    id = request.form.get('id', default = None)
    available = request.form.get('available', default = None)
    bikes = get_db().update_bikes(id, available)
    return generate_response() 

@app.route('/api/reset_bikes', methods = ['POST'])
def reset_bikes():
    num = request.form.get('available', default= 3)
    get_db().reset_bikes(num)
    return generate_response()

if __name__ == '__main__':
    app.run(host='localhost', port=8080, debug=True)
