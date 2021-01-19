import React, {Component} from 'react';
import './App.css';

import tachyons from 'tachyons';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';

import Rank from './components/Rank/Rank';
import SignInForm from './components/SignInForm/SignInForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Register from './components/Register/Register';




const particlesParms={
	particles: {
		number:{
			value:90,
			density:{
				enable:true,
				value_area:800
			}
		}
	}
}

const faceLocation=(response)=>{
		const boxData=response.outputs[0].data.regions[0].region_info.bounding_box;
		const image=document.getElementById('inputImage');
		const width=Number(image.width);
		const height=Number(image.height);
		return{
			leftCol:boxData.left_col*width,
			rightCol:width-boxData.right_col*width,
			topRow:boxData.top_row*height,
			bottomRow:height-boxData.bottom_row*height,
		}
	}
const intialState={
		input:'',
			imageURL:'',
			box:{},
			route:'signin',
			isSignedIn:false,
			user:{
				id:'',
				name:'',
				email:'',
				entries:0,
				joined:''
			}

}

class App extends Component {
	constructor(){
		super();
		this.state=intialState;
		}

	loadUserInfo=(data)=>{
		this.setState({
				user:{
					id:data.id,
					name:data.name,
					email:data.email,
					entries:data.entries,
					joined:data.joined
			}
		})
	}

	onRouteChange=(route)=>{
		if(route==='home'){
			this.setState({isSignedIn:true});
		}else{
			this.setState(intialState);
		}
		this.setState({route:route});
		
	}

	onInputChange=(event)=>{

		this.setState({input:event.target.value});
	}
	
	displayBox=(box)=>{
		this.setState({box:box});
	}

	
	onButtonSubmit=()=>{
		
		this.setState({imageURL:this.state.input});
		fetch('http://localhost:3000/imageUrl',{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				input:this.state.input

			})
		})
		.then(response=>response.json())			
		.then(response =>{
			if(response){
				fetch('http://localhost:3000/image',{
					method:'put',
					headers:{'Content-Type':'application/json'},
					body:JSON.stringify({
						id:this.state.user.id
					})
				})
				.then(response=>response.json())
				.then(count=>{
					this.setState(Object.assign(this.state.user,{entries:count}))
					
				})
				.catch(console.log)
			}
		this.displayBox(faceLocation(response))
	    })
		.catch(err => console.log(err)) ;  // there was an error
	 }

	render() {

	  	return (
		    <div className="App">
		      	<Particles className="particles" params={particlesParms} />
		      	<Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
		      	{ 
		      		(this.state.route==='home') 
		      		?<div>
			   	      	<Logo/>
				      	<Rank name={this.state.user.name} entries={this.state.user.entries}/>
				      	<ImageLinkForm 
				      	onInputChange={this.onInputChange} 
				      	onButtonSubmit={this.onButtonSubmit}/>
				      	<FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/>	
				    </div>
				 	:(
				 		(this.state.route==='signin')
				 		? <SignInForm loadUserInfo={this.loadUserInfo} onRouteChange={this.onRouteChange}/>
				 		: <Register loadUserInfo={this.loadUserInfo} onRouteChange={this.onRouteChange}/>
				 	)
				}   		
		    </div>
	    );
	}
}

export default App;

