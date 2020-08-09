import firebase from 'firebase';
import firebaseConfig from '../utils/initFirebase';
import {uploadErrorHandler, snapShotStatus} from './fireBaseService'

export const fireBaseUpload = (sortedById) => {
    sortedById.map( async (imgData) => {
        !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
        
        let url = imgData.croppedImageURL
        let storageRef = firebase.storage().ref();
        let uploadTask =  storageRef.child(`images/${imgData.id}`).putString(url, 'data_url');

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            function (snapshot) { snapShotStatus(snapshot) },
            function (error) { uploadErrorHandler(error) },
        );
        await uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL); });
      
    })
}
