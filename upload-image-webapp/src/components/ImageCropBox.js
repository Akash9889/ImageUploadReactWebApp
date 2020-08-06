import React, { useState, useRef, useEffect} from 'react';
import '../stylesheets/imageCropBox.css';
import Cropper from 'cropperjs';
import "cropperjs/dist/cropper.min.css";


export default function ImageCropBox({sourceImagePath, aspectRatio, canvasWidth, canvasHeight}) {
    const [destinationImage, setDestinationImage] = useState('')
    const imageRef1 = useRef()
   
    useEffect(() => {
        const cropper = new Cropper(imageRef1.current,{
            zoomable: false,
            scalable: false,
            aspectRatio: aspectRatio, 
            background:false,     
            crop : () => {
                const canvas = cropper.getCroppedCanvas({width:canvasWidth, height: canvasHeight});
                setDestinationImage(canvas.toDataURL("image/jpg"))
                canvas.height = canvasHeight
                canvas.width = canvasWidth
            },
        })
      return ()=> cropper.destroy
    },[])
    
    function cropImage1(){
        
    }
   
    return (
        <>
        <p>Heading </p>
        <div className= 'cropbox-conatiner'>
            
            <img  ref = {imageRef1} className = 'cropBox' src = {sourceImagePath} alt ='' />
            <div className = 'cropedbox-container'>
                <img className = 'croped-box1'   src = {destinationImage} alt =''/>
                <button className= 'crop-button' type='button' onClick={cropImage1}>CROP</button>
            </div>
        </div>
        
        </>
    )
}
