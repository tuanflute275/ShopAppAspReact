import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import * as authService from "../../../../services/AuthService";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../../redux/reducers/user";

const ChangePassword = () => {
  const navigate = useNavigate();
  const userData = useSelector(selectUserData);

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string()
      .min(6, "Current password must be at least 6 characters long")
      .required("Current password is required"),
    newPassword: Yup.string()
      .min(6, "New password must be at least 6 characters long")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .min(6, "Confirm password must be at least 6 characters long")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const userId = userData.user.id;
    const [result, error] = await authService.changePassword(userId, values);
    if (result) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: result.message,
        showConfirmButton: false,
        timer: 1500,
      });
      
    }
    if (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };

  return (
    <main>
      <div className="iq-card container">
        <div className="iq-card-header d-flex justify-content-center">
          <h3 className="card-title text-uppercase">Change Password</h3>
        </div>
        <div className="iq-card-body">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="oldPass">Current Password:</label>
                  <Link to="/forgot-password" className="float-right">
                    Forgot Password?
                  </Link>
                  <Field
                    type="password"
                    className="form-control"
                    name="oldPassword"
                    id="oldPass"
                  />
                  <ErrorMessage
                    name="oldPassword"
                    component="span"
                    className="text-danger"
                    style={{ color: "red" }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPass">New Password:</label>
                  <Field
                    type="password"
                    className="form-control"
                    name="newPassword"
                    id="newPass"
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="span"
                    className="text-danger"
                    style={{ color: "red" }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cfPass">Confirm Password:</label>
                  <Field
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    id="cfPass"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="span"
                    className="text-danger"
                    style={{ color: "red" }}
                  />
                </div>
                <div className="d-flex">
                  <button
                    type="submit"
                    className="btn mr-2 text-white"
                    style={{ background: "#79a206", width: "auto" }}
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => {
                      navigate("/");
                    }}
                    type="button"
                    className="btn mr-2 text-white bg-danger"
                    style={{ background: "#79a206", width: "auto" }}
                    disabled={isSubmitting}
                  >
                    Back
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
};

export default ChangePassword;
