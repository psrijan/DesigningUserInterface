# Srijan Pandey, sp3557@drexel.edu
# CS530: DUI, Assignment 4

from flask import (Flask, g, jsonify, redirect, render_template, request,
                   session)
from passlib.hash import pbkdf2_sha256
import json
from db import Database
app = Flask(__name__)

db = Database() 

# Render Homepage API
@app.route('/')
def home():
    return render_template('home.html')

# Provides Detail view for a particular charity 
@app.route('/view' , methods = ['GET'])
def charityDetail():
    uid = request.args.get("uid", 0)
    charity = db.get_charity(uid)
    return render_template('detail.html', charity = charity)

# Recevies search query from the textbox in UI and provides 
# charities that match the specification 
@app.route('/search', methods = ['POST'])
def search_charity():
    query= request.form.get("query", "");
    charity = db.search_charities(query)
    return jsonify(charity)


# Finds similar charity organizations based on 
# a particular charities user id. It internally 
# fetches the mission statement of the charity and
# does index search based on mission text 
@app.route('/search/related', methods = ['GET'])
def search_additional_charity():
    uid = request.args.get("uid", 0)
    charity = db.search_more_charities(uid)
    return jsonify(charity) 

if __name__ == '__main__':
    app.run(host='localhost', port=8080, debug=True)