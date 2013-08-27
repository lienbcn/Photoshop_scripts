//This script inserts a logo to the bottom right corner of all photos in a folder, keeping the origial photos unmodified and saving the new ones in a specified folder.

var fLogo = File.openDialog('Choose the logo file');
var docLogo = app.open (fLogo);
docLogo.selection.selectAll();
docLogo.selection.copy();
var dPhotosInput = Folder.selectDialog("Select a folder for the input photos");
var dPhotosOutput = Folder.selectDialog("Select a folder for the output photos");
var aFileList = dPhotosInput.getFiles();
for (var i=0; i<aFileList.length; i++){
    // Make sure all the files in the folder are compatible with PS
    if ( aFileList[i] instanceof File && ! aFileList[i].hidden) {
        var docRef = app.open (aFileList[i]);
        docRef.paste();
        var lLogo = docRef.layers[0];
        var nLayerWidth = Number(lLogo.bounds[2] - lLogo.bounds[0]);
        var nLayerHeight = Number(lLogo.bounds[3] - lLogo.bounds[1]);
        var nDocWidth = Number(docRef.width);
        var nDocHeight = Number(docRef.height);
        lLogo.translate(nDocWidth/2-nLayerWidth/2, nDocHeight/2-nLayerHeight/2);
        lLogo.translate(-nDocWidth*0.02, -nDocHeight*0.02); //margin
        
        // Flatten the document in case the file type we want to save to requires a flat doc
        docRef.flatten();
        //Save as a JPEG to the users desktop
        var jpegOptions = new JPEGSaveOptions();
        jpegOptions.quality = 12;
        jpegOptions.embedColorProfile = false;
        docRef.saveAs(File(dPhotosOutput+'/'+docRef.name.slice(0,-4)+'_logo.jpg'), jpegOptions, false);
        docRef.close();
    }
}

