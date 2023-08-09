import React from "react";
import { FiHome } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './itemRequest.css';
import { connect } from "react-redux";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Autosuggest from "react-autosuggest";


const mapStateToProps = (state) => ({
   items: state.items,
   
 });

class  ItemRequest extends React.Component{

   constructor(props) {
      super(props);
     
     
  
      this.state = {
        selectedItems: [],
        itemName:'',
        quantity:'',
        expectedDate:null,
        showPopup: false,
        popupMessage: "",
        showResetPopup: false,
        suggestions: [],
      
      };
   }


   // popup the reset button
   showResetPopup = () => {
    
    const {selectedItems}=this.state;
    if(selectedItems.length>0){

      this.setState({ showResetPopup: true });
    }
    };

    // Reset the table function
    resetTable = () => {
   
      this.setState({ selectedItems: [] });
      this.hideResetPopup();
     
    };
    
    
    hideResetPopup = () => {
      this.setState({ showResetPopup: false });
    };
    
   // popUp message submit the button
   showPopupMessage = (message) => {

    const {selectedItems}=this.state;
    if(selectedItems.length>0){ 
      this.setState({ showPopup: true, popupMessage: message });
       this.setState({selectedItems:[]});
      setTimeout(() => {
        this.setState({ showPopup: false, popupMessage: "" });
      }, 2000);
    }
    };
  // popup message is updated
 /* showPopupMessageUpdated =(message)=>{
    this.setState({showPopup:true , popupMessage:message});
    setTimeout(()=>{
      this.setState({showPopup:true,popupMessage:""});
    },2000);
  } */ 

   // add item function
   // add item function
handleAddItem = () => {
  const { selectedItems, itemName, quantity, expectedDate } = this.state;
  const selectedItem = this.props.items.find((item) => item.itemName === itemName);

  if (selectedItem && quantity && expectedDate) {
    const itemIndex = selectedItems.findIndex((item) => item.itemName === itemName);

    if (itemIndex === -1) {
      const newItem = {
        ...selectedItem,
        quantity: parseInt(quantity),
        expectedDate: expectedDate,
      };

      const updatedSelectedItems = [...selectedItems, newItem];

      this.setState({
        selectedItems: updatedSelectedItems,
        itemName: "",
        quantity: "",
        expectedDate: null,
      });
    } else {
      const updatedSelectedItems = [...selectedItems];
      updatedSelectedItems[itemIndex].quantity += parseInt(quantity);
      if (expectedDate) {
        updatedSelectedItems[itemIndex].expectedDate = expectedDate;
      }

      this.setState({
        selectedItems: updatedSelectedItems,
        itemName: "",
        quantity: "",
        expectedDate: null,
      });
     // this.showPopupMessageUpdated("Item updated!");
    }
  }
};


   //get the value in the input fields
   handleItemNameChange = (event,{ newValue }) => {
    this.setState({ itemName: newValue });
  };

  handleItemNameSelect = (value) => {
    this.setState({ itemName: value });
  };
    handleQuantityChange = (event) => {
      this.setState({
       
        quantity:event.target.value,  
      });
    };

    handleExpectedDateChange = (date) => {
      this.setState({
        expectedDate: date,
      });
    };

// atuo suggested
fetchSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const suggestions = inputValue === '' ? [] : this.props.items.filter((item) =>
    item.itemName.toLowerCase().startsWith(inputValue) 
  );

  this.setState({ suggestions });
};


renderSuggestionsContainer = ({ containerProps, children }) => {
  if (!children) {
    return null;
  }

  return (
    <div {...containerProps} className="suggestionsContainer">
      <ul>
        {children}
      </ul>
    </div>
  );
};

   render(){

    
      const { selectedItems,itemName,quantity,expectedDate,showPopup, popupMessage,showResetPopup,suggestions} = this.state;
      const inputProps = {
        value: itemName,
        onChange: this.handleItemNameChange,
      };

     

   return(
      <div className="Itemcol">


         <div className="firstRow">
         <div className="icon-container">
            <Link to ='/homeicon'>
            <FiHome className="custom-icon" />
            </Link>
            </div>
       <h2>ItemRequest</h2>
       
    
         </div>



         <div className="secondrow">
          
         <table className="table">
    <thead className="tableHead">
      <tr>
        <th>I.No</th>
        <th>Item Name</th>
        <th>Quantity</th>
        <th>Expected Date</th>
       </tr>
      </thead>
      <tbody>
      {selectedItems.map((item,index) => (
              <tr key={item.itemName}>
               <td>{index + 1}</td>
                <td>{item.itemName}</td>
                <td>{item.quantity}</td>
                <td>{item.expectedDate && item.expectedDate.toLocaleDateString()}</td>
               
              </tr>
            ))}


      </tbody>
    </table>
</div>


 <div className="thirdRow">
<button onClick={this.showResetPopup}>Reset</button>
{showResetPopup && (
        <div className="popup">
         <div className="popup-content">

         
          <p>Are you sure you want to reset the table?</p>
          <div className="popup-buttons">
            <div className="popup-buttons">
            <button onClick={this.resetTable}>Delete</button>
            <button onClick={this.hideResetPopup} id="cancleBtn">Cancel</button>
          </div>
          </div>
          </div>
        </div>
      )}

<button onClick={() => this.showPopupMessage("Items Submited Successfully!")}>Submit</button>
 </div>

 <div className="fourthRow">

            <label>Item Name</label>
            <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={({ value }) => this.fetchSuggestions(value)}
          onSuggestionsClearRequested={() => this.setState({ suggestions: [] })}
          getSuggestionValue={(suggestion) => suggestion.itemName}
          renderSuggestion={(suggestion) => <div>{suggestion.itemName}</div>}
          inputProps={inputProps}
          renderSuggestionsContainer={this.renderSuggestionsContainer}
        />
       

{/*<input type="text"  onChange={this.handleItemNumberChange} value={itemName} />*/}

<label>Quantity</label>
<input type="text" onChange={this.handleQuantityChange} value={quantity} id="qunatity" />


<label>Expected Date:</label>
<DatePicker
          selected={expectedDate}
          onChange={this.handleExpectedDateChange}
          dateFormat="yyyy-MM-dd"
        />
{/*    
<input type="Date" onChange={this.handleExpectedDateChange} value={expectedDate} />  */}


<button onClick={this.handleAddItem} id="addedRwo" >Add</button>


 </div>

 {showPopup && (
        <div className="popup">
         <div className="popup-content">
          <p>{popupMessage}</p>
          </div>
        </div>
      )}



      </div>
   );
}
}
export default connect(mapStateToProps)(ItemRequest);