from flask import Flask

app = Flask(__name__)

app.config.from_object('cronen_admin.settings')

app.url_map.strict_slashes = False

import cronen_admin.core
import cronen_admin.models
import cronen_admin.controllers

