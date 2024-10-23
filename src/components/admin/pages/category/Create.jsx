import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as categoryService from "../../../../services/CategoryService";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddCategory = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      categoryName: "",
      categoryStatus: true,
    },
    validationSchema: Yup.object({
      categoryName: Yup.string()
        .required("Không được để trống")
        .min(2, "Tối thiểu 2 kí tự"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      values.categoryStatus = values.categoryStatus === "false" ? false : true;
      const [result, error] = await categoryService.save(values);
      if (result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Add Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/category");
      }
      if (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Add Failed",
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
                  <h4 className="card-title">Thêm danh mục</h4>
                </div>
              </div>
              <div className="iq-card-body">
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <label>Tên danh mục:</label>
                    <input
                      type="text"
                      name="categoryName"
                      className="form-control"
                      placeholder="Nhập tên danh mục tại đây..."
                      value={formik.values.categoryName}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.categoryName &&
                      formik.touched.categoryName && (
                        <small id="helpId" class="text-muted text-danger">
                          {formik.errors.categoryName}
                        </small>
                      )}
                  </div>

                  <div className="form-group">
                    <label className="d-block">Trạng thái:</label>
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        id="status"
                        name="categoryStatus"
                        className="custom-control-input"
                        defaultChecked
                        value={true}
                        onChange={formik.handleChange}
                      />
                      <label className="custom-control-label" htmlFor="status">
                        Hiện
                      </label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        id="status2"
                        name="categoryStatus"
                        className="custom-control-input"
                        value={false}
                        onChange={formik.handleChange}
                      />
                      <label className="custom-control-label" htmlFor="status2">
                        Ẩn
                      </label>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Gửi
                  </button>
                  <Link to={"/admin/category"} className="btn btn-danger ml-2">
                    Trở lại
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
