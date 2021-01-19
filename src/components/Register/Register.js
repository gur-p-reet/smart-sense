import React from 'react';

class Register extends React.Component {
	constructor(props){
		super(props);
		this.state={
			name:'',
			email:'',
			password:''
		
		}
	}
	
	onEmailChange=(event)=>{
		this.setState({email:event.target.value})
	}

	onNameChange=(event)=>{
		this.setState({name:event.target.value})
	}

	onPasswordChange=(event)=>{
		this.setState({password:event.target.value})
	}

	onRegister=()=>{
		
		if(this.state.name.length && this.state.email.length && this.state.password.length >0){
			fetch('http://localhost:3000/register',{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				name:this.state.name,
				email:this.state.email,
				password:this.state.password
			})
		})
		.then(response=>response.json())
		.then(user=>{
			if(user.id){
				this.props.loadUserInfo(user);
				this.props.onRouteChange('home');
			}
		})
		}else{
			console.log("Enter All fields");
		}
		
	}

	render(){
		return(
			<div className=" br3 ba pa5 b--black-10 mv2 w-100 w-50-m w-25-1 mw6 shadow-3 center">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				    <legend className="f4 fw6 ph0 mh0">Register</legend>
				     <div className="mt3">
			        	<label className="db fw6 lh-copy f6" htmlFor="name-address">Name</label>
			        	<input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
			        	 type="text" name="name-address" 
			        	  id="name-address"
			        	  onChange={this.onNameChange}/>
				    </div>
				    <div className="mt3">
			        	<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        	<input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
			        	 type="email" name="email-address"  
			        	 id="email-address"
			        	 onChange={this.onEmailChange}/>
				    </div>
				    <div className="mv3">
				    	<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				    	<input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				    	type="password" name="password" 
				    	 id="password"
				    	 onChange={this.onPasswordChange}/>
				    </div>
				    <div className="fw6 lh-copy mt3" >
				    	<p  onClick={this.onRegister} className="f6 link dim black db">Register</p>
				    	{/* <label className="pa0 ma0
				       lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
				    	<a href="#0" className="f6 link dim black db">Forgot your password?</a>*/}
				    </div>
			    </fieldset>
			</div>
			);
	}
}
export default Register;