//---------------------------------------------------------------------
// JavaScript-HTML5 QRCode Generator
//
// Copyright (c) 2011 Amanuel Tewolde
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
//---------------------------------------------------------------------

// Generates a QRCode of text provided.
// First QRCode is rendered to a canvas.
// The canvas is then turned to an image PNG
// before being returned as an <img> tag.
function showQRCode(text) {

	
	var canvas=document.createElement('canvas');
	var qrCanvasContext = canvas.getContext('2d');
  try {
    var qr = new QRCode(10, QRErrorCorrectLevel.L);
   	qr.addData(text);
   	qr.make();
   }
  catch(err) {
		var errorChild = document.createElement("p");
    var errorMSG = document.createTextNode("QR Code FAIL! " + err);
    errorChild.appendChild(errorMSG);
    return errorChild;
  }
    
  var qrsize = qr.getModuleCount();
 	canvas.setAttribute('height',(qrsize * 6) + 30);
 	canvas.setAttribute('width',(qrsize * 6) + 30);
 	var black = "rgb(0,0,0)";
 	var white = "rgb(255,255,255)";
 	if (canvas.getContext){
 		for (var r = 0; r < qrsize; r++) {
 			for (var c = 0; c < qrsize; c++) {
 				if (qr.isDark(r, c))
 					qrCanvasContext.fillStyle = black;  
 				else
 					qrCanvasContext.fillStyle = white;  
 				qrCanvasContext.fillRect ((c*6) + 15,(r*6) + 15,6,6);  
 			}	
 		}
 	}

 	var imgElement = document.createElement("img");
 	imgElement.src = canvas.toDataURL("image/png");

 	return imgElement;
    
}

