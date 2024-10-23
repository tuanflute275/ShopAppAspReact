import React from "react";
import { Link } from "react-router-dom";

const AdminFooter = () => {
  return (
    <footer className="iq-footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <Link to={"https://github.com/tuanflute275"} target="_blank">
                  Github
                </Link>
              </li>
              <li className="list-inline-item">
                <Link
                  to={"https://www.facebook.com/profile.php?id=100047425502024"}
                  target="_blank"
                >
                  FaceBook
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-6 text-right">TUANFLUTE275</div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
