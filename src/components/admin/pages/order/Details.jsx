import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as orderService from "../../../../services/OrderService";

const Details = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState({});
  const [orderDetails, setOrderDetails] = useState([]);

  const fetchOrderData = async (id) => {
    const [result, error] = await orderService.findById(id);
    if (result) {
      console.log(result.data);
      setOrderData(result.data);
      setOrderDetails(result.data.orderDetails || []);
    } else {
      console.error("Error loading order data:", error);
    }
  };

  const handleExportExcel = async (id) => {
    const [result, error] = await orderService.findById(id);
    if (result) {
      setOrderData(result.data);
      setOrderDetails(result.data.orderDetails || []);
    } else {
      console.error("Error loading order data:", error);
    }
  };

  useEffect(() => {
    fetchOrderData(id);
  }, [id]);

  return (
    <div
      id="content-page"
      className="content-page"
      style={{ paddingTop: "73px", height: "100px" }}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">
                    Order Details #{orderData.orderId}
                  </h4>
                  <span>
                    Customer:{" "}
                    <span className="font-weight-bold">
                      {orderData.orderFullName}
                    </span>
                  </span>
                  <br />
                  <span>
                    Email:{" "}
                    <span className="font-weight-bold">
                      {orderData.orderEmail}
                    </span>
                  </span>
                  <br />
                  <span>
                    Address:{" "}
                    <span className="font-weight-bold">
                      {orderData.orderAddress}
                    </span>
                  </span>
                  <br />
                  <span>
                    Phone Number:{" "}
                    <span className="font-weight-bold">
                      {orderData.orderPhoneNumber}
                    </span>
                  </span>
                  <br />
                  <span>
                    Order Date:{" "}
                    <span className="font-weight-bold">
                      {orderData.orderDate}
                    </span>
                  </span>
                  <br />
                  <span>
                    Total Order Value:{" "}
                    <span className="font-weight-bold">
                      {(orderData.orderAmount || 0).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </span>
                </div>
              </div>
              <div className="iq-card-body">
                <div className="table-responsive">
                  <Link to="/admin/order" className="btn btn-danger mb-2 mr-2">
                    Back
                  </Link>
                  <button
                    onClick={(e) => handleExportExcel()}
                    className="btn btn-primary mb-2"
                  >
                    Download Excel
                  </button>
                  <table className="data-tables table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th width="10%">Image</th>
                        <th style={{ width: "10%" }}>Category</th>
                        <th>Product Name</th>
                        <th style={{ width: "15%" }}>Product Price</th>
                        <th style={{ width: "8%" }}>Quantity</th>
                        <th style={{ width: "15%" }}>Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails.map((item, index) => (
                        <tr key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">
                            <img
                              src={item.productImage}
                              alt={item.productName || "Product Image"}
                              className="card-img"
                              style={{ width: "100px" }}
                            />
                          </td>
                          <td className="text-center">{item.categoryName}</td>
                          <td className="text-center">{item.productName}</td>
                          <td className="text-center">
                            {(item.productPrice || 0).toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </td>
                          <td className="text-center">{item.quantity}</td>
                          <td className="text-center">
                            {(item.totalMoney || 0).toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
