import React from "react";

import "../../App.css";

function Verify() {

  return (
    <div>
      <div class="container text-center">
        <h3>You have signed up successfully!</h3>
        <p id = "info">Please check your email to verify your account.</p>
        <h4>
          <a href="/user/login">Click here to Login</a>
        </h4>
      </div>
    </div>
  );
}

export default Verify;
