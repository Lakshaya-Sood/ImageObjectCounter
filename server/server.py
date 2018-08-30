from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import logging
import urllib
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
    fileUrl = request.json['preview']
    urllib.urlretrieve(fileUrl, "local-filename.jpg")
    print fileInfo
    response = app.response_class(
        response='Session Successfully Cleared!',
        status=200,
        mimetype='text/plain'
    )
    return response
#----------------Routes END----------------------    


if __name__ == "__main__":
    app.run( debug=True, use_reloader=False )
    
