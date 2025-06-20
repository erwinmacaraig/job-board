import "./App.css";
import JobPostsListing from "./components/JobPostsListing/JobPostsListing";
import PostJob from "./components/PostJob/PostJob";
import JobOpportunities from "./components/JobOpportunities/JobOpportunities";
import { Routes, Route } from "react-router-dom";

import { useEffect, useState } from "react";

import { AppContext } from "./AppContext";
function App() {
  const [externalPosts, setExternalPosts] = useState([]);
  const [internalPosts, setInternalPosts] = useState([]);
  const [updateTimestamp, setUpdateTimestamp] = useState(
    Math.round(new Date().getTime() / 1000)
  );

  useEffect(() => {
    fetch("http://localhost:3000/jobs/external-posts", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setExternalPosts(data);
      })
      .catch((error) => {
        console.log(error);
      });

    fetch("http://localhost:3000/jobs/internal-posts", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((posting) => {
        setInternalPosts(posting);
      })
      .catch((error) => {
        alert(error);
      });
  }, [updateTimestamp]);

  return (
    <div>
      <AppContext.Provider
        value={{ externalPosts, internalPosts, setUpdateTimestamp }}
      >
        <Routes>
          <Route path="/" element={<JobOpportunities />} />
          <Route
            path="/other-jobs"
            element={<JobPostsListing external={externalPosts} />}
          />
          <Route path="/post-job" element={<PostJob />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
