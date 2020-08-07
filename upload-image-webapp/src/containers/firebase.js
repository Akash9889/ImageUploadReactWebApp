import firebase from 'firebase';
import firebaseConfig from '../init-firebase';

export const firebaseUpload = (sortedbyId) => {
    
    sortedbyId.map((imgData) => {
        !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
       
        let storageRef = firebase.storage().ref();
        let url = imgData.croppedImageURL
       
        var uploadTask = storageRef.child(`images/${imgData.id} `).putString(url, 'data_url');

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function(snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                default:
                    break;
                }
                
            },
            function (error) {
                switch (error.code) {
                case 'storage/unauthorized':
                    alert (`User doesn't have permission to access the object  `)
                    break;
            
                case 'storage/canceled':
                    alert(`upload cancelled`)
                    break;
                case 'storage/unknown':
                    alert('Unknown error occurred, inspect error.serverResponse')
                    break;
                default :  
                    break; 
                    }
            },
            function() {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
                });
            }
        );
            
    })
}