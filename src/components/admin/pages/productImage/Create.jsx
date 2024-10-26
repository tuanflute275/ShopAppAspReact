import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as productImageService from "../../../../services/ProductImageService";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const Create = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imgPreviews, setImgPreviews] = useState([]);

  const formik = useFormik({
    initialValues: {
      ImageFiles: [],
    },
    validationSchema: Yup.object({
      ImageFiles: Yup.array().min(1, "Please upload at least one image"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("ProductId", id);
      values.ImageFiles.forEach((file) => {
        formData.append("ImageFiles", file);
      });

      const [result, error] = await productImageService.save(formData);
      if (result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`/admin/product/image/${id}`);
      }
      if (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message || "Failed to add!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      }
    },
  });

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImgPreviews(files);
    formik.setFieldValue("ImageFiles", files);
  };

  return (
    <div
      id="content-page"
      className="content-page"
      style={{ paddingTop: "70px" }}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">Add Images</h4>
                </div>
              </div>
              <div className="iq-card-body">
                <form
                  onSubmit={formik.handleSubmit}
                  encType="multipart/form-data"
                >
                  <div className="form-group">
                    <label htmlFor="image" className="col-md-3 col-form-label">
                      Images
                    </label>
                    <div className="col-md-9 col-xl-8">
                      <div className="preview-images">
                        {imgPreviews.map((file, index) => (
                          <img
                            key={index}
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index}`}
                            style={{
                              height: "100px",
                              width: "100px",
                              marginRight: "10px",
                              marginBottom: "10px",
                            }}
                            className="thumbnail rounded"
                          />
                        ))}
                      </div>
                      <input
                        type="file"
                        name="fileUpload"
                        onChange={handleImageChange}
                        accept="image/*"
                        multiple
                        className="image form-control-file mt-3"
                      />
                      {formik.errors.ImageFiles && (
                        <small className="text-danger">
                          {formik.errors.ImageFiles}
                        </small>
                      )}
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                  <Link
                    to={`/admin/product/image/${id}`}
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
