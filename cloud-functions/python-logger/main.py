from os import environ
from flask import make_response, jsonify, abort, Request
import time

# firebase/firestore specific
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# ==================================================================
# Globals to be potentially reused
# ==================================================================
is_dev = environ['CLOUD_FUNCTION_ENV'] == 'dev' # This doesn't do much for now, but is available
db = None

# ==================================================================
# Initialize app instance/database connection
# ==================================================================
def json_response(status: int, data: dict):
    return make_response(jsonify(data), status)

def print_log(message: str):
    print(f'[ ISSUE INGEST ] {message}')

def init_db():
    # Prod env already has access to this, but you'll need to setup the gcloud sdk for local work
    cred = credentials.ApplicationDefault()

    # might only apply to dev? - init app if not already in memory
    if firebase_admin._DEFAULT_APP_NAME not in firebase_admin._apps:
        app = firebase_admin.initialize_app(cred, {
            'projectId': environ['CLOUD_FUNCTION_PROJECT']
        })
    else:
        app = firebase_admin.get_app()

    return firestore.client(app)

def issue_valid(issue: dict):
    required_keys = ['title', 'issueType', 'stack', 'open', 'handled']
    for key in required_keys:
        if key not in issue:
            return False
    return True

def sentinel_issue_logger(request: Request):
    """HTTP Cloud Function.
    Args:
        request (flask.Request): The request object.
        <https://flask.palletsprojects.com/en/1.1.x/api/#incoming-request-data>
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`
        <https://flask.palletsprojects.com/en/1.1.x/api/#flask.make_response>.
    """
    global db, is_dev
    print_log('Received log request')
    print_log(f'Production mode: {not is_dev}')

    # ==================================================================
    # Initialize DB connection, any other global reqs
    # ==================================================================
    db = init_db()

    # ==================================================================
    # Check if correct method
    # ==================================================================
    if request.method != 'POST':
        print_log('Bad request, used non POST method')
        return abort(405, 'Only POST allowed')

    # ==================================================================
    # Check if auth header is available, and do shape validation
    # ==================================================================
    auth_header = request.headers.get('Authorization')
    # a correct key looks like <projectId>.<token>
    if not auth_header or len(auth_header.split('.')) != 2:
        return abort(json_response(401, { "message": 'Authorization token invalid or missing' }))

    # ==================================================================
    # Validate auth token
    # ==================================================================
    # Prep auth header for actual use
    [project_id, token] = auth_header.split('.')

    # Turn post body into JSON
    request_body = request.get_json(silent=True)

    # If query params are ever needed
    # request_args = request.args

    projects_doc = db.collection(u'projects').document(project_id)

    # Validate provided key - entry will not exist if project or token do not exist
    keysRef = projects_doc.collection('keys')
    keys = keysRef.where('token', '==', token).get()
    if len(keys) == 0:
        abort(json_response(403, { "message": "Authorization token invalid or revoked" }))


    # Run final validation on body before writing
    if not request_body or not issue_valid(request_body):
        return abort(json_response(400, {"message": "Request body missing or malformed"}))

    # All relevant info assumed valid by this point - write new issue to project's issues collection
    issue_ref = projects_doc.collection('issues').document()
    issue_ref.set(request_body)

    print_log(f'Logged issue - {issue_ref.id}')
    return { "created": issue_ref.id }