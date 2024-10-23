import React from "react";
import { Link } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <div className="iq-sidebar">
      <div className="iq-sidebar-logo d-flex justify-content-between">
        <Link to={"/admin"} className="header-logo">
          <img
            src="images/logo.png"
            className="img-fluid rounded-normal"
            alt=""
          />
          <div className="logo-title">
            <span className="text-primary text-uppercase">NhasachTV</span>
          </div>
        </Link>
        <div className="iq-menu-bt-sidebar">
          <div className="iq-menu-bt align-self-center">
            <div className="wrapper-menu">
              <div className="main-circle">
                <i className="las la-bars"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="sidebar-scrollbar">
        <nav className="iq-sidebar-menu">
          <ul id="iq-sidebar-toggle" className="iq-menu">
            <li>
              <Link to={"/admin"}>
                <i className="las la-home iq-arrow-left"></i>Bảng Điều Khiển
              </Link>
            </li>
            <li>
              <Link to={"/admin/banner"}>
                <i className="ri-record-circle-line"></i>Quản Lý banner
              </Link>
            </li>
            <li>
              <Link to={"/admin/category"}>
                <i className="ri-record-circle-line"></i>Quản Lý Danh Mục
              </Link>
            </li>
            <li>
              <Link to={"/admin/product"}>
                <i className="ri-record-circle-line"></i>Quản Lý Sản Phẩm
              </Link>
            </li>
            <li>
              <Link to={"/admin/blog"}>
                <i className="ri-record-circle-line"></i>Quản Lý Tin Tức
              </Link>
            </li>
            <li>
              <Link to={"/admin/log"}>
                <i className="ri-record-circle-line"></i>Hoạt động tài khoản
              </Link>
            </li>
          </ul>
        </nav>
        <div id="sidebar-bottom" className="p-3 position-relative">
          <div className="iq-card">
            <div className="iq-card-body">
              <div className="sidebarbottom-content">
                <button
                  type="submit"
                  className="btn w-100 btn-primary mt-4 view-more"
                >
                  NhasachTV
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
