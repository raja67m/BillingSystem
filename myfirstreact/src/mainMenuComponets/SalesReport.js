import React from "react";
import { FiHome } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './salesReport.css';
import { useSelector } from "react-redux";
function SalesReport(){

   const tableData = useSelector((state) => state.tableData);
   return (
      <div className="Fullcol">

         <div className="firstRow">
         <div className="icon-container">
            <Link to ='/homeicon'>
            <FiHome className="custom-icon" />
            </Link>
  
     
    </div>
           
           <h2>Sales Report</h2>
         </div>

         {/*<div className="filterBox">
         <div className="drop-down-list">
      <label>Filter:</label>
       <select >
       <option value="item1">None--</option>
        <option value="item1">Today</option>
        <option value="item2">This week</option>
        <option value="item3">Last Week</option>
        <option value="item3">This Month</option>
        <option value="item3">Last Month</option>
        </select>
      </div>
   </div>*/}

         <div className="tablerow">
         <table className="table">
    <thead className="tableHead">
      <tr>
        <th>I.No</th>
        <th>Item Name</th>
        <th>Sold Quantity</th>
        <th>Total Price</th>
       
       
      </tr>
    </thead>

    <tbody>

    {tableData?.map((item,index)=>(
      <tr key={item.itemNumber}>
         <td>{index + 1}</td>
         <td>{item.itemName}</td>
         <td>{item.quantity}</td>
         <td>${item.TotalPrice}</td>

      </tr>
    ))}
      
    

    </tbody>
    </table>
         </div>




      </div>
   );
}

export default SalesReport;