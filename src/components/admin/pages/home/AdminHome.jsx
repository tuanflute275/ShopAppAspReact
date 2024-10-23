import React from "react";

const AdminHome = () => {
  return (
    <div id="content-page" className="content-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-lg-3">
            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
              <div className="iq-card-body">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle iq-card-icon bg-primary">
                    <i className="ri-user-line"></i>
                  </div>
                  <div className="text-left ml-3">
                    <h2 className="mb-0">
                      <span className="counter">7900</span>
                    </h2>
                    <h5 className="">Người dùng</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
              <div className="iq-card-body">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle iq-card-icon bg-danger">
                    <i className="ri-book-line"></i>
                  </div>
                  <div className="text-left ml-3">
                    <h2 className="mb-0">
                      <span className="counter">4.8</span>K
                    </h2>
                    <h5 className="">Sách</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
              <div className="iq-card-body">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle iq-card-icon bg-warning">
                    <i className="ri-shopping-cart-2-line"></i>
                  </div>
                  <div className="text-left ml-3">
                    <h2 className="mb-0">
                      <span className="counter">1.2</span>K
                    </h2>
                    <h5 className="">Đơn Hàng</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
              <div className="iq-card-body">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle iq-card-icon bg-info">
                    <i className="ri-radar-line"></i>
                  </div>
                  <div className="text-left ml-3">
                    <h2 className="mb-0">
                      <span className="counter">690</span>
                    </h2>
                    <h5 className="">Chờ Duyệt</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-12">
            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">Mở hóa đơn</h4>
                </div>
              </div>
              <div className="iq-card-body">
                <div className="table-responsive">
                  <table className="table mb-0 table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">Khách hàng</th>
                        <th scope="col">Ngày</th>
                        <th scope="col">Hóa đơn</th>
                        <th scope="col">Số tiền</th>
                        <th scope="col">Tình trạng</th>
                        <th scope="col">Hoạt động</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>QT Store</td>
                        <td>24/12/2019</td>
                        <td>568569</td>
                        <td>10000đ</td>
                        <td>
                          <div className="badge badge-pill badge-success">
                            Đã thanh toán
                          </div>
                        </td>
                        <td>Gửi Email</td>
                      </tr>
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

export default AdminHome;
