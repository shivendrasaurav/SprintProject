import React, { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import DeleteView from "./DeleteComp";
import DetailsView from "./detailsview";
import profileimg from "./profile.png";

const AppView = () => {

    const [contacts, setContacts] = useState ([]);
    const [profile, setProfile] = useState ([]);
    const [sender, setSender] = useState("");

    const openmod1 = () => {
        document.getElementById(`addview`).style.display="Block";
    }
    const closemod1 = () => {
        document.getElementById(`addview`).style.display="None";
        document.getElementById("refreshbutton").style.display="block";
    }

    const openprofile = () => {
        document.getElementById("profile").style.display="Block";
    }
    const closeprofile = () => {
        document.getElementById("profile").style.display="None";
    }

    const [newSender, setNewSender] = useState("");
    const [newReceiver, setNewReceiver] = useState("");
    const [newBalance, setNewBalance] = useState("");
    const [newNote, setNewNote] = useState("");

    const addcontact = async () =>{

        var newType="";
        if(newBalance<0)
            newType="credit";
        else
            newType="debit";
        const contactbody = { 
            sender: newSender,
            receiver: newReceiver,
            net_balance: newBalance
         };
         const transbody = { 
            sender: newSender,
            receiver: newReceiver,
            type: newType,
            balance: newBalance,
            note: newNote
         };
         const response = await fetch("lists", {
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contactbody)
        });

        const transresponse = await fetch("/lists/add", {
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(transbody)
        });
        
    }
    const onFormSubmit = async e => {
        e.preventDefault();
        try {
            addcontact();
            closemod1();

        } catch (error) {
            console.error(error);
        }
    }

    const getList = async userexists => {
        try {
            const listbody = { 
                Sender: userexists
            }
            const response = await fetch(`/lists/${listbody.Sender}`);
            const jsonData = await response.json();

            setContacts(jsonData);
            setSender(jsonData[0].sender);
        } catch (error) {
            console.error(error);
        }
    }

    const getprofile = async userexists => {
        try {
            const profilebody = { 
                uname: userexists
            }
            const response = await fetch(`/profile/${profilebody.uname}`);
            const jsonData = await response.json();
            setProfile(jsonData);
        } catch (error) {
            console.error(error);
        }
    }

    const logout = () =>{
        console.log("logging out");
        Cookies.remove('username', {path: ''});
        Cookies.remove('username', {path: '/login'});
        window.location="/";
    }
    
    const redirect = () =>{
        window.location=('/login'); 
    }

    const getsender = async userexists =>{
        setSender(userexists);
        getList(userexists);
        getprofile(userexists);
    }

    useEffect(() => {
        const userexists = Cookies.get('username');
        if(userexists==undefined)
            redirect();
        else
            getsender(userexists);
    }, []);

    return(
        <Fragment>
            <div className="pivot_menu large12 medium12 small12 primary_blue" style={{width: "100%"}}>
                <h5 style={{display: "inline"}}>Hisab Kitab</h5>
                <button className="right icon circular" onClick={openprofile}><i className="ms-Icon ms-Icon--Contact icon-medium" style={{margin: "-3px"}}></i></button>
            </div><br /><br /><br /><br />
            <div className="page_container large6 medium8 small12 center">
                <button className="primary_red right bottom-right" onClick={openmod1}><i className="ms-Icon ms-Icon--Add icon-center"></i></button>
                <NavLink to="/" id="refreshbutton" className="snackbar_button visible small primary_inverted dlevel2">Some content has updated, Refresh</NavLink>
                <ul>
                    {contacts.map(contact =>(
                        <li key={contact.receiver} className="neulist">
                            <h3>{contact.receiver}</h3>
                            <DeleteView contact={contact} />
                            <DetailsView contact={contact} />
                            <h6>₹ {contact.net_balance}</h6>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="modal_container" id={`addview`}>
                <div className="modal_content zi3" style={{height: "100vh", marginTop: "0px", width: "100vw"}}>  
                    <div className="pivot_menu large12 medium12 small12 primary_blue" style={{width: "100%"}}>
                        <h5 style={{display: "inline"}}>Add Contact</h5>
                    </div><br /><br /><br /><br />
                    <div className="large6 mediumm8 small12 center">
                        <form className="page_container" onSubmit={onFormSubmit}>
                            <input type="text" value={sender} disabled className="large0 small0 medium0" /><br />
                            <input type="text" onChange={e => setNewReceiver(e.target.value)} onClick={e => setNewSender(sender)} required /><br />
                            <label>Contact Name</label><br /><br />
                            <input type="number" onChange={e => setNewBalance(e.target.value)} required /><br />
                            <label>Initial Balance</label><br /><br />
                            <input type="text" onChange={e => setNewNote(e.target.value)} /><br />
                            <label>Note</label><br /><br />
                            <button className="small primary_blue">Add</button><br />
                            <label>To Close click on Cancel</label>
                        </form>
                        <button className="primary_red right ta_center bottom-right" onClick={closemod1}><i className="ms-Icon ms-Icon--Cancel icon-center"></i></button>  
                    </div>
                </div>  
            </div>  

            <div className="modal_container" id="profile">
                <div className="modal_content zi3" style={{height: "100vh", marginTop: "0px", width: "100vw"}}>  
                    <div className="pivot_menu large12 medium12 small12 primary_blue" style={{width: "100%"}}>
                        <h5 style={{display: "inline"}}>Profile</h5>
                    </div><br /><br /><br /><br />
                    <div className="large6 mediumm8 small12 center">
                        <button className="primary_yellow center radial" onClick={logout}>Log Out <i className="ms-Icon ms-Icon--PowerButton icon-small"></i></button><br /><br /><br /><br />
                        <img className="circular center profile dlevel2" src={profileimg} />
                        {profile.map(profiles =>(
                            <div>
                                <h6 className="ta_center" key={profiles.fullname}>{profiles.fullname}</h6>
                                <h6 className="extradet ta_center">Username: @{profiles.username}</h6>
                                <h6 className="extradet ta_center">Phone Number: +91{profiles.phone}</h6>
                                <button className="primary_blue center">Edit Profile</button><br />
                            </div>
                        ))}
                        <button className="primary_red right ta_center bottom-right" onClick={closeprofile}><i className="ms-Icon ms-Icon--Cancel icon-center"></i></button>  
                    </div>
                </div>  
            </div>

        </Fragment>
    );
}

export default AppView;