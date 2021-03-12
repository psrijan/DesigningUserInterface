from flask import (Flask, g, jsonify, redirect, render_template, request,
                   session)
from passlib.hash import pbkdf2_sha256
import json
from db import Database
app = Flask(__name__)

db = Database() 

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/view' , methods = ['GET'])
def charityDetail():
    uid = request.args.get("uid", 0)
    charity = db.get_charity(uid)
    return render_template('detail.html', charity = charity)

@app.route('/search', methods = ['POST'])
def search_charity():
    query= request.form.get("query", "");
    print("QUery: " , repr(query))
    charity = db.search_charities(query)
    return jsonify(charity)

@app.route('/search', methods = ['GET'])
def search_additional_charity():
    uid = request.args.get("uid", 0)
    charity = db.search_more_charities(uid)
    return jsonify(charity) 

if __name__ == '__main__':
    app.run(host='localhost', port=8080, debug=True)