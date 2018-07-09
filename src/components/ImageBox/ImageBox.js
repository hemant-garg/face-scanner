import React from 'react';
import './ImageBox.css';

const ImageBox = ( {imageUrl, boxes} ) => {
	boxes.forEach(box => {
		const boxContainer = document.getElementById('box-container');
		if (boxContainer !== null){
			boxContainer.innerHTML+=`<div id=${box.id} style="width: ${box.w}px; height: ${box.h}px; left:${box.x}px; top:${box.y}px" class="boundary-box"></div>`;
		}
	});
	return (
    	<div id="ImageBox">
  			<img id="image" src={imageUrl} alt=""/>
  			<div id="box-container">

  			</div>
  		</div>
  	);
}
export default ImageBox;