import React, { useState } from 'react'
import CroppedImages from '../components/CroppedImages'
import ChooseFileBox from '../components/ChooseFileBox'
import {imagePath} from '../serviceUtils/FileReader'

export default function Uploader({handleDestinationImage, handleShowPreview}) {
    const [imageSourcePath, setImageSourcePath] = useState('')
    
    const handleImagePath = (event) => {
        const imgPath = (imagePath) => setImageSourcePath(imagePath)
        imagePath(event, imgPath)
    }
       
    const previewImage = () => handleShowPreview(true)

    return (
        <>
            <ChooseFileBox
                handleImagePath ={handleImagePath} 
                imageSourcePath = {imageSourcePath} 
                previewImage={previewImage}/>
            { imageSourcePath === '' ? null : 
            <CroppedImages sourceImagePath = {imageSourcePath} myCroppedImage = {handleDestinationImage} />
            }              
        </>
    )
}

 