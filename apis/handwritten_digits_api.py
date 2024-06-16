import os
import json
import numpy as np
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from utils.digit_recognizer import init_model, prepare_image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = init_model('handwritten_digits_reader.h5')

@app.route('/predict', methods=['POST'])
def predict():
    input_data = request.form.get('input')
    input_array = np.array(json.loads(input_data), dtype=np.float32).reshape(1, 28, 28, 1) / 255.0
    prediction = model.predict(input_array)
    digit = np.argmax(prediction)
    return jsonify({'digit': int(digit)})