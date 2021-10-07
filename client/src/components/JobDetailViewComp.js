import React, { Fragment, useState, useEffect } from "react";

import moment from "moment";
import axios from "axios";

const JobDetailView = ({ job }) => {
  const openmod1 = () => {
    document.getElementById(`id${job.id}`).style.display = "Block";
  };
  const closemod1 = () => {
    document.getElementById(`id${job.id}`).style.display = "None";
  };

  const queueApplied = () => {
    //add job to applied queue
    //send job to server
    const job = axios.put(`/apply/615e8aa7bc8787497f6706a0/${job.id}`)
      .then(res => {
        if(res.status === 200) {
          document.getElementById(`btn${job.id}`).disabled = true;
          document.getElementById(`did${job.id}`).style.display = "Block";
        }
        else{
          console.log("Error");
        }
      })
      


  };
  const closedialog1 = () => {
    document.getElementById(`did${job.id}`).style.display = "None";
  };

  return (
    <Fragment>
      <button
        id={`btn${job.id}`}
        className="primary_blue dlevel1"
        onClick={openmod1}
      >
        View
      </button>
      <div className="modal_container" id={`id${job.id}`}>
        <div
          className="modal_content zi3"
          style={{ height: "100vh", marginTop: "0px", width: "100vw" }}
        >
          <div
            className="pivot_menu large12 medium12 small12 primary_blue"
            style={{ width: "100%" }}
          >
            <h5 style={{ display: "inline" }}>Job Details</h5>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="large6 medium8 small12 center">
            <h6>{job.title}</h6>
            <h5>{job.postedBy}</h5>
            <br />

            <strong>Description:</strong>
            <p>{job.description}</p>
            <br />

            <strong>Requirements:</strong>
            {job.skills && <p>{job.skills.join(", ")}</p>}

            <br />

            <strong>Experience:</strong>
            <p>{job.experience}</p>
            <br />

            <strong>Location:</strong>
            <p>{job.location}</p>
            <br />

            <strong>Expires On:</strong>
            <p>{moment(job.expire_date).format("D MMMM YY")}</p>

            <button
              style={{ margin: "0" }}
              className="secondary_blue small"
              onClick={queueApplied}
            >
              Apply
            </button>

            <button
              className="primary_red right ta_center bottom-right"
              onClick={closemod1}
            >
              <i className="ms-Icon ms-Icon--Cancel icon-center"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="dialogue_box" id={`did${job.id}`}>
        <div
          className="dialogue_pane large12"
          style={{ height: "46px", backgroundColor: "#0065AFCC" }}
        >
          <span
            style={{
              fontSize: "24px",
              position: "relative",
              top: "6px",
              left: "10px",
            }}
          >
            Applied
          </span>
          <button
            className="primary_red right ta_center mode_close_btn"
            onClick={closedialog1}
          >
            <i className="ms-Icon ms-Icon--Cancel icon-center"></i>
          </button>
        </div>
        <div className="dialogue_content large12">
          <h5>Your application has been submitted successfully.</h5>
        </div>
      </div>

      <div className="dialogue_box" id={`did${job.id}`}>
        <div
          className="dialogue_pane large12"
          style={{ height: "46px", backgroundColor: "#0065AFCC" }}
        >
          <span
            style={{
              fontSize: "24px",
              position: "relative",
              top: "6px",
              left: "10px",
            }}
          >
            Failed
          </span>
          <button
            className="primary_red right ta_center mode_close_btn"
            onClick={closedialog1}
          >
            <i className="ms-Icon ms-Icon--Cancel icon-center"></i>
          </button>
        </div>
        <div className="dialogue_content large12">
          <h5>Your application could not be submitted successfully.</h5>
        </div>
      </div>
    </Fragment>
  );
};

export default JobDetailView;
