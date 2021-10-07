import React, { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import BottomNavigation from "./BottomNavigationComp";
import JobDetailView from "./JobDetailViewComp";
import axios from "axios";

const AdminNewJobView = () => {
  const [company_name, setcompany_name] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setskills] = useState([]);
  const [experience, setExperience] = useState("");
  const [expire_date, setexpire_date] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // let arr = skills.split(",");
    // setskills(arr);

    const jobpost = {
      company_name,
      title,
      description,
      location,
      skills,
      experience,
      expire_date,
    };

    console.log(jobpost);

    try {
      const data = (
        await axios.post(`http://localhost:8080/createjobs`, jobpost)
      ).data;

      console.log(data);
    } catch (err) {}
  };

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {}, []);

  return (
    <Fragment>
      <div
        className="pivot_menu large12 medium12 small12 primary_blue"
        style={{ width: "100%" }}
      >
        <h5 style={{ display: "inline" }}>New Job</h5>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="page_container large6 medium8 small12 center">
        <form className="large12 medium12 small12" onSubmit={handleSubmit}>
          <input
            type="text"
            className="btm_brdr"
            required
            onChange={(e) => setcompany_name(e.target.value)}
          />
          <br />
          <label>Company Name</label>
          <br />
          <br />
          <input
            type="text"
            className="btm_brdr"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <label>Job Title</label>
          <br />
          <br />
          <input
            type="text"
            className="btm_brdr"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <label>Description</label>
          <br />
          <br />
          <input
            type="text"
            className="btm_brdr"
            required
            onChange={(e) => setLocation(e.target.value)}
          />
          <br />
          <label>Location</label>
          <br />
          <br />
          <input
            type="text"
            className="btm_brdr"
            required
            onChange={(e) => setskills(e.target.value)}
          />
          <br />
          <label>Skills Required (Comma Seperated)</label>
          <br />
          <br />
          <input
            type="text"
            className="btm_brdr"
            required
            onChange={(e) => setExperience(e.target.value)}
          />
          <br />
          <label>Experience (In Number of Years)</label>
          <br />
          <br />
          <input
            type="date"
            className="btm_brdr"
            required
            onChange={(e) => setexpire_date(e.target.value)}
          />
          <br />
          <label>Expiry Date</label>
          <br />
          <br />
          <button type="submit" className="secondary_blue dlevel1">
            Add this Job
          </button>
        </form>

        <button
          className="primary_red right ta_center bottom-right"
          onClick={goBack}
        >
          <i className="ms-Icon ms-Icon--Back icon-center"></i>
        </button>
      </div>
    </Fragment>
  );
};

export default AdminNewJobView;
