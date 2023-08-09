import React from "react";
import './inventory.css';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { useState } from "react";
import './inventory.css';


import { useSelector,useDispatch } from "react-redux";
import { deleteItem,updateItem} from "./actions";

function Inventory(){

  const items = useSelector((state) => state.items);
  
  // filter the type fo drinks and snacks
  const [filteredItems, setFilteredItems] = useState(items);
 
// use disPatch update and delete the item
  const dispatch = useDispatch();
   
  //delete state
  const [showPopup, setShowPopup] = useState(false);
  //const [selectedItem, setSelectedItem] = useState(null);

  //Edit state
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

  // delete function
  const handleDeleteClick = (item) => {
    setShowPopup(true);
    setEditedItem(item);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteItem(editedItem.itemName));
    setShowPopup(false);
    setFilteredItems(filteredItems.filter((item) => item.itemName !== editedItem.itemName));
  };

  const handleCancelClick = () => {
    setShowPopup(false);
  };

  //edit function
  const handleEditClick = (item) => {
    setEditedItem({ ...item });
    setShowEditPopup(true);
  };
  
  const handleUpdateClick = () => {
    dispatch(updateItem(editedItem));
    const updatedItems = filteredItems.map((item) => {
      if (item.itemName === editedItem.itemName) {
        return editedItem;
      }
      return item;
    });
    setFilteredItems(updatedItems);
    setShowEditPopup(false);
  };
  
  
  

  const handleCancelEditClick = () => {
    setShowEditPopup(false);
  };
// drop down actions                                             
const handleFilterChange = (e) => {
    const filterType = e.target.value;
    if (filterType === "") {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) => item.Type === filterType);
      setFilteredItems(filtered);
    }
  };
  
   return(
   
     <div className="inventroy">
  <h2>Inventroy</h2>
  <div className="first-row">
      
  <div className="icon-container">
  <Link to ='/homeicon'>
  <FiHome className="custom-icon" />
      </Link>
  
     
    </div>

      <div className="drop-down-list">
      <label>Filter:</label>
       <select onChange={handleFilterChange}>
       <option value=" ">--Type--</option>
        <option value="Drinks">Drinks</option>           
        <option value="Snacks">Snacks</option>
        </select>
      </div>

      <div className="add-button">
      <Link to ='/itemAdd'>
      <button className="add-item">Add</button>
      
      </Link>
  
      </div>

      </div>
      {
        /*  <div className="second-row-search">
         <label>Search:</label>
         <input type="text"></input>
      </div> */
      }
     

  <div className="table-content">

  <table class="table">
    <thead className="tableHead">
      <tr>
        <th>I.No</th>
        <th>Item Name</th>
        <th>Purchased</th>
        <th>Price</th>
        <th>Sold</th>
        <th>In Stock</th>
        <th>Type</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    {(filteredItems ?? items).map((item) => (
            <tr key={item.itemNumber}>
            <td>{item.itemNumber}</td>
              <td>{item.itemName}</td>
              <td>{item.Purchased}</td> 
              <td>{item.Price}</td>
              <td>{item.sold}</td>
              <td>{item.stockIn}</td>

              <td>{item.Type}</td> 
              <td>{item.Status || "Available"}</td> 

            <td class="actions">
          <button class="edit-button" onClick={() => handleEditClick(item)}>Edit</button>


          <button class="delete-button" onClick={() => handleDeleteClick(item)}
        >Delete</button>
        
        </td>
            </tr>
          ))}
      
     
    </tbody>
       {/*This is Delete Popup */}
    {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Are you sure you want to delete?</p>
            <div className="popup-buttons">
              <button onClick={handleDeleteConfirm}>Delete</button>
              <button onClick={handleCancelClick} id="cancle-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

   {/*This is edit popup*/}
{showEditPopup && (
        <div className="popup">
          <div className="popup-content">
            <h4>Edit Item:</h4>
            <div className="pop-div">
         <div className="label-class">
         <label >Item Name:</label>
         <label >Purchased:</label>
         <label>Price:</label>
         <label>Sold:</label>
         <label>In Stock:</label>
         <label>Type:</label>
         </div>
            <div className="input-boxs">
            
            <input
  type="text"
  id="itemName"
  value={editedItem.itemName}
  onChange={(e) => setEditedItem({ ...editedItem, itemName: e.target.value })}
/>
             
             <input
                type="text"
                id="Purchased"
                value={editedItem.Purchased}
                onChange={(e) =>
                  setEditedItem({ ...editedItem, Purchased: e.target.value })
                }
              />

              
               <input
                type="text"
                id="Price"
                value={editedItem.Price}
                onChange={(e) =>
                  setEditedItem({ ...editedItem, Price: e.target.value })
                }
              />
         
         <input
                type="text"
                id="Sold"
                value={editedItem.sold}
                onChange={(e) =>
                  setEditedItem({ ...editedItem, sold: e.target.value })
                }
              />

             <input
                type="text"
                id="Stock"
                value={editedItem.stockIn}
                onChange={(e) =>
                  setEditedItem({ ...editedItem, stockIn: e.target.value })
                }
              />
   {/*
    <input
                type="text"
                id="Type"
                value={editedItem.Type}
                onChange={(e) =>
                  setEditedItem({ ...editedItem, Type: e.target.value })
                }
              />
            
   
   */}

     
<select 
       onChange={(e) => setEditedItem({...editedItem,Type:e.target.value})} value={editedItem.Type} id="Type">
       <option value="">None--</option>
        <option value="Drinks">Drinks</option>
        <option value="Snacks">Snacks</option>
        <option value="Vegitables">Vegitables</option>
        <option value="Others">Others</option>
        
        </select>
            
            </div>
            </div>
           
           
          
           
           
            <div className="form-group">
             
             
            </div>
           
         
            <div className="popup-buttons">
              <button onClick={handleUpdateClick} id="Update-btn">Update</button>
              <button onClick={handleCancelEditClick}>Cancel</button>
            </div>
          </div>
        </div>
      )}
  </table>
 




  </div>

 
</div>
   

   );
}

export default Inventory;