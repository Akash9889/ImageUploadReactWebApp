import firebase from 'firebase';
import firebaseConfig from '../utils/init-firebase';

export const firebaseUpload =  (sortedbyId) => {
    
    sortedbyId.map((imgData) => {
        !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
       
        let uploader = document.getElementById('uploader');
        let successMessage = document.getElementById('success');

        let storageRef = firebase.storage().ref();
        let url = imgData.croppedImageURL
       
        var uploadTask = storageRef.child(`images/${imgData.id} `).putString(url, 'data_url');

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function(snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                uploader.value = progress
                console.log(snapshot.state)
                switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    break;
                default:
                    break;
                }
                if(progress === 100 && snapshot.state == 'running')
                    successMessage.textContent = `Uploaded Successfully`
                    else   
                    successMessage.textContent = `Uploading...`
            },
            function (error) {
                switch (error.code) {
                case 'storage/unauthorized':
                    alert (`User doesn't have permission to access the object  `)
                    successMessage.textContent = `Uploading FAILED!` 
                    break;
            
                case 'storage/canceled':
                    alert(`upload cancelled`)
                    successMessage.textContent = `Uploading Cancelled!` 
                    break;
                case 'storage/unknown':
                    alert('Unknown error occurred, inspect error.serverResponse')
                    successMessage.textContent = `Uploading FAILED!` 
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