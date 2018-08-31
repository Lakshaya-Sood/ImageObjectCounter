import os
import glob
import dlib
import traceback

from PIL import Image
from skimage import io
from skimage.draw import polygon_perimeter

def imageCheckTollBooth(pathOfImage):
    img = Image.open(pathOfImage)
    width, height = img.size
    print(width, height)
    if(height>1936):
        newHeight = 1936
        newWidth = (newHeight * width) / (height * 1.0)
        newSize = int(newWidth), newHeight
        img = img.resize(newSize, Image.ANTIALIAS)
        img.save(pathOfImage)

def getInsightsOnImage( pathOfImage ):
    im = Image.open(pathOfImage)
    width, height = im.size
    print("new",width, height)
    detector_folder = 'data'
    allFolders = glob.glob(detector_folder+"/*")
    foundList = []
    for folder in allFolders:
        detector_svm = os.path.join(folder,folder.split('\\')[1]+".svm")
        # Now let's use the detector as you would in a normal application.  First we
        # will load it from disk.
        detector = dlib.simple_object_detector(detector_svm)

        print("Processing file: {}".format( pathOfImage ))
        img = io.imread(pathOfImage)
        dets = detector(img)
        print("Number of objects detected: {}".format(len(dets)))
        if(len(dets)>0):
            foundList.append({'itemName':folder.split('\\')[1],'count':len(dets)})
        bOverLays = False
        for k, d in enumerate(dets):
            print("Detection {}: Left: {} Top: {} Right: {} Bottom: {}".format(
                k, d.left(), d.top(), d.right(), d.bottom()))
            rr,cc = polygon_perimeter([d.top(), d.top(), d.bottom(), d.bottom()],
                                [d.right(), d.left(), d.left(), d.right()])
            print(rr,cc)
            try:
                img[rr, cc] = (255, 0, 0)
                if bOverLays == False:
                    bOverLays = True
            except:
                traceback.print_exc()
        # Save the image detections to a file for future review.
        if bOverLays == True:
            io.imsave( pathOfImage, img)
    print foundList
    return foundList