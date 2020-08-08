import React,{ useState } from 'react'
import FinalPreview from './components/FinalPreview'
import Uploader from './containers/Uploader'
import './App.css'


export default function App() {
    
    const [destinationImages, setDestinationImages] = useState([])
    const [showPreview , setShowPreview] = useState(false)
    
    const handleShowPreview = (previewStatus) => setShowPreview(previewStatus)

    const handleDestinationImage = (index, imgPath) =>  {
        setDestinationImages(prevdestinationImages => 
            [...prevdestinationImages.filter(a=> a.id !== index), 
            {   
                id: index,
                croppedImageURL: imgPath
            }]
       )}
    
    return (
        <>{!showPreview ? 
            <Uploader
                handleDestinationImage = {handleDestinationImage}
                handleShowPreview = {handleShowPreview}
            />:
            <>
                <FinalPreview croppedImagesArry = {destinationImages} />  
            </>}
        </>
    )
}
