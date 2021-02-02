export function FillTextImage({imageBase, topText, bottomText, color}) {
  let img = new Image();
  img.src=imageBase;
  if(img.width) {
    let canvas=document.createElement('canvas');
    let ctx=canvas.getContext('2d');
    canvas.width=img.width;
    canvas.height=img.height;
    ctx.drawImage(img,
      0,
      0,
      img.width,
      img.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
    ctx.font = '30px Comic Sans MS';
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText(topText, canvas.width/2, 40);
    ctx.fillText(bottomText, canvas.width/2, canvas.height-40);
    return canvas.toDataURL();
  }   
}