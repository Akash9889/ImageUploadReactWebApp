
export const imagePath = (event, imgPath) => {
   
    let reader = new FileReader() 
    reader.readAsDataURL(event.target.files[0]) 
    reader.onload = function (e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function () {
            var height = this.height;
            var width = this.width;
            
            if (height !== 1024 || width !== 1024) {
                alert(" Height and Width have to be  1024x1024 ! ");
                return false;
            }
            else {
                imgPath(reader.result)
                return true;
            }
        };
    }
}

