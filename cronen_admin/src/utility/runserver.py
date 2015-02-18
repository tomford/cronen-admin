import os
from cronen_admin import app

def runserver():
	port = int(os.environ.get('PORT', 8887))
	app.run(host='0.0.0.0', port=port)

if __name__ == '__main__':
	runserver()
