import React from 'react';
import './Flex.css';

const Flex = (prop) => {
    return (
    	<div className="Flex">
    		{ prop.children }
    	</div>
  	);
}
export default Flex;
