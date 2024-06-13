"""
Flask app that serves the trained model
"""

from flask import Flask
from mnist_classifier.mnist_utils import predict

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def prediction():
    predict()

