import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";

function NFTList() {
  let nickname = localStorage.getItem("nickname");
  let walletID = localStorage.getItem("wallet_id");
  const [data, setData] = useState(null);
  const [dataA, setAucData] = useState(null);
  const [filterA, setfilterA] = useState(null);
  const [filterB, setfilterB] = useState(null);
  const [filterC, setfilterC] = useState(null);
  
  const [dataState, setDataState] = useState(data);
  const [val, setVal] = useState(0);
  const [type, setType] = useState("");

  useEffect(() => {
    if (localStorage.getItem("username") != null) {
      axios.get("/nft/getall", {}).then((response) => {
        // localStorage.setItem("wallet_id", response.data.walletID);
        console.log(response);
        setData(response.data);
      });
      axios.get("/auction/all", {}).then((response) => {
        // localStorage.setItem("wallet_id", response.data.walletID);
        console.log(response);
        setAucData(response.data);
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
    setfilterA(typeVal);
    console.log(typeVal);
    if(typeVal == "Fixed"){
      setfilterB(true)
      setfilterA(false)
    }
    else if(typeVal == "Auctioned") {
      setfilterB(false)
      setfilterA(true)
    }
    else setfilterA(true); setfilterB(true);
    // var result = data;
    // if (typeVal.localeCompare("None") != 0) {
    //   if (typeVal.localeCompare("Both") != 0) {
        
    //   }
    // }
    // setDataState(result);
    // setVal(() => val + 1);
  };
  
  const onAuctionBuyClick = (id) => {
    console.log("Auction Buy");
    console.log(id);
    axios
      .post("nft/buy", {
        walletID: walletID,
        tokenID: id,
      })
      .then((response) => {
        console.log("done");
        axios
          .post("nft/delete", {
            tokenID: id,
          })
          .then((response) => {
            console.log("deleted");
          });
      });
    // setsellID(id)
    // setsell(true)
  };
  const onBuyClick = (id) => {
    console.log("Buy");
    console.log(id);
    axios
      .post("nft/buy", {
        walletID: walletID,
        tokenID: id,
      })
      .then((response) => {
        console.log("done");
        axios
          .post("nft/delete", {
            tokenID: id,
          })
          .then((response) => {
            console.log("deleted");
          });
      });
    // setsellID(id)
    // setsell(true)
  };
  return (
    <div className="container">
      <div>
        <h1 class="ta-center fs-title mx-auto" style={{ textAlign: "center" }}>
          Dashboard
        </h1>
      </div>
      <div className="d-flex align-items-center">
        <div className="p-2">
          <strong>Sort By:</strong>
        </div>
        <div className="p-2">
          <button
            type="button"
            className="btn btn-info"
            style={{ color: "white", fontWeight: "bold" }}
            onClick={sortByName}
          >
            Name
          </button>
        </div>
        <div className="p-2">
          <button
            type="button"
            className="btn btn-info"
            style={{ color: "white", fontWeight: "bold" }}
            onClick={sortByTime}
          >
            Time
          </button>
        </div>
        <div className="p-2 ml-auto">
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={(e) => setTypeValue(e.target.value)}
          >
            <option value="None" selected>
              Filter By Type
            </option>
            <option value="Fixed">Fixed</option>
            <option value="Auctioned">Auctioned</option>
            <option value="Both">Both</option>
          </select>
        </div>
      </div>
      {data && filterB &&(
        <table class="table table-hove">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Type</th>
            <th>Image</th>
            <th>Description</th>
            <th>Time</th>
            {type !== "Fixed" ? <th>Last Updated Time</th> : null}
            <th>Price</th>
            {type !== "Fixed" ? <th>Highest Price</th> : null}
          </tr>
          {data.map((nft) => {
            return (
              <tr key={nft.tokenID}>
                <td>{nft.tokenID}</td>
                <td>{nft.name}</td>
                <td>{nft.type}</td>
                <td>
                  <img width={75} height={75} src="x.jpg" alt="None" />
                </td>
                <td>{nft.description}</td>
                <td>{nft.time}</td>
                {type !== "Fixed" ? <td>{nft.last_updated_time}</td> : null}
                <td>{nft.price}</td>
                {type !== "Fixed" ? <td>{nft.highest_price}</td> : null}
                <td>
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={() => onBuyClick(nft.tokenID)}
                    >
                      Buy
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </table>
      )}
      {dataA && filterA &&(
        <div>Auctions
        <h3></h3>
        <table class="table table-hove">
          <tr>
            <th>Id</th>
            <th>Owner</th>
            <th>Type</th>
            <th>Image</th>
            {/* <th>Description</th>
            <th>Time</th>
            {type !== "Fixed" ? <th>Last Updated Time</th> : null} */}
            <th>Price</th>
            {type !== "Fixed" ? <th>Highest Price</th> : null}
          </tr>
          {dataA.map((nft) => {
            return (
              <tr key={nft.tokenID}>
                <td>{nft.tokenID}</td>
                <td>{nft.ownerId}</td>
                <td>Auction</td>
                <td>
                  <img width={75} height={75} src="x.jpg" alt="None" />
                </td>
                <td>{nft.listPrice}</td>
                {/* <td>{nft.description}</td> */}
                {/* <td>{nft.time}</td> */}
                {/* {type !== "Fixed" ? <td>{nft.last_updated_time}</td> : null}
                
                {type !== "Fixed" ? <td>{nft.highest_price}</td> : null} */}
                <td>
                  <div>
                    <button
                      className="btn btn-success"
                      onClick={() => onAuctionBuyClick(nft.tokenID)}
                    >
                      Auction Buy
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </table>
        </div>
      )
      }
    </div>
  );
}

export default NFTList;
