# for reading files in a directory
import glob
# for reading XML file (frame format)
from xml.dom import minidom
# for writing XML file (training format)
import xml.etree.ElementTree as ET


allFolders = glob.glob("./data/*")
print allFolders
for folder in allFolders:
	#creating new XML
	dataset = ET.Element('dataset')
	name = ET.SubElement(dataset, 'name')
	folderName = folder.split('\\')[1]
	name.text = folderName+ ' dataset'
	comment = ET.SubElement(dataset, 'comment')
	comment.text = 'Created by LAKSHAYA SOOD'
	images = ET.SubElement(dataset, 'images')
	
	xmlFiles = glob.glob(folder+'/*.xml');
	for x in xmlFiles:
		print x
		
		mydoc = minidom.parse(x)
		
		image = ET.SubElement(images, 'image')
		filename = mydoc.getElementsByTagName('filename')
		image.set('file',filename[0].firstChild.data)
		
		bndboxes = mydoc.getElementsByTagName('bndbox')
		
		for bndbox in bndboxes:
			box = ET.SubElement(image, 'box')
			box.set('left',str(int(bndbox.childNodes[1].firstChild.data)))
			box.set('top',str(int(bndbox.childNodes[3].firstChild.data)))
			box.set('width',str(int(bndbox.childNodes[5].firstChild.data)-int(bndbox.childNodes[1].firstChild.data)))
			box.set('height',str(int(bndbox.childNodes[7].firstChild.data)-int(bndbox.childNodes[3].firstChild.data)))
	
	mydata = ET.tostring(dataset)  
	myfile = open(folder+'/'+folderName+".xml", "w")  
	myfile.write(mydata) 
			


