import React, { Fragment, useState, useEffect } from "react";

const ChangePasswordView = ({user}) => {
    
    const currPassword = user.password;
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const openmod1 = () => {
        document.getElementById(`id${user.username}`).style.display="Block";
    }
    const closemod1 = () => {
        document.getElementById(`id${user.username}`).style.display="None";
    }

    const validate = e => {
        //prevent default
        e.preventDefault();

        if(oldPassword === currPassword){
            if(newPassword === confirmPassword){
                document.getElementById(`did${user.username}`).style.display="Block";
            }
            else{
                document.getElementById(`diderror1`).style.display="Block";
            }
        }
        else{
            document.getElementById(`diderror2`).style.display="Block";
        }
    }
    const closedialog1 = () => {
        document.getElementById(`did${user.username}`).style.display="None";
    }
    const closeerror1 = () => {
        document.getElementById(`diderror1`).style.display="None";
    }
    const closeerror2 = () => {
        document.getElementById(`diderror2`).style.display="None";
    }

    return(
        <Fragment>
            <button className="secondary_blue dlevel1" onClick={openmod1}>Change Password</button>
            <div className="modal_container" id={`id${user.username}`}>
                <div className="modal_content zi3" style={{height: "100vh", marginTop: "0px", width: "100vw"}}> 
                    <div className="pivot_menu large12 medium12 small12 primary_blue" style={{width: "100%"}}>
                        <h5 style={{display: "inline"}}>Change Password</h5>
                    </div><br /><br /><br /><br /><br /><br />
                    <div className="large6 medium8 small12 center">
                        <form className="large12 medium12 small12" style={{width: "100%"}} onSubmit={validate}>
                            <input type="password" placeholder="Old Password" onChange={e => setOldPassword(e.target.value)} required />
                            <br/><br/>
                            <input type="password" placeholder="New Password" onChange={e => setNewPassword(e.target.value)} required />
                            <br/><br/>
                            <input type="password" placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)} required />
                            <br/><br/>

                            <button style={{margin: "0"}} className="secondary_blue small">Change Password</button>
                        </form>

                        <button className="primary_red right ta_center bottom-right" onClick={closemod1}><i className="ms-Icon ms-Icon--Cancel icon-center"></i></button>  
                    </div>
                </div>  
            </div>

            <div className="dialogue_box" id={`did${user.username}`}>
                <div className="dialogue_pane large12" style={{height: "46px", backgroundColor: "#0065AFCC"}}>
                    <span style={{fontSize: "24px", position: "relative", top: "6px", left: "10px"}}>Done</span>
                    <button className="primary_red right ta_center mode_close_btn" onClick={closedialog1}><i className="ms-Icon ms-Icon--Cancel icon-center"></i></button>
                </div>
                <div className="dialogue_content large12">
                    <h5>
                        Your password has been updated successfully.
                    </h5>
                </div>
            </div>

            <div className="dialogue_box" id={`diderror1`}>
                <div className="dialogue_pane large12" style={{height: "46px", backgroundColor: "#CC2936CC"}}>
                    <span style={{fontSize: "24px", position: "relative", top: "6px", left: "10px"}}>Error</span>
                    <button className="primary_white right ta_center mode_close_btn" onClick={closeerror1}><i className="ms-Icon ms-Icon--Cancel icon-center"></i></button>
                </div>
                <div className="dialogue_content large12">
                    <h5>
                        New password and Confirm password are not same.
                    </h5>
                </div>
            </div>

            <div className="dialogue_box" id={`diderror2`}>
                <div className="dialogue_pane large12" style={{height: "46px", backgroundColor: "#CC2936CC"}}>
                    <span style={{fontSize: "24px", position: "relative", top: "6px", left: "10px"}}>Error</span>
                    <button className="primary_white right ta_center mode_close_btn" onClick={closeerror2}><i className="ms-Icon ms-Icon--Cancel icon-center"></i></button>
                </div>
                <div className="dialogue_content large12">
                    <h5>
                        Old password and Current password are not same.
                    </h5>
                </div>
            </div>
                

        </Fragment>
    );
}

export default ChangePasswordView;