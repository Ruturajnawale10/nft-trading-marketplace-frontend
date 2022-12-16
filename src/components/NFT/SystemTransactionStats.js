import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";


function Transactions() {
  let nickname = localStorage.getItem("nickname")

  useEffect(() => {
    if (localStorage.getItem("username") != null) {
      axios.get("/nft/transactions/"+ localStorage.getItem("username"), {}).then((response) => {
        // localStorage.setItem("wallet_id", response.data.walletID);
        console.log(response);
        setDataState(response.data);
      });

     
    }
  }, []);


  const [dataState, setDataState] = useState()
  const [dataState2, setDataState2] = useState()
  const [val, setVal] = useState(0)
  const [type, setType] = useState("")
  
  
  let setTypeValue = (typeVal) => {
    setType(typeVal)
    var result = dataState
    if (typeVal.localeCompare("None") != 0) {
        if(typeVal.localeCompare("All")!= 0){
                result = dataState.filter(obj => {
                return obj.type === typeVal
        })
    }
    } 
    setDataState(result)
    setVal(() => val+1)
  }

  let sortByTime = () => {
    let d = dataState.sort((a, b) => {
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
      
      
        {dataState && 
      <table class="table table-hove">
        <tr>
          <th>Time</th>
          <th>Type</th>
          <th>NFT Name</th>
          <th>NFT</th>
          <th>Currency</th>
          <th>Amount</th>
          <th>Buyer</th>
          <th>Seller</th>
        </tr>
        {dataState.map((nft) => {
          return (
            <tr key={nft.id}>
              <td>{nft.transactiontime}</td>
              <td>{nft.type}</td>
              <td>{nft.nftName}</td>
              <td>
                <img width={75} height={75} src="https://images.pexels.com/photos/326058/pexels-photo-326058.jpeg?cs=srgb&dl=pexels-pixabay-326058.jpg&fm=jpg" alt="None" />
              </td>
              <td>{nft.currency}</td>
              <td>{nft.newBalance}</td>
              <td>{nft.buyerName}</td>
              <td>{nft.sellerName}</td>
            </tr>
          );
        })}
      </table> }
      <div>
      {/* Count of total deposits, and total currency amount
Count of total withdrawals, and total currency amount
Initial system balance for this currency at the beginning of this period, and the current balance
Count of total NFT sales, and total currency amount */}
    
      </div>
    </div>
    
  );
}

export default Transactions;
