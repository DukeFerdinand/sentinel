from os import environ
from flask import escape, Response, abort, Request

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

def print_log(message: str):
    print(f'[ LOGGER FUNCTION ] {message}')

def hello_http(request: Request):
    """HTTP Cloud Function.
    Args:
        request (flask.Request): The request object.
        <https://flask.palletsprojects.com/en/1.1.x/api/#incoming-request-data>
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`
        <https://flask.palletsprojects.com/en/1.1.x/api/#flask.make_response>.
    """
    print_log('Received log request')

    # ==================================================================
    # Check if correct method
    # ==================================================================
    if request.method != 'POST':
        print_log('Bad request, used non POST method')
        return abort(405, 'Only POST allowed')

    # ==================================================================
    # Check if auth header is available (no validation yet)
    # ==================================================================
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return abort(403, { "message": "Authorization header required" })

    # request_json = request.get_json(silent=True)
    # request_args = request.args
    print(auth_header.split('.'))

    return { "test": "hello" }