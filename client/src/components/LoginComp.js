import React, { Fragment, useState, useEffect } from "react";
import { Route, NavLink, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import AppView from "./AppViewComp";
import axios from "axios";

function frosting() {
  document.querySelector(".frost_container:hover").onmousemove = (e) => {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;

    e.target.style.setProperty("--x", `${x}px`);
    e.target.style.setProperty("--y", `${y}px`);
  };
}

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const [respdata, setrespdata] = useState();

  const checkdetails = async (e) => {
    e.preventDefault();
    try {
      const user = {
        email,
        password,
      };

      console.log(user);

      //   const login = await fetch(`http://localhost:8080/login`, {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(credentials),
      //   });

      console.log(user);
      try {
        const data = (await axios.post(`http://localhost:8080/login`, user))
          .data;
        console.log(data);
        setrespdata(data);
        window.location = "/";
      } catch (err) {}

      const count = 1;

      // if (count == 1) {
      //   console.log("Logged In Successfully");
      //   Cookies.set("email", credentials.uname, {
      //     expires: 28 * 24 * 60 * 60 * 1000,
      //   });
      //   Cookies.set("email", credentials.uname, {
      //     expires: 28 * 24 * 60 * 60 * 1000,
      //     path: "/app",
      //   });
      //   window.location = "/";
      // } else {
      //   document.getElementById("badpass").style.display = "block";
      // }
    } catch (error) {
      console.error(error);
    }
  };

  const redirect = () => {
    window.location = "/app";
  };

  useEffect(() => {
    var userexists = Cookies.get("email");
    if (userexists != "" && userexists != undefined) redirect();
  }, []);

  return (
    <Fragment>
      <div className="page_container">
        <div className="column large6 medium8 small12">
          <form
            className="login_middle dlevel2 primary_white"
            onSubmit={checkdetails}
          >
            <h6 style={{ fontSize: "24px" }}>
              Sign In to your Make in Bharat Account
            </h6>
            <br />
            <br />
            <input
              type="email"
              className="btm_brdr"
              required
              onChange={(e) => setemail(e.target.value)}
            />
            <br />
            <label>Email</label>
            <br />
            <br />
            <input
              type="password"
              className="btm_brdr"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <label>Password</label>
            <br />
            <br />
            <span
              id="badpass"
              className="primary_red"
              style={{ display: "none" }}
            >
              &nbsp;Wrong email or Password&nbsp;
            </span>
            <br />
            <button className="secondary_green small">Log In</button>
            <p>
              Don't have an account? <NavLink to="/signup">Create Now</NavLink>
              <br />
              Forgot your Password? <NavLink to="/signup">Reset</NavLink>
            </p>
          </form>
        </div>
        <div className="column large6 medium8 small12">
          <form className="login_middle dlevel2 secondary_blue">
            <h2 className="ta_center">Welcome to Job Khoj</h2>
            <br />
            <h4 className="ta_center">
              Sign Up Once and Access all your Make in Bharat apps using the
              Unified Login System
            </h4>
            <br />
            <br />

            <NavLink className="pivot_title" to="/signup">
              <button
                className="large frost_container center"
                onMouseOver={frosting}
              >
                <span>Sign Up Now</span>
              </button>
            </NavLink>
          </form>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
    </Fragment>
  );
};

export default Login;
