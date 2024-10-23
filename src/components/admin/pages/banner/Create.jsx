import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as bannerService from "../../../../services/BannerService";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const Create = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      Title: "",
      ImageFile: null,
    },
    validationSchema: Yup.object({
      Title: Yup.string()
        .required("Không được để trống")
        .min(2, "Tối thiểu 2 kí tự"),
      ImageFile: Yup.mixed().required("Bạn phải chọn một tệp ảnh"),
    }),
    onSubmit: async (values) => {
      console.log("Submitting values:", values);
      const formData = new FormData();
      formData.append("Title", values.Title);
      formData.append("ImageFile", values.ImageFile);
      
      // Gọi API để lưu banner
      const [result, error] = await bannerService.save(formData);
      if (result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thêm thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/banner");
      }
      if (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Thêm thất bại",
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
                  <h4 className="card-title">Thêm banner</h4>
                </div>
              </div>
              <div className="iq-card-body">
                <form
                  onSubmit={formik.handleSubmit}
                  encType="multipart/form-data"
                >
                  <div className="form-group">
                    <label htmlFor="image" className="col-md-3 col-form-label">
                      Hình ảnh
                    </label>
                    <div className="col-md-9 col-xl-8">
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
                    <label>Tiêu đề banner:</label>
                    <input
                      type="text"
                      name="Title"
                      className="form-control"
                      placeholder="Nhập tên danh mục tại đây..."
                      value={formik.values.Title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur} // Thêm onBlur để xác thực khi rời khỏi trường
                    />
                    {formik.errors.Title && formik.touched.Title && (
                      <small className="text-danger">
                        {formik.errors.Title}
                      </small>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Gửi
                  </button>
                  <Link to={"/admin/banner"} className="btn btn-danger ml-2">
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

export default Create;
