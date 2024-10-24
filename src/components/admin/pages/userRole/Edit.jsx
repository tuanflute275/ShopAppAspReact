import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as uroleService from "../../../../services/UserRoleService";
import * as accountService from "../../../../services/AccountService";
import * as roleService from "../../../../services/RoleService";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const [res, err] = await accountService.findAll();
      if (res) {
        setUsers(res.data.data);
      } else {
        console.log(err);
      }
    };

    const fetchRoles = async () => {
      const [res, err] = await roleService.findAll();
      if (res) {
        setRoles(res.data.data);
      } else {
        console.log(err);
      }
    };

    const fetchData = async () => {
      const [res, err] = await uroleService.findById(id);
      if (res) {
        formik.setValues({
          userId: res.data.userId || 0,
          roleId: res.data.roleId || 0,
        });
      } else {
        console.log(err);
      }
    };

    fetchUsers();
    fetchRoles();
    fetchData();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      userId: 0,
      roleId: 0,
    },
    validationSchema: Yup.object({
      userId: Yup.number()
        .required("User is required")
        .min(1, "Please select a valid user"),
      roleId: Yup.number()
        .required("Role is required")
        .min(1, "Please select a valid role"),
    }),
    onSubmit: async (values) => {
      const [result, error] = await uroleService.update(id, values);
      if (result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Updated successfully",
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
                  <h4 className="card-title">Update User Role</h4>
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
                      disabled
                    >
                      <option value="">Select a user...</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.userName}
                        </option>
                      ))}
                    </select>
                    {formik.errors.userId && formik.touched.userId && (
                      <small className="text-danger">{formik.errors.userId}</small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Role</label>
                    <select
                      name="roleId"
                      className="form-control"
                      value={formik.values.roleId}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select a role...</option>
                      {roles.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.roleName}
                        </option>
                      ))}
                    </select>
                    {formik.errors.roleId && formik.touched.roleId && (
                      <small className="text-danger">{formik.errors.roleId}</small>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                  <Link to="/admin/user-role" className="btn btn-danger ml-2">
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
