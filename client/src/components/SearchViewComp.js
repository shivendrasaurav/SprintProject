import React, { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import BottomNavigation from './BottomNavigationComp';

const SearchView = () => {

    const jobs = [{
        id: 1,
        postedBy: "Google",
        title: "Software Engineer - Java",
    },{
        id: 2,
        postedBy: "Facebook",
        title: "SDE II",
    }]

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
                <h5 style={{display: "inline"}}>Search</h5>
            </div><br /><br /><br /><br />
            <div className="page_container large6 medium8 small12 center">
                <form className="large12 medium12 small12" style={{height: "70vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <input type="text" placeholder="Search by Job Role" style={{position: "relative", top: "2px"}} />
                    <button type="submit" className="secondary_green dlevel1">Go</button>
                </form>
            </div>

        <BottomNavigation active="search" />

        </Fragment>
    );
}

export default SearchView;