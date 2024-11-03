import React, { useEffect, useState } from "react";
import * as productService from "../../../../services/ProductService";
import * as categoryService from "../../../../services/CategoryService";
import "./shop.css";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchApiDataCategory = async () => {
    const [res, err] = await categoryService.findListAll();
    if (res) {
      setCategories(res.data);
    } else {
      console.log(err);
    }
  };
  const fetchApiDataProduct = async () => {
    const [res, err] = await productService.findAll();
    if (res) {
      setProducts(res.data.data);
      if (res.data) setTotalPages(res.data.totalPages);
    } else {
      console.log(err);
    }
  };

  const getDetailProduct = (productId) => {
    navigate(`/detail/${productId}`);
  };
  const handleSearchChange = async (event) => {
    let keyword = event.target.value;
    const [res, err] = await productService.search(keyword, "Id-DESC", 1);
    if (res) {
      setProducts(res.data.data);
      if (res.data) setTotalPages(res.data.totalPages);
    } else {
      console.log(err);
    }
  };
  const handleSort = async (event) => {
    let selectedSort = event.target.value;
    const [res, err] = await productService.search(null, selectedSort, 1);
    if (res) {
      setProducts(res.data.data);
      if (res.data) setTotalPages(res.data.totalPages);
    } else {
      console.log(err);
    }
  };

  const findByCategorySlug = async (categorySlug) => {
    const [res, err] = await productService.findByCategorySlug(categorySlug);
    if (res?.data?.data) {
      setProducts(res.data.data);
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(1);
    } else {
      console.error("Error fetching products by category:", err);
    }
  };

  const handlePageChange = async (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    const [res, err] = await productService.search(null, "Id-DESC", page);
    if (res) {
      setProducts(res.data.data);
      setTotalPages(res.data.totalPages);
    } else {
      console.log(err);
    }
  };

  const renderPagination = () => {
    const maxPagesToShow = 5; // Số trang tối đa muốn hiển thị
    const pages = [];

    // Khi tổng số trang nhỏ hơn hoặc bằng maxPagesToShow, hiển thị tất cả
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <li
            key={i}
            className={`page-item ${currentPage === i ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => handlePageChange(i)}>
              {i}
            </button>
          </li>
        );
      }
    } else {
      // Thêm trang đầu tiên
      pages.push(
        <li
          key={1}
          className={`page-item ${currentPage === 1 ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => handlePageChange(1)}>
            1
          </button>
        </li>
      );

      // Kiểm tra xem cần thêm dấu ba chấm không
      if (currentPage > 3) {
        pages.push(
          <li key="start-dots" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }

      // Thêm các trang gần currentPage
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <li
            key={i}
            className={`page-item ${currentPage === i ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => handlePageChange(i)}>
              {i}
            </button>
          </li>
        );
      }

      // Kiểm tra xem cần thêm dấu ba chấm không
      if (currentPage < totalPages - 2) {
        pages.push(
          <li key="end-dots" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }

      // Thêm trang cuối cùng
      pages.push(
        <li
          key={totalPages}
          className={`page-item ${currentPage === totalPages ? "active" : ""}`}
        >
          <button
            className="page-link"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        </li>
      );
    }

    return pages;
  };

  useEffect(() => {
    fetchApiDataCategory();
    fetchApiDataProduct();
  }, []);

  return (
    <main>
      <div className="text-center box-title">
        <nav className="breadcrumb text-center d-flex justify-content-center">
          <a className="breadcrumb-item default" href="/">
            Home
          </a>
          <span className="breadcrumb-item active">Shop</span>
        </nav>
      </div>
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-none d-md-block sidebar">
            <h2>Danh mục sản phẩm</h2>
            <ul className="list-group">
              {categories.map((item) => (
                <li
                  key={item.categoryId}
                  className="list-group-item"
                  onClick={() => findByCategorySlug(item.categorySlug)}
                >
                  {item.categoryName}
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-md-9">
            {/* Product & Shop Cards */}
            <div className="row justify-content-center">
              <div>
                <div className="w-100 iq-search-filter">
                  <ul className="list-inline p-0 m-0 row justify-content-center search-menu-options">
                    <li className="search-menu-opt">
                      <div className="iq-search-bar search-book d-flex align-items-center">
                        <form
                          className="searchbox d-flex"
                          style={{ width: "360px" }}
                        >
                          <input
                            type="text"
                            className="text search-input"
                            placeholder="Bạn muốn tìm gì ??..."
                            onChange={handleSearchChange}
                          />
                        </form>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3">
                <form>
                  <div className="form-group">
                    <select className="form-control" onChange={handleSort}>
                      <option value="">----- Order by -----</option>
                      <option value="Id-ASC">Sorting By Id (a - z)</option>
                      <option value="Id-DESC">Sorting By Id (z - a)</option>
                      <option value="Name-ASC">Sorting By Name (a - z)</option>
                      <option value="Name-DESC">Sorting By Name (z - a)</option>
                      <option value="Price-ASC">
                        Sorting By Price (a - z)
                      </option>
                      <option value="Price-DESC">
                        Sorting By Price (z - a)
                      </option>
                    </select>
                  </div>
                </form>
              </div>
            </div>

            <div className="iq-card">
              <div className="iq-card-body">
                <div className="row">
                  <div className="card-category row justify-content-center align-items-center container m-auto">
                    {products.map((item) => (
                      <div key={item.productId} className="col-md-4 my-4">
                        <div className="sp-card-2">
                          <div className="overlap">
                            <a
                              onClick={() => getDetailProduct(item.productId)}
                              style={{ cursor: "pointer" }}
                              title="View Details"
                            >
                              View Details
                            </a>
                          </div>
                          <div className="card-image">
                            <img
                              src={item.productImage}
                              alt={item.productName}
                            />
                          </div>

                          <div className="card-content">
                            <span className="card-title">
                              {item.productName}
                            </span>
                            <div className="d-flex my-2">
                              <span className="price-start">
                                {item.productSalePrice > 0 &&
                                item.productSalePrice < item.productPrice ? (
                                  <>
                                    <span>
                                      {item.productSalePrice.toLocaleString(
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
                                      className="price-end"
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
                                  <span>
                                    {item.productPrice.toLocaleString("en-US", {
                                      style: "currency",
                                      currency: "USD",
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                    })}
                                  </span>
                                )}
                              </span>
                            </div>
                            {/* <div className="card-caption">
                              {item.category.categoryName}
                            </div> */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="container">
                    <nav
                      aria-label="Page navigation example"
                      style={{
                        marginTop: "20px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <ul className="pagination">
                        <li
                          className={`page-item ${
                            currentPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}
                          >
                            First
                          </button>
                        </li>
                        <li
                          className={`page-item ${
                            currentPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <a
                            class="page-link"
                            href="javascript:void(0)"
                            aria-label="Previous"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            <span aria-hidden="true">&laquo;</span>
                          </a>
                        </li>
                        {renderPagination()}
                        <li
                          className={`page-item ${
                            currentPage === totalPages ? "disabled" : ""
                          }`}
                        >
                          <a
                            class="page-link"
                            href="javascript:void(0)"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            aria-label="Next"
                          >
                            <span aria-hidden="true">&raquo;</span>
                          </a>
                        </li>
                        <li
                          className={`page-item ${
                            currentPage === totalPages ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages}
                          >
                            Last
                          </button>
                        </li>
                      </ul>
                    </nav>
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

export default Shop;
