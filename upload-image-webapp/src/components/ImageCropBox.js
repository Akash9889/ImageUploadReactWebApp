import React, { useState, useRef, useEffect} from 'react';
import '../stylesheets/imageCropBox.css';
import Cropper from 'cropperjs';
import "cropperjs/dist/cropper.min.css";

export default function ImageCropBox(ImgObj) {
    const [previewImage, setPrivewImage] = useState('')
    const imageRef1 = useRef()
   
    useEffect(() => {
        const cropper = new Cropper(imageRef1.current,{
            zoomable: false,
            scalable: false,
            aspectRatio: ImgObj.aspectRatio, 
            responsive:false,
            crop : () => {
                const canvas = cropper.getCroppedCanvas({width:ImgObj.canvasWidth, height: ImgObj.canvasHeight});
                setPrivewImage(canvas.toDataURL("image/jpg"))
                ImgObj.myCroppedImage(ImgObj.imageIndex, canvas.toDataURL("image/jpg"))
            },
        })
        return () => cropper.destroy
    })

    return (
        <>
            <p>{` Aspect Ratio - ${ImgObj.canvasWidth}x${ImgObj.canvasHeight}`}</p>
            <div className= 'cropbox-conatiner'>
                <img  ref = {imageRef1}  className = 'cropBox' src = {ImgObj.sourceImagePath} alt ='' />
                <div className = 'cropedbox-container'>
                    <img className = 'croped-box1'   src = {previewImage} alt =''/>
                </div>
            </div>
        </>
    )
}
