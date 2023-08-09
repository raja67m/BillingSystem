import React from "react";


function Logout(props){
   return(
      <div>
         <button onClick={props.onClick}>LogOut</button>
      </div>
   );
}

export default Logout;