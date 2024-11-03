import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../../../services/AuthService";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userEmail: "",
    },
    validationSchema: Yup.object({
      userEmail: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      const [result, error] = await authService.forgotPassword(values);
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
      const formElement = document.getElementById("formForgotPassword");

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
          <h2 className="text-center">Forgot Password</h2>
          <form
            method="post"
            onSubmit={formik.handleSubmit}
            id="formForgotPassword"
            style={{ marginTop: "30px" }}
          >
            <div
              className="field input-field"
              style={{
                position: "relative",
                height: "50px",
                width: "100%",
                marginTop: "20px",
                borderRadius: "6px",
              }}
            >
              <input
                type="text"
                name="userEmail"
                id="userEmail"
                placeholder="Email Address"
                className="input"
                value={formik.values.userEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{
                  height: "100%",
                  width: "100%",
                  border: "1px solid #CACACA",
                  outline: "none",
                  padding: "0 15px",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              />
              {formik.errors.userEmail && formik.touched.userEmail && (
                <small className="text-muted text-danger">
                  {formik.errors.userEmail}
                </small>
              )}
            </div>
            <div
              className="field button-field"
              style={{ marginTop: "35px", height: "50px", width: "100%" }}
            >
              <button
                type="submit"
                style={{
                  height: "100%",
                  width: "100%",
                  border: "none",
                  color: "#fff",
                  backgroundColor: "#0171d3",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#016dcb")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0171d3")
                }
              >
                Submit
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
                to={"/login"}
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

export default ForgotPassword;
