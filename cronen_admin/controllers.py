import os

from flask import render_template, send_from_directory
from flask import make_response

from requests import get, ConnectionError, HTTPError

# routing for API endpoints (generated from the models designated as API_MODELS)
from cronen_admin.core import api_manager
from cronen_admin.models import *

for model_name in app.config['API_MODELS']:
    model_class = app.config['API_MODELS'][model_name]
    api_manager.create_api(model_class, methods=['GET', 'POST', 'DELETE'])

session = api_manager.session

# routing for basic pages (pass routing onto the Angular app)
@app.route('/')
@app.route('/about')
@app.route('/app')
@app.route('/index.html')
def basic_pages(**kwargs):
    return make_response(open('cronen_admin/static/index.html').read())

@app.route('/api/status/<item_id>')
def server_status(item_id):

    try:
        server = session.query(Server).get(item_id)
        url = "http://" + server.host + ":" + str(server.port) + "/status"

        r = get(url, headers={'Content-Type': 'application/json'})

        if r.status_code != 200:
            return_page_not_found()

        response = "{ \"host\": " + "\"" + server.host + "\"," + " \"port\": " + str(server.port) + \
               ", \"jobs\": " + r.text + "}"

        return response
    except (ConnectionError, HTTPError, AttributeError):
        return return_page_not_found()


# special file handlers and error handlers
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'img/favicon.ico')


@app.errorhandler(404)
def page_not_found(e):
    return_page_not_found()

def return_page_not_found():
    return render_template('404.html'), 404
