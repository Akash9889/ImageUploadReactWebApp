import React,{ useState } from 'react'
import './App.css'
import ImageCropBox from './components/ImageCropBox'
import {imageFormats} from './imageFormats.js'


export default function App() {
    const [imageSourcePath, setImageSourcePath] = useState('')

    const handleImagePath = (event) => {
        let reader = new FileReader()
        let imageUrl = reader.readAsDataURL(event.target.files[0]) 

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
   
    const uplaodImage = () => {
        console.log(imageSourcePath)
    }

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
                    <img  className = "image-conatiner"src = {imageSourcePath} alt =''width="400" height='400' />
                    <div style ={{flexDirection:'row'}}>
                        <input type="file" accept="image/*" name="file" id="file" className="inputfile2" 
                            onChange={(event) => handleImagePath(event)}
                        />
                        <label htmlFor="file2" >Change Image...</label>
                        <button type='button' onClick = {uplaodImage}className='upload-button'>Upload</button>
                    </div>
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
                    /> 
                )})}
            </div>
            }              
        </>
    )
}
