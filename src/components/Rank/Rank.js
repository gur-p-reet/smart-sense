import React from 'react';

const Rank=({name, entries})=>{
return(
	<div className='tc f2'>

		<div >
		 Hey '{name}' , Your current entry count is <br/> {entries}
		</div> 		
		<div>
			<p className="f3 "> Detect the face in Picture. Try with URL using .jpg extension!</p>
		</div>
 
	</div>

	);
}
export default Rank;