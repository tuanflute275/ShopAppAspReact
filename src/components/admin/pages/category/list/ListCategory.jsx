import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as categoryService from "../../../../../services/CategoryService";
import Swal from "sweetalert2";

const ListCategory = () => {
  const formRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [apiData, setApiData] = useState([]);
  const [deleteState, setDeleteState] = useState(false);

  const fetchApiData = async () => {
    const [res, err] = await categoryService.findAll();
    if (res) {
      setApiData(res.data.data);
      setTotalPages(res.data.totalPages);
    } else {
      console.log(err);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name") || null;
    const sort = formData.get("sort") || null;
    const page = formData.get("page") || 1;

    const [res, err] = await categoryService.search(name, sort, page);
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
    const [res, err] = await categoryService.search(null, null, page);
    if (res) {
      setApiData(res.data.data);
      setTotalPages(res.data.totalPages);
    } else {
      console.log(err);
    }
  };

  const handleReset = () => {
    formRef.current.reset();
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
      const [res, err] = await categoryService.remove(id);
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
    fetchApiData();
  }, [deleteState]);

  return (
    <div id="content-page" class="content-page">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12">
            <div class="iq-card">
              <div class="iq-card-header d-flex justify-content-between">
                <div class="iq-header-title">
                  <h4 class="card-title">Danh sách danh mục</h4>
                </div>
                <div class="iq-card-header-toolbar d-flex align-items-center">
                  <Link to={"/admin/category/add"} className="btn btn-primary">
                    Thêm danh mục mới
                  </Link>
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
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Tìm kiếm theo tên danh mục..."
                        name="name"
                      />
                    </div>

                    <div class="col-3 p-0">
                      <div class="d-flex">
                        <select class="form-control rounded-0 " name="sort">
                          <option value="">----- Sắp xếp -----</option>
                          <option value="Id-ASC">
                            Sắp xếp theo stt (a - z)
                          </option>
                          <option value="Id-DESC">
                            Sắp xếp theo stt (z - a)
                          </option>
                          <option value="Name-ASC">
                            Sắp xếp theo tên (a - z)
                          </option>
                          <option value="Name-DESC">
                            Sắp xếp theo tên (z - a)
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-3 text-right p-0 m-0">
                      <button type="submit" class="btn rounded-0 btn-primary">
                        Tìm kiếm
                      </button>
                      <button
                        type="button"
                        onClick={handleReset}
                        class="btn rounded-0 btn-danger text-white"
                      >
                        Làm mới
                      </button>
                    </div>
                  </div>
                </form>

                <div class="table-responsive">
                  <table
                    class="data-tables table table-striped table-bordered"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th width="5%">STT</th>
                        <th>Tên danh mục</th>
                        <th>Tên slug</th>
                        <th>Trạng thái</th>
                        <th width="10%">Hoạt động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiData &&
                        apiData.map((item) => {
                          return (
                            <tr key={item.categoryId}>
                              <td>{item.categoryId}</td>
                              <td>{item.categoryName}</td>
                              <td>{item.categorySlug}</td>
                              <td>{item.categoryStatus ? "Hiện" : "Ẩn"}</td>
                              <td>
                                <div className="flex align-items-center list-user-action">
                                  <Link
                                    to={`/admin/category/update/${item.categoryId}`}
                                    className="bg-primary"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Sửa"
                                  >
                                    <i className="ri-pencil-line"></i>
                                  </Link>
                                  <button
                                    className="bg-danger"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Xoá"
                                    onClick={() =>
                                      handleDelete(item.categoryId)
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
                  </table>
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <a
                          href="javascript:void(0)"
                          className="page-link"
                          onClick={() => handlePageChange(currentPage - 1)}
                        >
                          Previous
                        </a>
                      </li>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <li
                          key={i}
                          className={`page-item ${
                            currentPage === i + 1 ? "active" : ""
                          }`}
                        >
                          <a
                            href="javascript:void(0)"
                            className="page-link"
                            onClick={() => handlePageChange(i + 1)}
                          >
                            {i + 1}
                          </a>
                        </li>
                      ))}
                      <li
                        className={`page-item ${
                          currentPage === totalPages ? "disabled" : ""
                        }`}
                      >
                        <a
                          href="javascript:void(0)"
                          className="page-link"
                          onClick={() => handlePageChange(currentPage + 1)}
                        >
                          Next
                        </a>
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
  );
};

export default ListCategory;
