import React, { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import BottomNavigation from "./BottomNavigationComp";
import JobDetailView from "./JobDetailViewComp";

const BlockedView = ({ user }) => {
  const currPassword = user.password;
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const openmod1 = () => {
    document.getElementById(`paid${user.username}`).style.display = "Block";
  };
  const closemod1 = () => {
    document.getElementById(`paid${user.username}`).style.display = "None";
  };

  return (
    <Fragment>
      <button className="secondary_blue dlevel1" onClick={openmod1}>
        Blocked Companies
      </button>
      <div className="modal_container" id={`paid${user.username}`}>
        <div
          className="modal_content zi3"
          style={{ height: "100vh", marginTop: "0px", width: "100vw" }}
        >
          <div
            className="pivot_menu large12 medium12 small12 primary_blue"
            style={{ width: "100%" }}
          >
            <h5 style={{ display: "inline" }}>Blocked Companies</h5>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="page_container large6 medium8 small12 center">
            <ul>
              {/* {user.blockedList.map(blocked => {
                                return(
                                    <li className="neulist">
                                        <div className="large12 medium12 small12">
                                            <h5>{blocked}</h5>
                                            <button className="primary_yellow" style={{margin: "10px 0px"}}>Unblock</button>
                                        </div>
                                    </li>
                                )
                            })} */}
            </ul>
          </div>
        </div>
        <button
          className="primary_red right ta_center bottom-right"
          onClick={closemod1}
        >
          <i className="ms-Icon ms-Icon--Cancel icon-center"></i>
        </button>
      </div>
    </Fragment>
  );
};

export default BlockedView;
