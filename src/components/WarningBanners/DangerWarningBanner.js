import React, {} from "react";
import "../../App.css";

function DangerWarningBanner(props) {
  return (
    <div>
      <div id="liveAlertPlaceholder"></div>
      <div class="alert alert-danger alert-dismissible" role="alert" style={{display: "block"}}> {props.msg} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>
    </div>
  );
}

export default DangerWarningBanner;
