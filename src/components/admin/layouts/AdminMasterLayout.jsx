import React from "react";
import AdminHeader from "./header/AdminHeader";
import AdminFooter from "./footer/AdminFooter";
import AdminSideBar from "./sidebar/AdminSideBar";

const AdminMasterLayout = ({ child }) => {
  return (
    <div className="wrapper">
      <AdminSideBar />
      <AdminHeader />
      {child}
      {/* <AdminFooter /> */}
    </div>
  );
};

export default AdminMasterLayout;
