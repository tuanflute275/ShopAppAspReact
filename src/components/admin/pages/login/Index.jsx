import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as AuthServices from "../../../../services/AuthService";
import * as accountServices from "../../../../services/AccountService";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../../../redux/reducers/user";
import { jwtDecode } from "jwt-decode";

function Index() {
  const initData = {
    UsernameOrEmail: "",
    password: "",
  };
  const [loginData, setLoginData] = useState(initData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeValue = async (e) => {
    const { name, value } = await e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const [result, error] = await AuthServices.login(loginData);
    if (result) {
      dispatch(setToken(result.data.token));

      // Giải mã token (giả sử bạn đã cài đặt jwt-decode)
      const decodedToken = jwtDecode(result.data.token);
      console.log("Decoded Token: ", decodedToken);

      // Lấy thông tin người dùng
      const userId = decodedToken.nameid;
      const userResult = await accountServices.findById(userId);
      if (userResult) {
        dispatch(setUser(userResult[0].data));
      } else {
        console.error("Failed to fetch user details");
      }

      // Lấy tất cả vai trò từ token
      const roles = decodedToken.role; // roles là một mảng

      // Kiểm tra vai trò và điều hướng
      if (roles.includes("Admin")) {
        navigate("/admin");
      } else if (roles.includes("User")) {
        navigate("/");
      } else {
        navigate("/");
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };

  return (
    <section className="sign-in-page">
      <div className="container p-0">
        <div className="row no-gutters height-self-center">
          <div className="col-sm-12 align-self-center page-content rounded">
            <div className="row m-0">
              <div className="col-sm-12 sign-in-page-data">
                <div className="sign-in-from bg-primary rounded">
                  <h3 className="mb-0 text-center text-white">Sign in</h3>
                  <p className="text-center text-white">
                    Enter your email address and password to access to web
                  </p>
                  <form
                    className="mt-4 form-text"
                    method="post"
                    onSubmit={(e) => handleSubmitForm(e)}
                  >
                    <div className="form-group">
                      <label htmlFor="UsernameOrEmail">User Name</label>
                      <input
                        type="text"
                        className="form-control mb-0"
                        id="UsernameOrEmail"
                        placeholder="Enter your UsernameOrEmail..."
                        name="UsernameOrEmail"
                        onChange={(e) => handleChangeValue(e)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control mb-0"
                        id="password"
                        placeholder="Enter your password..."
                        name="password"
                        onChange={(e) => handleChangeValue(e)}
                      />
                    </div>
                    <div className="sign-info text-center">
                      <button
                        type="submit"
                        className="btn btn-white d-block w-100 mb-2"
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Index;
