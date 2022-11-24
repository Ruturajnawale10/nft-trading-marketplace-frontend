import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./Register/Register";
import Login from "../Login/Login";

class Main extends Component {
    render() {
      return (
        <div>
            <Routes>  
              <Route path="/user/register" element={< Register/>} />
              <Route path="/user/login" element={< Login/>} />
            </Routes>
        </div>
      );
    }
  }
  
  export default Main;
  