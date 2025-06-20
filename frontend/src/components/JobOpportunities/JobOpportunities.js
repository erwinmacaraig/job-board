import "./JobOpportunities.css";
import Tabs from "../Tabs/Tabs";
import { AppContext } from "../../AppContext";
import { useContext } from "react";

function JobOpportunities() {
  const { internalPosts } = useContext(AppContext);
  return (
    <>
      <Tabs />
      <h1>Job Opportunities</h1>
      {internalPosts.map((job) => {
        return (
          <div className="card">
            <div className="container">
              <span className="job-title">{job["job_title"]}</span>
              <span>Posted by: {job["posted_by"]}</span>
              <span className="job-description">Description:</span>
              <span>{job["description"]}</span>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default JobOpportunities;
