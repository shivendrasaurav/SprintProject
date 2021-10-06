import React, { Fragment, useState, useEffect } from "react";

const DetailsView = ({contact}) => {

    const [details, setDetails] = useState ([]);

    const openmod1 = () => {
        document.getElementById(`id${contact.receiver}`).style.display="Block";
    }
    const closemod1 = () => {
        document.getElementById(`id${contact.receiver}`).style.display="None";
        document.getElementById("refreshbutton").style.display="block";
    }
    const openmod2 = () => {
        document.getElementById(`aid${contact.receiver}`).style.display="Block";
    }
    const closemod2 = () => {
        document.getElementById(`aid${contact.receiver}`).style.display="None";
    }

    const getDetails = async () => {
        try {
            const response = await fetch(`lists/${contact.receiver}/${contact.sender}`)
            const jsonData = await response.json();
            setDetails(jsonData);
        } catch (error) {
            console.error(error);
        }
    }

    const [newSender, setNewSender] = useState("");
    const [newReceiver, setNewReceiver] = useState("");
    const [newBalance, setNewBalance] = useState("");
    const [newNote, setNewNote] = useState("");

    const setSR = (a, b) =>{
        setNewSender(a);
        setNewReceiver(b);
    }

    const addbal = async () =>{
        var newType="";
        if(newBalance<0)
            newType="credit";
        else
            newType="debit";

        const transbody = { 
            sender: newSender,
            receiver: newReceiver,
            type: newType,
            balance: newBalance,
            note: newNote
         };

         const transresponse = await fetch("lists/add", {
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(transbody)
        });
    }


    const update = async () =>{

        const getTotal = await fetch(`lists/total/${newReceiver}/${newSender}`);
        const jsonData = await getTotal.json();
        var a = jsonData[0].sum;

        const contactbody = { 
            sender: newSender,
            receiver: newReceiver,
            net_balance: a
         };

        const netUpdate = await fetch(`lists/add/update`, {
            method: "PUT", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contactbody)
        });

    }

    const onFormSubmit = async e => {
        e.preventDefault();
        try {

            addbal();
            update();
            closemod2();
            closemod1();

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getDetails();
    }, []);

    return(
        <Fragment>
            <button className="primary_green dlevel1 right" onClick={openmod1}>History</button>
            <div className="modal_container" id={`id${contact.receiver}`}>
                <div className="modal_content zi3" style={{height: "100vh", marginTop: "0px", width: "100vw"}}> 
                    <div className="pivot_menu large12 medium12 small12 primary_blue" style={{width: "100%"}}>
                        <h5 style={{display: "inline"}}>History with {contact.receiver}</h5>
                    </div><br /><br /><br /><br /><br /><br />
                    <div className="large6 mediumm8 small12 center">
                        <ul className="page_container translist" style={{height: "68vh", overflow: "auto"}}>
                            {details.map(detail =>(
                                <li key={detail.datetime} className={detail.type}>
                                    <h6 className="bold">₹ {detail.balance}</h6>
                                    <hr />
                                    <span>{detail.note}</span>
                                </li>
                            ))}
                        </ul>
                        <button className="primary_red" style={{fontSize: "24px"}} onClick={openmod2}>Add</button>  
                        <button className="primary_red right ta_center bottom-right" onClick={closemod1}><i className="ms-Icon ms-Icon--Cancel icon-center"></i></button>  
                    </div>
                </div>  
            </div>  

            <div className="modal_container" id={`aid${contact.receiver}`}>
                <div className="modal_content zi3" style={{height: "100vh", marginTop: "0px", width: "100vw"}}>  
                    <div className="pivot_menu large12 medium12 small12 primary_blue" style={{width: "100%"}}>
                        <h5 style={{display: "inline"}}>Add Transaction with {contact.receiver}</h5>
                    </div><br /><br /><br /><br /><br /><br />
                    <div className="large6 mediumm8 small12 center">
                        <form className="page_container" onSubmit={onFormSubmit}>
                            <input type="number" onChange={e => setNewBalance(e.target.value)} onClick={e => setSR(contact.sender, contact.receiver)} required /><br />
                            <label>Amount to be Added/Subtracted</label><br /><br />
                            <input type="text" onChange={e => setNewNote(e.target.value)} /><br />
                            <label>Note</label><br /><br />
                            <button className="small primary_blue">Add</button><br />
                            <label>To Close click on Cancel</label>
                        </form>
                        <button className="primary_red right ta_center bottom-right" onClick={closemod2}><i className="ms-Icon ms-Icon--Cancel icon-center"></i></button>  
                    </div>
                </div>  
            </div>
        </Fragment>
    );
}

export default DetailsView;