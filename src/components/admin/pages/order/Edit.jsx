import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as orderService from "../../../../services/OrderService";
import Swal from "sweetalert2";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState();
  const [orderData, setOrderData] = useState({});

  const handleOrderStatusChange = (event) => {
    setOrderStatus(Number(event.target.value));
  };

  const fetchOrderData = async (id) => {
    const [result, error] = await orderService.findById(id);
    if (result) {
      setOrderStatus(result.data.orderStatus);
      setOrderData(result.data);
    } else {
      console.error("Error loading order data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [result, error] = await orderService.update(id, orderStatus);
    if (result) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/admin/order");
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
    fetchOrderData(id);
  }, [id]);

  return (
    <div
      id="content-page"
      className="content-page p-0"
      style={{ paddingTop: "85px" }}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">Chỉnh sửa danh mục</h4>
                </div>
              </div>
              <div className="iq-card-body">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="form-group">
                    <label className="control-label">Status</label>
                    <select
                      className="form-control"
                      style={{ fontWeight: "bold" }}
                      value={orderStatus}
                      onChange={handleOrderStatusChange}
                    >
                      <option value="1" selected={orderStatus == "1"}>
                        Pending Confirmation
                      </option>
                      <option value="2" selected={orderStatus == "2"}>
                        Order Confirmed
                      </option>
                      <option value="3" selected={orderStatus == "3"}>
                        Preparing Order
                      </option>
                      <option value="4" selected={orderStatus == "4"}>
                        Out for Delivery
                      </option>
                      <option value="5" selected={orderStatus == "5"}>
                        Delivered
                      </option>
                      <option value="6" selected={orderStatus == "6"}>
                        Order Canceled
                      </option>
                    </select>
                    <span className="text-danger"></span>
                  </div>
                  <div className="form-group">
                    <label className="control-label">Customer</label>
                    <input
                      type="text"
                      className="form-control"
                      readOnly
                      value={orderData.orderFullName}
                    />
                    <span className="text-danger"></span>
                  </div>
                  <div className="form-group">
                    <label className="control-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      readOnly
                      value={orderData.orderAddress}
                    />
                    <span className="text-danger"></span>
                  </div>
                  <div className="form-group">
                    <label className="control-label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      readOnly
                      value={orderData.orderPhone}
                    />
                    <span className="text-danger"></span>
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Save"
                      className="btn btn-primary"
                    />
                    <Link to="/admin/order" className="btn btn-danger ml-2">
                      Back
                    </Link>
                  </div>
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
