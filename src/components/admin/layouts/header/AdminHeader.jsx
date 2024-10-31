import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearData, selectUserData } from "../../../../redux/reducers/user";
import Swal from "sweetalert2";

const AdminHeader = () => {
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(clearData());
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Logout Success",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/admin/login");
  };
  return (
    <div className="iq-top-navbar">
      <div className="iq-navbar-custom">
        <nav className="navbar navbar-expand-lg navbar-light p-0">
          <div className="iq-menu-bt d-flex align-items-center">
            <div className="wrapper-menu">
              <div className="main-circle">
                <i className="las la-bars"></i>
              </div>
            </div>
            <div className="iq-navbar-logo d-flex justify-content-between">
              <Link to={"/admin"} className="header-logo">
                <img
                  src="images/logo.png"
                  className="img-fluid rounded-normal"
                  alt=""
                />
                <div className="logo-title">
                  <span className="text-primary text-uppercase">
                    ADMIN PANEL
                  </span>
                </div>
              </Link>
            </div>
          </div>
          <div className="navbar-breadcrumb">
            <h5 className="mb-0">Trang Chủ</h5>
          </div>
          <div className="iq-search-bar">
            <form action="#" className="searchbox">
              <input
                type="text"
                className="text search-input"
                placeholder="Tìm kiếm sản phẩm..."
              />
              <a className="search-link">
                <i className="ri-search-line"></i>
              </a>
            </form>
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
                <a className="search-toggle iq-waves-effect text-gray rounded">
                  <i className="ri-search-line"></i>
                </a>
                <form action="#" className="search-box p-0">
                  <input
                    type="text"
                    className="text search-input"
                    placeholder="Type here to search..."
                  />
                  <a className="search-link">
                    <i className="ri-search-line"></i>
                  </a>
                </form>
              </li>

              <li className="line-height pt-3">
                <a
                  href="#"
                  className="search-toggle iq-waves-effect d-flex align-items-center"
                >
                  <img
                    src={userData?.user.userAvatar || ""}
                    className="img-fluid rounded-circle mr-3"
                    alt="user"
                  />
                  <div className="caption">
                    <h6 className="mb-1 line-height">{userData?.user.userName || "Admin"}</h6>
                    <p className="mb-0 text-primary">{userData.user.userEmail || "Admin"}</p>
                  </div>
                </a>
                <div className="iq-sub-dropdown iq-user-dropdown">
                  <div className="iq-card shadow-none m-0">
                    <div className="iq-card-body p-0 ">
                      <div className="bg-primary p-3">
                        <h5 className="mb-0 text-white line-height">
                          Xin Chào {userData?.user.userFullName || "Admin"}
                        </h5>
                      </div>

                      <div className="d-inline-block w-100 text-center p-3">
                        <a
                          href="#"
                          className="bg-primary iq-sign-btn"
                          role="button"
                          onClick={handleLogout}
                        >
                          Sign out<i className="ri-login-box-line ml-2"></i>
                        </a>
                      </div>
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

export default AdminHeader;
