import React, {useState}from "react";
import './AddItem.css';
import { Link } from 'react-router-dom';

import { useDispatch } from "react-redux";
import {addItem} from './actions';
// import  the default images 

import DefautlIamge from './images/copy/tea-16.jpg';
function ItemAdd(){
const dispatch = useDispatch();

  
 const [itemNumber,setItemNumber]=useState('');
 const [itemName,setItemName]=useState('');
 const [Purchased,setPurchased]=useState('');
 const [Price,setPrice]=useState('');
 const [sold,setSold]=useState('');
 const [stockIn,setStockIn]=useState('');
 const [Type,setType]=useState('');
 const [picUrl,setPicUrl]=useState(DefautlIamge);
 const [DefaultButton,setShowDefaultButton]=useState('');

const  addItemHandler = () =>{
   const newItem = {
      itemName:itemName,
      itemNumber:itemNumber,
      Purchased:Purchased,
      Price:Price,
      sold:sold,
      stockIn:stockIn,
      Type:Type,
     picUrl:picUrl,
     DefaultButton:DefaultButton
    }
  dispatch(addItem(newItem));
    
 setItemNumber('');
 setItemName('');
 setPurchased('');
 setPrice('');
 setSold('');
 setStockIn('');
 setType('');
setPicUrl(DefautlIamge);
setShowDefaultButton('');
   };

   // choose the type of drinks and snacks
   const handleTypeChange = (e) => {
    setType(e.target.value);
    if (e.target.value === "Drinks") {
      setPicUrl(DefautlIamge);
      setShowDefaultButton(false);     //  default button is not shown for "Drinks"
    } else if (e.target.value === "Snacks") {
      setPicUrl(''); // Clear the picUrl for "Snacks"
      setShowDefaultButton(true);
    } else {
      setPicUrl('');
      setShowDefaultButton(false);
    }
  };
  
  
   return (
    <div className="main-item-add">
          <h2>Add Item</h2>
        
      <div className="Add-item">
        

         <div className="first-label">
            
         <label>Item No</label>
         <label>Item Name</label>
         <label>Purchased</label>
         <label>Price</label>
      </div>
       
         <div className="first-input-box">
          

         
        
         <input type=" text" value={itemNumber}
           onChange={(e) => setItemNumber(e.target.value)} />

         
         <input type=" text" value={itemName}
           onChange={(e) => setItemName(e.target.value)}/>

      
         <input type=" text" value={Purchased}
           onChange={(e) => setPurchased(e.target.value)}/>


         <input type=" text" value={Price}
           onChange={(e) => setPrice(e.target.value)}/>
          
    

      


         </div>

        <div className="second-label">
        <label>Sold</label>
        
        <label>Stock In</label>
        
        <label>Type</label>

        </div>
         
         <div className="second-input-box">


        
         <input type=" text" value={sold}
           onChange={(e) => setSold(e.target.value)}/>

         <input type=" text" value={stockIn}
           onChange={(e) => setStockIn(e.target.value)}/>
       <div>
       
       <select 
       onChange={handleTypeChange } value={Type}>
       <option value="">None--</option>
        <option value="Drinks">Drinks</option>
        <option value="Snacks">Snacks</option>
        <option value="Vegitables">Vegitables</option>
        <option value="Others">Others</option>
        
        </select>
       </div>
         {/*  image function code
          */}

        

        
         <div className="buttons">
         
         
        <Link to ='/additem'>
        <button className="add-ite" onClick={addItemHandler}>Add Item</button>
      
      </Link>
       
       
        <Link to ='/Cancel'>
        <button className="Cancle-item">Cancel Item</button>
      
      </Link>
        
         
         </div>
        

         </div>
        
      
         

     

       
        

       
       

       
      

      </div>
  <div className="inven">
  
  </div>
    
      </div>
   );

   
}

export  default ItemAdd;