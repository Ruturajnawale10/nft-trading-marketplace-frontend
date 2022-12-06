import React, { useState, useEffect } from "react";
import "../../App.css";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";


function ViewDetailedNFT(props){
    // const { details } = useParams();
    const location = useLocation()
    // const nft = location.state?.NFT
    const nft = location.state.NFT;
    let nickname = localStorage.getItem("nickname")
  let data = [
    {
      "id": 1,
      "price": 140.00,
      "time": "October 13, 2014 11:19:00",
      "type": "Fixed",
      "sellername": "amika"
    },
    {
      "id": 2,
      "price": 39.00,
      "time": "October 19, 2014 11:12:00",
      "sellername": "zeel"
 
    },
    {
      "id": 3,
      "price": 90.00,
      "time": "October 12, 2014 11:12:00",
      "sellername": "dhwani"
     
    },
  ]
  const [dataState, setDataState] = useState(data)
  const [val, setVal] = useState(0)
  const [type, setType] = useState("")
  
  return (

   
    <div className="container">
        
        <div>
        <h1
              class="ta-center fs-title mx-auto"
              style={{ textAlign: "center" }}
            >
              NFT Details Page 
            </h1>
        </div>
        <br>
        </br>
        <br></br>
        <div>
        <div class="card">
        <div class="row no-gutters">
            <div class="col-auto">
                <img src={nft.image} class="img-fluid" alt="" style={{width:250, height:250}}></img>
            </div>
            <div class="col">
                <div class="card-block px-2">
                    <h5>Name :   {nft.name} </h5>
                    <br></br>
                    <h6>Type: {nft.type}</h6>
                    <br></br>
                    <h6>Price: {nft.price}</h6>
                </div>
            </div>
        </div>
        <div class="card-footer w-100 text-muted">
        <h5> Description : </h5> {nft.description}
        </div>
  </div>
        </div>
        <br>
        </br>
        <br></br>
        <table class="table table-hover" layout="auto">
        <tr>
          <th>Seller Name</th>
          <th>Price Offered</th>
          <th>Time</th>
        </tr>
        {dataState.map((data) => {
        return <tr key={data.id}>
          <td width="15%">{data.sellername}</td>
          <td width="35%">{data.price}</td>
          <td width="35%">{data.time}</td>
        </tr>
      })}
      </table>
        </div>
      
      
    
  );

}


export default ViewDetailedNFT;
