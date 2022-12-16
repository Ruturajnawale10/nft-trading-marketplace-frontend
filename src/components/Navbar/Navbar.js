import React, { Component } from "react";
import {
  Nav,
  NavBarLogoImage,
  NavbarLink,
  NavMenu,
  NavButton,
  NavButtonLink
} from "./NavbarElements";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { check: false };
  }

  hideComponent(e) {
    if (this.state.check === true) {
      this.setState({ check: false });
    }
  }
  handleProfileClick() {
    localStorage.setItem("notOwnerID", localStorage.getItem("userID"));
  }
  render() {
    let loggedInDiv = null;
    let walletDiv = null;
    let transactionsDiv = null;
    let loggedOutDiv = null;
    let personalDiv = null;
    if (localStorage.getItem("user_id")) {
      loggedOutDiv = (
        <NavButton>
          <NavButtonLink to="/user/logout">Logout</NavButtonLink>
        </NavButton>
      );

      walletDiv = (
        <NavButton>
          <NavButtonLink to="/wallet">Wallet</NavButtonLink>
        </NavButton>
      );

      transactionsDiv = (
        <NavButton>
          <NavButtonLink to="/transactions">Transactions</NavButtonLink>
        </NavButton>
      );

      personalDiv = (
        <NavButton>
          <NavButtonLink to="/Personal">Personal</NavButtonLink>
        </NavButton>
      );

    } else {
      loggedOutDiv = (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <NavButton>
            <NavButtonLink to="/user/login">Login</NavButtonLink>
          </NavButton>
          <NavButton>
            <NavButtonLink to="/user/register">Register</NavButtonLink>
          </NavButton>
        </div>
      );
    }
    return (
      <Nav>
        <NavbarLink to="/">
          <NavBarLogoImage src="https://cdn-icons-png.flaticon.com/512/6699/6699362.png" style={{width:"40px", height:"40px"}}></NavBarLogoImage>
        </NavbarLink>
        <NavMenu>
          {localStorage.getItem("token") && <NavbarLink onClick={this.handleProfileClick} to="/profile">Profile</NavbarLink>}
          {localStorage.getItem("token") && <NavbarLink to="/messages">My Messages</NavbarLink>}
        </NavMenu>
        {walletDiv}
        {transactionsDiv}
        {personalDiv}
        {loggedInDiv}
        {loggedOutDiv}
      </Nav>
    );
  }
}

export default Navbar;
