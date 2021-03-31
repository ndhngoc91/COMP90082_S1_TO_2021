from app import create_app
import pytest

#create_app should be able to change environment
#between testing config and development config
def test_config():
    assert not create_app().testing 
    assert create_app('config.test.py').testing