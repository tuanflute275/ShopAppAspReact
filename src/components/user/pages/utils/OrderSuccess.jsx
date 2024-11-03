import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = ({ customerName }) => {
  return (
    <div style={{ backgroundColor: "#f4f4f4", margin: 0, padding: 0 }}>
      {/* HIDDEN PREHEADER TEXT */}
      <div
        style={{
          fontSize: "1px",
          color: "#fefefe",
          lineHeight: "1px",
          fontFamily: "'Lato', Helvetica, Arial, sans-serif",
          maxHeight: "0px",
          maxWidth: "0px",
          opacity: 0,
          overflow: "hidden",
        }}
      >
        We're thrilled to have you here! Get ready to dive into your new
        account.
      </div>
      <table border="0" cellPadding="0" cellSpacing="0" width="100%">
        {/* LOGO */}
        <tr>
          <td bgcolor="#79a206" align="center">
            <table
              border="0"
              cellPadding="0"
              cellSpacing="0"
              width="100%"
              style={{ maxWidth: "600px" }}
            >
              <tr>
                <td
                  align="center"
                  valign="top"
                  style={{ padding: "40px 10px" }}
                >
                  {" "}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td bgcolor="#79a206" align="center" style={{ padding: "0 10px" }}>
            <table
              border="0"
              cellPadding="0"
              cellSpacing="0"
              width="100%"
              style={{ maxWidth: "600px" }}
            >
              <tr>
                <td
                  bgcolor="#ffffff"
                  align="center"
                  valign="top"
                  style={{
                    padding: "40px 20px",
                    borderRadius: "4px 4px 0 0",
                    color: "#111111",
                    fontFamily: "'Lato', Helvetica, Arial, sans-serif",
                    fontSize: "48px",
                    fontWeight: 400,
                    letterSpacing: "4px",
                    lineHeight: "48px",
                  }}
                >
                  <h1
                    style={{ fontSize: "48px", fontWeight: 400, margin: "2" }}
                  >
                    Success!
                  </h1>
                  <img
                    src="https://img.icons8.com/clouds/100/000000/handshake.png"
                    width="125"
                    height="120"
                    style={{ display: "block", border: "0" }}
                    alt="Success"
                  />
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td bgcolor="#f4f4f4" align="center" style={{ padding: "0 10px" }}>
            <table
              border="0"
              cellPadding="0"
              cellSpacing="0"
              width="100%"
              style={{ maxWidth: "600px" }}
            >
              <tr>
                <td
                  bgcolor="#ffffff"
                  align="left"
                  style={{
                    padding: "20px 30px 40px 30px",
                    color: "#666666",
                    fontFamily: "'Lato', Helvetica, Arial, sans-serif",
                    fontSize: "18px",
                    fontWeight: 400,
                    lineHeight: "25px",
                  }}
                >
                  <p style={{ margin: "0", textAlign: "center" }}>
                    Your order has been successfully placed. Please check your
                    email.
                  </p>
                  <p style={{ textAlign: "center" }}>
                    Thank you for trusting and using our services!
                  </p>
                </td>
              </tr>
              <tr>
                <td bgcolor="#ffffff" align="left">
                  <table
                    width="100%"
                    border="0"
                    cellSpacing="0"
                    cellPadding="0"
                  >
                    <tr>
                      <td
                        bgcolor="#ffffff"
                        align="center"
                        style={{ padding: "20px 30px 60px 30px" }}
                      >
                        <Link
                          to={"/"}
                          style={{
                            fontSize: "20px",
                            fontFamily: "Helvetica, Arial, sans-serif",
                            color: "#ffffff",
                            backgroundColor: "#79a206",
                            border: "1px solid #79a206",
                            padding: "15px 25px",
                            borderRadius: "2px",
                            cursor: "pointer",
                          }}
                        >
                          Back to Home
                        </Link>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              {/* COPY */}
              <tr>
                <td
                  bgcolor="#ffffff"
                  align="left"
                  style={{
                    padding: "0 30px",
                    color: "#666666",
                    fontFamily: "'Lato', Helvetica, Arial, sans-serif",
                    fontSize: "18px",
                    fontWeight: 400,
                    lineHeight: "25px",
                  }}
                >
                  <p style={{ margin: "0" }}>
                    If you have any questions, please send your inquiries to
                    tuanflute275@gmail. We are always here to help.
                  </p>
                </td>
              </tr>
              {/* COPY */}
              <tr>
                <td
                  bgcolor="#ffffff"
                  align="left"
                  style={{
                    padding: "0 30px 40px 30px",
                    borderRadius: "0 0 4px 4px",
                    color: "#666666",
                    fontFamily: "'Lato', Helvetica, Arial, sans-serif",
                    fontSize: "18px",
                    fontWeight: 400,
                    lineHeight: "25px",
                  }}
                >
                  <br />
                  <p style={{ margin: "0" }}>
                    Thank you
                    <br />
                    <span style={{ color: "#79a206 !important" }}>
                      {customerName || "Customer"}
                    </span>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default OrderSuccess;
