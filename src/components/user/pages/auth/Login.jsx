import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../../../services/AuthService";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../../../redux/reducers/user";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: "",
      password: "",
    },
    validationSchema: Yup.object({
      usernameOrEmail: Yup.string()
        .min(2, "Must be at least 2 characters")
        .required("This field is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const [result, error] = await authService.login(values);
      if (result) {
        dispatch(setToken(result.data.token));

        // Giải mã token (giả sử bạn đã cài đặt jwt-decode)
        const decodedToken = jwtDecode(result.data.token);
        console.log("Decoded Token: ", decodedToken);

        // Lấy thông tin người dùng
        const userResult = result.data.user;
        if (userResult) {
          dispatch(setUser(userResult));
        } else {
          console.error("Failed to fetch user details");
        }

        // Lấy tất cả vai trò từ token
        const roles = decodedToken.role; // roles là một mảng
        // Kiểm tra vai trò và điều hướng
        if (roles.includes("User")) {
          navigate("/");
        } else {
          navigate("/");
        }

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
    },
  });

  //   useEffect(() => {
  //     // Tạo và thêm thẻ script vào head khi component được render
  //     const script = document.createElement("script");
  //     script.src = "https://www.google.com/recaptcha/api.js";
  //     script.async = true;
  //     script.defer = true;

  //     // Đảm bảo script được tải vào head
  //     document.head.appendChild(script);

  //     // Kiểm tra xem script đã được tải thành công
  //     script.onload = () => {
  //       const formElement = document.getElementById("formLogin");

  //       formElement.addEventListener("submit", async function (event) {
  //         event.preventDefault();

  //         // Kiểm tra xem window.grecaptcha đã được định nghĩa
  //         if (window.grecaptcha && window.grecaptcha.getResponse) {
  //           const gRecaptchaResponse = window.grecaptcha.getResponse();
  //           if (!gRecaptchaResponse) {
  //             Swal.fire({
  //               icon: "error",
  //               title: "Vui lòng hoàn thành CAPTCHA!",
  //               showConfirmButton: true,
  //             });
  //             return;
  //           } else {
  //             console.log(gRecaptchaResponse);
  //             //formik.handleSubmit();
  //           }
  //         } else {
  //           console.error("reCAPTCHA chưa được tải hoặc không sẵn sàng.");
  //         }
  //       });
  //     };

  //     // Xóa script khi component bị hủy
  //     return () => {
  //       document.head.removeChild(script);
  //     };
  //   }, []);

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
          <h2 className="text-center">Login</h2>
          <form method="post" onSubmit={formik.handleSubmit} id="formLogin">
            <div className="text-danger" style={{ marginBottom: "10px" }}></div>
            <div className="field input-field" style={{ marginTop: "20px" }}>
              <input
                type="text"
                tabIndex="1"
                name="usernameOrEmail"
                placeholder="Username or email"
                className="input magic-hover magic-hover__square"
                value={formik.values.usernameOrEmail}
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
              {formik.errors.usernameOrEmail &&
                formik.touched.usernameOrEmail && (
                  <small className="text-muted text-danger">
                    {formik.errors.usernameOrEmail}
                  </small>
                )}
            </div>
            <div className="field input-field" style={{ marginTop: "20px" }}>
              <input
                type="password"
                tabIndex="2"
                name="password"
                placeholder="Password"
                className="password magic-hover magic-hover__square"
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
              <i className="bx bx-hide eye-icon"></i>
            </div>
            <div className="form-link" style={{ margin: "30px 0" }}>
              <Link
                to={"/forgot-password"}
                className="forgot-pass no-cursor"
                style={{ color: "#0171d3", textDecoration: "none" }}
              >
                Forgot password?
              </Link>
            </div>
            <div className="field button-field" style={{ marginTop: "20px" }}>
              <button
                type="submit"
                tabIndex="3"
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
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#016dcb")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0171d3")
                }
              >
                Login
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
              Don't have an account?
              <Link
                to={"/register"}
                className="link signup-link"
                style={{ color: "#0171d3", textDecoration: "none" }}
              >
                Register
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
