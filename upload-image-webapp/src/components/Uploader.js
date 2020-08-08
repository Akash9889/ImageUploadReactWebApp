import React, { useState } from 'react'
import ImageCropBox from './ImageCropBox'
import {imageFormats} from '../utils/imageFormats.js'

export default function Uploader({handleDestinationImage, handleShowPreview}) {
    const [imageSourcePath, setImageSourcePath] = useState('')
    

    const handleImagePath = (event) => {
        let reader = new FileReader()
        reader.readAsDataURL(event.target.files[0]) 
        reader.onload = function (e) {
            var image = new Image();
            image.src = e.target.result;
            image.onload = function () {
                var height = this.height;
                var width = this.width;
                
                if (height !== 1024 || width !== 1024) {
                    alert("Height and Width have to be  1024px.");
                    return false;
                }
                else {
                    setImageSourcePath(reader.result)
                    return true;
                }
            };
        }
    }
   
    const previewImage = () => handleShowPreview(true)

    return (
        <>
            <p id ='heading'>UPLOAD IMAGE</p>
            {imageSourcePath === '' ? 
                <div className='blank-container'>
                    <input type="file" accept="image/*" name="file" id="file" className="inputfile" 
                        onChange={(event) => handleImagePath(event)}
                    />
                    <label htmlFor="file" >Choose Image...</label>
                </div>
                : 
                <div className='footer'>
                    <img  className = "image-conatiner" src = {imageSourcePath} alt =''width="400" height='400' />
                    <button type='button' onClick = {previewImage} className='upload-button'>Preview</button>
                </div>
            }
            { imageSourcePath === '' ? null : 
            <div className = 'ImageCropBox'>
                {imageFormats.map((format) => {
                    return (
                    <ImageCropBox key={format.id}
                        sourceImagePath = {imageSourcePath}
                        aspectRatio={format.aspectRatio}
                        canvasWidth = {format.canvasWidth}
                        canvasHeight = {format.canvasHeight}
                        myCroppedImage = {handleDestinationImage}
                        imageIndex = {format.id}
                    /> 
                )})}
            </div>
            }              
        </>
    )
}
