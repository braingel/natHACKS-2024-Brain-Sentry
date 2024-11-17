from flask import Flask, request, jsonify
# from transformers import AutoProcessor, Wav2Vec2FeatureExtractor # Replace with that and see if it works because different process maybe
from transformers import AutoProcessor, Wav2Vec2ForSpeechClassification
import torch
import soundfile as sf
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="https://<your-react-render-domain>.onrender.com")

# Load the model and processor
model_name = "nada15/wav2vec2-large-xls-r-300m-dm32"
processor = AutoProcessor.from_pretrained(model_name)
model = Wav2Vec2ForSpeechClassification.from_pretrained(model_name)

@app.route("/analyze", methods=["POST"])
def analyze_audio():
    if "audio" not in request.files:
        return jsonify({"error": "No audio file uploaded"}), 400

    audio_file = request.files["audio"]
    audio_data, sample_rate = sf.read(audio_file)

    # Process audio
    inputs = processor(audio_data, sampling_rate=sample_rate, return_tensors="pt", padding=True)

    # Perform inference
    with torch.no_grad():
        logits = model(**inputs).logits
        probabilities = torch.nn.functional.softmax(logits, dim=-1)
        predicted_label = torch.argmax(probabilities).item()

    # Map label to human-readable result
    result = "Dementia Detected" if predicted_label == 1 else "No Dementia Detected"
    confidence = probabilities[0, predicted_label].item()

    return jsonify({"result": result, "confidence": confidence})

if __name__ == "__main__":
    app.run(debug=True)
