from fastapi import FastAPI
from fastapi.testclient import TestClient

import sys

from ..main import app

client = TestClient(app)


def test_read_root():
    response = client.get("/")
    assert response.status_code == 404
    assert response.json() == {"detail": "Not Found"}
