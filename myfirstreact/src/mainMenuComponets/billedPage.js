import React from "react";
import './billiedPage.css';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
   return {
      totalPrice: state.totalPrice,
   };
};
function Billed({totalPrice}){


   return(
      <div className="BillFirt">
          <div  id="inpu-total"> 
                    <p>Change: <span id="total-price">$0.00</span></p>
          </div>   
         
      <div className="tablediv">
         <div className="Amount">
         <label>Amount</label>
      <span >${totalPrice}</span>
         </div>
     
      <div className="Gst">
         <label id="gst">GST Amount</label>
         <span>$0.00</span>
</div>

<div className="payable">
   <label>Payable</label>
   <span>${totalPrice}</span>

</div>
      </div>

      </div>
   );
}

export default connect(mapStateToProps)(Billed);