import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as notifyService from "../../../../services/NotifyService";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddCategory = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: Yup.object({
      message: Yup.string()
        .required()
        .min(2),
    }),
    onSubmit: async (values) => {
      const [result, error] = await notifyService.save(values);
      if (result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/notify");
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
                  <h4 className="card-title">Add Notify</h4>
                </div>
              </div>
              <div className="iq-card-body">
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <label>Message</label>
                    <input
                      type="text"
                      name="message"
                      className="form-control"
                      placeholder="Enter your message..."
                      value={formik.values.message}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.message &&
                      formik.touched.message && (
                        <small id="helpId" class="text-muted text-danger">
                          {formik.errors.message}
                        </small>
                      )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                  <Link to={"/admin/notify"} className="btn btn-danger ml-2">
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

export default AddCategory;
