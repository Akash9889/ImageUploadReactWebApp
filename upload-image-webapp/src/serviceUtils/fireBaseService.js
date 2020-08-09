export const uploadErrorHandler = (error) => {
    let successMessage = document.getElementById('success');
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
        alert(`Uploading FAILED!, Error unknown `)
        break; 
    }
}

export  const snapShotStatus = (snapshot) => {
    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    let successMessage = document.getElementById('success');
    let uploader = document.getElementById('uploader');
    uploader.value = progress
    if(progress === 100 && snapshot.state === 'running')
        successMessage.textContent = `Uploaded Successfully`
    else 
        successMessage.textContent = `Uploading...`
}