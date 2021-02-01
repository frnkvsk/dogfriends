// import Resizer from 'react-image-file-resizer';

// const resizeFile = (file, w, h) => new Promise(resolve => {
//   // const fr = new FileReader();
//   var image = new Image();
//   image.url = file[0].data_url;
//   var canvas=document.createElement("canvas");
//   var context=canvas.getContext("2d");
//   canvas.width=w //image.width/4;
//   canvas.height=h //image.height/4;
//   context.drawImage(image,
//       0,
//       0,
//       image.width,
//       image.height,
//       0,
//       0,
//       canvas.width,
//       canvas.height
//   );
  
//   image.src = canvas.toDataURL();
//   console.log('resizeFile image',image)
//   console.log('resizeFile image.width',image.width)
//   return image
// });


// var loadImageFile = function () {
//   var uploadImage = document.getElementById("upload-Image");
  
//   //check and retuns the length of uploded file.
//   if (uploadImage.files.length === 0) { 
//     return; 
//   }
  
//   //Is Used for validate a valid file.
//   var uploadFile = document.getElementById("upload-Image").files[0];
//   if (!filterType.test(uploadFile.type)) {
//     alert("Please select a valid image."); 
//     return;
//   }
  
//   fileReader.readAsDataURL(uploadFile);
// }
let img = new Image();
    
  
const ResizeImage = async (file, width, height) => {
  let fileReader = new FileReader();
  let canvas=document.createElement("canvas");
  let context=canvas.getContext("2d");
  img.onload=function(){ 
    
    
    canvas.width=width;
    canvas.height=height;
    // console.log('ResizeImage img',img)    
    context.drawImage(img,
      0,
      0,
      width,
      height,
      0,
      0,
      width,
      height
    );
    // console.log('canvas',canvas.toDataURL())
    // return canvas.toDataURL();
  }
  
  let blob = new Blob(Buffer.from(file[0].data_url));
  fileReader.readAsArrayBuffer(blob);
  img.src = file[0].data_url;

  img.onresize=function(){
    return canvas.toDataURL();
  }
  // return await resize();
  // const res = resized;//await resizeFile(file, width, height);
  // console.log('res',res)
  // return res
}

export default ResizeImage
// Resizer.imageFileResizer(
//     file, // Is the file of the image which will resized.
//     maxWidth, // Is the maxWidth of the resized new image.
//     maxHeight, // Is the maxHeight of the resized new image.
//     compressFormat, // Is the compressFormat of the resized new image.
//     quality, // Is the quality of the resized new image.
//     rotation, // Is the degree of clockwise rotation to apply to uploaded image. 
//     responseUriFunc,  // Is the callBack function of the resized new image URI.
//     outputType,  // Is the output type of the resized new image.
//     minWidth, // Is the minWidth of the resized new image.
//     minHeight, // Is the minHeight of the resized new image.
//     );