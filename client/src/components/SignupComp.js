import React, { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";

function frosting(){
    document.querySelector(".frost_container:hover").onmousemove = e => {
        const x = e.pageX - e.target.offsetLeft;
        const y = e.pageY - e.target.offsetTop;
    
        e.target.style.setProperty("--x", `${x}px`);
        e.target.style.setProperty("--y", `${y}px`);
    };
}

const Signup = () => {

    const [name, setName] = useState("");
    const [username, setUname] = useState("");
    const [password, setPass] = useState("");
    const [email, setMail] = useState("");
    const [phone, setPhone] = useState("");

    const [otp, setOTP] = useState ("");

    const showform2 = async () =>{
        document.getElementById("one").style.display="none";
        document.getElementById("two").style.display="block";

        const emailbody = { 
            fullname: name,
            uname: username,
            pass: password,
            mail: email,
            call: phone,
            verotp: otp
         };

        const sendotp = await fetch(`signup/sendotp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(emailbody)
        });
    }
    const showform1 = () =>{
        document.getElementById("one").style.display="block";
        document.getElementById("two").style.display="none";
    }
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

    const verifyOTP = async e =>{
        e.preventDefault();
        try {
            var rec = document.getElementById("otp").value;
            if(rec == otp){
                document.getElementById("two").style.display="none";
                document.getElementById("one").style.display="none";
                document.getElementById("three").style.display="block";

                const regbody = { 
                    fullname: name,
                    uname: username,
                    mail: email,
                    call: phone,
                    pass: password
                };        
                const reguser = await fetch(`signup/adduser`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(regbody)
                });
        
            }
            else{
                document.getElementById("wrongotp").style.display="block";
            }
        } catch (error) {
            console.error(error);
        }
    }

    const checkdetails = async e => {
        e.preventDefault();
        try {
            showform2();
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <Fragment>
            <div className="page_container">

                <div className="column large6 medium8 small0">
                    <form className="signup_middle dlevel2" style={{background: "#eaeaff"}}>
                        <br /><br /><br /><br /><br /><br /><br /><br />
                        <h1 className="ta_center">Make in Bharat</h1><br />
                        <h3 className="ta_center">One account to access all of your Make in Bharat apps</h3><br /><br />
                    </form>
                </div>
                <div className="column large6 medium8 small12">
                    <form className="signup_middle dlevel2 primary_white" onSubmit={checkdetails} id="one">
                        <h6 style={{fontSize: "24px"}}>Sign Up for your Make in Bharat Account</h6>
                        <input type="text" className="btm_brdr" required onChange={e => setName(e.target.value)} /><br />
                        <label>Full Name</label><br /><br />
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
                        <button id="proceed" className="secondary_green small" onClick={e => setOTP(Math.floor((Math.random() * 900000) + 100000))}>Proceed</button>
                        <p>
                            Have an account already? <NavLink to="/login">Login Here</NavLink>
                        </p>
                    </form>
                    <form className="signup_middle dlevel2 primary_white" onSubmit={verifyOTP} id="two" style={{display: "none"}}>
                        <button onClick={showform1} className="icon circular primary_blue"><i className="ms-Icon ms-Icon--Back icon-small"></i></button>
                        <h5 style={{fontSize: "24px"}}>Let's get your account verified</h5><br />
                        <h6 style={{fontSize: "20px"}}>Enter OTP which has been sent to your e-mail address</h6><br />
                        <input type="text" className="btm_brdr" id="otp" /><br />
                        <label>Enter OTP</label><br />
                        <span className="primary_red" id="wrongotp">&nbsp;Wrong OTP Entered&nbsp;</span><br />
                        <button className="small secondary_green">Verify OTP</button><br /><br />
                        <p>Didn't receive an OTP <span className="primary_blue" onClick={checkdetails}>Resend</span></p>
                        
                    </form>
                    <form className="signup_middle dlevel2 primary_white" id="three" style={{display: "none"}}>
                    <br /><br /><br /><br /><br /><br />
                        <h3 className="ta_center">Thank You for Joining Us</h3><br />
                        <h5 className="ta_center">Your Account has been created, You should now head to login page to access your account</h5><br />
                        <NavLink className="pivot_title" to="/login">
                            <button className="primary_blue large frost_container center" onMouseOver={frosting}>
                                <span>Log In</span>
                            </button>
                        </NavLink>
                    </form>
                    <div className="column large0 medium0 small12">
                        <form className="signup_middle dlevel2" style={{background: "#eaeaff"}}>
                            <br /><br /><br /><br /><br /><br /><br /><br />
                            <h1 className="ta_center">Make in Bharat</h1><br />
                            <h3 className="ta_center">One account to access all of your Make in Bharat apps</h3><br /><br />
                        </form>
                    </div>

                </div>

            </div>
            <br /><br />
            <br /><br />
        </Fragment>
    );
}

export default Signup;