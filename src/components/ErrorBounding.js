import React, {Component} from 'react';

class ErrorBounding extends  Component {
	
	constructor(props){
	  	super(props);
	  	this.state = {
	  		hasError: false
	  	}
	  }
	  componentDidCatch(error, info){
	  	this.setState({hasError: true})
	  }
	  render(){
	  	if(this.state.hasError){
	  		return <h1>Error Occured</h1>
	  	}
	  	return (
    		this.props.children
  		);
	  }
    
}
export default ErrorBounding;
