from flask import Flask, request, jsonify
from flask_cors import CORS

import shutil
import logging
import base64

#setting log level to debug
logging.basicConfig(level=logging.DEBUG)

#initilize logging object for INFO, DEBUG, ERROR logs
tLogger = logging.getLogger(__name__)


app = Flask(__name__)
# for Cross Origin Resource Sharing
CORS(app)


#----------------Routes START----------------------
#1
@app.route("/serverLiveCheck", methods=['POST'])
def serverLiveCheck():
    image =request.json['image']
    name =request.json['name']
    with open(name, 'wb') as f:
        f.write(base64.b64decode(image))
    return '',200
#----------------Routes END----------------------    


if __name__ == "__main__":
    app.run( debug=True, use_reloader=False,threaded=True )
    
