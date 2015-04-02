FROM docker.blinkboxmusic.com/blinkboxmusic/debian:wheezy
MAINTAINER Tom Ford
RUN apt-get update && apt-get install -y \
	python2.7-dev \
	dh-virtualenv \
	dh-bbm-info \
	git \
	xvfb
RUN git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
ADD requirements.txt /source/
WORKDIR /source
RUN pip install -r requirements.txt
RUN /bin/bash -c "source /root/.nvm/nvm.sh && nvm install 0.12"
ADD . /source

