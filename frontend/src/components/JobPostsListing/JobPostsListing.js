import "./JobPostsListing.css";
import JobPost from "../JobPost/JobPost";
import Tabs from "../Tabs/Tabs";
function JobPostsListing({ external }) {
  return (
    <>
      <Tabs />
      <h1>Job Offerings</h1>
      {external.map((job) => {
        return (
          <JobPost
            name={job["name"]}
            office={job["office"]}
            jobDescriptions={job["jobDescriptions"]["jobDescription"]}
          />
        );
      })}
    </>
  );
}

export default JobPostsListing;
