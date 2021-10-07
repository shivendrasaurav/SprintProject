import React, { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";

const AdminDisabledView = () => {

    const jobs = [{
        id: 1,
        postedBy: "Google",
        title: "Software Engineer - Java",
        description: "Lorem Ipsum Tadum Bum",
        location: "Bangalore",
        experience: "2-3 years",
        requiredSkills: ["Java", "Spring", "SpringBoot"],
        expiryDate: "2020-05-01",
        status: "Open"
    },{
        id: 2,
        postedBy: "Facebook",
        title: "SDE II",
        description: "Lorem Ipsum Tadum Bum",
        location: "Bangalore",
        experience: "2-3 years",
        requiredSkills: ["Java", "Spring", "SpringBoot"],
        expiryDate: "2020-05-01",
        status: "Open"
    }]

    const goBack = () => {
        window.history.back();
    }

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
                <h5 style={{display: "inline"}}>Disabled Jobs</h5>
            </div><br /><br /><br /><br />
            <div className="page_container large6 medium8 small12 center">
                <NavLink to="/" id="refreshbutton" className="snackbar_button visible small primary_inverted dlevel2">Some content has updated, Refresh</NavLink>
                <ul>
                    {jobs.map(job =>(
                        <li key={job.id} className="neulist">
                            <div className="large12 medium12 small12">
                                <h6>{job.title}</h6>
                                <h5 className="bold">{job.postedBy}</h5>
                            </div>
                            <div className="large12 medium12 small12">
                                <hr style={{border: "none", height: "0.5px", background: "#1e1e1e"}}/>
                                <button className="secondary_green dlevel1">Activate</button>
                                <button className="secondary_red dlevel1">Disable</button>
                            </div>
                        </li>
                    ))}
                </ul>

                <button className="primary_red right ta_center bottom-right" onClick={goBack}><i className="ms-Icon ms-Icon--Back icon-center"></i></button>  
            </div>

        </Fragment>
    );
}

export default AdminDisabledView;