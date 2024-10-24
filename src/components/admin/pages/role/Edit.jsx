import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as roleService from "../../../../services/RoleService";
import Swal from "sweetalert2";

const Edit = () => {
  const { id } = useParams();

  const initState = {
    roleName: "",
    roleDesc: "",
  };

  const initData = {
    roleName: "",
    roleDesc: "",
  };

  const [apiData, setApiData] = useState(initData);
  const [postData, setPostData] = useState(initState);
  const navigate = useNavigate();

  const fetchApiData = async (id) => {
    const [result, error] = await roleService.findById(id);
    if (result) {
      setApiData(result.data);
    } else {
      console.log(error);
    }
  };

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      roleName: postData.roleName ? postData.roleName : apiData.roleName,
      roleDesc: postData.roleDesc ? postData.roleDesc : apiData.roleDesc,
    };

    const [result, error] = await roleService.update(id, newData);
    if (result) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/admin/role");
    }
    if (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to update!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApiData(id);
  }, []);
  return (
    <div id="content-page" className="content-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">Update Role</h4>
                </div>
              </div>
              <div className="iq-card-body">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="form-group">
                    <label>Role Name</label>
                    <input
                      type="text"
                      name="roleName"
                      className="form-control"
                      placeholder="Enter your roleName..."
                      defaultValue={apiData.roleName}
                      onChange={(e) => handleChangeValue(e)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="roleDesc"
                      className="form-control"
                      rows="5"
                      placeholder="Enter your roleDesc..."
                      defaultValue={apiData.roleName}
                      onChange={(e) => handleChangeValue(e)}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                  <Link to={"/admin/role"} className="btn btn-danger ml-2">
                    Back
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
