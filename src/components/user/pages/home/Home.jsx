import React, { useEffect, useState } from "react";
import "./home.css";
import { Link, useNavigate } from "react-router-dom";
import * as productService from "../../../../services/ProductService";
import * as blogService from "../../../../services/BlogService";
import { clearData, selectUserData } from "../../../../redux/reducers/user";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState([]);
  const [saleProduct, setSaleProduct] = useState([]);
  const [dataBlog, setDataBlog] = useState([]);
  const userData = useSelector(selectUserData);

  const instagram = [
    { id: 1, src: "/image/1.jpg", alt: "image" },
    { id: 2, src: "/image/2.jpg", alt: "image" },
    { id: 3, src: "/image/3.jpg", alt: "image" },
    { id: 4, src: "/image/4.jpg", alt: "image" },
    { id: 5, src: "/image/5.jpg", alt: "image" },
    { id: 6, src: "/image/6.jpg", alt: "image" },
    { id: 7, src: "/image/7.jpg", alt: "image" },
    { id: 8, src: "/image/8.jpg", alt: "image" },
  ];

  const fetchDataNew = async () => {
    const [res, err] = await productService.findProductNew(6);
    if (res) {
      setNewProduct(res.data);
    } else {
      console.log(err);
    }
  };
  const fetchDataSale = async () => {
    const [res, err] = await productService.findProductSale(6);
    if (res) {
      setSaleProduct(res.data);
    } else {
      console.log(err);
    }
  };
  const fetchDataBlog = async () => {
    const [res, err] = await blogService.findByCondition(4);
    if (res) {
      setDataBlog(res.data);
    } else {
      console.log(err);
    }
  };

  const goToDetailPage = (id) => {
    navigate(`/detail/${id}`);
  };

  useEffect(() => {
    fetchDataNew();
    fetchDataSale();
    fetchDataBlog();
  }, []);
  return (
    <main>
      <div class="container-fluid p-0 m-0">
        <div id="carouselId" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselId" data-slide-to="0" class="active"></li>
            <li data-target="#carouselId" data-slide-to="1"></li>
            <li data-target="#carouselId" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner" role="listbox">
            <div class="carousel-item active position-relative">
              <img
                src="/image/home1.jpg"
                class="d-block w-100 h-75"
                alt="First slide"
              />
              <div
                class="carousel-caption d-none d-md-block position-absolute banner-carousel-2"
                style={{ top: "28%" }}
              >
                <div
                  class="text-banner"
                  style={{
                    color: "#fff",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    width: "60%",
                    padding: "63px 0",
                    textAlign: "center",
                    margin: "auto",
                    textTransform: "uppercase",
                  }}
                >
                  <h2 class="text-white">Get Trendy Items To</h2>
                  <h2 class="text-white">Upgrade Style</h2>
                </div>
                <div class="btn-banner text-center mt-5">
                  <Link to={"/shop"} class="btn-shop-now">
                    Shop now
                  </Link>
                </div>
              </div>
            </div>
            <div class="carousel-item position-relative">
              <img
                src="/image/home2.jpg"
                class="d-block w-100 h-75"
                alt="First slide"
              />
              <div
                class="carousel-caption d-none d-md-block position-absolute banner-carousel-2"
                style={{ top: "28%" }}
              >
                <div
                  class="text-banner"
                  style={{
                    color: "#fff",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    width: "60%",
                    padding: "63px 0",
                    textAlign: "center",
                    margin: "auto",
                    textTransform: "uppercase",
                  }}
                >
                  <h2 class="text-white">Get Trendy Items To</h2>
                  <h2 class="text-white">Upgrade Style</h2>
                </div>
                <div class="btn-banner text-center mt-5">
                  <Link to={"/shop"} class="btn-shop-now">
                    Shop now
                  </Link>
                </div>
              </div>
            </div>
            <div class="carousel-item position-relative">
              <img
                src="/image/home3.jpg"
                class="d-block w-100 h-75"
                alt="First slide"
              />
              <div
                class="carousel-caption d-none d-md-block position-absolute banner-carousel-2"
                style={{ top: "28%" }}
              >
                <div
                  class="text-banner"
                  style={{
                    color: "#fff",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    width: "60%",
                    padding: "63px 0",
                    textAlign: "center",
                    margin: "auto",
                    textTransform: "uppercase",
                  }}
                >
                  <h2 class="text-white">Get Trendy Items To</h2>
                  <h2 class="text-white">Upgrade Style</h2>
                </div>
                <div class="btn-banner text-center mt-5">
                  <Link to={"/shop"} class="btn-shop-now">
                    Shop now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselId"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselId"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>

      {/* <!-- new product --> */}
      <div class="container-fluid p-cus">
        <h2 class="heading">
          <span style={{ textTransform: "uppercase" }}>New </span> PRODUCTS
        </h2>
        <div class="iq-card-body">
          <div class="row">
            <div class="card-category row justify-content-center align-items-center container m-auto">
              {newProduct &&
                newProduct.map((item, key) => {
                  return (
                    <div class="col-md-4 my-4">
                      <div class="sp-card-2">
                        <div class="overlap">
                          <a
                            onClick={() => goToDetailPage(item.productId)}
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
                                  {item.productPrice.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  })}
                                </span>
                              </>
                            ) : (
                              <span class="price-start">
                                <td>
                                  {item.productPrice.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  })}
                                </td>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      {/* // <!--end new product --> */}

      <div class="container-fluid p-cus">
        <div class="banner-sale-2 position-relative">
          <div class="banner-img">
            <img class="w-100" src="/image/banner2.jpg" alt="banner2" />
          </div>
          <div class="banner-title position-absolute">
            <div class="subheading">Deal of the Day</div>
            <div class="heading">Hurry up!</div>
            <div class="salePrice">35% Off</div>
            <div class="text">A great choice of Accessories</div>
            <div class="btn-banner">
              <Link to={"/shop"} style={{ color: "#fff" }}>
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- sale product --> */}
      <div class="container-fluid p-cus">
        <h2 class="heading">
          <span style={{ textTransform: "uppercase" }}>New </span> PRODUCTS
        </h2>
        <div class="iq-card-body">
          <div class="row">
            <div class="card-category row justify-content-center align-items-center container m-auto">
              {saleProduct &&
                saleProduct.map((item, key) => {
                  return (
                    <div class="col-md-4 my-4">
                      <div class="sp-card-2">
                        <div class="overlap">
                          <a
                            onClick={() => goToDetailPage(item.productId)}
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
                                  {item.productPrice.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  })}
                                </span>
                              </>
                            ) : (
                              <span class="price-start">
                                <td>
                                  {item.productPrice.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  })}
                                </td>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end sale product --> */}

      <div class="container-fluid p-cus">
        <h2 class="heading">OUR BLOGS</h2>
        <div class="row our-blog">
          {dataBlog &&
            dataBlog.map((item, key) => {
              return (
                <div class="col-md-3">
                  <div class="card card-blog">
                    <a>
                      <img src={item.blogImage} alt="image" />
                    </a>
                  </div>
                  <div class="title-blog">
                    <a>{item.blogTitle}</a>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div class="container-fluid p-cus">
        <div class="shipping_inner row justify-content-between align-items-center">
          <div class="single_shipping d-flex justify-content-center align-items-center col-md-3 col-sm-6">
            <div class="shipping_icon">
              <i class="fa fa-paper-plane" aria-hidden="true"></i>
            </div>
            <div class="shipping_text">
              <h3>Free Shipping</h3>
              <p>Orders over $100</p>
            </div>
          </div>
          <div class="single_shipping d-flex justify-content-center align-items-center col-md-3 col-sm-6">
            <div class="shipping_icon">
              <i class="fa fa-rotate-right"></i>
            </div>
            <div class="shipping_text">
              <h3>Free Returns</h3>
              <p>Within 30 days</p>
            </div>
          </div>
          <div class="single_shipping d-flex justify-content-center align-items-center col-md-3 col-sm-6">
            <div class="shipping_icon">
              <i class="fa fa-lock"></i>
            </div>
            <div class="shipping_text">
              <h3>100% Payment Secure</h3>
              <p>Payment Online</p>
            </div>
          </div>
          <div class="single_shipping d-flex justify-content-center align-items-center col-md-3 col-sm-6">
            <div class="shipping_icon">
              <i class="fa fa-tag"></i>
            </div>
            <div class="shipping_text">
              <h3>Affordable Price</h3>
              <p>Guaranteed</p>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid p-0 overflow-hidden">
        <div class="row">
          {instagram &&
            instagram.map((item) => {
              return (
                <div class="instagram-custom-col">
                  <div class="instagram-item">
                    <Link to={"/blog"} class="instagram-img">
                      <img class="w-100" src={item.src} alt="image" />
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
};

export default Home;
