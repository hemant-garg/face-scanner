import React from 'react';
import './SearchBox.css';

const SearchBox = ({ onInputChange, onClickAnalyse }) => {

    const isenterpress = (e) => {
      if (e.which === 13){
        onClickAnalyse();
      }
    }
    return (
    	<div className="SearchBox">
      <div className="searchboxcontent">
          <div className="app-description">
          This App analyzes images and returns information on age, gender,
          and multicultural appearance for each detected face based on facial characteristics.
        </div>
        <div id="error">
          There is some error - Recheck Image Url that you've entered.
        </div>
        <div className="searchinputcontainer">
            <input onChange={onInputChange} placeholder="Enter Image Url" onKeyPress={isenterpress} id="searchinput" type="search" required/>
        </div>
          <button onClick={onClickAnalyse} className="searchbutton">Analyse</button> 
      </div>
  			
  		</div>
  	);
}
export default SearchBox;