import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../../../services/AuthService";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: "",
      fullName: "",
      email: "",
      password: "",
      role: "User",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .min(2, "Must be at least 2 characters")
        .required("Username is required"),
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const [result, error] = await authService.register(values);
      if (result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: result.message,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
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
    },
  });

  useEffect(() => {
    // Tạo và thêm thẻ script vào head khi component được render
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;

    // Đảm bảo script được tải vào head
    document.head.appendChild(script);

    // Kiểm tra xem script đã được tải thành công
    script.onload = () => {
      const formElement = document.getElementById("formRegister");

      formElement.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Kiểm tra xem window.grecaptcha đã được định nghĩa
        if (window.grecaptcha && window.grecaptcha.getResponse) {
          const gRecaptchaResponse = window.grecaptcha.getResponse();
          if (!gRecaptchaResponse) {
            Swal.fire({
              icon: "error",
              title: "Vui lòng hoàn thành CAPTCHA!",
              showConfirmButton: true,
            });
            return;
          } else {
            console.log(gRecaptchaResponse);
            //formik.handleSubmit();
          }
        } else {
          console.error("reCAPTCHA chưa được tải hoặc không sẵn sàng.");
        }
      });
    };

    // Xóa script khi component bị hủy
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#7093a766",
        columnGap: "30px",
      }}
    >
      <div
        style={{
          position: "absolute",
          maxWidth: "430px",
          width: "100%",
          padding: "30px",
          borderRadius: "6px",
          background: "#fff",
          border: "1px solid #e5e5e5",
        }}
      >
        <div className="form-content">
          <h2 className="text-center">Register</h2>
          <form onSubmit={formik.handleSubmit} id="formRegister">
            <div className="field input-field" style={{ marginTop: "20px" }}>
              <input
                type="text"
                name="userName"
                id="userName"
                placeholder="Username"
                className="input magic-hover magic-hover__square"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #CACACA",
                  borderRadius: "6px",
                  outline: "none",
                  fontSize: "16px",
                }}
              />
              {formik.errors.userName && formik.touched.userName && (
                <small className="text-muted text-danger">
                  {formik.errors.userName}
                </small>
              )}
            </div>

            <div className="field input-field" style={{ marginTop: "20px" }}>
              <input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Full Name"
                className="input"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #CACACA",
                  borderRadius: "6px",
                  outline: "none",
                  fontSize: "16px",
                }}
              />
              {formik.errors.fullName && formik.touched.fullName && (
                <small className="text-muted text-danger">
                  {formik.errors.fullName}
                </small>
              )}
            </div>

            <div className="field input-field" style={{ marginTop: "20px" }}>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="input"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #CACACA",
                  borderRadius: "6px",
                  outline: "none",
                  fontSize: "16px",
                }}
              />
              {formik.errors.email && formik.touched.email && (
                <small className="text-muted text-danger">
                  {formik.errors.email}
                </small>
              )}
            </div>

            <div className="field input-field" style={{ marginTop: "20px" }}>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="input magic-hover magic-hover__square"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #CACACA",
                  borderRadius: "6px",
                  outline: "none",
                  fontSize: "16px",
                }}
              />
              {formik.errors.password && formik.touched.password && (
                <small className="text-muted text-danger">
                  {formik.errors.password}
                </small>
              )}
            </div>

            <div className="field button-field" style={{ marginTop: "20px" }}>
              <button
                type="submit"
                className="magic-hover magic-hover__square"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "none",
                  color: "#fff",
                  backgroundColor: "#0171d3",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Register
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <div
                className="g-recaptcha"
                data-sitekey="6Lcqb1YqAAAAAIeBk0_LXSLgcuZLFXYmW1ipPjPH"
                id="recaptcha"
              ></div>
            </div>
          </form>

          <div
            className="form-link"
            style={{ textAlign: "center", marginTop: "10px" }}
          >
            <span>
              Already have an account?
              <Link
                to="/login"
                className="link login-link"
                style={{ color: "#0171d3", textDecoration: "none" }}
              >
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
