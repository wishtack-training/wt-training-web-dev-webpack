#!/bin/bash

if [ "$1" == "--global" ]
then

    apt-get update \
        && apt-get install phantomjs python-pip python-dev libxml2-dev libxslt-dev mongodb \
        && apt-get clean \
        && sed -i s/^journal=true/journal=false/ /etc/mongodb.conf \
        && echo nojournal=true >> /etc/mongodb.conf \
        && service mongodb start \
        && npm install -g gulpjs/gulp-cli#4.0 \
        && pip install -r requirements.txt

else

    npm prune \
        && npm install \
        && bower prune \
        && bower install

fi
