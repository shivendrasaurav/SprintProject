import React, { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import BottomNavigation from './BottomNavigationComp';
import JobDetailView from './JobDetailViewComp';

const AdminDashboardView = () => {

    useEffect(() => {
/*
        const userexists = Cookies.get('username');
        if(userexists==undefined)
            redirect();
        else
            getsender(userexists);
*/
    }, []);

    return(
        <Fragment>
            <div className="pivot_menu large12 medium12 small12 primary_blue" style={{width: "100%"}}>
                <h5 style={{display: "inline"}}>Dashboard</h5>
            </div><br /><br /><br /><br />
            <div className="page_container large6 medium8 small12 center">
                <ul>
                    <li className="neulist">
                        <NavLink to="/admin/activeJobs">
                            <div className="large12 medium12 small12">
                                <h6 className="ta_center">Active Jobs</h6>
                            </div>
                        </NavLink>
                    </li>
                    <li className="neulist">
                        <NavLink to="/admin/disabledJobs">
                            <div className="large12 medium12 small12">
                                <h6 className="ta_center">Disabled Jobs</h6>
                            </div>
                        </NavLink>
                    </li>
                    <li className="neulist">
                        <NavLink to="/admin/newJob">
                            <div className="large12 medium12 small12">
                                <h6 className="ta_center">New Job</h6>
                            </div>
                        </NavLink>
                    </li>
                    <li className="neulist">
                        <NavLink to="/admin/userDetails">
                            <div className="large12 medium12 small12">
                                <h6 className="ta_center">User Details</h6>
                            </div>
                        </NavLink>
                    </li>
                    <br/><br/><br/><br/>
                    <li className="neulist" style={{background: "#CC2936", color: "#FCFCFC"}}>
                        <div className="large12 medium12 small12">
                            <h6 className="ta_center">Logout</h6>
                        </div>
                    </li>
                </ul>
            </div>
        </Fragment>
    );
}

export default AdminDashboardView;