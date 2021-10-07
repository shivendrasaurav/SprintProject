import React, {Fragment, useRef, useState} from "react";
import {NavLink} from "react-router-dom";
import axios from "axios";
import logo from "./profile.png";

const UpdateResumeView = () => {

    //--------------------------------File Upload Script----------------------------------------//

    const [file, setFile] = useState(''); // storing the uploaded file
    // storing the recived file from backend
    const [data, getFile] = useState({ name: "", path: "" });
    const [progress, setProgess] = useState(0); // progess bar
    const el = useRef(); // accesing input element

    const handleChange = (e) => {
        setProgess(0)
        const file = e.target.files[0]; // accessing file
//        console.log(file);
        setFile(file); // storing file
        console.log("Storing File");
    }

    const uploadFile = () => {

        console.log("Trying to upload file");

        const formData = new FormData();
        formData.append('file', file); // appending file

        console.log("File Appended");
        
        axios.post('/app/publish/uploadForReviewDoc', formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress);
                console.log("File Uploaded");
            }
        }).then(res => {
//            console.log(res);
            console.log("File Fetched");
            getFile({ name: res.data.name,
                    path: res.data.path
                })
        }).catch(err => console.log(err))
    

    }

    //---------------------------------------Form Data Script--------------------------------//
    
    const openApplicationSuccessModal = () =>{
        document.getElementById("appSuccessModal").style.display="block";
    }

    //---------------------------------------Form Data Script--------------------------------//

    const [authorName, setAuthorName] = useState ("");
    const [authorEmail, setAuthorEmail] = useState ("");
    const [paperTitle, setPaperTitle] = useState ("");
    const [paperAbstract, setPaperAbstract] = useState ("");

    const handleSubmit = async () =>{


        const applicationBody = { 
            author: authorName,
            email: authorEmail,
            title: paperTitle,
            abstract: paperAbstract,
            file: file.name
         };

        //check if abstract lenght is more than 250 words
        if(paperAbstract.split(" ").length > 250){
            document.getElementById("absSpawner").style.display="block";
        }

        //check if application body is empty
        if(!authorName || !authorEmail || !paperTitle || !paperAbstract || authorName.length == 0 || authorEmail.length == 0 || paperTitle.length == 0 || paperAbstract.length == 0 || paperAbstract.length >= 9990){
            displayErrorDiv(); 
        }
        else{
            openApplicationSuccessModal();
        }
        displayDiv();

        const applicationResponse = await fetch("/app/publish/submit", {
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(applicationBody)
        }).then(res => {
            if(res.status==200){
                setAuthorName(" ");
                setAuthorEmail(" ");
                setPaperTitle(" ");
                setPaperAbstract(" ");

                document.getElementById("wait").style.display="none";
                document.getElementById("success").style.display="block";
            }
            else{
                document.getElementById("wait").style.display="none";
                document.getElementById("fail").style.display="block";
            }

        }).catch(err => console.log(err))

    }

    //reload page function
    const reloadPage = () => {
        window.location.reload();
    }

    //make a function to display an div after 1 minute

    const   displayDiv = () => {
        setTimeout(() => {
            document.getElementById("reloadSpawner").style.display="block";
        }, 30000);
    }

    const   displayErrorDiv = () => {
        setTimeout(() => {
            document.getElementById("errorSpawner").style.display="block";
        }, 1000);
    }

    const goBack = () => {
        window.history.back();
    }

    const formPreventDefault = (e) => {
        e.preventDefault();
    }


    //---------------------------------------Form Front End----------------------------------//

    return(
        <Fragment>

        <div className="pivot_menu large12 medium12 small12 primary_blue" style={{ width: "100%" }}>
            <h5 style={{ display: "inline" }}>Upload Resume</h5>
        </div><br/><br/><br/><br/>
        <div className="page_container">
            <form className="form column large6 medium12 small12" onSubmit={formPreventDefault}>
                <h6>Upload Your Resume Here</h6>
                <br/>
                <p>File size should be less than 5MB and only in .doc/.docx format.</p>
                <input type="file" required onChange={handleChange} style={{height: "100px", border: "1px solid #acacac"}}/><br/>
                <button className="secondary_blue" onClick={uploadFile} style={{margin: "10px 0px"}}>Upload</button>
                <div id="docxChecker" className="primary_red" style={{display: "none", padding: "4px 10px"}}>File uploaded is not of type .doc .docx. Upload another file.</div>
                <div className="progessBar" style={{ width: progress }}>
                    Progress: {progress}
                </div>
                <hr />
            </form>

            <button className="primary_red right ta_center bottom-right" onClick={goBack}><i className="ms-Icon ms-Icon--Back icon-center"></i></button>  
        </div>

        </Fragment>
    );
}

export default UpdateResumeView;

