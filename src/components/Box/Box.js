import React from 'react';
import './Box.css';

const Box = (prop) => {
    return (
    	<div className="Box">
    		{ prop.children }
    	</div>
  	);
}
export default Box;
