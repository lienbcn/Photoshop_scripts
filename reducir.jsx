

var docRef = activeDocument; // hacemos referencia a la imagen abierta
if  (docRef.width < docRef.height) {// si la imagen esta en vertical
	var ver = new UnitValue(600, "px");
	//doAction ("logo_vertical", "My actions");
	docRef.resizeImage(null, ver, null, ResampleMethod.BICUBIC);
	
}else {// si la imagen esta en horizontal
	var hor = new UnitValue(800, "px");
	//doAction ("logo_horizontal", "My actions");
	docRef.resizeImage(hor, null, null, ResampleMethod.BICUBIC);
	
}
