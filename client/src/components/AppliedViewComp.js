import React, { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import BottomNavigation from './BottomNavigationComp';
import JobDetailView from "./JobDetailViewComp";

const AppliedView = ({user}) => {

    const jobs = [{
        id: 1,
        postedBy: "Google",
        title: "SDE - Intern",
        description: "Lorem Ipsum Tadum Bum",
        location: "Bangalore",
        experience: "2-3 years",
        requiredSkills: ["Java", "Spring", "SpringBoot"],
        expiryDate: "2020-05-01",
        status: "Open"
    },{
        id: 2,
        postedBy: "Facebook",
        title: "SDE - I",
        description: "Lorem Ipsum Tadum Bum",
        location: "Bangalore",
        experience: "2-3 years",
        requiredSkills: ["Java", "Spring", "SpringBoot"],
        expiryDate: "2020-05-01",
        status: "Open"
    }]

    const currPassword = user.password;
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const openmod1 = () => {
        document.getElementById(`paid${user.username}`).style.display="Block";
    }
    const closemod1 = () => {
        document.getElementById(`paid${user.username}`).style.display="None";
    }

    return(
        <Fragment>
            <button className="secondary_blue dlevel1" onClick={openmod1}>Pending Applications</button>
            <div className="modal_container" id={`paid${user.username}`}>
                <div className="modal_content zi3" style={{height: "100vh", marginTop: "0px", width: "100vw"}}> 
                    <div className="pivot_menu large12 medium12 small12 primary_blue" style={{width: "100%"}}>
                        <h5 style={{display: "inline"}}>Pending Applications</h5>
                    </div><br /><br /><br /><br /><br /><br />
                    <div className="page_container large6 medium8 small12 center">
                        <ul>
                            {jobs.map(job =>(
                                <li key={job.id} className="neulist">
                                    <div className="large12 medium12 small12">
                                        <h6>{job.title}</h6>
                                        <h5 className="bold">{job.postedBy}</h5>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>  
                <button className="primary_red right ta_center bottom-right" onClick={closemod1}><i className="ms-Icon ms-Icon--Cancel icon-center"></i></button>  

            </div>


        </Fragment>
    );
}

export default AppliedView;