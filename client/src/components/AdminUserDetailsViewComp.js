import React, { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const AdminUserDetailsView = () => {
  const [allusers, setallusers] = useState();

  useEffect(() => {
    async function fetchApi() {
      try {
        const data = (await axios.get(`http://localhost:8080/allusers`)).data;
        console.log(data);
        setallusers(data);
      } catch (err) {}
    }
    fetchApi();
  }, []);

  const users = [
    {
      fullname: "Shivendra Saurav",
      email: "shivendrasaurav@gmail.com",
      username: "shivendrasaurav",
      phone: "7717726255",
      password: "abcd1234",
      skills: ["Java ", "C/C++ ", "Python ", "Laravel "],
      experience: "3",
      appliedFor: ["Amazon", "Microsoft", "Google"],
      savedJobs: ["Amazon", "Microsoft", "Google"],
      blockedList: ["TCS", "Postman"],
    },
    {
      fullname: "Shiyaam OP",
      email: "shiyambhaiwaop@gmail.com",
      username: "shivendrasaurav01",
      phone: "7717726255",
      password: "abcd1234",
      skills: ["Java ", "C/C++ ", "Python ", "Laravel "],
      experience: "3",
      appliedFor: ["Amazon", "Microsoft", "Google"],
      savedJobs: ["Amazon", "Microsoft", "Google"],
      blockedList: ["TCS", "Postman"],
    },
  ];

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    /*
        const userexists = Cookies.get('username');
        if(userexists==undefined)
            redirect();
        else
            getsender(userexists);
*/
  }, []);

  return (
    <Fragment>
      <div
        className="pivot_menu large12 medium12 small12 primary_blue"
        style={{ width: "100%" }}
      >
        <h5 style={{ display: "inline" }}>User Details</h5>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="page_container large6 medium8 small12 center">
        <NavLink
          to="/"
          id="refreshbutton"
          className="snackbar_button visible small primary_inverted dlevel2"
        >
          Some content has updated, Refresh
        </NavLink>
        {allusers && (
          <ul>
            {allusers.map((user, index) => {
              return (
                <li key={index} className="neulist">
                  <div
                    className="large12 medium12 small12"
                    style={{ fontSize: "18px" }}
                  >
                    <strong>Full Name: </strong>
                    {user.name}
                    <br />
                    <strong>Email: </strong>
                    {user.email}
                    <br />
                    <strong>Phone: </strong>
                    {user.phone}
                    <br />

                    <br />

                    <button className="primary_red dlevel1">Delete</button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <button
          className="primary_red right ta_center bottom-right"
          onClick={goBack}
        >
          <i className="ms-Icon ms-Icon--Back icon-center"></i>
        </button>
      </div>
    </Fragment>
  );
};

export default AdminUserDetailsView;
