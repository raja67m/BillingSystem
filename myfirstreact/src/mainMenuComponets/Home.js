import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
function Btn1(){
   return(
     <div>
     <button className="custom-button">
      
       Billing
     </button>
   </div>
   );
 }
 function Btn2(){
  return(
    <div>
      <button className="custom-button">
      
      Inventory
    </button>  
    </div>
  );
 }
 function Btn3(){
  return(
    <div>
      <button className="custom-button">
      
      Item Request
    </button>  
    </div>
  );
 }
 function Btn4(){
  return(
    <div>
      <button className="custom-button">
      
      Sales Report
    </button>  
    </div>
  );
 }
 function Btn5(){
  return(
    <div>
      <button className="custom-button">Binance</button>
    </div>
  );
 }
 export default function Home(){
 
   return(
       <div>
    
       <h1>Main Menu</h1>
       <div className="button-container">
         <Link to ='/billing'><Btn1/></Link>
         <Link to ='/inventory'><Btn2/></Link>
         <Link to ='/itemRequest'><Btn3/></Link>
         <Link to ='/salesreport'><Btn4/></Link>
         <Link to='/binance'><Btn5/></Link>
       </div>
     </div>
   );
}