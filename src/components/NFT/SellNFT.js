import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../App.css";


function SellNFT() {
  let nickname = localStorage.getItem("nickname")
  let data = [
    {
      "id": 1,
      "name": "D",
      "image": "x.jpg",
      "description": "monkey token",
      "price": 39.00,
      "time": "October 13, 2014 11:19:00",
      "last_updated_time": "October 13, 2014 11:19:00",
      "type": "Fixed",
      "highest_price": 69.90,
      "show offer": "yes"
    },
    {
      "id": 2,
      "name": "B",
      "image": "x.jpg",
      "description": "picsart token",
      "price": 39.00,
      "time": "October 13, 2014 11:11:00",
      "last_updated_time": "October 13, 2014 11:19:00",
      "type": "Auctioned",
      "highest_price": 69.90
    },
    {
      "id": 3,
      "name": "C",
      "image": "x.jpg",
      "description": "just games things",
      "price": 39.00,
      "time": "October 12, 2014 11:12:00",
      "last_updated_time": "October 13, 2014 11:19:00",
      "type": "Auctioned",
      "highest_price": 69.90
    },
  ]
  const [dataState, setDataState] = useState(data)
  const [val, setVal] = useState(0)
  const [type, setType] = useState("")
  let sortByName = () => {
    let d = data.sort((a, b) => a.name.localeCompare(b.name));
    setDataState(d)
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
  
  let setTypeValue = (typeVal) => {
    setType(typeVal)
    var result = data
    if (typeVal.localeCompare("None") != 0) {
      if (typeVal.localeCompare("Both") != 0) {
        result = data.filter(obj => {
          return obj.type === typeVal
        })
      }
    } 
    setDataState(result)
    setVal(() => val+1)
  }
  return (

   
    <div className="container">
        <div>
            <h1
              class="ta-center fs-title mx-auto"
              style={{ textAlign: "center" }}
            >
              Seller Page
            </h1>
          </div>
        <div><hr></hr></div>
      <div className="d-flex align-items-center">
        <div className="p-2">
        <strong>Sort By:</strong>
        </div>
        <div className="p-2">
        <button type="button" className="btn btn-info" style={{color: "white", fontWeight: "bold"}} onClick={sortByName}>Name</button>
        </div>
        <div className="p-2">
        <button type="button" className="btn btn-info" style={{color: "white", fontWeight: "bold"}} onClick={sortByTime}>Time</button>
        </div>
        <div className="p-2 ml-auto">
          <select class="form-select" aria-label="Default select example" onChange={(e) => setTypeValue(e.target.value)}>
            <option value="None" selected>Filter By Type</option>
            <option value="Fixed">Fixed</option>
            <option value="Auctioned">Auctioned</option>
            <option value="Both">Both</option>
          </select>
        </div>
      </div>
      
      <table class="table table-hove">
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Type</th>
          <th>Image</th>
          <th>Description</th>
          <th>Time</th>
          {(type !== "Fixed") ? <th>Last Updated Time</th> : null}
          <th>Price</th>
          {(type !== "Fixed") ? <th>Highest Price</th> : null}
          <th>Show Offer</th>
        </tr>
        {dataState.map((nft) => {
        return <tr key={nft.id}>
          <td>{nft.id}</td>
          <td>{nft.name}</td>
          <td>{nft.type}</td>
          <td>
            <img width={75} height={75} src={nft.image} alt="None"/>
          </td>
          <td>{nft.description}</td>
          <td>{nft.time}</td>
          {(type !== "Fixed") ? <td>{nft.last_updated_time}</td> : null}
          <td>{nft.price}</td>
          {(type !== "Fixed") ? <td>{nft.highest_price}</td> : null}
          <tr>
          <div className="p-2">
          <Link 
          to = "/See"
          state= {{
            NFT: nft
          }}>
            <button type="button" className="btn btn-info" style={{color: "white", fontWeight: "bold"}}>Show Offers</button>
            </Link>
        {/* <Link className="btn btn-info" to = {{ pathname: "/See",details: {nft}}}>
            Show Offer
        </Link> */}
          </div>
          </tr>
        </tr>
      })}
      </table>
    </div>
  );
}

export default SellNFT;
