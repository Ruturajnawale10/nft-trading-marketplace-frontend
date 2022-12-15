import React, { useState, useEffect } from "react";

import "../../App.css";

function Transactions() {
  var currentdate = new Date();
  var datetime =
    "Last Sync: " +
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  let data = [
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/326058/pexels-photo-326058.jpeg?cs=srgb&dl=pexels-pixabay-326058.jpg&fm=jpg",
      time: datetime,
      type: "Image",
      name: "Mountain image",
      currency: "BTC",
      amount: 2,
      remaining_balance: 16,
      buyer: "Harry",
      seller: "Ron",
    },
  ];
  const [dataState, setDataState] = useState(data);
  const [val, setVal] = useState(0);
  const [type, setType] = useState("");
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

      <table class="table table-hove">
        <tr>
          <th>Time</th>
          <th>Type</th>
          <th>NFT Name</th>
          <th>Currency</th>
          <th>Amount</th>
          <th>Remaining balance</th>
          <th>Buyer</th>
          <th>Seller</th>
        </tr>
        {dataState.map((nft) => {
          return (
            <tr key={nft.id}>
              <td>{nft.time}</td>
              <td>{nft.type}</td>
              <td>{nft.name}</td>
              <td>
                <img width={75} height={75} src={nft.image} alt="None" />
              </td>
              <td>{nft.currency}</td>
              <td>{nft.remaining_balance}</td>
              <td>{nft.buyer}</td>
              <td>{nft.seller}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default Transactions;
