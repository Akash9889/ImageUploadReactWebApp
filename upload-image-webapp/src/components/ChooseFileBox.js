import React from 'react'

export default function ChooseFileBox({handleImagePath, imageSourcePath, previewImage}) {
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
        </>
    )
}
