import os
import sys
import tempfile
import pytest
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import create_app,sess



@pytest.fixture
def apps():
    apps = create_app('config.test.py')
    from flask_session import Session
    sess = Session()
    sess.init_app(apps)
    return apps


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def runner(app):
    return app.test_cli_runner()


@pytest.fixture
def session_set():
    sess.permanent = True
    sess['login_session'] = "78C7030C644264F9DDBA41821ABD1E98"
    sess['org_id'] = "11EA64D91C6E8F70A23EB6800B5BCB6D"
