import React from 'react'
import '../stylesheets/finalPreview.css'
import {firebaseUpload} from '../containers/firebase'


export default function FinalPreview(imagesForPreview) {
    let sortedbyId =   imagesForPreview.croppedImagesArry.sort(function(a,b){
                    return a.id -b.id })

    const uplaodImage = () => {
        firebaseUpload(sortedbyId)
    }
    

    return (
        <div className = "preview-container">
            {sortedbyId.map(img => {
                return(
                <img className="preview-image" key = {img.id} src = {img.croppedImageURL} alt='Preview'/>
            )})}
            <button type='button' onClick = {uplaodImage} className='upload-button'>Upload</button>
        </div>
    )
}
