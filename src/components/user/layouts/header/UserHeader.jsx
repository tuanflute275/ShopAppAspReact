import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearData, selectUserData } from "../../../../redux/reducers/user";
import { useDispatch, useSelector } from "react-redux";
import "./userHeader.css";
import Swal from "sweetalert2";

const UserHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(selectUserData);

  const handleLogout = () => {
    dispatch(clearData());
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Logout Success",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="iq-top-navbar" style={{ width: "100%" }}>
      <div className="iq-navbar-custom">
        <nav className="navbar navbar-expand-lg navbar-light p-0">
          <div className="iq-menu-bt d-flex align-items-center">
            <div className="wrapper-menu">
              <div className="main-circle">
                <i className="las la-bars"></i>
              </div>
            </div>
            <div className="iq-navbar-logo d-flex justify-content-between">
              <Link to="/" className="header-logo">
                <div className="logo-title">
                  <span className="text-primary text-uppercase">ShopApp</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="navbar-breadcrumb">
            <h5 className="mb-0">
              <Link className="navbar-brand" to="/">
                <img src="/logo.jpg" alt="" />
              </Link>
            </h5>
          </div>
          <div className="iq-search-bar">
            <ul className="navbar-nav m-auto mt-2 py-4 mt-lg-0 menu">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/shop">
                  Shop <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/faq">
                  Faq <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/blog">
                  Blog <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/contact">
                  Contact <span className="sr-only">(current)</span>
                </Link>
              </li>
            </ul>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-label="Toggle navigation"
          >
            <i className="ri-menu-3-line"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto navbar-list">
              <li className="nav-item nav-icon search-content">
                <a
                  href="#"
                  className="search-toggle iq-waves-effect text-gray rounded"
                >
                  <i className="ri-search-line"></i>
                </a>
                <form action="#" className="search-box p-0">
                  <input
                    type="text"
                    className="text search-input"
                    placeholder="Type here to search..."
                  />
                  <a className="search-link" href="#">
                    <i className="ri-search-line"></i>
                  </a>
                </form>
              </li>
              <li className="nav-item nav-icon dropdown">
                <Link
                  to="/cart"
                  className="search-toggle iq-waves-effect text-gray rounded"
                >
                  <i className="ri-shopping-cart-2-line"></i>
                  <span className="badge badge-danger count-cart rounded-circle">
                    {/* 12 */}
                  </span>
                </Link>
              </li>
              <li className="line-height pt-3">
                <a
                  href="#"
                  className="search-toggle iq-waves-effect d-flex align-items-center"
                >
                  <img
                    src={userData?.user.avatar || "/image/user.png"}
                    className="img-fluid rounded-circle mr-3"
                    alt="user"
                  />
                  <div className="caption">
                    <h6 className="mb-1 line-height">
                      {userData?.user.userName || "Guest"}
                    </h6>
                    <p className="mb-0 text-primary">
                      {userData.user.email || "Guest"}
                    </p>
                  </div>
                </a>
                <div className="iq-sub-dropdown iq-user-dropdown">
                  <div className="iq-card shadow-none m-0">
                    <div className="iq-card-body p-0">
                      <div className="bg-primary p-3">
                        <h5 className="mb-0 text-white line-height">
                          Hello {userData?.user.fullName || "Guest"}
                        </h5>
                      </div>
                      {userData && userData.user.userName ? (
                        <>
                          <Link
                            to={"/profile"}
                            className="iq-sub-card iq-bg-primary-hover"
                          >
                            <div className="media align-items-center">
                              <div className="rounded iq-card-icon iq-bg-primary">
                                <i className="ri-file-user-line"></i>
                              </div>
                              <div className="media-body ml-3">
                                <h6 className="mb-0">My Profile</h6>
                              </div>
                            </div>
                          </Link>
                          <Link
                            to={"/change-password"}
                            className="iq-sub-card iq-bg-primary-hover"
                          >
                            <div className="media align-items-center">
                              <div className="rounded iq-card-icon iq-bg-primary">
                                <i className="ri-file-user-line"></i>
                              </div>
                              <div className="media-body ml-3">
                                <h6 className="mb-0">Change Password</h6>
                              </div>
                            </div>
                          </Link>
                          <div className="d-inline-block w-100 text-center p-3">
                            <a
                              className="bg-primary iq-sign-btn"
                              href="javascript:void(0)"
                              onClick={() => handleLogout()}
                              role="button"
                            >
                              Sign out<i className="ri-login-box-line ml-2"></i>
                            </a>
                          </div>
                        </>
                      ) : (
                        <div className="d-inline-block w-100 text-center p-3">
                          <Link
                            to={"/login"}
                            className="bg-primary iq-sign-btn"
                            href="javascript:void(0)"
                            role="button"
                          >
                            Login<i className="ri-login-box-line ml-2"></i>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default UserHeader;
