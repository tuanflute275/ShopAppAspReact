import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../../redux/reducers/user";
import * as cartService from "../../../../services/CartService";
import * as orderService from "../../../../services/OrderService";
import "./checkout.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUserData);
  const [carts, setCarts] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchApiData = async (userId) => {
    const [res, err] = await cartService.findByUserId(userId);
    if (res) {
      setCarts(res.data);
      setTotalQuantity(res.total.quantity);
      setTotalPrice(res.total.amount);
    } else {
      console.log(err);
    }
  };

  const handlePay = async (event) => {
    event.preventDefault();

    formik.setTouched({
      orderFullName: true,
      orderAddress: true,
      orderPhoneNumber: true,
      orderEmail: true,
      orderNote: true,
    });

    // Thực hiện xác thực
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      // Nếu có lỗi, không thực hiện thanh toán
      console.log("Validation errors:", errors);
      return;
    }

    const values = formik.values;
    values.orderAmount = totalPrice;
    const [result, error] = await orderService.save(values);
    if (result) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/order-success", {
        state: { customerName: values.customerName },
      });
    }
    if (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to update!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };
  console.log(totalPrice);

  const formik = useFormik({
    initialValues: {
      orderFullName: user.user.fullName || "",
      orderAddress: user.user.address || "",
      orderPhoneNumber: user.phone || "",
      orderEmail: user.user.email || "",
      orderPaymentMethods: "PAY_ON_DELIVERY",
      orderStatusPayment: "NO_PAYMENT",
      orderAmount: totalPrice,
      orderNote: "",
      userId: user.user.id || 0,
    },
    validationSchema: Yup.object({
      orderFullName: Yup.string()
        .required("Full name is required")
        .min(2, "Full name must be at least 2 characters"),
      orderAddress: Yup.string().required("Address is required"),
      orderPhoneNumber: Yup.string()
        .required("Phone number is required")
        .matches(
          /^[0-9]{10,15}$/,
          "Phone number must be between 10 and 15 digits"
        ),
      orderEmail: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      orderNote: Yup.string(),
    }),
  });

  useEffect(() => {
    fetchApiData(user.user.id);
  }, [user.user.id]);

  return (
    <main>
      <div className="text-center box-title">
        <h3 className="title">Checkout</h3>
        <nav className="breadcrumb text-center d-flex justify-content-center">
          <a className="breadcrumb-item default" href="/">
            Home
          </a>
          <span className="breadcrumb-item active">Checkout</span>
        </nav>
        <div className="container"></div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-7 col-sm-12 px-5">
            <form id="checkoutForm">
              <div className="checkout-form-heading">Delivery Address:</div>
              <div className="form-group">
                <label className="control-label">Recipient's Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="orderFullName"
                  name="orderFullName"
                  placeholder="Enter your Recipient's Name"
                  value={formik.values.orderFullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.orderFullName &&
                  formik.touched.orderFullName && (
                    <small id="helpId" className="text-muted text-danger">
                      {formik.errors.orderFullName}
                    </small>
                  )}
              </div>
              <div className="form-group">
                <label htmlFor="orderEmail" className="control-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="orderEmail"
                  name="orderEmail"
                  placeholder="Enter your email"
                  value={formik.values.orderEmail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.orderEmail && formik.touched.orderEmail && (
                  <small id="helpId" className="text-muted text-danger">
                    {formik.errors.orderEmail}
                  </small>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="orderAddress" className="control-label">
                  Delivery Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="orderAddress"
                  name="orderAddress"
                  placeholder="Enter your address"
                  value={formik.values.orderAddress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.orderAddress && formik.touched.orderAddress && (
                  <small id="helpId" className="text-muted text-danger">
                    {formik.errors.orderAddress}
                  </small>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="orderPhoneNumber" className="control-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="orderPhoneNumber"
                  name="orderPhoneNumber"
                  placeholder="Enter your phone number"
                  value={formik.values.orderPhoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.orderPhoneNumber &&
                  formik.touched.orderPhoneNumber && (
                    <small id="helpId" className="text-muted text-danger">
                      {formik.errors.orderPhoneNumber}
                    </small>
                  )}
              </div>
              <div className="form-group">
                <label htmlFor="orderNote" className="control-label">
                  Notes
                </label>
                <textarea
                  id="orderNote"
                  name="orderNote"
                  className="form-control"
                  rows="4"
                  placeholder="Leave a message..."
                  value={formik.values.orderNote}
                  onChange={formik.handleChange}
                ></textarea>
              </div>
              <div className="cart-btn">
                <button className="btn1" type="button" onClick={handlePay}>
                  Pay
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-5 col-sm-12">
            <div className="cart-details">
              <div
                className="cart-order-heading"
                style={{ marginBottom: "0 !important" }}
              >
                Order Information
              </div>
              <div className="cart-product-list mx-4">
                <div
                  className="cart-product-list-heading my-4 text-center"
                  style={{ marginTop: "0 !important" }}
                >
                  Product List
                </div>
                <div className="cart-product-list-main">
                  <div className="cart-product-list-grid">
                    {carts.map((item) => (
                      <div className="my-3" key={item.ProductId}>
                        <div className="cart-product-title">
                          <a className="font-weight-bold">{item.productName}</a>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="cart-product-price">
                            {item.productPrice.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </div>
                          <div className="ml-3">{`x${item.quantity}`}</div>
                          <div className="cart-quantity-size">
                            {" "}
                            {item.totalAmount.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="cart-detail-list text-center mx-4">
                <div className="row justify-content-between my-3">
                  <div className="col-6 text-left">
                    <div className="cart-list-text">Total Quantity:</div>
                  </div>
                  <div className="col-6" style={{ textAlign: "right" }}>
                    <div className="cart-list-text">{totalQuantity}</div>
                  </div>
                </div>
                <div className="row justify-content-between my-3">
                  <div className="col-6 text-left">
                    <div className="cart-list-text">Total Amount:</div>
                  </div>
                  <div className="col-6" style={{ textAlign: "right" }}>
                    <div className="cart-list-text">
                      {totalPrice.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </div>
                  </div>
                </div>
                <div className="row justify-content-between my-3">
                  <div className="col-6 text-left">
                    <div className="cart-list-text">Shipping Cost:</div>
                  </div>
                  <div className="col-6" style={{ textAlign: "right" }}>
                    <div className="cart-list-text">0.00 USD</div>
                  </div>
                </div>
                <div className="row justify-content-between my-3">
                  <div className="col-6 text-left">
                    <div className="cart-list-text font-weight-bold">
                      Total Amount:
                    </div>
                  </div>
                  <div className="col-6" style={{ textAlign: "right" }}>
                    <div className="cart-list-text font-weight-bold">
                      {totalPrice.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
