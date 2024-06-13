
import io
import numpy as np
from PIL import Image
from flask import request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array


def init_model(path):
    model = load_model(path)
    return model

def prepare_image(image, target_size):
    if image.mode != 'L':
        image = image.convert('L')
    image = image.resize(target_size)
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    image = image / 255.0
    return image

def predict():
    model = init_model('../models/mnist_model.h5')
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    image = Image.open(io.BytesIO(file.read()))
    prepared_image = prepare_image(image, target_size=(28, 28))
    prediction = model.predict(prepared_image).argmax(axis=-1)
    return jsonify({'digit': int(prediction[0])})
