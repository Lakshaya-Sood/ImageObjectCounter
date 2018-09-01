import os
import glob
import dlib

detector_folder = 'data'
allFolders = glob.glob(detector_folder+"/*")

for folder in allFolders:
	options = dlib.simple_object_detector_training_options()
	options.add_left_right_image_flips = False
	#try new values
	options.C = 5
	#--------------
	options.num_threads = 4
	options.be_verbose = True
	
	folderName = folder.split('\\')[1]
	
	training_xml_path = os.path.join(detector_folder, folderName,folderName+".xml")
	detector_svm = os.path.join(detector_folder, folderName,folderName+".svm")
	
	if not os.path.exists(detector_svm):
		dlib.train_simple_object_detector(training_xml_path, detector_svm, options)
	
	
	

