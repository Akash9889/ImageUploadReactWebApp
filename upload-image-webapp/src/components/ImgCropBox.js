import React from 'react'

export default function ImgCropBox({ImgObj, previewImage, imageRef}) {
    return (
        <>
            <p>{` Aspect Ratio - ${ImgObj.canvasWidth}x${ImgObj.canvasHeight}`}</p>
            <div className= 'cropbox-conatiner'>
                <img  ref = {imageRef}  className = 'cropBox' src = {ImgObj.sourceImagePath} alt ='' />
                <div className = 'croppedbox-container'>
                    <img className = 'cropped-box'   src = {previewImage} alt =''/>
                </div>
            </div>
        </>     
    )
}
