import { ADD_ITEM, DELETE_ITEM,UPDATE_ITEM,UPDATE_TOTAL_PRICE,STORE_TABLE_DATA} from "./actions";
import { createStore } from "redux";
import JSON from './data.json';
//reducer and store
const initialState = {
  items:JSON,
  totalPrice:0,
  tableData:[],
};

// add the newItem
const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };

      // delete the items
      case DELETE_ITEM:
         return{

           
            ...state,
            items: state.items.filter((item) => item.itemName !== action.payload),
         };


         //update the new item
      case UPDATE_ITEM:
         return {
            ...state,
            items: state.items.map((item) => {
              if (item.itemNumber === action.payload.itemNumber) {
                return {
                  ...item,
                  itemName: action.payload.itemName,
                  Purchased: action.payload.Purchased,
                  Price:action.payload.Price,
                  sold:action.payload.sold,
                  stockIn:action.payload.stockIn,
                  Type:action.payload.Type

                 
                };
              }
              return item;
            }),
            
          };

      // update the total price
      
      case UPDATE_TOTAL_PRICE:
        return {
          ...state,
          totalPrice: action.payload,
        }; 
        
      // store the table data
      case STORE_TABLE_DATA:
        return {
          ...state,
          tableData: action.payload,
        };
      
       default:
         return state;
     }
  
  }


const store=createStore(itemReducer);

export default store;
