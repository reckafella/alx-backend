#!/usr/bin/env python3
'''
Module for a basic Flask app
'''
from flask import Flask, render_template


app = Flask(__name__)


@app.route('/', strict_slashes=False)
def index():
    '''
    returns a title and header when / is called
    '''
    title = 'Welcome to Holberton'
    header = 'Hello world'
    return render_template('0-index.html', title=title, header=header)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000')
