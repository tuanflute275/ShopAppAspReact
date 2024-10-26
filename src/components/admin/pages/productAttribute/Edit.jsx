import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as productAttributeService from "../../../../services/ProductAttributeService";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const Edit = () => {
  const { attributeId, productId } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      color: "",
      size: "",
      quantity: 1,
      productId: Number(productId),
    },
    validationSchema: Yup.object({
      color: Yup.string().required("Color is required"),
      size: Yup.string().required("Size is required"),
      quantity: Yup.number().required("Quantity is required").min(1),
    }),
    onSubmit: async (values) => {
      const [result, error] = await productAttributeService.update(
        attributeId,
        values
      );
      if (result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`/admin/product/attribute/${productId}`);
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

  useEffect(() => {
    const fetchAttribute = async () => {
      const [result, error] = await productAttributeService.findByAttributeId(
        attributeId
      );
      console.log(result.data);
      if (result) {
        formik.setValues({
          color: result.data.color,
          size: result.data.size,
          quantity: result.data.quantity,
          productId: Number(productId),
        });
      }
      if (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message || "Failed to fetch attribute!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    };

    fetchAttribute();
  }, []);

  return (
    <div id="content-page" className="content-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">Update Attribute</h4>
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
                      <small className="text-muted text-danger">
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
                      <small className="text-muted text-danger">
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
                      <small className="text-muted text-danger">
                        {formik.errors.quantity}
                      </small>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                  <Link
                    to={`/admin/product/attribute/${productId}`}
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

export default Edit;
