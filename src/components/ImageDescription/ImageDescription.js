import React from 'react';
import './ImageDescription.css';

const ImageDescription = ({boxes, imageUrl, data}) => {

  const createCanvas = (boxes) => {
    let image = document.getElementById('image');
    let canvaContainer = document.getElementById('canva-container');
    let originalImage = document.createElement('img');
    originalImage.src = imageUrl;
    let scaleX, scaleY;
    if(canvaContainer !== null){
      canvaContainer.innerHTML = '';
      boxes.forEach(box => {
        let canva = document.createElement("CANVAS");
        canvaContainer.appendChild(canva);
        canva.className = "canva";
        canva.setAttribute("id", box.id);
        if(image!==null){
           scaleX = originalImage.width/image.width;
           scaleY = originalImage.height/image.height;
         }
        let ctx=canva.getContext("2d");
        ctx.drawImage(image,box.x*scaleX,box.y*scaleY,box.w*scaleX,box.h*scaleY,0,0,canva.width,canva.height);
      }) 
        let canvas = document.getElementsByTagName('canvas');
        if (canvas[0] !== undefined) {
          canvas[0].classList.add("activecanva");
        }
        for (var i = 0; i < canvas.length; i++) {
           canvas[i].addEventListener('mouseover', extractFaceDetails);
           canvas[i].addEventListener('click', extractFaceDetails);
        }
    }
  }    
  
  const extractFaceDetails = function(){
    document.querySelector('canvas.activecanva').classList.remove("activecanva");
    this.classList.add("activecanva");
    let faceData = data.filter(face => face.id === this.id);
    showDetails(faceData[0].data.face);
  }
  
  const showDetails = (faceData) => {
     const facedetails = {
        age: faceData.age_appearance.concepts[0].name,
        gender: faceData.gender_appearance.concepts[0].name,
        culture: faceData.multicultural_appearance.concepts[0].name
    }
    const age = document.getElementById('age')
    const gender = document.getElementById('gender')
    const culture = document.getElementById('culture');
    if( age!==null && gender!==null && culture!==null){
        age.innerHTML = facedetails.age;
        gender.innerHTML = facedetails.gender;
        culture.innerHTML = facedetails.culture;
    }
    
  }  

  createCanvas(boxes);
      let canvas = document.getElementsByTagName('canvas');
      if(canvas !== undefined && data[0] !== undefined){
            showDetails(data[0].data.face);
        }
        return (
          <div className="ImageDescription">
            <div id="canva-container">
              <h1 id="loading">Loading ... </h1>
            </div>
            <div className="facedetails">
            
            <div id="result">
              <div className="facedata gender-block">
                <h3>GENDER: </h3>
                <h3 id="gender" className="value"> - </h3>
              </div>
              <div className="facedata age-block">
                <h3>AGE: </h3>
                <h3 id="age" className="value"> - </h3>
              </div>
                <div className="facedata culture-block">
                  <h3>CULTURE: </h3>
                  <h3 id="culture" className="value"> - </h3>
                </div>
            </div>
            </div>
          </div>
        );
  
}
export default ImageDescription;