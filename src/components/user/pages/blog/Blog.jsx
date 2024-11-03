import React, { useEffect, useState } from "react";
import "./blog.css";
import * as blogService from "../../../../services/BlogService";
import { Link } from "react-router-dom";

const Blog = () => {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchApiData = async () => {
    const [res, err] = await blogService.findAll();
    if (res) {
      setApiData(res.data.data);
      if (res.data) setTotalPages(res.data.totalPages);
    } else {
      console.log(err);
    }
  };

  const handlePageChange = async (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    const [res, err] = await blogService.search(null, "Id-DESC", page);
    if (res) {
      setApiData(res.data.data);
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
    fetchApiData();
  }, []);

  return (
    <main>
      <div class="text-center box-title">
        <nav class="breadcrumb text-center d-flex justify-content-center">
          <a class="breadcrumb-item default" routerLink="/">
            Home
          </a>
          <span class="breadcrumb-item active">Our Blog</span>
        </nav>
        <h3 class="title">OUR BLOG</h3>
        <div class="container"></div>
      </div>
      <div class="container">
        <div class="iq-card">
          <div class="iq-card-body">
            <div class="row">
              <div class="card-category row justify-content-center align-items-center container m-auto">
                {apiData &&
                  apiData.map((item, key) => {
                    return (
                      <div class="col-md-4 my-4">
                        <div class="sp-card-2">
                          <div class="overlap">
                            <Link
                              to={"/"}
                              style={{ cursor: "pointer" }}
                              title="View Details"
                            >
                              View Details
                            </Link>
                          </div>
                          <div class="card-image">
                            <img src={item.blogImage} alt="Image" />
                          </div>
                          <div class="card-content">
                            <span class="card-title">{item.blogTitle}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
    </main>
  );
};

export default Blog;
