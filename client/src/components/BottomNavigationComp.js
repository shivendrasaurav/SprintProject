import React, { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import profileimg from "./profile.png";

const BottomNavigation = active => {

    const logout = () => {
        console.log("logout");
    }

    const profile = [{
        fullname: "Shivendra Saurav",
        email: "shivendrasaurav@gmail.com",
        password: "abcd1234",
        phone: "+91 77177 26255",
        username: "shivendrasaurav"
    }]

    useEffect(() => {
        //check active page
        if (active === "jobs") {
            document.getElementById("jobs").classList.add("active");
            document.getElementById("profile").classList.remove("active");
            document.getElementById("search").classList.remove("active");
        } else if (active === "profile") {
            document.getElementById("jobs").classList.remove("active");
            document.getElementById("profile").classList.add("active");
            document.getElementById("search").classList.remove("active");
        } else if (active === "search") {
            document.getElementById("jobs").classList.remove("active");
            document.getElementById("profile").classList.remove("active");
            document.getElementById("search").classList.add("active");
        }
    }, [active]);

    return(
        <Fragment>
            <div className="pivot_menu large12 medium12 small12 primary_blue customBtmNav" style={{position: "fixed", top: "93.5vh", width: "100%"}}>
                <NavLink id="jobs" to="/app/jobs" className="column large3 medium3 small4 ta_center">Jobs</NavLink>
                <NavLink id="search" to="/app/saved" className="column large3 medium3 small4 ta_center">Saved</NavLink>
                <NavLink id="profile" to="/app/profile" className="column large3 medium3 small4 ta_center">Profile</NavLink>
            </div>

        </Fragment>
    );
}

export default BottomNavigation;