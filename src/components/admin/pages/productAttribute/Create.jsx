import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as productAttributeService from "../../../../services/ProductAttributeService";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const Create = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      color: "",
      size: "",
      quantity: 1,
      productId: 0,
    },
    validationSchema: Yup.object({
      color: Yup.string().required(),
      size: Yup.string().required(),
      quantity: Yup.number().required().min(1),
    }),
    onSubmit: async (values) => {
      values.productId = Number(id);
      const [result, error] = await productAttributeService.save(values);
      if (result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`/admin/product/attribute/${id}`);
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
                  <h4 className="card-title">Add Attribute</h4>
                </div>
              </div>
              <div className="iq-card-body">
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <label>Color</label>
                    <input
                      type="text"
                      name="color"
                      className="form-control"
                      placeholder="Enter your color..."
                      value={formik.values.color}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.color && formik.touched.color && (
                      <small id="helpId" class="text-muted text-danger">
                        {formik.errors.color}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Size</label>
                    <input
                      type="text"
                      name="size"
                      className="form-control"
                      placeholder="Enter your size..."
                      value={formik.values.size}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.size && formik.touched.size && (
                      <small id="helpId" class="text-muted text-danger">
                        {formik.errors.size}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Quantity</label>
                    <input
                      min={0}
                      type="number"
                      name="quantity"
                      className="form-control"
                      placeholder="Enter your quantity..."
                      value={formik.values.quantity}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.quantity && formik.touched.quantity && (
                      <small id="helpId" class="text-muted text-danger">
                        {formik.errors.quantity}
                      </small>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                  <Link
                    to={`/admin/product/attribute/${id}`}
                    className="btn btn-danger ml-2"
                  >
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
