import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as bannerService from "../../../../services/BannerService";
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
    },
    validationSchema: Yup.object({
      Title: Yup.string()
        .required()
        .min(2),
      ImageFile: Yup.mixed().required(),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("Title", values.Title);
      formData.append("ImageFile", values.ImageFile);

      // Gọi API để lưu banner
      const [result, error] = await bannerService.save(formData);
      if (result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/banner");
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
    <div id="content-page" className="content-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">Add Banner</h4>
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
                      {
                        imgPreview && imgPreview 
                        ? (
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
                        ) 
                        : (
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
                        )
                      }
                    
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
                    <label>Title:</label>
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
                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                  <Link to={"/admin/banner"} className="btn btn-danger ml-2">
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
