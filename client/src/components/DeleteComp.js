import React, { Fragment, useState } from "react";

const DeleteView = ({contact}) =>{

    
    const deleteContact = async receiver => {
        try {
            const deleteContact = await fetch(`lists/${receiver}/${contact.sender}`, {
                method: "DELETE"
            });
            document.getElementById("refreshbutton").style.display="block";
        } catch (error) {
            console.error(error);
        }
    }

    const showdeletediag = () => {
        document.getElementById(`dialog${contact.receiver}`).style.display="Block";
    }
    const hidedeletediag = () => {
        document.getElementById(`dialog${contact.receiver}`).style.display="None";
    }

    return(
        <Fragment>
            <button onClick={showdeletediag} className="primary_red right dlevel1">Delete</button>

            <div className="dialogue_box" id={`dialog${contact.receiver}`}>
                 <div className="dialogue_pane large12"> 
                    <button className="primary_red right ta_center mod_close_btn" onClick={hidedeletediag} >X</button> 
                </div> 
                <div className="dialogue_content large12">
                    Arey you sure you want to delete the contact, along with the contact all your transaction hitory
                     with <span>{contact.receiver}</span> will also be deleted<br /><br />
                    <button className="primary_red dlevel1" onClick={()=>deleteContact(contact.receiver)}>Delete</button>                
                </div> 
            </div> 
        </Fragment>
    );

}

export default DeleteView;