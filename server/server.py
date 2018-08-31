from flask import Flask, request, jsonify
from flask_cors import CORS
from insights import getInsightsOnImage, imageCheckTollBooth
import os
import shutil
import logging
import base64
import json
#import asyncio  
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
    ImagePath = os.path.join('ToBeDetected',name)
    with open(ImagePath, 'wb') as f:
        f.write(base64.b64decode(image))

    imageCheckTollBooth(ImagePath)

    foundList = getInsightsOnImage(ImagePath)
    x =json.dumps(foundList, separators=(',',':'))
    print type(x)
    return x,200
#----------------Routes END----------------------    


if __name__ == "__main__":
    app.run( debug=True, use_reloader=False,threaded=True )
    
