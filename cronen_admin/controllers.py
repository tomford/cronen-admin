import os

from flask import Flask, request, Response
from flask import render_template, url_for, redirect, send_from_directory
from flask import send_file, make_response, abort

from cronen_admin import app

# routing for API endpoints (generated from the models designated as API_MODELS)
from cronen_admin.core import api_manager
from cronen_admin.models import *

#for model_name in app.config['API_MODELS']:
	#model_class = app.config['API_MODELS'][model_name]
	#api_manager.create_api(model_class, methods=['GET', 'POST'])

session = api_manager.session

# routing for basic pages (pass routing onto the Angular app)
@app.route('/')
@app.route('/about')
@app.route('/app')
def basic_pages(**kwargs):
	return make_response(open('cronen_admin/templates/index.html').read())

# routing for CRUD-style endpoints
# passes routing onto the angular frontend if the requested resource exists
#from sqlalchemy.sql import exists

#crud_url_models = app.config['CRUD_URL_MODELS']

@app.route('/backend/')
def rest_pages(model_name, item_id=None):
	return make_response(open(
		'cronen_admin/templates/index.html').read())

# special file handlers and error handlers
@app.route('/favicon.ico')
def favicon():
	return send_from_directory(os.path.join(app.root_path, 'static'),
							   'img/favicon.ico')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404



