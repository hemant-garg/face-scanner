import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Nav from '../components/Nav/Nav';
import SearchBox from '../components/SearchBox/SearchBox';
import ImageBox from '../components/ImageBox/ImageBox';
import Box from '../components/Box/Box';
import Flex from '../components/Flex/Flex';
import ImageDescription from '../components/ImageDescription/ImageDescription';
import './App.css';

	const app = new Clarifai.App({
	 apiKey: 'b3b388707e4f4f97b9b0aa0e39d3bc6b'
	});
	
class App extends Component {
  
  constructor(){
  	super();
  	this.state = {
  		input: '',
  		imageUrl: '',
  		boxes: [],
  		data: [],
  		route: (route) => {
  			this.setState({route: route});
  		}
  	}
  }

componentWillMount(){
	this.state.route('home');
}

onInputChange = (event) => {
	this.setState({input: event.target.value});
	this.clearCanvas();	
}

onClickAnalyse = () => {
	this.setState({imageUrl: ''});
	document.getElementById('searchinput').value = '';
	this.clearCanvas();
	if (this.state.input){
		this.setState({route: 'scan'});
		this.setState({imageUrl: this.state.input});
		this.callapi();
	}
	else{
		alert('Input Image URL');
	}
}
callapi = () => {
	app.models.predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
			  .then(res => res.outputs[0].data.regions)
			  .then(data => this.extractBoxes(data))
			  .then(boxes => this.setState({boxes: boxes}))
			  .catch(err => console.log(err));
}
onCloseClick = () => {
	this.setState({route: 'home'});
}

extractBoxes = (data) => {
	this.setState({data: data});
	const retrieveBoxes = data.map( faces => faces.region_info.bounding_box)
	const image = document.getElementById('image');
	const boxContainer = document.getElementById('box-container');
	boxContainer.innerHTML = '';
	this.clearCanvas();
	const boxes = retrieveBoxes.map( box => {
		const newbox = {
			x: box.left_col*image.width,
			y: box.top_row*image.height,
			w: (box.right_col - box.left_col)*image.width,
			h: (box.bottom_row - box.top_row)*image.height
		}
		return newbox;
	})
	data.forEach((faces, i) => {
		boxes[i].id = faces.id; 
	})
	return boxes;
}

clearCanvas = () => {
	const canvaContainer = document.getElementById('canva-container');
	if(canvaContainer!==null){
		canvaContainer.innerHTML = '';
	}
}
  render() {
  	const { route, imageUrl, boxes, data } = this.state;
  	if (route === 'home'){
  		return (
			      <div>
			        <Nav />
			        <Flex >
						<SearchBox onInputChange={this.onInputChange} onClickAnalyse={this.onClickAnalyse}/>
			        </Flex>
			      </div>
			   );
  	}
  	else{
  		return (
		      <div>
		        <Nav />
		        <Flex >
					<SearchBox onInputChange={this.onInputChange} onClickAnalyse={this.onClickAnalyse} />
		        	<Box>
		        		<div onClick={this.onCloseClick} className="close">&#10006;</div>
		        		<ImageBox imageUrl={imageUrl} boxes={boxes}/>
		        		<ImageDescription data={data} imageUrl={imageUrl} boxes={boxes} />
		        	</Box>
		        </Flex>
		      </div>
		    );	
  	}
  }
}

export default App;
