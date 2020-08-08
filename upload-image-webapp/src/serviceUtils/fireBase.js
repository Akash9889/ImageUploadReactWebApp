import firebase from 'firebase';
import firebaseConfig from '../utils/initFirebase';
import {errorHandler, snapShotStatus} from './fireBaseService'

export const fireBaseUpload =  (sortedById) => {
    sortedById.map((imgData) => {
        !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
        
        let storageRef = firebase.storage().ref();
        let url = imgData.croppedImageURL
        let uploadTask = storageRef.child(`images/${imgData.id} `).putString(url, 'data_url');

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            function (snapshot) { snapShotStatus(snapshot) },
            function (error) { errorHandler(error) },
            function() {
                // Upload completed successfully
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
                });
            }
        );
    })
}

