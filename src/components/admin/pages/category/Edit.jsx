import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as categoryService from "../../../../services/CategoryService";
import Swal from "sweetalert2";

const Edit = () => {
  const { id } = useParams();

  const initState = {
    categoryName: "",
    categoryStatus: true,
  };

  const initData = {
    categoryName: "",
    categoryStatus: true,
  };

  const [apiData, setApiData] = useState(initData);
  const [postData, setPostData] = useState(initState);
  const navigate = useNavigate();

  const fetchApiData = async (id) => {
    const [result, error] = await categoryService.findById(id);
    if (result) {
      setApiData(result.data);
    } else {
      console.log(error);
    }
  };

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    const booleanValue = value === "true";
    setApiData((prevData) => ({
      ...prevData,
      [name]: booleanValue,
    }));
    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      categoryName: postData.categoryName
        ? postData.categoryName
        : apiData.categoryName,
      categoryStatus: postData.categoryStatus
        ? postData.categoryStatus === "true"
        : apiData.categoryStatus,
    };

    const [result, error] = await categoryService.update(id, newData);
    console.log(result);
    if (result) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/admin/category");
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

  useEffect(() => {
    fetchApiData(id);
  }, []);
  return (
    <div id="content-page" className="content-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">Update Category</h4>
                </div>
              </div>
              <div className="iq-card-body">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="categoryName"
                      className="form-control"
                      placeholder="Enter your name..."
                      defaultValue={apiData.categoryName}
                      onChange={(e) => handleChangeValue(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="d-block">Status</label>
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        id="status"
                        name="categoryStatus"
                        className="custom-control-input"
                        checked={apiData.categoryStatus === true}
                        value="true"
                        onChange={(e) => handleChangeValue(e)}
                      />
                      <label className="custom-control-label" htmlFor="status">
                        Active
                      </label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        id="status2"
                        name="categoryStatus"
                        className="custom-control-input"
                        checked={apiData.categoryStatus === false}
                        value="false"
                        onChange={(e) => handleChangeValue(e)}
                      />
                      <label className="custom-control-label" htmlFor="status2">
                        InActive
                      </label>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                  <Link to={"/admin/category"} className="btn btn-danger ml-2">
                    Back
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
