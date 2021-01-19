import React from 'react';
import Tilt from 'react-tilt';
import logo from './Logo.jpg';
import './Logo.css';

const Logo=()=>{
return(
	<div className="ma4 mt0">
		<Tilt className="Tilt" options={{ max : 25 }} style={{width: 250 , background:'lightpink'}} >
			<div className="Tilt-inner"> 
			 <img src={logo} className="myImg" alt="Logo"/>
			</div>
		</Tilt>
	</div>

	);
}
export default Logo;