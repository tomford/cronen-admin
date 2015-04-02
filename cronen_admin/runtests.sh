#!/bin/bash

# activate nvm

# unit tests
xvfb-run npm run test-single-run

# end-to-end tests
export PYTHONPATH=`pwd`/src
python src/utility/manage.py drop_db
python src/utility/manage.py create_db
python src/utility/runserver.py &
xvfb-run npm run protractor
kill %1
