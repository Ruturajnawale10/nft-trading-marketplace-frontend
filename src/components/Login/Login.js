import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Form, Container } from "react-bootstrap";
import DangerWarningBanner from "../WarningBanners/DangerWarningBanner.js";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [DangerwarningBannerDiv, setDangerWarningBannerDiv] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("userID")) {
      window.location = "/";
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("/user/login", {
        username: email,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("user_id", response.data.id);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("nickname", response.data.nickname);
          window.location = "/";
        }
      })
      .catch((error) => {
        setDangerWarningBannerDiv(
            <DangerWarningBanner msg="Invalid credentials" />
          );
      });
  }

  return (
    <div>
      <Container className="py-4">
        {DangerwarningBannerDiv}
        <div
          class="mx-auto mb24 p24 wmx3 bg-white bar-lg bs-xl mb24"
          style={{ width: "40%" }}
        >
          <div>
            <h1
              class="ta-center fs-title mx-auto"
              style={{ textAlign: "center" }}
            >
              Login
            </h1>
          </div>
          <br />
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="d-flex justify-content-start">
                Username
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
            <br />
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="d-flex justify-content-start">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Log In
            </Button>
          </Form>
          <br />
          <br></br>
          <Form.Text className="text-muted">
            Dont have an account? <a href="/user/register">Sign Up</a>
          </Form.Text>
          <br></br>
          <br></br>
        </div>
      </Container>
    </div>
  );
};
export default Login;
