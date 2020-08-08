import React from 'react'
import ImageCropBox from '../containers/ImageCropBox'
import {imageFormats} from '../utils/imageFormats.js'

export default function CroppedImages({sourceImagePath, myCroppedImage}) {
    return (
        <div className = 'ImageCropBox'>
            {imageFormats.map((format) => {
                return (
                <ImageCropBox key={format.id}
                    sourceImagePath = {sourceImagePath}
                    aspectRatio={format.aspectRatio}
                    canvasWidth = {format.canvasWidth}
                    canvasHeight = {format.canvasHeight}
                    myCroppedImage = {myCroppedImage}
                    imageIndex = {format.id}
                /> 
            )})}
        </div>
    )
}
