import "./JobPost.css";

function JobPost({ office, name, jobDescriptions }) {
  return (
    <div className="card">
      <div className="container">
        <span className="job-title">{name}</span>
        <span className="location">Location: {office}</span>
        {jobDescriptions.map((description) => {
          return (
            <>
              <p>{description.name}</p>
              <p dangerouslySetInnerHTML={{ __html: description.value }}></p>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default JobPost;
