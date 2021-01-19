import React from 'react';


const ImageLinkForm=( {onInputChange, onButtonSubmit})=>{
	return(
		<div className="center pattern"  style={{width:'50%'}} >
				<div className=" center pa4 br3 ">
		        	<input className="f5 pa2 w-70 " type='text' onChange={onInputChange} />
		    		<button className=" f5 pa2  w-35  bg-light-yellow hover-bg-gray pinter" 
		    			onClick={onButtonSubmit}> Detect Face</button>

				</div>
		</div>
	);
}
export default ImageLinkForm;