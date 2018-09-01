# ImageObjectCounter

At client (Reactjs)
1. run "npm i"
2. run "npm start"
3. open browser go to "localhost:1234"

At server (Python 2.7 & pip 18.0)
1. open cmd in main directory and run "pip install dlib-18.17.100-cp27-none-win32.whl --user"
2. run "pip install -r requirements.txt --user"
3. got server folder and run "server.py"

All Set To Go!!

To Train (- refer Trainer folder)
1. collect images of the item you want to train

2. put images in "/Trainer/data/<item name>" (name the folder with with item name)
  like: "/Trainer/data/Parle_G" or "/Trainer/data/Amul_milk"
  
3. annotate the images with help of  "labelImg.exe" to mark(draw rectangle around items) the images
  *remember to select the PascalVOC as the save format
  
4. save the xml from labelImg in "/Trainer/data/<item name>" 
  same directory as its images
  
5. run "scrapper.py"
6. run "justTrain.py"
7. move the item folders to "server/data"

