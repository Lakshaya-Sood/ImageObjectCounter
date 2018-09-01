from flask import Flask, request, jsonify
from flask_cors import CORS
from insights import getInsightsOnImage, imageCheckTollBooth
import os
import logging
import base64
import json
import cv2
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
    
    img = cv2.imread(ImagePath)
    ext = '.' + name.split('.')[1]
    base64Str = cv2.imencode(ext, img)[1].tostring()
    resp = {'resultData':foundList,'base64Str':base64Str.encode('base64'),'ext':ext}
    print type(resp)
    x =json.dumps(resp)
    print type(x)
    os.remove(ImagePath)
    return x,200
#----------------Routes END----------------------    


if __name__ == "__main__":
    app.run( debug=True, use_reloader=False,threaded=True )
    
