import "./Tabs.css";
import { Link } from "react-router-dom";

function Tabs() {
  return (
    <>
      <div className="tabs">
        <nav className="tab-nav">
          <ul className="tab-list" role="tablist" aria-orientation="horizontal">
            <li className="">
              <Link to="/">
                <button
                  role="tab"
                  id="tab-1"
                  aria-controls="panel-1"
                  aria-selected="false"
                  className="tab-btn"
                >
                  Job Listing
                </button>
              </Link>
            </li>
            <li>
              <Link to="/other-jobs">
                <button
                  role="tab"
                  id="tab-2"
                  aria-controls="panel-2"
                  aria-selected="false"
                  className="tab-btn"
                >
                  External Job Offerings
                </button>
              </Link>
            </li>
            <li>
              <Link to="/post-job">
                <button
                  role="tab"
                  id="tab-3"
                  aria-controls="panel-3"
                  aria-selected="true"
                  className="tab-btn tab-btn--active"
                >
                  Post A Job Vacancy
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Tabs;
