import React, { Fragment, useState, useEffect } from "react";
import BottomNavigation from "./BottomNavigationComp";
import JobDetailView from "./JobDetailViewComp";
import axios from "axios";

const SavedJobsView = () => {
  const [allsavedjobs, setallsavedjobs] = useState();

  const jobs = [
    {
      id: 1,
      postedBy: "Google",
      title: "Data Engineer - Java",
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
      title: "Product Designer",
      description: "Lorem Ipsum Tadum Bum",
      location: "Bangalore",
      experience: "2-3 years",
      requiredSkills: ["Java", "Spring", "SpringBoot"],
      expiryDate: "2020-05-01",
      status: "Open",
    },
  ];

  useEffect(() => {
    console.log("asdasdasdasds");
    async function fetchApi() {
      try {
        const data = await axios.get(
          `http://localhost:8080/userappliedjobss/615e8aa7bc8787497f6706a0`
        );
        setallsavedjobs(data.data);
        console.log(allsavedjobs + "asdddddddddasd");
      } catch (err) {
        console.log(err);
      }
    }
    fetchApi();
  }, []);

  return (
    <Fragment>
      <div
        className="pivot_menu large12 medium12 small12 primary_blue"
        style={{ width: "100%" }}
      >
        <h5 style={{ display: "inline" }}>Jobs Applied</h5>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="page_container large6 medium8 small12 center">
 
        {allsavedjobs && (
          <ul>
            {allsavedjobs.map((job) => (
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
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <BottomNavigation active="search" />
    </Fragment>
  );
};

export default SavedJobsView;
