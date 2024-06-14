import os
import io
import numpy as np
from PIL import Image
from flask import request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array


def init_model(model_name):
    try:
        path = os.path.join(os.path.dirname(__file__),'..', 'models', model_name)  # Adjust path as necessary
        model = load_model(path)
        return model
    except Exception as e:
        print(f"Error loading the model: {e}")
        exit(1)

model = init_model('handwritten_digits_reader.model')

def prepare_image(image, target_size):
    if image.mode != 'L':
        image = image.convert('L')
    image = image.resize(target_size)
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    image = image / 255.0
    return image

def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    image = Image.open(io.BytesIO(file.read()))
    prepared_image = prepare_image(image, target_size=(28, 28))
    prediction = model.predict(prepared_image).argmax(axis=-1)
    print("prediction: ", int(prediction[0]))
    return jsonify({'digit': int(prediction[0])})