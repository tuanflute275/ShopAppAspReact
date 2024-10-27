import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as orderService from "../../../../services/OrderService";
import Swal from "sweetalert2";

const Index = () => {
  const formRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [apiData, setApiData] = useState([]);
  const [deleteState, setDeleteState] = useState(false);

  const fetchApiData = async () => {
    const [res, err] = await orderService.findAll();
    if (res) {
      setApiData(res.data.data);
      if (res.data) setTotalPages(res.data.totalPages);
    } else {
      console.log(err);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name") || null;
    const sort = formData.get("sort") || "Id-DESC";
    const page = formData.get("page") || 1;

    const [res, err] = await orderService.search(name, sort, page);
    if (res) {
      setApiData(res.data.data);
      setTotalPages(res.data.totalPages);
    } else {
      console.log(err);
    }
  };

  const handlePageChange = async (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    const [res, err] = await orderService.search(null, "Id-DESC", page);
    if (res) {
      setApiData(res.data.data);
      setTotalPages(res.data.totalPages);
    } else {
      console.log(err);
    }
  };

  const handleReset = () => {
    formRef.current.reset();
    setCurrentPage(1);
    fetchApiData();
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
      const [res, err] = await orderService.remove(id);
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
                  <h4 class="card-title">List Order</h4>
                </div>
              </div>

              <div class="iq-card-body">
                <form
                  method="GET"
                  ref={formRef}
                  onSubmit={(e) => handleSearch(e)}
                >
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="col-3 p-0">
                      <div class="d-flex">
                        <select class="form-control rounded-0 " name="sort">
                          <option value="">----- Order by -----</option>
                          <option value="Id-ASC">Sorting By Id (a - z)</option>
                          <option value="Id-DESC">Sorting By Id (z - a)</option>
                          <option value="Name-ASC">
                            Sorting By Date (a - z)
                          </option>
                          <option value="Name-DESC">
                            Sorting By Date (z - a)
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-3 text-right p-0 m-0">
                      <button type="submit" class="btn rounded-0 btn-primary">
                        Search
                      </button>
                      <button
                        type="button"
                        onClick={handleReset}
                        class="btn rounded-0 btn-danger text-white"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </form>

                <div class="table-responsive table-container">
                  <table
                    class="data-tables table table-striped table-bordered"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th width="5%">#</th>
                        <th width="10%">Customer</th>
                        <th width="5%">Product</th>
                        <th width="10%">Status</th>
                        <th width="12%">Total Amount</th>
                        <th>Note</th>
                        <th width="18%">Create Date</th>
                        <th width="10%">Action</th>
                      </tr>
                    </thead>
                    {apiData && apiData.length > 0 ? (
                      <tbody>
                        {apiData &&
                          apiData.map((item) => {
                            return (
                              <tr key={item.orderId}>
                                <td>{item.orderId}</td>
                                <td>{item.orderFullName}</td>
                                <td>{item.orderQuantity}</td>

                                <td>
                                  {item.orderStatus === 1 ? (
                                    <span className="badge badge-success">
                                      Pending Confirmation
                                    </span>
                                  ) : item.orderStatus === 2 ? (
                                    <span className="badge badge-danger">
                                      Order Confirmed
                                    </span>
                                  ) : item.orderStatus === 3 ? (
                                    <span className="badge badge-danger">
                                      Preparing Order
                                    </span>
                                  ) : item.orderStatus === 4 ? (
                                    <span className="badge badge-danger">
                                      Out for Delivery
                                    </span>
                                  ) : item.orderStatus === 5 ? (
                                    <span className="badge badge-danger">
                                      Delivered
                                    </span>
                                  ) : item.orderStatus === 6 ? (
                                    <span className="badge badge-danger">
                                      Order Canceled
                                    </span>
                                  ) : (
                                    <span className="badge badge-danger">
                                      Unknown Status
                                    </span>
                                  )}
                                </td>
                                <td>
                                  {item.orderAmount.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  })}
                                </td>
                                <td>{item.orderNote}</td>
                                <td>
                                  {new Date(item.orderDate).toLocaleString()}
                                </td>
                                <td>
                                  <div className="flex align-items-center list-user-action">
                                    <Link
                                      to={`/admin/order/detail/${item.orderId}`}
                                      className="bg-warning"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="detail"
                                      onMouseEnter={(e) =>
                                        (e.currentTarget.style.color = "white")
                                      }
                                      onMouseLeave={(e) =>
                                        (e.currentTarget.style.color = "white")
                                      }
                                    >
                                      <i className="ri-eye-line"></i>
                                    </Link>
                                    <Link
                                      to={`/admin/order/list-detail/${item.orderId}`}
                                      className="bg-info"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="order detail"
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.color = "white";
                                        e.currentTarget.style.backgroundColor =
                                          "#d592ff";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.color = "white";
                                        e.currentTarget.style.backgroundColor =
                                          "";
                                      }}
                                    >
                                      <i class="ri-weibo-fill"></i>
                                    </Link>
                                    <Link
                                      to={`/admin/order/edit/${item.orderId}`}
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
                                      onClick={() => handleDelete(item.logId)}
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
                            colSpan={10}
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
