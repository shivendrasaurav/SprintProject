import React, { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import BottomNavigation from "./BottomNavigationComp";
import JobDetailView from "./JobDetailViewComp";
import axios from "axios";

const AppView = () => {
  const [alljobs, setalljobs] = useState();

  const jobs = [
    {
      id: 1,
      postedBy: "Google",
      title: "Software Engineer - Java",
      description: "Lorem Ipsum Tadum Bum",
      location: "Bangalore",
      experience: "2-3 years",
      requiredSkills: ["Java", "Spring", "SpringBoot"],
      expiryDate: "2020-05-01",
      status: "Open",
    },
    {
      id: 2,
      postedBy: "Facebook",
      title: "SDE II",
      description: "Lorem Ipsum Tadum Bum",
      location: "Bangalore",
      experience: "2-3 years",
      requiredSkills: ["Java", "Spring", "SpringBoot"],
      expiryDate: "2020-05-01",
      status: "Open",
    },
  ];

  useEffect(() => {
    async function fetchApi() {
      try {
        const data = (await axios.get(`http://localhost:8080/alljobs`)).data;

        setalljobs(data);
        console.log(data);
      } catch (err) {}
    }
    fetchApi();
  }, []);

  return (
    <Fragment>
      <div
        className="pivot_menu large12 medium12 small12 primary_blue"
        style={{ width: "100%" }}
      >
        <h5 style={{ display: "inline" }}>Jobs</h5>
      </div>
      <br />
      <br />
      <br />
      <br />

      <div className="page_container large6 medium8 small12 center">
        <form
          className="large12 medium12 small12"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Search by Job Role"
            style={{ position: "relative", top: "2px" }}
          />
          <button type="submit" className="secondary_blue dlevel1">
            Go
          </button>
        </form>
      </div>
      <div className="page_container large6 medium8 small12 center">
        <NavLink
          to="/"
          id="refreshbutton"
          className="snackbar_button visible small primary_inverted dlevel2"
        >
          Some content has updated, Refresh
        </NavLink>

        {alljobs && (
          <ul>
            {alljobs.map((job) => (
              <li key={job.id} className="neulist">
                <div className="large12 medium12 small12">
                  <h6>{job.title}</h6>
                  <h5 className="bold">{job.company_name}</h5>
                </div>
                <div className="large12 medium12 small12">
                  <hr
                    style={{
                      border: "none",
                      height: "0.5px",
                      background: "#1e1e1e",
                    }}
                  />
                  <JobDetailView job={job} />
                  <button className="secondary_blue dlevel1">Save</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <BottomNavigation active="jobs" />
    </Fragment>
  );
};

export default AppView;
