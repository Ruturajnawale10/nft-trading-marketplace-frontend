import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";

function Transactions() {
  // var currentdate = new Date();
  // var datetime =
  //   "Last Sync: " +
  //   currentdate.getDate() +
  //   "/" +
  //   (currentdate.getMonth() + 1) +
  //   "/" +
  //   currentdate.getFullYear() +
  //   " @ " +
  //   currentdate.getHours() +
  //   ":" +
  //   currentdate.getMinutes() +
  //   ":" +
  //   currentdate.getSeconds();
  // let data = [
  //   {
  //     id: 1,
  //     image:
  //       "https://images.pexels.com/photos/326058/pexels-photo-326058.jpeg?cs=srgb&dl=pexels-pixabay-326058.jpg&fm=jpg",
  //     time: datetime,
  //     type: "Image",
  //     name: "Mountain image",
  //     currency: "BTC",
  //     amount: 2,
  //     remaining_balance: 16,
  //     buyer: "Harry",
  //     seller: "Ron",
  //   },
  // ];
  const [data, setDataState] = useState(null);
  const [val, setVal] = useState(0);
  const [type, setType] = useState("");

  useEffect(() => {
    if (localStorage.getItem("username") != null) {
      axios.get("/nft/transactions/all", {}).then((response) => {
        // localStorage.setItem("wallet_id", response.data.walletID);
        console.log(response);
        setDataState(response.data);
      });
    }
  }, []);



  let sortByName = () => {
    let d = data.sort((a, b) => a.name.localeCompare(b.name));
    setDataState(d);
    setVal(() => val + 1);
  };
  let sortByTime = () => {
    let d = data.sort((a, b) => {
      let dt1 = new Date(a.time);
      let dt2 = new Date(b.time);
      return dt1 - dt2;
    });
    setDataState(d);
    setVal(() => val + 1);
  };

  let setTypeValue = (typeVal) => {
    setType(typeVal);
    var result = data;
    if (typeVal.localeCompare("None") != 0) {
      if (typeVal.localeCompare("Both") != 0) {
        result = data.filter((obj) => {
          return obj.type === typeVal;
        });
      }
    }
    setDataState(result);
    setVal(() => val + 1);
  };
  return (
    <div className="container">
      <div>
        <h1 class="ta-center fs-title mx-auto" style={{ textAlign: "center" }}>
          Past Transactions
        </h1>
      </div>
      <div className="d-flex align-items-center">
        <div className="p-2">
          <strong>Sort By:</strong>
        </div>

        <div className="p-2 ml-auto">
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={(e) => setTypeValue(e.target.value)}
          >
            <option value="None" selected>
              Filter By Period
            </option>
            <option value="Fixed">Last 24 hours</option>
            <option value="Auctioned">Last week</option>
            <option value="Both">Last month</option>
          </select>
        </div>

        <div className="p-2 ml-auto">
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={(e) => setTypeValue(e.target.value)}
          >
            <option value="None" selected>
              Filter By Currency Type
            </option>
            <option value="Fixed">BTC</option>
            <option value="Auctioned">ETH</option>
            <option value="Both">All</option>
          </select>
        </div>
      </div>
    {data && 
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
        {data.map((nft) => {
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
    </div>
  );
}

export default Transactions;
