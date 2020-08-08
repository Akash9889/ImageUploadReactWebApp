import React, { useState, useRef, useEffect} from 'react';
import '../stylesheets/imageCropBox.css';
import Cropper from 'cropperjs';
import "cropperjs/dist/cropper.min.css";
import ImgCropBox from '../components/ImgCropBox'

export default function ImageCropBox(ImgObj) {
    const [previewImage, setPreviewImage] = useState('')
    const imageRef = useRef()
   
    useEffect(() => {
        const cropper = new Cropper(imageRef.current,{
            zoomable: false,
            scalable: false,
            aspectRatio: ImgObj.aspectRatio, 
            responsive:false,
            crop : () => {
                const canvas = cropper.getCroppedCanvas({width:ImgObj.canvasWidth, height: ImgObj.canvasHeight});
                setPreviewImage(canvas.toDataURL("image/jpg"))
                ImgObj.myCroppedImage(ImgObj.imageIndex, canvas.toDataURL("image/jpg"))
            },
        })
        return () => cropper.destroy
    })

    return (
        <ImgCropBox  ImgObj ={ImgObj} previewImage ={previewImage} imageRef ={imageRef}/>
    )
}