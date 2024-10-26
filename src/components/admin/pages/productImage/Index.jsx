import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as productImageService from "../../../../services/ProductImageService";
import Swal from "sweetalert2";

const Index = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [apiData, setApiData] = useState([]);
  const [deleteState, setDeleteState] = useState(false);

  const fetchApiData = async () => {
    const [res, err] = await productImageService.findById(id);
    if (res) {
      setApiData(res.data.data);
      if (res.data) setTotalPages(res.data.totalPages);
    } else {
      console.log(err);
    }
  };

  const handleAddBtn = () => {
    navigate(`/admin/product/image/create/${id}`);
  };

  const handlePageChange = async (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    const [res, err] = await productImageService.search(id, page);
    if (res) {
      setApiData(res.data.data);
      setTotalPages(res.data.totalPages);
    } else {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
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
      const [res, err] = await productImageService.remove(id);
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
  }, [deleteState]);

  return (
    <div
      id="content-page"
      class="content-page"
      style={{ paddingTop: "73px", height: "100px" }}
    >
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12">
            <div class="iq-card">
              <div class="iq-card-header d-flex justify-content-between">
                <div class="iq-header-title">
                  <h4 class="card-title">List Image </h4>
                </div>
                <div class="iq-card-header-toolbar d-flex align-items-center">
                  <button onClick={handleAddBtn} className="btn btn-primary">
                    Add Image
                  </button>
                </div>
              </div>

              <div class="iq-card-body">
                <div class="d-flex justify-content-end">
                  <Link
                    to={"/admin/product"}
                    class="btn rounded-0 btn-warning text-white"
                  >
                    Back
                  </Link>
                </div>
                <div
                  class="table-responsive table-container"
                  style={{ height: "435px", maxHeight: "435px" }}
                >
                  <table
                    class="data-tables table table-striped table-bordered"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th width="5%">#product</th>
                        <th>Image</th>
                        <th>Create Date</th>
                        <th>Update Date</th>
                        <th width="10%">Action</th>
                      </tr>
                    </thead>
                    {apiData && apiData.length > 0 ? (
                      <tbody>
                        {apiData &&
                          apiData.map((item) => {
                            return (
                              <tr key={item.productId}>
                                <td>{item.productId}</td>
                                <td>
                                  <img
                                    className="card-img"
                                    style={{ width: "120px" }}
                                    src={item.path}
                                    alt="Image"
                                  />
                                </td>
                                <td>
                                  {new Date(item.createDate).toLocaleString()}
                                </td>
                                <td>
                                  {new Date(item.updateDate).toLocaleString()}
                                </td>
                                <td>
                                  <div className="flex align-items-center list-user-action">
                                    <Link
                                      to={`/admin/product/image/edit/${item.productId}/${item.productImageId}`}
                                      className="bg-primary"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Edit"
                                    >
                                      <i className="ri-pencil-line"></i>
                                    </Link>
                                    <button
                                      className="bg-danger"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Delete"
                                      data-original-title="Delete"
                                      onClick={() =>
                                        handleDelete(item.productId)
                                      }
                                      style={{
                                        fontSize: "16px",
                                        width: "25px",
                                        height: "25px",
                                        textAlign: "center",
                                        lineHeight: "20px",
                                        margin: "0px 3px",
                                        borderRadius: "5px",
                                        display: "inline-block",
                                        border: "none",
                                        transition: "0.3s ease",
                                      }}
                                    >
                                      <i className="ri-delete-bin-line"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    ) : (
                      <tbody>
                        <tr>
                          <td
                            colSpan={5}
                            style={{
                              height: "350px",
                              background: "rgb(241 241 241)",
                            }}
                            className="text-center"
                          >
                            No data available
                          </td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                </div>
                <nav
                  aria-label="Page navigation example"
                  style={{ marginTop: "20px" }}
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
  );
};

export default Index;
