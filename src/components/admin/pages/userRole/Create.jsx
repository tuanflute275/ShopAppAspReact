import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as uroleService from "../../../../services/UserRoleService";
import * as accountService from "../../../../services/AccountService";
import * as roleService from "../../../../services/RoleService";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const Create = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [role, setRole] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const [res, err] = await accountService.findAll();
      if (res) {
        setUser(res.data.data);
      } else {
        console.log(err);
      }
    };
    const fetchRoles = async () => {
      const [res, err] = await roleService.findAll();
      if (res) {
        setRole(res.data.data);
      } else {
        console.log(err);
      }
    };
    fetchUsers();
    fetchRoles();
  }, []);

  const formik = useFormik({
    initialValues: {
      userId: 0,
      roleId: 0,
    },
    validationSchema: Yup.object({
      userId: Yup.number().required().min(1, "Please select a valid user"),
      roleId: Yup.number().required().min(1, "Please select a valid role"),
    }),
    onSubmit: async (values) => {
      const [result, error] = await uroleService.save(values);
      if (result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/user-role");
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
    },
  });

  return (
    <div id="content-page" className="content-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">Add User Role</h4>
                </div>
              </div>
              <div className="iq-card-body">
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <label>User</label>
                    <select
                      name="userId"
                      className="form-control"
                      value={formik.values.userId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Select a user...</option>
                      {user &&
                        user.length > 0 &&
                        user.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.userName}
                          </option>
                        ))}
                    </select>
                    {formik.errors.userId && formik.touched.userId && (
                      <small className="text-danger">
                        {formik.errors.userId}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Role</label>
                    <select
                      name="roleId"
                      className="form-control"
                      value={formik.values.roleId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Select a role...</option>
                      {role &&
                        role.length > 0 &&
                        role.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.roleName}
                          </option>
                        ))}
                    </select>
                    {formik.errors.roleId && formik.touched.roleId && (
                      <small className="text-danger">
                        {formik.errors.roleId}
                      </small>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                  <Link to={"/admin/user-role"} className="btn btn-danger ml-2">
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

export default Create;
