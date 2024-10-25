import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as roleService from "../../../../services/RoleService";
import * as accountService from "../../../../services/AccountService";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [role, setRole] = useState([]);
  const [imgPreview, setImgPreview] = useState();
  const [account, setAccount] = useState([]);
  const [initialValues, setInitialValues] = useState({
    userName: "",
    userFullName: "",
    ImageFile: null,
    userEmail: "",
    userPassword: "",
    userPhoneNumber: "",
    userAddress: "",
    userGender: true,
    userActive: true,
  });

  useEffect(() => {
    const fetchRoles = async () => {
      const [res, err] = await roleService.findAll();
      if (res) {
        setRole(res.data.data);
      } else {
        console.log(err);
      }
    };

    const fetchAccount = async () => {
      const [result, error] = await accountService.findById(id);
      if (result) {
        setAccount(result.data);
        const account = result.data;
        setInitialValues({
          userName: account.userName,
          userFullName: account.userFullName,
          ImageFile: null,
          userEmail: account.userEmail,
          userPassword: "",
          userPhoneNumber: account.userPhoneNumber,
          userAddress: account.userAddress,
          userGender: account.userGender,
          userActive: account.userActive,
        });
      }
      if (error) {
        console.log(error);
      }
    };

    fetchRoles();
    fetchAccount();
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: Yup.object({
      userName: Yup.string()
        .required("User Name is required")
        .min(2, "Name must be at least 2 characters"),
      userFullName: Yup.string().required("Full Name is required"),
      userEmail: Yup.string()
        .required("Email is required")
        .email("Please enter a valid email"),
      userPassword: Yup.string(),
      userPhoneNumber: Yup.string()
        .required("Phone is required")
        .matches(
          /^0[0-9]{9}$/,
          "Phone number must start with 0 and be exactly 10 digits"
        ),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("UserName", values.userName);
      formData.append("UserFullName", values.userFullName);
      formData.append("UserEmail", values.userEmail);
      formData.append("UserPassword", values.userPassword);
      formData.append("UserPhoneNumber", values.userPhoneNumber);
      formData.append("UserAddress", values.userAddress);
      formData.append("UserGender", values.userGender);
      formData.append("UserActive", values.userActive);
      if (values.ImageFile && values.ImageFile != null) {
        formData.append("ImageFile", values.ImageFile);
      } else {
        formData.append("OldImage", account.userAvatar);
      }

      const [result, error] = await accountService.update(id, formData); // Cập nhật thay vì tạo mới
      if (result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/account");
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
    const file = event.target.files[0];
    if (file) {
      setImgPreview(file);
      formik.setFieldValue("ImageFile", file);
    }
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
                  <h4 className="card-title">Update Account</h4>
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
                      <img
                        style={{
                          height: "200px",
                          width: "200px",
                          cursor: "pointer",
                        }}
                        className="thumbnail rounded-circle"
                        data-toggle="tooltip"
                        title="Click to change the image"
                        data-placement="bottom"
                        src={
                          imgPreview
                            ? URL.createObjectURL(imgPreview)
                            : account.userAvatar
                        }
                      />
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
                    <label>User Name</label>
                    <input
                      type="text"
                      name="userName"
                      className="form-control"
                      placeholder="Enter your User Name..."
                      value={formik.values.userName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.userName && formik.touched.userName && (
                      <small className="text-danger">
                        {formik.errors.userName}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>User Full Name</label>
                    <input
                      type="text"
                      name="userFullName"
                      className="form-control"
                      placeholder="Enter your Full Name..."
                      value={formik.values.userFullName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.userFullName &&
                      formik.touched.userFullName && (
                        <small className="text-danger">
                          {formik.errors.userFullName}
                        </small>
                      )}
                  </div>

                  <div className="form-group">
                    <label>User Email</label>
                    <input
                      type="text"
                      name="userEmail"
                      className="form-control"
                      placeholder="Enter your Email..."
                      value={formik.values.userEmail}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.userEmail && formik.touched.userEmail && (
                      <small className="text-danger">
                        {formik.errors.userEmail}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>User Password</label>
                    <input
                      type="password"
                      name="userPassword"
                      className="form-control"
                      placeholder="Enter your Password..."
                      value={formik.values.userPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.userPassword &&
                      formik.touched.userPassword && (
                        <small className="text-danger">
                          {formik.errors.userPassword}
                        </small>
                      )}
                  </div>

                  <div className="form-group">
                    <label>User Phone</label>
                    <input
                      type="text"
                      name="userPhoneNumber"
                      className="form-control"
                      placeholder="Enter your Phone Number..."
                      value={formik.values.userPhoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.userPhoneNumber &&
                      formik.touched.userPhoneNumber && (
                        <small className="text-danger">
                          {formik.errors.userPhoneNumber}
                        </small>
                      )}
                  </div>

                  <div className="form-group">
                    <label>User Address</label>
                    <input
                      type="text"
                      name="userAddress"
                      className="form-control"
                      placeholder="Enter your Address..."
                      value={formik.values.userAddress}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.userAddress &&
                      formik.touched.userAddress && (
                        <small className="text-danger">
                          {formik.errors.userAddress}
                        </small>
                      )}
                  </div>

                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      name="userGender"
                      className="form-control"
                      value={formik.values.userGender}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value={true}>Male</option>
                      <option value={false}>Female</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Status</label>
                    <select
                      name="userActive"
                      className="form-control"
                      value={formik.values.userActive}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value={true}>Active</option>
                      <option value={false}>Inactive</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                  <Link to={"/admin/account"} className="btn btn-danger ml-2">
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
