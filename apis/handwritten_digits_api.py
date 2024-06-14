import os
import io
import numpy as np
import json
from PIL import Image
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def init_model(model_name):
    try:
        path = os.path.join(os.path.dirname(__file__), '..','models', model_name)  # Adjust path as necessary
        model = load_model(path)
        return model
    except Exception as e:
        print(f"Error loading the model: {e}")
        exit(1)

model = init_model('handwritten_digits_reader.h5')

def prepare_image(image, target_size):
    # print(f"image: {image}")
    if image.mode != 'L':
        image = image.convert('L')
    image = image.resize(target_size)
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    image = image / 255.0
    # print(f"Processed image shape: {image.shape}")
    # print(f"Processed image pixel values: {image[0, :, :, 0]}")
    # print("-==========-\n")
    # print(image)
    return image


# @app.route('/predict', methods=['POST'])
# def predict():
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file provided'}), 400
#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({'error': 'No file selected'}), 400

#     image = Image.open(io.BytesIO(file.read()))
#     prepared_image = prepare_image(image, target_size=(28, 28))
#     prediction = model.predict(prepared_image).argmax(axis=-1)
#     return jsonify({'digit': int(prediction[0])})

@app.route('/predict', methods=['POST'])
def predict():
    input_data = request.form.get('input')
    input_array = np.array(json.loads(input_data), dtype=np.float32).reshape(1, 28, 28, 1) / 255.0
    prediction = model.predict(input_array)
    digit = np.argmax(prediction)
    return jsonify({'digit': int(digit)})