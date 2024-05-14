from flask import Flask, jsonify, request
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def is_allowed():
    return True

@app.route('/api/hello')
def hello():
    # Check if the request origin is allowed
    if is_allowed():
        current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        return jsonify({'message': 'Hello from Python Anywhere. This is an API call!!!', 'time': current_time})
    else:
        return jsonify({'error': f'Not allowed'}), 403
if __name__ == '__main__':
    app.run(port=5002)
