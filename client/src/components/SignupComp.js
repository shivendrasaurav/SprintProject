import React, { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = () => {

    const [name, setName] = useState("");
    const [username, setUname] = useState("");
    const [password, setPass] = useState("");
    const [email, setMail] = useState("");
    const [phone, setPhone] = useState("");
    const [skills, setSkills] = useState("");
    const [experience, setExp] = useState("");

    const matchPass = cnfpass =>{
        if(password == cnfpass)
            document.getElementById("notpwd").style.display="none";
        else
            document.getElementById("notpwd").style.display="block";
    }


    const checkifuserexists = async uname =>{
        const credentials = { 
            user: uname
        }
        const login = await fetch(`signup/userlist`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
        });
        const count = await login.json();
        if(count>0){
            document.getElementById("utaken").style.display="block";
            document.getElementById("proceed").disabled=true;
        }
        else{
            setUname(uname);
            document.getElementById("utaken").style.display="none";
            document.getElementById("proceed").disabled=false;
        }
    }
    const checkuniqueuser = async uname => {
        var letters = /^[A-Za-z0-9]+$/;
        if(uname.match(letters)){
            document.getElementById("unotval").style.display="none";
            if(uname.length<5 || uname.length>25)
                document.getElementById("unotlen").style.display="block";
            else{
                document.getElementById("unotlen").style.display="none";
                checkifuserexists(uname);
            }
            return true;
        }
        else
        {
            document.getElementById("unotval").style.display="block";
        }
    }

    const checkifphoneexists = async uname =>{
        const credentials = { 
            phone: uname
        }
        const login = await fetch(`signup/phonelist`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
        });
        const count = await login.json();
        if(count>0){
            document.getElementById("ptaken").style.display="block";
            document.getElementById("proceed").disabled=true;
        }
        else{
            setPhone(uname);
            document.getElementById("ptaken").style.display="none";
            document.getElementById("proceed").disabled=false;
        }
    }
    const checkuniquephone = async uname => {
        var letters = /^[0-9]+$/;
        if(uname.match(letters)){
            document.getElementById("pnotval").style.display="none";
            if(uname.length==10){
                document.getElementById("pnotlen").style.display="none";
                checkifphoneexists(uname);
            }
            else
                document.getElementById("pnotlen").style.display="block";
            return true;
        }
        else
        {
            document.getElementById("pnotval").style.display="block";
        }
    }

    const checkifmailexists = async uname =>{
        const credentials = { 
            mail: uname
        }
        const login = await fetch(`signup/maillist`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
        });
        const count = await login.json();
        if(count>0){
            document.getElementById("mtaken").style.display="block";
            document.getElementById("proceed").disabled=true;
        }
        else{
            setMail(uname);
            document.getElementById("mtaken").style.display="none";
            document.getElementById("proceed").disabled=false;
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const data = {
            name: name,
            username: username,
            password: password,
            email: email,
            phone: phone,
            skills: skills,
            experience: experience
        };
        console.log(data);


        //if signup is successful show a message in pop up and redirect to login page
    }

    return(
        <Fragment>
            <div className="page_container">
                <div className="column large6 medium8 small12">
                    <form className="signup_middle dlevel2 primary_white" onSubmit={handleSubmit} id="one">
                        <h6 style={{fontSize: "24px"}}>Sign Up for your Make in Bharat Account</h6>
                        <input type="text" className="btm_brdr" required onChange={e => setName(e.target.value)} /><br />
                        <label>Full Name</label>
                        <br /><br />

                        <input type="text" min="5" className="btm_brdr" required onBlur={e => checkuniqueuser(e.target.value)} /><br />
                        <label>Username</label>
                        <span className="primary_red" id="unotval" style={{display: "none"}}>&nbsp;Username is not valid try removing any whitespaces or special characters&nbsp;</span>
                        <span className="primary_red" id="unotlen" style={{display: "none"}}>&nbsp;Username length should be between 5 to 25 characters&nbsp;</span>
                        <span className="primary_red" id="utaken" style={{display: "none"}}>&nbsp;Username is already taken, try something else&nbsp;</span>
                        <br /><br /> 
                        
                        <input type="password" className="btm_brdr" required onChange={e => setPass(e.target.value)} /><br />
                        <label>Password</label>
                        <span className="primary_red" id="pwdnotval" style={{display: "none"}}>&nbsp;Password is not valid try removing any whitespaces or unsupported special characters&nbsp;</span>
                        <br /><br />
                        
                        <input type="password" className="btm_brdr" required onChange={e => matchPass(e.target.value)} /><br />
                        <label>Confirm Password</label>
                        <span className="primary_red" id="notpwd" style={{display: "none"}}>&nbsp;Passwords don't match&nbsp;</span>
                        <br /><br />
                        
                        <input type="email" className="btm_brdr" required onBlur={e => checkifmailexists(e.target.value)} /><br />
                        <label>Email Address</label>
                        <span className="primary_red" id="mtaken" style={{display: "none"}}>&nbsp;Email Address is already in Use&nbsp;</span>
                        <br /><br />

                        <input type="number" className="btm_brdr" required onBlur={e => checkuniquephone(e.target.value)} /><br />
                        <label>Phone Number</label>
                        <span className="primary_red" id="pnotval" style={{display: "none"}}>&nbsp;Phone Number is not valid you can only include numbers&nbsp;</span>
                        <span className="primary_red" id="pnotlen" style={{display: "none"}}>&nbsp;Phone Number length should be equal to 10 numbers&nbsp;</span>
                        <span className="primary_red" id="ptaken" style={{display: "none"}}>&nbsp;This Phone Number is already registered. Try some oher number&nbsp;</span>
                        <br /><br />

                        <input type="text" className="btm_brdr" required onChange={e => setSkills(e.target.value)} /><br />
                        <label>Skills (Comma Seperated)</label>
                        <br/><br/>

                        <input type="text" className="btm_brdr" required onChange={e => setExp(e.target.value)} /><br />
                        <label>Experience (In Number of Years)</label>
                        <br/><br/>
                        
                        <button id="proceed" className="secondary_green small">Proceed</button>
                        <p>
                            Have an account already? <NavLink to="/login">Login Here</NavLink>
                        </p>
                    </form>

                </div>

            </div>
            <br /><br />
            <br /><br />
        </Fragment>
    );
}

export default Signup;