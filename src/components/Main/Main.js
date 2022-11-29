import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import Logout from "../Logout/Logout";
import NFTBuyList from "../NFT/NFTBuyList";
import Wallet from "../Wallet/Wallet";

class Main extends Component {
    render() {
      return (
        <div>
        <Navbar/>
            <Routes>  
              <Route path="/" element={<NFTBuyList/>}/>
              <Route path="/user/register" element={< Register/>} />
              <Route path="/user/login" element={< Login/>} />
              <Route path="/user/logout" element={<Logout/>}/>
              <Route path="/wallet" element={<Wallet/>}/>
            </Routes>
        </div>
      );
    }
  }
  
  export default Main;
  