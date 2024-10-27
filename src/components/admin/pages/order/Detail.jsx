import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as orderService from "../../../../services/OrderService";

// Hàm hiển thị nhãn trạng thái đơn hàng
const getOrderStatusBadge = (status) => {
  switch (status) {
    case 1:
      return <span className="badge badge-success">Pending Confirmation</span>;
    case 2:
      return <span className="badge badge-info">Order Confirmed</span>;
    case 3:
      return <span className="badge badge-warning">Preparing Order</span>;
    case 4:
      return <span className="badge badge-primary">Out for Delivery</span>;
    case 5:
      return <span className="badge badge-success">Delivered</span>;
    case 6:
      return <span className="badge badge-danger">Order Canceled</span>;
    default:
      return <span className="badge badge-secondary">Unknown Status</span>;
  }
};

// Component hiển thị chi tiết đơn hàng
const Detail = () => {
  const { id } = useParams();
  const [apiData, setApiData] = useState({});
  const [error, setError] = useState(null);

  const fetchApiData = async (id) => {
    const [result, error] = await orderService.findById(id);
    if (result) {
      setApiData(result.data);
    } else {
      setError("Failed to fetch order details.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApiData(id);
  }, [id]);

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div id="content-page" className="content-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <h4 className="card-title">Order Details</h4>
              </div>
              <div className="iq-card-body">
                <OrderDetail label="Order ID" value={apiData.orderId} />
                <OrderDetail
                  label="Order Full Name"
                  value={apiData.orderFullName}
                />
                <OrderDetail
                  label="Order Address"
                  value={apiData.orderAddress}
                />
                <OrderDetail
                  label="Order Phone"
                  value={apiData.orderPhoneNumber}
                />
                <OrderDetail label="Order Email" value={apiData.orderEmail} />
                <OrderDetail label="Order Date" value={apiData.orderDate} />
                <div className="form-group">
                  <label>Order Status</label>
                  <br />
                  {getOrderStatusBadge(apiData.orderStatus)}
                </div>
                <OrderDetail
                  label="Order Payment Methods"
                  value={apiData.orderPaymentMethods}
                />
                <OrderDetail
                  label="Order Quantity"
                  value={apiData.orderQuantity}
                />
                <OrderDetail label="Order Amount" value={apiData.orderAmount} />
                <OrderDetail
                  label="Order Note"
                  value={apiData.note}
                  isTextArea
                />
                <Link to="/admin/order" className="btn btn-danger mt-3">
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component hiển thị từng trường chi tiết của đơn hàng
const OrderDetail = ({ label, value, isTextArea = false }) => (
  <div className="form-group">
    <label>{label}</label>
    {isTextArea ? (
      <textarea
        className="form-control"
        rows="3"
        defaultValue={value}
        disabled
      ></textarea>
    ) : (
      <input
        type="text"
        className="form-control"
        defaultValue={value}
        disabled
      />
    )}
  </div>
);

export default Detail;
