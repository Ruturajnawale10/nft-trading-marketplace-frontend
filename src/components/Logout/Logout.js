function Logout() {

  localStorage.removeItem("user_id");
  localStorage.removeItem("username");
  localStorage.removeItem("nickname");
  localStorage.removeItem("wallet_id");
  localStorage.removeItem("is_verified");

  window.location = "/user/login";
}

export default Logout;
