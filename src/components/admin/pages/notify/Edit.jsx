import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as notifyService from "../../../../services/NotifyService";
import Swal from "sweetalert2";

const UpdateCategory = () => {
  const { id } = useParams();

  const initState = {
    message: "",
    isRead: true,
  };

  const initData = {
    message: "",
    isRead: true,
  };

  const [apiData, setApiData] = useState(initData);
  const [postData, setPostData] = useState(initState);
  const navigate = useNavigate();

  const fetchApiData = async (id) => {
    const [result, error] = await notifyService.findById(id);
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
      message: postData.message
        ? postData.message
        : apiData.message,
      isRead: postData.isRead
        ? postData.isRead === "true"
        : apiData.isRead,
    };

    const [result, error] = await notifyService.update(id, newData);
    if (result) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/admin/notify");
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
                  <h4 className="card-title">Update Notify</h4>
                </div>
              </div>
              <div className="iq-card-body">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="form-group">
                    <label>Message</label>
                    <input
                      type="text"
                      name="message"
                      className="form-control"
                      placeholder="Enter your name..."
                      defaultValue={apiData.message}
                      onChange={(e) => handleChangeValue(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="d-block">IsRead</label>
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        id="status"
                        name="isRead"
                        className="custom-control-input"
                        checked={apiData.isRead === true}
                        value="true"
                        onChange={(e) => handleChangeValue(e)}
                      />
                      <label className="custom-control-label" htmlFor="status">
                        Read
                      </label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        id="status2"
                        name="isRead"
                        className="custom-control-input"
                        checked={apiData.isRead === false}
                        value="false"
                        onChange={(e) => handleChangeValue(e)}
                      />
                      <label className="custom-control-label" htmlFor="status2">
                        Unread
                      </label>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                  <Link to={"/admin/notify"} className="btn btn-danger ml-2">
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

export default UpdateCategory;
