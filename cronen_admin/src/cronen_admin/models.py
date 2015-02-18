from cronen_admin.core import db
from cronen_admin import app


class Server(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    host = db.Column(db.String(80))
    port = db.Column(db.Integer)

    def __init__(self, host, port):
        self.host = host
        self.port = port

    def __repr__(self):
        return '<Server %r %r>' % self.title, self.port

# models for which we want to create API endpoints
app.config['API_MODELS'] = {'server': Server}

# models for which we want to create CRUD-style URL endpoints,
# and pass the routing onto our AngularJS application
app.config['CRUD_URL_MODELS'] = {'post': Server}
