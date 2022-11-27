function Logout() {

  localStorage.removeItem("user_id");
  localStorage.removeItem("username");
  localStorage.removeItem("nickname");

  window.location = "/user/login";
}

export default Logout;
