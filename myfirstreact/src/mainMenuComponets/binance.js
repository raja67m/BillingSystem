import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Binance.css'; // Import CSS file

const Binance = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://data.binance.com/api/v3/ticker/24hr');
        setData(response.data);
        console.log("This function is worked.");
      } catch (error) {
        console.error('Error  Binance data:', error);
      }
    };

    fetchData();
  }, []);
/*
useEffect(()=>{
  const fetchData=async ()=>{
    try{
      const response =await.get('');
      setData(response.data);                       
      console.log("This is function is worked.");
    }
    catch(error){
      console.error("Error fetching Binance data:",error);
    }
  };
  fetchData();
},[]);
*/ 
  return (
    <div className="binance-data">
      <h2>Binance Data 24Hrs</h2>
      {data ? (
        <table className='table'>
         <thead className='tableHead'>
            <tr>
               <td>Name</td>
               <td>High Price</td>
               <td>Low Price</td>
               <td>Quantity</td>
               <td>Average Price</td>
               <td>Last Price</td>
               <td>Volum</td>
            </tr>
          
         </thead>
         <tbody>
         {data.map((item) => (
            <tr key={item.symbol}>
              <td className="symbol">{item.symbol}:</td> 
              <td>{item.highPrice}</td>
              <td>{item.lowPrice}</td>
              <td>{item.bidQty}</td>
              <td>{item.weightedAvgPrice}</td>
              <td className="price">{item.lastPrice}</td>
              <td>{item.volume}</td>
            </tr>
          ))}
         </tbody>
         
        </table>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Binance;
