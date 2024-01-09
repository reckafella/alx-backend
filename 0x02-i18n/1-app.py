#!/usr/bin/env python3
'''
Module for a basic Flask app
'''
from flask import Flask, render_template, request
from flask_babel import Babel


class Config(object):
    '''
    Configuration class
    '''
    LANGUAGES = ['en', 'fr']
    DEFAULT_LOCALE = 'en'
    DEFAULT_TIMEZONE = 'UTC'


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@app.route('/', strict_slashes=False)
def index() -> str:
    '''
    returns a title and header when / is called
    '''
    return render_template('1-index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000')
