import React, { useState, useEffect } from "react";

import "../../App.css";

function NFTList() {
  let nickname = localStorage.getItem("nickname")

  return (
    <div>
     <h1>Hello {nickname}</h1>
      </div>
  );
}

export default NFTList;
