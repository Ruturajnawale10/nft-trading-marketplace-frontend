import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";
import WarningBanner from "../WarningBanners/WarningBanner";
import $ from "jquery";

function AuthSuccess() {
  const [email, setEmail] = useState();
  const [code, setCode] = useState();

  //const {email, code} = useParams();

  useEffect(() => {
    axios.get("/auth/success", {}).then((response) => {
      setEmail(response.data.email);
      setCode(response.data.code);
    });
    // if (!localStorage.getItem("is_verified")) {
    //   window.location.href = "/user/verify";
    // }
    // if (localStorage.getItem("wallet_id") == null) {
    //   axios
    //     .post("/wallet/create", {
    //       userID: localStorage.getItem("user_id"),
    //     })
    //     .then((response) => {
    //       if (response.status === 200) {
    //         localStorage.setItem("wallet_id", response.data.walletID);
    //         axios
    //           .get("/nft/owned/" + localStorage.getItem("wallet_id"), {})
    //           .then((response) => {
    //             console.log(response);
    //             setownNFT(response.data)
    //           });
    //         window.location.reload(false);
    //       }
    //     });
    // } else {
    //   axios
    //     .get("/wallet/balance/" + localStorage.getItem("wallet_id"), {})
    //     .then((response) => {
    //       setBalance({
    //         ethbalance: response.data.ethbalance,
    //         btcbalance: response.data.btcbalance,
    //       });
    //       axios
    //           .get("/nft/owned/" + localStorage.getItem("wallet_id"), {})
    //           .then((response) => {
    //             console.log(response);
    //             setownNFT(response.data)
    //           });
    //     });
    // }
  }, []);
  return (
    <div class="container">
      hello
      <h2 style={{ textAlign: "center" }}>
        {email} and {code}
      </h2>
    </div>
  );
}

export default AuthSuccess;
