import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as productService from "../../../../services/ProductService";
import * as cartService from "../../../../services/CartService";
import { clearData, selectUserData } from "../../../../redux/reducers/user";
import { useSelector } from "react-redux";
import "./detail.css";
import Swal from "sweetalert2";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [categoryId, setCategoryId] = useState(0);
  const [product, setProduct] = useState({});
  const [productRelated, setProductRelated] = useState([]);
  const userData = useSelector(selectUserData);

  const fetchApiData = async () => {
    const [res, err] = await productService.findById(id);
    if (res) {
      setCategoryId(res.data.categoryId);
      setProduct(res.data);
    } else {
      console.log(err);
    }
  };
  const fetcDataRelated = async () => {
    const [res, err] = await productService.findProductRelated(categoryId, 6);
    if (res) {
      setProductRelated(res.data);
    } else {
      console.log(err);
    }
  };

  const getDetailProduct = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleMinus = (e) => {
    setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };
  const handlePlus = (e) => {
    setQuantity((prevQuantity) => (prevQuantity < 99 ? prevQuantity + 1 : 99));
  };

  const handleAddToCart = async (productId) => {
    const userId = userData.user.id;
    const dataCart = {
      userId: userId,
      productId: productId,
      quantity: quantity,
    };
    const [result, error] = await cartService.save(dataCart);
    if (result) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Add to cart successfully",
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

  const handleBuyNow = async (productId) => {
    const userId = userData.user.id;
    const dataCart = {
      userId: userId,
      productId: productId,
      quantity: 1,
    };
    const [result, error] = await cartService.save(dataCart);
    if (result) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Add to cart successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/cart");
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

  useEffect(() => {
    fetchApiData();
  }, [id]);

  useEffect(() => {
    if (categoryId) {
      fetcDataRelated();
    }
  }, [categoryId]);
  return (
    <div id="content-page" className="content-page m-0">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
              <div className="iq-card-header d-flex justify-content-between align-items-center">
                <h4 className="card-title mb-0">Thông tin</h4>
              </div>
              <div className="iq-card-body pb-0">
                <div className="description-contens align-items-top row">
                  <div className="col-md-6">
                    <div className="iq-card-transparent iq-card-block iq-card-stretch iq-card-height">
                      <div className="iq-card-body p-0">
                        <div className="row align-items-center">
                          <div className="col-3"></div>
                          <div className="col-9">
                            <ul
                              id="description-slider"
                              className="list-inline p-0 m-0 d-flex align-items-center"
                            >
                              <li>
                                <img
                                  src={product.productImage}
                                  className="img-fluid w-100 rounded"
                                  alt=""
                                />
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="iq-card-transparent iq-card-block iq-card-stretch iq-card-height">
                      <div className="iq-card-body p-0">
                        <span>#{product.productId}</span>
                        <h3 className="my-2">{product.productName}</h3>
                        {product.productSalePrice === 0 ? (
                          <div className="price d-flex align-items-center font-weight-500 mb-2">
                            <span className="font-size-24 text-dark">
                              {product.productPrice.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </span>
                          </div>
                        ) : (
                          product.productSalePrice > 0 &&
                          product.productSalePrice < product.productPrice && (
                            <div className="price d-flex align-items-center font-weight-500 mb-2">
                              <span className="font-size-24 pr-2 text-dark">
                                {product.productSalePrice.toLocaleString(
                                  "en-US",
                                  {
                                    style: "currency",
                                    currency: "USD",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  }
                                )}
                              </span>
                              <span
                                className="font-size-20 old-price"
                                style={{
                                  textDecoration: "line-through",
                                  color: "#6d6767",
                                  marginLeft: "10px",
                                }}
                              >
                                {product.productPrice.toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                                })}
                              </span>
                            </div>
                          )
                        )}
                        <span className="text-dark mb-3 d-block">
                          {product.productDescription ||
                            "Không có mô tả sản phẩm"}
                        </span>
                        <div className="text-primary mb-4">
                          Category:
                          <span className="text-body">
                            {product.categoryName}
                          </span>
                        </div>
                        <div className="text-primary mb-4">
                          Status:{" "}
                          <span className="text-body">
                            {product.productStatus ? "Active" : "InActive"}
                          </span>
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
                            onClick={(e) => handleMinus(e)}
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
                            value={quantity}
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
                            onClick={(e) => handlePlus(e)}
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

                        {userData && userData.user.userName ? (
                          <div className="mb-4 d-flex align-items-center">
                            <button
                              onClick={() => handleAddToCart(product.productId)}
                              className="btn btn-primary view-more mr-2"
                            >
                              Add to cart
                            </button>
                            <button
                              onClick={() => handleBuyNow(product.productId)}
                              className="btn btn-primary view-more mr-2"
                            >
                              Buy now
                            </button>
                          </div>
                        ) : (
                          <div className="mb-4 d-flex align-items-center">
                            <Link
                              to="/login"
                              className="btn btn-primary view-more mr-2"
                            >
                              Please log in to continue.
                            </Link>
                          </div>
                        )}

                        <div className="iq-social d-flex align-items-center">
                          <h5 className="mr-2">Chia sẻ:</h5>
                          <ul className="list-inline d-flex p-0 mb-0 align-items-center">
                            <li>
                              <a
                                href="https://www.facebook.com/profile.php?id=100047425502024"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="avatar-40 rounded-circle bg-primary mr-2 facebook"
                              >
                                <i
                                  className="fab fa-facebook-f"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </li>
                            <li>
                              <a
                                href="https://twitter.com/tuanflute275"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="avatar-40 rounded-circle bg-primary mr-2 twitter"
                              >
                                <i
                                  className="fab fa-twitter"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </li>
                            <li>
                              <a
                                href="https://www.youtube.com/channel/UCU3Sbb48DruRaeg-riJQx0A"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="avatar-40 rounded-circle bg-primary mr-2 youtube"
                              >
                                <i
                                  className="fab fa-youtube"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </li>
                            <li>
                              <a
                                href="https://www.pinterest.com/tuanflute275/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="avatar-40 rounded-circle bg-primary pinterest"
                              >
                                <i
                                  className="fab fa-pinterest-p"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="col-lg-12">
            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
              <div className="iq-card-header d-flex justify-content-between align-items-center position-relative">
                <h4 className="card-title mb-0">Related Product</h4>
                <Link to="/shop" className="btn btn-sm btn-primary view-more">
                  Read more
                </Link>
              </div>
              <div className="iq-card-body single-similar-contens">
                <div className="row">
                  <div className="card-category row justify-content-center align-items-center container m-auto">
                    {productRelated &&
                      productRelated.map((item) => (
                        <div class="col-md-4 my-4">
                          <div class="sp-card-2">
                            <div class="overlap">
                              <a
                                onClick={() => getDetailProduct(item.productId)}
                                style={{ cursor: "pointer" }}
                                title="View Details"
                              >
                                View Details
                              </a>
                            </div>
                            <div class="card-image">
                              <img src={item.productImage} alt="image" />
                            </div>

                            <div class="card-content">
                              <span class="card-title">{item.productName}</span>
                              <div class="d-flex my-2">
                                <span class="price-start">
                                  <td></td>
                                </span>
                              </div>
                              <div class="d-flex my-2">
                                {item.productSalePrice > 0 ? (
                                  <>
                                    <span class="price-start">
                                      <td>
                                        {item.productSalePrice.toLocaleString(
                                          "en-US",
                                          {
                                            style: "currency",
                                            currency: "USD",
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                          }
                                        )}
                                      </td>
                                    </span>
                                    <span
                                      class="price-end"
                                      style={{
                                        textDecoration: "line-through",
                                        color: "#6d6767",
                                        marginLeft: "10px",
                                      }}
                                    >
                                      {item.productPrice.toLocaleString(
                                        "en-US",
                                        {
                                          style: "currency",
                                          currency: "USD",
                                          minimumFractionDigits: 0,
                                          maximumFractionDigits: 0,
                                        }
                                      )}
                                    </span>
                                  </>
                                ) : (
                                  <span class="price-start">
                                    <td>
                                      {item.productPrice.toLocaleString(
                                        "en-US",
                                        {
                                          style: "currency",
                                          currency: "USD",
                                          minimumFractionDigits: 0,
                                          maximumFractionDigits: 0,
                                        }
                                      )}
                                    </td>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
