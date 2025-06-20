import "./PostJob.css";
import Tabs from "../Tabs/Tabs";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

function PostJob() {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    job_title: null,
    posted_by: null,
    description: null,
  });

  const { setUpdateTimestamp } = useContext(AppContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/jobs/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        posted_by: formData["posted_by"],
        job_title: formData["job_title"],
        description: formData["description"],
      }),
    });
    let data = await response.json();
    console.log(data);
    setUpdateTimestamp(Math.round(new Date().getTime() / 1000));
    resetForm();
    navigate("/");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      job_title: "",
      posted_by: "",
      description: "",
    });
  };

  return (
    <>
      <Tabs />
      <h1>Post a Job</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="newline" htmlFor="name">
            Job Title:
          </label>
          <input
            type="text"
            id="job_title"
            name="job_title"
            value={formData.job_title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="newline" htmlFor="email">
            Posted By (enter email):
          </label>
          <input
            type="email"
            id="email"
            name="posted_by"
            value={formData.posted_by}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="newline" htmlFor="description">
            Job description:
          </label>
          <textarea
            rows="10"
            cols="50"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default PostJob;
