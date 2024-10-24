import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as blogService from "../../../../services/BlogService";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const Create = () => {
  const navigate = useNavigate();
  const [imgPreview, setImgPreview] = useState();

  const formik = useFormik({
    initialValues: {
      Title: "",
      ImageFile: null,
      Description: "",
    },
    validationSchema: Yup.object({
      Title: Yup.string()
        .required()
        .min(2),
      ImageFile: Yup.mixed().required(),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("BlogTitle", values.Title);
      formData.append("ImageFile", values.ImageFile);
      formData.append("BlogDescription", values.Description);
      formData.append("UserId", 1);

      const [result, error] = await blogService.save(formData);
      if (result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/blog");
      }
      if (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to add!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      }
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImgPreview(event.target.files[0]);
      formik.setFieldValue("ImageFile", file);
    }
  };

  return (
    <div id="content-page" className="content-page" style={{paddingTop: "70px"}}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">Add Blog</h4>
                </div>
              </div>
              <div className="iq-card-body">
                <form
                  onSubmit={formik.handleSubmit}
                  encType="multipart/form-data"
                >
                  <div className="form-group">
                    <label htmlFor="image" className="col-md-3 col-form-label">
                      Image
                    </label>
                    <div className="col-md-9 col-xl-8">
                      {imgPreview && imgPreview ? (
                        <img
                          style={{
                            height: "200px",
                            width: "200px",
                            cursor: "pointer",
                          }}
                          class="thumbnail rounded-circle"
                          data-toggle="tooltip"
                          title="Click to change the image"
                          data-placement="bottom"
                          src={URL.createObjectURL(imgPreview)}
                        />
                      ) : (
                        <img
                          style={{
                            height: "200px",
                            width: "200px",
                            cursor: "pointer",
                          }}
                          class="thumbnail rounded-circle"
                          data-toggle="tooltip"
                          title="Click to change the image"
                          data-placement="bottom"
                          src="/add-image-icon.jpg"
                        />
                      )}

                      <input
                        type="file"
                        name="fileUpload"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="image form-control-file mt-3"
                      />
                      {formik.errors.ImageFile && (
                        <small className="text-danger">
                          {formik.errors.ImageFile}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      name="Title"
                      className="form-control"
                      placeholder="Enter your title..."
                      value={formik.values.Title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.Title && formik.touched.Title && (
                      <small className="text-danger">
                        {formik.errors.Title}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="Description"
                      className="form-control"
                      rows="5"
                      placeholder="Enter your description..."
                      value={formik.values.Description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></textarea>
                    {formik.errors.Description &&
                      formik.touched.Description && (
                        <small className="text-danger">
                          {formik.errors.Description}
                        </small>
                      )}
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                  <Link to={"/admin/blog"} className="btn btn-danger ml-2">
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
