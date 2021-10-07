import React, { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import Cookies from "js-cookie";
import profileimg from "./profile.png";
import BottomNavigation from "./BottomNavigationComp";
import ChangePassword from "./ChangePasswordViewComp";
import AppliedView from "./AppliedViewComp";
import BlockedView from "./BlockedViewComp";
import axios from "axios";

const ProfileView = () => {
  const [userdata, setuserdata] = useState();

  const logout = () => {
    console.log("logout");
  };

  const profile = [
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
  ];

  useEffect(() => {
    async function fetchApi() {
      try {
        const data = (
          await axios.get(`http://localhost:8080/user/615eae52e372b3710f8c888d`)
        ).data;

        setuserdata(data);
        console.log(data);
      } catch (err) {}
    }
    fetchApi();
  }, []);

  return (
    <Fragment>
      <div
        className="pivot_menu large12 medium12 small12 primary_blue"
        style={{ width: "100%" }}
      >
        <h5 style={{ display: "inline" }}>Profile</h5>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="large6 mediumm8 small12 center">
        <button className="primary_yellow center radial" onClick={logout}>
          Log Out <i className="ms-Icon ms-Icon--PowerButton icon-small"></i>
        </button>
        <br />
        <br />
        <br />
        <br />
        <img className="circular center profile dlevel2" src={profileimg} />

        {userdata && (
          <div key={userdata.name}>
            <h6 className="ta_center">{userdata.name}</h6>
            <br />

            <strong>Username:</strong>
            <span className="extradet">@{userdata.name}</span>
            <br />

            <strong>Email:</strong>
            <span className="extradet">{userdata.email}</span>
            <br />

            <strong>Phone:</strong>
            <span className="extradet">{userdata.phone}</span>
            <br />

            <strong>Skills:</strong>
            <span className="extradet">{userdata.skills.join(", ")}</span>
            <br />

            <strong>Experience:</strong>
            <span className="extradet">{userdata.experience}</span>
            <br />

            <span style={{ display: "flex", justifyContent: "center" }}>
              <NavLink to="/app/uploadResume"><button>Upload Resume</button></NavLink>
              <ChangePassword user={userdata} />
            </span>
            <span style={{ display: "flex", justifyContent: "center" }}>
              <BlockedView user={userdata} />
            </span>
            <br />
            <br />
            <br />
            <br />
          </div>
        )}
      </div>

      <BottomNavigation active="profile" />
    </Fragment>
  );
};

export default ProfileView;