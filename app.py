from flask import Flask, request, jsonify
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.environ['API_KEY'])

model = genai.GenerativeModel(model_name="gemini-1.5-flash")

# Initialize Flask app
app = Flask(__name__)

def brand_name(image_path, model):
    
    img_file = genai.upload_file(path=image_path)
    response = model.generate_content([img_file, "Analyze the provided image and identify the brand name and product name of the product shown. Return only the brand name and product name as your response."])
    return response.text

@app.route('/detect-brand', methods=['POST'])
def detect_brand():
    
    if 'image_path' not in request.json:
        return jsonify({'error': 'Missing image_path'}), 400

    image_path = request.json['image_path']
    try:
        brand = brand_name(image_path, model)
        return jsonify({'brand_name': brand}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
