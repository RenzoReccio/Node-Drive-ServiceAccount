const path = require('path');
const fs = require('fs');
//Generete your service key account with editor permissions
const credentials = require('./token.json')
const { google } = require('googleapis');

const scopes = [
    'https://www.googleapis.com/auth/drive'
];


var saveFileToDrive = (filePath, fileName) => {

    const auth = new google.auth.JWT(
        credentials.client_email, null,
        credentials.private_key, scopes
    );
    const drive = google.drive({ version: "v3", auth });


    /*
    Folder ID is the last part of the URL of the folder
    Example https://drive.google.com/drive/folders/1asdasdsdsa_asd
    FOLDER ID: 1asdasdsdsa_asd
    Don't forget to add your service account to the ones you share your folder with
    Name: is the name that your file will recieve at the folder of google drive
    */
    var fileMetadata = {
        'name': fileName + '.pdf',
        'parents': [
            "GOOGLE FOLDER ID"]
    };


    /*
    Change mimeType to the one your file is.
    Look for yours at: https://www.sitepoint.com/mime-types-complete-list/
    */
    var media = {
        mimeType: 'application/pdf',
        body: fs.createReadStream(filePath)
    };

    drive.files.create({
        auth: auth,
        media: media,
        requestBody:{
            parents: fileMetadata.parents,
            name: fileMetadata.name
        }
    }, (err, file) => {
        if (err) {
            // Handle error
            console.error('Error: ', err);
        } else {
            console.log('File: ', file);
        }
    });
}

saveFileToDrive()
