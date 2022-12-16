import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";
import "./Wallet.css";
import WarningBanner from "../WarningBanners/WarningBanner";
import $ from "jquery";

function Wallet() {
  const [balance, setBalance] = useState({ btcbalance: 0.0, ethbalance: 0.0 });
  const [btc, setbtc] = useState(0);
  const [eth, seteth] = useState(0);
  const [btc_withdraw, setbtc_withdraw] = useState(0);
  const [eth_withdraw, seteth_withdraw] = useState(0);
  const [warningBannerDiv, setWarningBannerDiv] = useState(null);

  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [description, setDescription] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [assetURL, setAssetURL] = useState(null);
  const [sellNFT, setsell] = useState(null);
  const [auctionNFT, setauction] = useState(null);

  const [sellNFTP, setsellP] = useState(null);
  const [auctionNFTP, setauctionP] = useState(null);

  const [sellNFTID, setsellID] = useState(null);
  const [auctionNFTID, setauctionID] = useState(null);



  const [onwNFT, setownNFT] = useState([])

  useEffect(() => {
    if (!localStorage.getItem("is_verified")) {
      window.location.href = "/user/verify";
    }
    if (localStorage.getItem("wallet_id") == null) {
      axios
        .post("/wallet/create", {
          userID: localStorage.getItem("user_id"),
        })
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("wallet_id", response.data.walletID);
            axios
              .get("/nft/owned/" + localStorage.getItem("wallet_id"), {})
              .then((response) => {
                console.log(response);
                setownNFT(response.data)
              });
            window.location.reload(false);
          }
        });
    } else {
      axios
        .get("/wallet/balance/" + localStorage.getItem("wallet_id"), {})
        .then((response) => {
          setBalance({
            ethbalance: response.data.ethbalance,
            btcbalance: response.data.btcbalance,
          });
          axios
              .get("/nft/owned/" + localStorage.getItem("wallet_id"), {})
              .then((response) => {
                console.log(response);
                setownNFT(response.data)
              });
        });
    }
  }, []);

  const onDepositClick = (e) => {
    if (
      (btc === 0 && e.target.id === "btc") ||
      (eth === 0 && e.target.id === "eth")
    ) {
      setWarningBannerDiv(<WarningBanner msg={"Amount should be non-zero"} />);
      return;
    }
    
    axios
      .post("/wallet/balance/deposit", {
        walletID: localStorage.getItem("wallet_id"),
        btc: btc,
        eth: eth,
      })
      .then((response) => {
        if (response.status === 200) {
          window.location.reload(false);
        }
      });
  };

  const onWithdrawClick = (e) => {
    if (
      (btc_withdraw > balance.btcbalance && e.target.id === "btc2") ||
      (eth_withdraw > balance.ethbalance && e.target.id === "eth2")
    ) {
      setWarningBannerDiv(
        <WarningBanner
          msg={"Withdrawing amount should be less than available balance"}
        />
      );
      return;
    }

    axios
      .post("/wallet/balance/withdraw", {
        walletID: localStorage.getItem("wallet_id"),
        btc: btc_withdraw,
        eth: eth_withdraw,
      })
      .then((response) => {
        if (response.status === 200) {
          window.location.reload(false);
        }
      });
  };

  const onAuctionClick = (id) =>{
    console.log("Auction");
    console.log(id);
    setauction(true)

  }
  const onSellClick = (id) =>{
    console.log("sell");
    setsellID(id)
    setsell(true)
    
  }

  const onSellClickSubmit = (e) =>{
    console.log("sell time -> money money $$$");
    // setsell(true)
    if (
      (sellNFTP === 0)
    ) {
      setWarningBannerDiv(<WarningBanner msg={"Amount should be non-zero"} />);
      return;
    }
    console.log(sellNFTP);
    console.log(sellNFTID);

    axios
      .post("/nft/sell", {
        
        price: sellNFTP,
        tokenID: sellNFTID,
      })
      .then((response) => {
        if (response.status === 200) {
          window.location.reload(false);
        }
      });
    
  }

  const expand = () => {
    if (name && type && description && imageURL && assetURL) {
      axios
        .post("/nft/create", {
          walletID: localStorage.getItem("wallet_id"),
          name: name,
          type: type,
          description: description,
          imageURL: imageURL,
          assetURL: assetURL,
        })
        .then((response) => {
          if (response.status === 200) {
            window.location.reload(false);
          }
        });
    } else {
      $(".js-hiddenform").slideDown();
    }
  };
  return (
    <div class="container">
      <div class="row">{warningBannerDiv}</div>
      <div className="row">
        <h1 style={{ textAlign: "center" }}>Balance </h1>
        <div className="col-md-6">
          Bitcoin
          <div id="balance">{balance.btcbalance.toFixed(7)}</div>
          <div className="row">
            <div className="col-md-8">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span id="btc" class="input-group-text">
                    BTC
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => {
                    setbtc(e.target.value);
                  }}
                  placeholder="0.00"
                />
                <div class="input-group-append">
                  <button
                    id="btc"
                    class="btn btn-outline-secondary"
                    type="button"
                    onClick={onDepositClick}
                  >
                    Deposit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          Etherium
          <div id="balance">{balance.ethbalance.toFixed(7)}</div>
          <div className="row">
            <div className="col-md-8">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span id="btc" class="input-group-text">
                    ETH
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => {
                    seteth(e.target.value);
                  }}
                  placeholder="0.00"
                />
                <div class="input-group-append">
                  <button
                    id="eth"
                    class="btn btn-outline-secondary"
                    type="button"
                    onClick={onDepositClick}
                  >
                    Deposit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-8">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span id="btc" class="input-group-text">
                    BTC
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => {
                    setbtc_withdraw(e.target.value);
                  }}
                  placeholder="0.00"
                />
                <div class="input-group-append">
                  <button
                    id="btc2"
                    class="btn btn-outline-secondary"
                    type="button"
                    onClick={onWithdrawClick}
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-8">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span id="btc" class="input-group-text">
                    ETH
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => {
                    seteth_withdraw(e.target.value);
                  }}
                  placeholder="0.00"
                />
                <div class="input-group-append">
                  <button
                    id="eth2"
                    class="btn btn-outline-secondary"
                    type="button"
                    onClick={onWithdrawClick}
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div class="form-container">
          <div class="js-hiddenform">
            <div class="half-width">
              Name
              <input
                type="text"
                class="form-field"
                placeholder="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div class="half-width">
              Type
              <input
                type="text"
                class="form-field"
                placeholder="Type"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              />
            </div>
            <div class="half-width">
              Description
              <input
                type="text"
                class=" form-field"
                placeholder="Description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div class="half-width">
              Image URL
              <input
                type="text"
                class=" form-field"
                placeholder="Image URL"
                onChange={(e) => {
                  setImageURL(e.target.value);
                }}
              />
            </div>

            <div class="half-width">
              Asset URL
              <input
                type="text"
                class=" form-field"
                placeholder="Asset URL"
                onChange={(e) => {
                  setAssetURL(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <input
          id="submit"
          class="submit js-expand"
          value="Create an NFT"
          onClick={expand}
        ></input>
      </div>
      {
      sellNFT&&
      <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span id="btc" class="input-group-text">
                    BTC
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => {
                    setsellP(e.target.value);
                  }}
                  placeholder="0.00"
                />
                <div class="input-group-append">
                  <button
                    id="eth2"
                    class="btn btn-outline-secondary"
                    type="button"
                    onClick={onSellClickSubmit}
                  >
                    Sell
                  </button>
                </div>
              </div>
        }
      <div className="row">
        {/* todo: use map function to create tables */}
        {/* <div className="row">nft1</div> */}
        <table class="table table-hover" layout="auto">
        <tr>
          <th>Token ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>description</th>
        </tr>
        {onwNFT.length>0 && onwNFT.map((data) => {
        return <tr key={data.id}>
          <td width="15%">{data.tokenID}</td>
          <td width="15%">{data.name}</td>
          <td width="15%">{data.type}</td>
          <td width="15%">{data.description}</td>
          <td>
          <div>
                  <button className="btn btn-primary"
                    type="button"
                    onClick={() => onSellClick(data.tokenID)}>
                    Sell
                  </button>
                </div>
          </td>
          <td>
          <div>
                  <button className="btn btn-success"
                    type="button"
                    value = {data.id}
                    onClick={() => onAuctionClick(data.tokenID)}>
                    Auction
                  </button>
                </div>
          </td>
          {/* <td width="35%">{data.price}</td>
          <td width="35%">{data.time}</td> */}
        </tr>
      })}
      </table>
        
      </div>
    </div>
  );
}

export default Wallet;
