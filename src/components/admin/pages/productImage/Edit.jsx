import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as productImageService from "../../../../services/ProductImageService";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const Edit = () => {
  const { imageId } = useParams();
  const { productId } = useParams();
  const navigate = useNavigate();
  const [imgPreview, setImgPreview] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const [result, error] = await productImageService.findByImageId(imageId);
      if (result) {
        setImgPreview(result.data.path);
      }
      if (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message || "Failed to fetch image!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    };

    fetchImage();
  }, [imageId]);

  const formik = useFormik({
    initialValues: {
      newImageFile: null,
    },
    validationSchema: Yup.object({
      newImageFile: Yup.mixed().nullable(),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("ImageId", imageId);
      formData.append("ProductId", productId);
      console.log(imageId, productId);
      if (values.newImageFile) {
        formData.append("ImageFile", values.newImageFile);
      }

      const [result, error] = await productImageService.updateSingleImage(
        formData
      );
      if (result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Image updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`/admin/product/image/${productId}`);
      }
      if (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message || "Failed to update!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      }
    },
  });

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    setImgPreview(URL.createObjectURL(file));
    formik.setFieldValue("newImageFile", file);
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
                  <h4 className="card-title">Update Image</h4>
                </div>
              </div>
              <div className="iq-card-body">
                <form
                  onSubmit={formik.handleSubmit}
                  encType="multipart/form-data"
                >
                  <div className="form-group">
                    <label htmlFor="image" className="col-md-3 col-form-label">
                      Current Image
                    </label>
                    <div className="col-md-9 col-xl-8">
                      {imgPreview && (
                        <img
                          src={imgPreview}
                          alt="Current Preview"
                          style={{
                            height: "100px",
                            width: "100px",
                            marginRight: "10px",
                            marginBottom: "10px",
                          }}
                          className="thumbnail rounded"
                        />
                      )}

                      <input
                        type="file"
                        name="newImageFile"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="form-control-file mt-3"
                      />
                      {formik.errors.newImageFile && (
                        <small className="text-danger">
                          {formik.errors.newImageFile}
                        </small>
                      )}
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                  <Link
                    to={`/admin/product/image/${productId}`}
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
