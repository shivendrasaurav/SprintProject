import React, { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import profileimg from "./profile.png";
import BottomNavigation from './BottomNavigationComp';

const ProfileView = () => {

    const logout = () => {
        console.log("logout");
    }

    const profile = [{
        fullname: "Shivendra Saurav",
        email: "shivendrasaurav@gmail.com",
        username: "shivendrasaurav",
        phone: "7717726255",
        password: "abcd1234",
        skills: ["Java ", "C/C++ ", "Python ", "Laravel "],
        experience: "3",
        blockedList: ["shivendrasaurav", "shivendra"]
    }]

    return(
        <Fragment>
            <div className="pivot_menu large12 medium12 small12 primary_blue" style={{width: "100%"}}>
                <h5 style={{display: "inline"}}>Profile</h5>
                </div><br /><br /><br /><br />
                <div className="large6 mediumm8 small12 center">
                    <button className="primary_yellow center radial" onClick={logout}>Log Out <i className="ms-Icon ms-Icon--PowerButton icon-small"></i></button><br /><br /><br /><br />
                    <img className="circular center profile dlevel2" src={profileimg} />
                    {profile.map(profiles =>(
                        <div key={profiles.username}>
                            <h6 className="ta_center">{profiles.fullname}</h6>
                            <span style={{display: "flex", justifyContent: "center"}}>
                                <button className="primary_blue">Update Resume</button>
                                <button className="primary_blue">Change Password</button><br />
                            </span>
                            <h6 className="extradet ta_center">Username: @{profiles.username}</h6>
                            <h6 className="extradet ta_center">Phone Number: +91{profiles.phone}</h6>
                            <h6 className="extradet ta_center">Skills: {profiles.skills}</h6>
                            <h6 className="extradet ta_center">Experience(Number of Years): {profiles.experience}</h6>
                        </div>
                    ))}
            </div>

        <BottomNavigation active="profile" />

        </Fragment>
    );
}

export default ProfileView;