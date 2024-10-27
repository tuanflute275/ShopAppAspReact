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
            <span className="text-primary text-uppercase">Admin Panel</span>
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
                <i className="las la-home iq-arrow-left"></i>Dashboard
              </Link>
            </li>
            <li>
              <Link to={"/admin/account"}>
                <i className="ri-record-circle-line"></i>Account Management
              </Link>
            </li>
            <li>
              <Link to={"/admin/role"}>
                <i className="ri-record-circle-line"></i>Role Management
              </Link>
            </li>
            <li>
              <Link to={"/admin/user-role"}>
                <i className="ri-record-circle-line"></i>Account Role Management
              </Link>
            </li>
            <li>
              <Link to={"/admin/banner"}>
                <i className="ri-record-circle-line"></i>Banner Management
              </Link>
            </li>
            <li>
              <Link to={"/admin/category"}>
                <i className="ri-record-circle-line"></i>Category Management
              </Link>
            </li>
            <li>
              <Link to={"/admin/product"}>
                <i className="ri-record-circle-line"></i>Product Management
              </Link>
            </li>
            <li>
              <Link to={"/admin/order"}>
                <i className="ri-record-circle-line"></i>Order Management
              </Link>
            </li>
            <li>
              <Link to={"/admin/blog"}>
                <i className="ri-record-circle-line"></i>Blog Management
              </Link>
            </li>
            <li>
              <Link to={"/admin/notify"}>
                <i className="ri-record-circle-line"></i>Notify Management
              </Link>
            </li>
            <li>
              <Link to={"/admin/subscription"}>
                <i className="ri-record-circle-line"></i>Subcription Management
              </Link>
            </li>
            <li>
              <Link to={"/admin/log"}>
                <i className="ri-record-circle-line"></i>Log Management
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AdminSideBar;
