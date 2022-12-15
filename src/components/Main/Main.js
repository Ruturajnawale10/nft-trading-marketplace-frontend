import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import Logout from "../Logout/Logout";
import NFTBuyList from "../NFT/NFTBuyList";
import Wallet from "../Wallet/Wallet";
import VerifyRequest from "../Email_verify/VerifyRequest";
import SellNFT from "../NFT/SellNFT";
import ViewDetailedNFT from "../NFT/ViewDetailedNFT";
import LoginAuth2 from "../Login/LoginAuth2";
import AuthSuccess from "../Login/AuthSuccess";

class Main extends Component {
    render() {
      return (
        <div>
        <Navbar/>
            <Routes>  
              <Route path="/See" element={<ViewDetailedNFT/>}/>  
              <Route path="/sellNFT" element={<SellNFT/>}/>
              <Route path="/" element={<NFTBuyList/>}/>
              <Route path="/user/register" element={< Register/>} />
              <Route path="/user/login" element={< Login/>} />
              <Route path="/user/verify" element={< VerifyRequest/>} />
              <Route path="/user/logout" element={<Logout/>}/>
              <Route path="/login" element={< LoginAuth2/>} />
              <Route path="/wallet" element={<Wallet/>}/>
              <Route path="/auth/success" element={<AuthSuccess/>}/>
            </Routes>
        </div>
      );
    }
  }
  
  export default Main;
  