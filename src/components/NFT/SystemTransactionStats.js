import React, { useState, useEffect } from "react";

import "../../App.css";


function Transactions() {
  let nickname = localStorage.getItem("nickname")
  let data = [
    {
      "id": 1,
      "total_deposit": 10,
      "total_withdraw": 1,
      "total_currency_amount": 8,
      "initial_balance": 10,
      "current_balance": 8,
      "total_nft_sales": 90,
      "name": "D",
      "image": "x.jpg",
      "description": "lorem ipsum",
      "currency": "BTC",
      "time": "October 13, 2014 11:19:00",
    },
    {
      "id": 2,
      "total_deposit": 10,
      "total_withdraw": 1,
      "total_currency_amount": 8,
      "initial_balance": 10,
      "current_balance": 8,
      "total_nft_sales": 90,
      "name": "amika",
      "image": "x.jpg",
      "description": "lorem ipsum",
      "currency": "ETH",
      "time": "October 13, 2014 11:11:00",
     
    },
    {
      "id": 3,
      "total_deposit": 10,
      "total_withdraw": 1,
      "total_currency_amount": 8,
      "initial_balance": 10,
      "current_balance": 8,
      "total_nft_sales": 90,
      "name": "trupti",
      "image": "x.jpg",
      "description": "lorem ipsum",
      "currency": "ETH",
      "time": "October 12, 2014 11:12:00",
    },
 
  ]
  const [dataState, setDataState] = useState(data)
  const [val, setVal] = useState(0)
  const [type, setType] = useState("")
  
  
  let setTypeValue = (typeVal) => {
    setType(typeVal)
    var result = data
    if (typeVal.localeCompare("None") != 0) {
        if(typeVal.localeCompare("All")!= 0){
                result = data.filter(obj => {
                return obj.type === typeVal
        })
    }
    } 
    setDataState(result)
    setVal(() => val+1)
  }

  let sortByTime = () => {
    let d = data.sort((a, b) => {
      let dt1 = new Date(a.time);
      let dt2 = new Date(b.time);
      return dt1-dt2;
    })
    setDataState(d)
    setVal(() => val+1)
  }

  // let setCurrValue = (typeVal) => {
  //   setType(typeVal)
  //   var result = data
  //   if (typeVal.localeCompare("None") != 0) {
  //     if(typeVal.localeCompare("All")!= 0){
  //               result = data.filter(obj => {
  //               return obj.type === typeVal
  //       })
    
  //   } 
  // }
  //   setDataState(result)
  //   setVal(() => val+1)
  // }


 
  return (

    <div className="container">
      <div>
            <h1
              class="ta-center fs-title mx-auto"
              style={{ textAlign: "center" }}
            >
              System Dashboard
            </h1>
          </div>
          
      <div className="d-flex align-items-center">
        <div className="p-2">
        <strong>Filter By:</strong>
        </div>
        <div className="p-2 ml-auto">
          <select class="form-select" aria-label="Default select example" onChange={(a) => setTypeValue(a.target.value)}>
            <option value="None" selected>Filter By Currency</option>
            <option value="Hours">ETH</option>
            <option value="Week">BTC</option>
          </select>
        </div>
        <div className="p-2">
        <button type="button" className="btn btn-info" style={{color: "white", fontWeight: "bold"}} onClick={sortByTime}>Time</button>
        </div>
        {/* {/* <div className="p-2 ml-auto">
          <select class="form-select" aria-label="Default select example" onChange={(e) => setCurrValue(e.target.value)}>
            <option value="None" selected>Filter By Currency</option>
            <option value="Btc">BTC</option>
            <option value="Inr">INR</option>
            <option value="Etc">ETC</option>
          </select>
        </div> */}
      </div>
      
      <table class="table table-hove">
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Time</th>
          <th>Image</th>
          <th>Description</th>
          <th>Currency</th>
          <th>Total Deposits</th>
          <th>Total Withdraws</th>
          <th>Total Amount</th>
          <th>Initial Balance</th>
          <th>NFT Sales</th>
        </tr>
        {dataState.map((nft) => {
        return <tr key={nft.id}>
          <td>{nft.id}</td>
          <td>{nft.name}</td>
          <td>{nft.time}</td>
          <td>
            <img width={75} height={75} src={nft.image} alt="None"/>
          </td>
          <td>{nft.description}</td>
          <td>{nft.currency}</td>
          <td>{nft.total_deposit}</td>
          <td>{nft.total_withdraw}</td>
          <td>{nft.total_currency_amount}</td>
          <td>{nft.initial_balance}</td>
          <td>{nft.total_nft_sales}</td>
         
        </tr>
      })}
      </table>
    </div>
  );
}

export default Transactions;
