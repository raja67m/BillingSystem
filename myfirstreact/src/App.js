import { Route, Routes} from 'react-router-dom';
import React from 'react';
import Home from './mainMenuComponets/Home';
import Billing from './mainMenuComponets/Billing';
import Inventory from './mainMenuComponets/Inventory';

import SalesReport from './mainMenuComponets/SalesReport';
import ItemAdd from './mainMenuComponets/AddItem';
import ItemRequest from './mainMenuComponets/ItemRequest';
import { Provider } from 'react-redux';
import store from './mainMenuComponets/reducer';
import Binance from './mainMenuComponets/binance';




function App() {
  return (

    <Provider store={store}>
    <div > 
    
       <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="billing" element={<Billing/>}/>
          <Route path="inventory" element={<Inventory/>}/>
          <Route path="itemAdd" element={<ItemAdd/>}/>
          <Route path="itemRequest" element={<ItemRequest/>}/>
          <Route path="Cancel" element={<Inventory/>}/>
          <Route path="homeicon" element={<Home/>}/>
          <Route path="additem" element={<Inventory/>}/>
          <Route path="salesreport" element={<SalesReport/>}/>
          <Route path="mainMenu" element={<Home/>}/>
          <Route path="newBill" element={<Billing/>}/>
          <Route path="addeditems" element={<ItemAdd/>}/>
          <Route path="addeditems" element={<ItemAdd/>}/>
          <Route path="binance" element={<Binance/>}/>
         
       </Routes>
       
    </div>
    </Provider>
  );
}

export default App;
