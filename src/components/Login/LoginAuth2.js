import React, { useState, useEffect } from "react";
import axios from "axios";

const LoginAuth2 = () => {
  const [googleSignInDiv, setGoogleSignInDiv] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("userID")) {
      window.location = "/";
    }

    axios.get("/localhost:8080/login").then((response) => {
       setGoogleSignInDiv(response.data.given_name);
    });
  }, []);

  return <div>{googleSignInDiv}</div>;
};
export default LoginAuth2;
