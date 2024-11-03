import React from "react";
import UserHeader from "./header/UserHeader";
import UserFooter from "./footer/UserFooter";

const UserMasterLayout = ({ child }) => {
  return (
    <div>
      <UserHeader />
      {child}
      <UserFooter />
    </div>
  );
};

export default UserMasterLayout;
