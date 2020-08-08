import React, {useState} from 'react'
import '../stylesheets/finalPreview.css'
import {firebaseUpload} from '../containers/firebase'


export default function FinalPreview(imagesForPreview) {
    const [showProgressBar, setShowProgressBar] = useState(false)
   
    let sortedbyId =   imagesForPreview.croppedImagesArry.sort(function(a,b){
                    return a.id -b.id })

    const uplaodImage = () => {
        setShowProgressBar(true)
        firebaseUpload(sortedbyId)
    }
    const ability = showProgressBar ? 'disabled' : ''
    const show = showProgressBar ? 'inline-block' : 'none'
    return (
        <div className = "preview-container">
            {sortedbyId.map(img => {
                return(
                <img className="preview-image" key = {img.id} src = {img.croppedImageURL} alt='Preview'/>
            )})}
            <button disabled = {ability} type='button' onClick = {uplaodImage} className='upload-button'>Upload</button>
            <progress style = {{display : show}} id= 'uploader' max="100" value="0"></progress>
            <p  style = {{display : show}} id= 'success' > Uploadeding... </p>
        </div>
    )
}
