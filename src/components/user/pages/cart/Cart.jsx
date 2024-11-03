import React, { useEffect, useId, useState } from "react";
import * as cartService from "../../../../services/CartService";
import { useSelector } from "react-redux";
import { clearData, selectUserData } from "../../../../redux/reducers/user";
import "./cart.css";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const userData = useSelector(selectUserData);
  const [carts, setCarts] = useState([]);
  const [deleteState, setDeleteState] = useState(false);
  const [isChange, setIsChange] = useState(false);

  const fetchApiData = async (userId) => {
    const [res, err] = await cartService.findByUserId(userId);
    if (res) {
      setCarts(res.data);
    } else {
      console.log(err);
    }
  };

  const handleMinus = async (event, cartId, quantity) => {
    event.preventDefault();
    const [res, err] = await cartService.update(cartId, "minus");
    if (res) {
      setIsChange(!isChange);
    } else {
      console.log(err);
    }
  };

  const handlePlus = async (event, cartId, quantity) => {
    event.preventDefault();
    const [res, err] = await cartService.update(cartId, "plus");
    if (res) {
      setIsChange(!isChange);
    } else {
      console.log(err);
    }
  };

  const handleDelete = async (cartId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const [res, err] = await cartService.remove(cartId);
      if (res) {
        setDeleteState(!deleteState);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Deleted",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (err) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Delete failed",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  useEffect(() => {
    fetchApiData(userData.user.id);
  }, [deleteState, isChange]);

  const isEmpty = true;

  return (
    <main>
      <div className="text-center box-title">
        <h3 className="title">Shopping Cart</h3>
        <nav className="breadcrumb text-center d-flex justify-content-center">
          <a className="breadcrumb-item default" href="/">
            Home
          </a>
          <span className="breadcrumb-item active">Shopping Cart</span>
        </nav>
        <div className="container"></div>
      </div>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <div className="cart-product-list">
              <div className="cart-product-list-heading my-4">
                Shopping Cart
              </div>
              <div className="cart-product-list-main">
                {!carts && carts.length == 0 ? (
                  <div className="alert alert-danger" role="alert">
                    No products to display!{" "}
                    <a
                      href="/shop"
                      className="font-weight-bold text-decoration-none"
                    >
                      Continue Shopping
                    </a>
                  </div>
                ) : (
                  carts.map((item) => (
                    <div
                      key={item.cartId}
                      className="cart-product-list-grid d-flex align-items-center m-0"
                      style={{ borderBottom: "none" }}
                    >
                      <div className="cart-product-list-image">
                        <Link to={`/detail/${item.productId}`}>
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="card-img"
                            style={{ width: "100px" }}
                          />
                        </Link>
                      </div>
                      <div className="cart-product-list-details">
                        <div className="cart-product-title">
                          <a>{item.productName}</a>
                        </div>
                        <div className="cart-product-price">
                          {item.productPrice.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            border: "1px solid #e5e5e5",
                            borderRadius: "5px",
                            overflow: "hidden",
                            width: "118px",
                            marginBottom: "25px",
                          }}
                        >
                          <button
                            className="btn_minus"
                            onClick={(e) =>
                              handleMinus(e, item.cartId, item.quantity)
                            }
                            style={{
                              backgroundColor: "#f5f5f5",
                              border: "none",
                              padding: "5px 10px",
                              cursor: "pointer",
                              transition: "background-color 0.3s",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#e0e0e0")
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#f5f5f5")
                            }
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>

                          <input
                            type="number"
                            min="0"
                            max="99"
                            name="quantity"
                            value={item.quantity}
                            id="quantity"
                            style={{
                              width: "50px",
                              border: "none",
                              textAlign: "center",
                              outline: "none",
                              fontSize: "16px",
                            }}
                            onFocus={(e) =>
                              (e.currentTarget.style.border =
                                "1px solid #007bff")
                            }
                            onBlur={(e) =>
                              (e.currentTarget.style.border = "none")
                            }
                          />

                          <button
                            className="btn_plus"
                            onClick={(e) =>
                              handlePlus(e, item.cartId, item.quantity)
                            }
                            style={{
                              backgroundColor: "#f5f5f5",
                              border: "none",
                              padding: "5px 10px",
                              cursor: "pointer",
                              transition: "background-color 0.3s",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#e0e0e0")
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#f5f5f5")
                            }
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </div>
                        <div className="cart-stock-text">
                          {item.productStatus ? "Active" : "InActive"}
                        </div>
                      </div>
                      <div className="cart-product-remove-btn">
                        <a
                          onClick={() => handleDelete(item.cartId)}
                          style={{
                            padding: "6px 0px 5px 3px",
                            cursor: "pointer",
                            border: "none",
                            outline: "none",
                          }}
                        >
                          <i className="fa fa-remove"></i>
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="cart-details">
              <div className="cart-order-heading">Order Information</div>
              <div className="cart-order-summary-des text-center">
                Shipping and taxes are calculated at checkout
              </div>
              <div className="cart-line"></div>
              <div className="cart-detail-list text-center mx-4">
                {carts.map((item) => (
                  <div key={item.cartId}>
                    <div className="row justify-content-between my-3">
                      <div className="col-5 text-left">
                        <div className="cart-list-text">Product Name:</div>
                      </div>
                      <div className="col-7" style={{ textAlign: "right" }}>
                        <div className="cart-list-text font-weight-bold">
                          {item.productName}
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-between my-3">
                      <div className="col-4 text-left">
                        <div className="cart-list-text">Price:</div>
                      </div>
                      <div className="col-6" style={{ textAlign: "right" }}>
                        <div className="cart-list-text">
                          {item.productPrice.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-between my-3">
                      <div className="col-4 text-left">
                        <div className="cart-list-text">Quantity:</div>
                      </div>
                      <div className="col-6" style={{ textAlign: "right" }}>
                        <div className="cart-list-text">{item.quantity}</div>
                      </div>
                    </div>
                    <div className="row justify-content-between my-3">
                      <div className="col-4 text-left">
                        <div className="cart-list-text">Total:</div>
                      </div>
                      <div className="col-6" style={{ textAlign: "right" }}>
                        <div className="cart-list-text">{`${item.totalAmount.toLocaleString()} VND`}</div>
                      </div>
                    </div>
                    <div className="cart-line"></div>
                  </div>
                ))}
              </div>
              <div className="cart-btn">
                <a href="/checkout" className="btn1">
                  Checkout
                </a>
                <a href="/shop" className="btn2">
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
