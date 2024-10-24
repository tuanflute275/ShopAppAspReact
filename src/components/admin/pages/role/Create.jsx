import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as roleService from "../../../../services/RoleService";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const Create = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      roleName: "",
      roleDesc: "",
    },
    validationSchema: Yup.object({
      roleName: Yup.string().required().min(2),
    }),
    onSubmit: async (values) => {
      const [result, error] = await roleService.save(values);
      if (result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added successfully",
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
                  <h4 className="card-title">Add Role</h4>
                </div>
              </div>
              <div className="iq-card-body">
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <label>Role Name</label>
                    <input
                      type="text"
                      name="roleName"
                      className="form-control"
                      placeholder="Enter your roleName..."
                      value={formik.values.roleName}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.roleName && formik.touched.roleName && (
                      <small id="helpId" class="text-muted text-danger">
                        {formik.errors.roleName}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="roleDesc"
                      className="form-control"
                      rows="5"
                      placeholder="Enter your roleDesc..."
                      value={formik.values.roleDesc}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></textarea>
                    {formik.errors.roleDesc && formik.touched.roleDesc && (
                      <small className="text-danger">
                        {formik.errors.roleDesc}
                      </small>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Create
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

export default Create;
