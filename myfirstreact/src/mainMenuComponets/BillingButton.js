import React from "react";
import './billiedPage.css';

import { useState} from "react";
import { useSelector } from "react-redux";

function BillingButton({ isShown, onGenerateBillClick }){

   //const [isShown, setIsShown] = useState(hideFirstBill );
   const [tenderAmount, setTenderAmount] = useState(0);

 
   
   const totalPrice = useSelector((state) => state.totalPrice);
   const gstRate = 0.18; // gst amount default
   const generateBillClick = ()=> {
    
      //setIsShown(current => !current);
   
      onGenerateBillClick(); 

  };

  //  multiple the gstRate to totalPrice
  const calculateGstAmount = () => {
   return totalPrice * gstRate;
 };

 // calculate the totlaprice gstamount
 const calculatePayableAmount = () => {
   return tenderAmount + calculateGstAmount();
 };

 // subrate the toalprice to payableamount
 const calculateChange = () => {
   return calculatePayableAmount() - totalPrice;
 };

 const handleValueAssign = (value) => {
   setTenderAmount((prevAmount) => prevAmount + value);
 };



   return(
      <div>
 {isShown && (
            <div  className="BillFirt">
               <div id="inpu-total">
                  <p>Change: <span id="total-price">${calculateChange().toFixed(2)}</span></p>
               </div>

               <div className="tablediv">
                  <div className="Amount">
                     <label>Amount</label>
                     <span id="Amount">${totalPrice}</span>
                  </div>

                  <div className="Gst">
                     <label id="gst">GST Amount</label>
                     <span>${calculateGstAmount().toFixed(2)}</span>
                  </div>

                  <div className="payable">
                     <label>Payable</label>
                     <span id="payable">${calculatePayableAmount().toFixed(2)}</span>
                  </div>

                  <div className="tender">
                    <label>Tender</label>
                    <span id="tender">${tenderAmount.toFixed(2)}</span>
                  </div>

                  <div className="Change">
                    <label>Change</label>
                    <span id="change">${calculateChange().toFixed(2)}</span>
                  </div>
               </div>
            </div>
         )}

   <button onClick={generateBillClick}>Bill</button>

<div className="secondbilled">
<div class="secondsizebtn">
            <button onClick={() => handleValueAssign(2)}>$2</button>
            <button onClick={() => handleValueAssign(10)}>$10</button>
            <button onClick={() => handleValueAssign(5)}>$5</button>
            <button onClick={() => handleValueAssign(50)}>$50</button>
         </div>
   
</div>



   
        
      </div>
   );
}

export default  BillingButton;