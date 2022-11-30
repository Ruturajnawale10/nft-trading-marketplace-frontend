import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";
import "./Wallet.css";
import { NavButton, NavButtonLink } from "../Navbar/NavbarElements";
import WarningBanner from "../WarningBanners/WarningBanner";

function Wallet() {
  const [balance, setBalance] = useState({ btcbalance: 0.0, ethbalance: 0.0 });
  const [btc, setbtc] = useState(0);
  const [eth, seteth] = useState(0);
  const [btc_withdraw, setbtc_withdraw] = useState(0);
  const [eth_withdraw, seteth_withdraw] = useState(0);
  const [warningBannerDiv, setWarningBannerDiv] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("wallet_id") == null) {
      axios
        .post("/wallet/create", {
          userID: localStorage.getItem("user_id"),
        })
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("wallet_id", response.data.walletID);
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
                  <span class="input-group-text">BTC</span>
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
                  <span class="input-group-text">ETH</span>
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
                  <span class="input-group-text">BTC</span>
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
                  <span class="input-group-text">ETH</span>
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
        <NavButton>
          <NavButtonLink>Create new NFT</NavButtonLink>
        </NavButton>
      </div>
      <div className="row">
       {/* todo: use map function to create tables */}
        <div className="row">
          nft1
        </div>
        <div className="row">
          nft2
        </div>
      </div>
    </div>
  );
}

export default Wallet;
