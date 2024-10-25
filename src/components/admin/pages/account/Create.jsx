import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as roleService from "../../../../services/RoleService";
import * as accountService from "../../../../services/AccountService";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const Create = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState([]);
  const [imgPreview, setImgPreview] = useState();

  useEffect(() => {
    const fetchRoles = async () => {
      const [res, err] = await roleService.findAll();
      if (res) {
        setRole(res.data.data);
      } else {
        console.log(err);
      }
    };
    fetchRoles();
  }, []);

  const formik = useFormik({
    initialValues: {
      userName: "",
      userFullName: "",
      ImageFile: null,
      userEmail: "",
      userPassword: "",
      userPhoneNumber: "",
      userAddress: "",
      userGender: true,
      userActive: true,
      role: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .required("User Name is required")
        .min(2, "Name must be at least 2 characters"),
      userFullName: Yup.string().required("Full Name is required"),
      ImageFile: Yup.mixed().required("Image file is required"),
      userEmail: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email"),
      userPassword: Yup.string().required("Password is required"),
      userPhoneNumber: Yup.string()
        .required("Phone is required")
        .matches(
          /^0[0-9]{9}$/,
          "Phone number must start with 0 and be exactly 10 digits"
        ),
      role: Yup.string().required().min(1, "Please select a valid role"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("UserName", values.userName);
      formData.append("ImageFile", values.ImageFile);
      formData.append("UserFullName", values.userFullName);
      formData.append("UserEmail", values.userEmail);
      formData.append("UserPassword", values.userPassword);
      formData.append("UserPhoneNumber", values.userPhoneNumber);
      formData.append("UserAddress", values.userAddress);
      formData.append("UserGender", values.userGender);
      formData.append("UserActive", values.userActive);
      formData.append("Role", values.role);

      const [result, error] = await accountService.save(formData);
      if (result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/account");
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
                  <h4 className="card-title">Add Account</h4>
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
                            : "/add-image-icon.jpg"
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
                      type="text"
                      name="userPassword"
                      className="form-control"
                      placeholder="Enter your Password..."
                      value={formik.values.userPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.userPassword && formik.touched.userPassword && (
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
                    <label>Role</label>
                    <select
                      name="role"
                      className="form-control"
                      value={formik.values.role}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Select a role...</option>
                      {role &&
                        role.length > 0 &&
                        role.map((item) => (
                          <option key={item.id} value={item.roleName}>
                            {item.roleName}
                          </option>
                        ))}
                    </select>
                    {formik.errors.Category && formik.touched.Category && (
                      <small className="text-danger">
                        {formik.errors.Category}
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
                      <option value="true">Male</option>
                      <option value="false">Female</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Active</label>
                    <select
                      name="userActive"
                      className="form-control"
                      value={formik.values.userActive}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="true">Active</option>
                      <option value="false">InActive</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Create
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

export default Create;
