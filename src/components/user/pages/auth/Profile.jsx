import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../../../services/AuthService";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData, setUser } from "../../../../redux/reducers/user";
import * as accountService from "../../../../services/AccountService";

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);

  const formik = useFormik({
    initialValues: {
      userName: userData.user.userName || "",
      userFullName: userData.user.fullName || "",
      userEmail: userData.user.email || "",
      userPhone: userData.user.phone || "",
      userGender: userData.user.gender,
      userAddress: userData.user.address || "",
      ImageFile: null,
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Username is required"),
      userFullName: Yup.string().required("Full name is required"),
      userEmail: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      userGender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      values.userGender = values.userGender === "false" ? false : true;
      formData.append("UserName", values.userName);
      formData.append("UserFullName", values.userFullName);
      formData.append("UserEmail", values.userEmail);
      formData.append("UserPhoneNumber", values.userPhone);
      formData.append("UserAddress", values.userAddress);
      formData.append("UserGender", values.userGender);
      if (values.ImageFile && values.ImageFile != null) {
        formData.append("ImageFile", values.ImageFile);
      } else {
        formData.append("OldImage", userData.user.avatar);
      }
      const [result, error] = accountService.update(userData.user.id, formData);
      if (result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: result.message,
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(setUser(values));
        window.location.reload();
      }
      if (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.response.data.message || "Failed to update!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue("ImageFile", file);
    }
  };

  return (
    <main>
      <div className="container-xl px-4 mt-4">
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <div className="text-danger">
            {formik.errors && formik.errors.general}
          </div>
          <input type="hidden" name="oldImage" value={formik.values.oldImage} />
          <input type="hidden" name="userId" value={formik.values.userId} />
          <div className="row">
            <div className="col-xl-4">
              {/* Profile picture card */}
              <div className="card mb-4 mb-xl-0">
                <div className="card-header">Profile Picture</div>
                <div className="card-body text-center">
                  <img
                    style={{
                      height: "200px",
                      width: "200px",
                      cursor: "pointer",
                    }}
                    className="thumbnail rounded-circle"
                    src={
                      formik.values.ImageFile
                        ? URL.createObjectURL(formik.values.ImageFile)
                        : userData.user.avatar
                    }
                    alt="Avatar"
                  />
                  <input
                    name="ImageFile"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    className="image form-control-file mt-3"
                  />
                  <div className="small font-italic text-muted mb-4">
                    Image should not exceed 5 MB
                  </div>
                  <button
                    className="btn thumbnail text-white"
                    style={{ background: "#79a206" }}
                    type="button"
                    onClick={() =>
                      document.querySelector('input[name="ImageFile"]').click()
                    }
                  >
                    Upload New Image
                  </button>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              {/* Account details card */}
              <div className="card mb-4">
                <div className="card-header">Account Information</div>
                <div className="card-body">
                  {/* Form Group (username) */}
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label htmlFor="userName" className="mb-1">
                        Username
                      </label>
                      <input
                        className="form-control"
                        id="userName"
                        type="text"
                        placeholder="Enter username here"
                        {...formik.getFieldProps("userName")}
                      />
                      {formik.errors.userName && (
                        <span className="text-danger">
                          {formik.errors.userName}
                        </span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="fullName" className="mb-1">
                        Full Name
                      </label>
                      <input
                        className="form-control"
                        placeholder="Enter full name here..."
                        {...formik.getFieldProps("userFullName")}
                      />
                      {formik.errors.userFullName && (
                        <span className="text-danger">
                          {formik.errors.userFullName}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label htmlFor="userEmail" className="control-label">
                        Email
                      </label>
                      <input
                        className="form-control"
                        placeholder="Enter email here..."
                        {...formik.getFieldProps("userEmail")}
                      />
                      {formik.errors.userEmail && (
                        <span className="text-danger">
                          {formik.errors.userEmail}
                        </span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="userPhone" className="control-label">
                        Phone Number
                      </label>
                      <input
                        className="form-control"
                        placeholder="Enter phone number here..."
                        {...formik.getFieldProps("userPhone")}
                      />
                      {formik.errors.userPhone && (
                        <span className="text-danger">
                          {formik.errors.userPhone}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="userGender" className="control-label">
                      Gender
                    </label>
                    <select
                      className="form-control py-0"
                      {...formik.getFieldProps("userGender")}
                    >
                      <option value="true">Male</option>
                      <option value="false">Female</option>
                    </select>
                    {formik.errors.userGender && (
                      <span className="text-danger">
                        {formik.errors.userGender}
                      </span>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="userAddress" className="control-label">
                      Address
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="Enter address here..."
                      rows="4"
                      {...formik.getFieldProps("userAddress")}
                    />
                    {formik.errors.userAddress && (
                      <span className="text-danger">
                        {formik.errors.userAddress}
                      </span>
                    )}
                  </div>

                  {/* Save changes button */}
                  <button
                    className="btn text-white"
                    style={{ background: "#79a206" }}
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Profile;
