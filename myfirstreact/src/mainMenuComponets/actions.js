
export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM="DELETE_ITEM";
export const UPDATE_ITEM="UPDATE_ITEM";
export const UPDATE_TOTAL_PRICE="UPDATE_TOTAL_PRICE";
export const UPDATE_ITEM_NAME="UPDATE_ITEM_NAME";
export const UPDATE_SOLD_QUANTITY="UPDATE_SOLD_QUANTITY";

export const STORE_TABLE_DATA="STORE_TABLE-DATA";

// actions 
export const addItem = (item) => {
  return {
    type: ADD_ITEM,
    payload: item,
  };
  
};
export const deleteItem = (itemId) => {
   return {
     type: DELETE_ITEM,
     payload: itemId,
   };
};


export const updateItem=(itemUpdateId)=>{
   return {
    type:UPDATE_ITEM,
   payload:itemUpdateId
   };
};

export const updateTotalPrice = (totalPrice) => {
  return {
    type: UPDATE_TOTAL_PRICE,
    payload: totalPrice,
  };
};

export const updateItemName=(itemname)=>{
  return {
    type:UPDATE_ITEM_NAME,
    payload:itemname
  }
}

export const UpdatedSoldQuantity=(soldQuantity)=>{
   return{
    type:UPDATE_SOLD_QUANTITY,
    payload:soldQuantity,
   }
}

//table data
export const storeTableData=(tableData)=>{
  return{
    type:STORE_TABLE_DATA,
    payload:tableData,
  }
}