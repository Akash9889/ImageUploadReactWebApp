import React, {useState} from 'react'
import '../stylesheets/finalPreview.css'
import {fireBaseUpload} from '../serviceUtils/fireBase'

export default function FinalPreview(imagesForPreview) {
    const [progressBar, setProgressBar] = useState(false)
   
    let sortedById =   imagesForPreview.croppedImagesArry.sort(function(a,b){return a.id -b.id })

    const uploadImage = () => {
        setProgressBar(true)
        fireBaseUpload(sortedById)
    }
    const ability = progressBar ? 'disabled' : ''
    const show = progressBar ? 'inline-block' : 'none'
    return (
        <>
            <p id ='heading'>CROPPED IMAGES</p>
            <div className = "preview-container">
                {sortedById.map(img => {
                    return(
                    <img className="preview-image" key = {img.id} src = {img.croppedImageURL} alt='Preview'/>
                )})}
                <button disabled = {ability} type='button' onClick = {uploadImage} 
                    className='upload-button'>Upload
                </button>
                <progress style = {{display : show}} id= 'uploader' max="100" value="0"></progress>
                <p  style = {{display : show}} id= 'success' > Uploading... </p>
            </div>
        </>
    )
}
