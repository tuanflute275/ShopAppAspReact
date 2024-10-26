import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as productService from "../../../../services/ProductService";
import * as categoryService from "../../../../services/CategoryService";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [imgPreview, setImgPreview] = useState();

  useEffect(() => {
    const fetchCategories = async () => {
      const [res, err] = await categoryService.findListAll();
      if (res) {
        setCategory(res.data);
      } else {
        console.log(err);
      }
    };

    const fetchProduct = async () => {
      const [res, err] = await productService.findById(id);
      if (res) {
        setData(res.data);
        setImgPreview(res.data.productImage || "");
      } else {
        console.log(err);
      }
    };

    fetchCategories();
    fetchProduct();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      Name: "",
      ImageFile: null,
      Price: 0,
      SalePrice: 0,
      Category: 0,
      Status: "",
      Description: "",
    },
    validationSchema: Yup.object({
      Price: Yup.number()
        .required("Price is required")
        .min(0, "Price must be greater than or equal to 0"),
      SalePrice: Yup.number().min(
        0,
        "Sale price must be greater than or equal to 0"
      ),
      Category: Yup.number().required("Category is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("ProductName", values.Name || data.productName);
      formData.append(
        "ProductPrice",
        values.Price > 0 ? values.Price : data.productPrice
      );
      formData.append(
        "ProductSalePrice",
        values.SalePrice > 0 ? values.SalePrice : data.productSalePrice
      );
      formData.append(
        "ProductStatus",
        values.Status != ""
          ? values.Status === "true"
            ? true
            : false
          : data.productStatus
      );
      formData.append(
        "CategoryId",
        Number(values.Category) > 0 ? Number(values.Category) : data.categoryId
      );
      formData.append(
        "ProductDescription",
        values.Description || data.productDescription
      );
      if (values.ImageFile && values.ImageFile != null) {
        formData.append("ImageFile", values.ImageFile);
      } else {
        formData.append("OldImage", data.productImage);
      }

      const [result, error] = await productService.update(id, formData);
      if (result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/product");
      }
      if (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message || "Failed to update!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      }
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImgPreview(URL.createObjectURL(file));
      formik.setFieldValue("ImageFile", file);
    }
  };

  return (
    <div
      id="content-page"
      className="content-page"
      style={{ paddingTop: "70px" }}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">Update Product</h4>
                </div>
              </div>
              <div className="iq-card-body">
                <form
                  onSubmit={formik.handleSubmit}
                  encType="multipart/form-data"
                >
                  <div className="form-group">
                    <label htmlFor="image" className="col-md-3 col-form-label">
                      Image
                    </label>
                    <div className="col-md-9 col-xl-8">
                      <img
                        style={{
                          height: "200px",
                          width: "200px",
                          cursor: "pointer",
                        }}
                        className="thumbnail rounded-circle"
                        data-toggle="tooltip"
                        title="Click to change the image"
                        data-placement="bottom"
                        src={imgPreview ? imgPreview : "/add-image-icon.jpg"}
                      />
                      <input
                        type="file"
                        name="fileUpload"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="image form-control-file mt-3"
                      />
                      {formik.errors.ImageFile && (
                        <small className="text-danger">
                          {formik.errors.ImageFile}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="Name"
                      className="form-control"
                      placeholder="Enter your name..."
                      value={formik.values.Name || data.productName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.Name && formik.touched.Name && (
                      <small className="text-danger">
                        {formik.errors.Name}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="number"
                      min={0}
                      name="Price"
                      className="form-control"
                      placeholder="Enter your price..."
                      value={formik.values.Price || data.productPrice}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.Price && formik.touched.Price && (
                      <small className="text-danger">
                        {formik.errors.Price}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Sale Price</label>
                    <input
                      min={0}
                      type="number"
                      name="SalePrice"
                      className="form-control"
                      placeholder="Enter your sale price..."
                      value={formik.values.SalePrice || data.productSalePrice}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.SalePrice && formik.touched.SalePrice && (
                      <small className="text-danger">
                        {formik.errors.SalePrice}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Category</label>
                    <select
                      name="Category"
                      className="form-control"
                      value={formik.values.Category || data.categoryId}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select a category...</option>
                      {category &&
                        category.length > 0 &&
                        category.map((item) => (
                          <option
                            key={item.categoryId}
                            value={item.categoryId}
                            selected={
                              item.categoryId ===
                              (formik.values.Category || data.categoryId)
                            }
                          >
                            {item.categoryName}
                          </option>
                        ))}
                    </select>
                    {formik.errors.Category && formik.touched.Category && (
                      <small className="text-danger">
                        {formik.errors.Category}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Status</label>
                    <select
                      name="Status"
                      className="form-control"
                      value={
                        formik.values.Status != ""
                          ? formik.values.Status === true ||
                            formik.values.Status === "true"
                            ? "true"
                            : "false"
                          : data.productStatus === true
                          ? "true"
                          : "false"
                      }
                      onChange={formik.handleChange}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="Description"
                      className="form-control"
                      rows="3"
                      placeholder="Enter your description..."
                      value={
                        formik.values.Description || data.productDescription
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary mx-2">
                    Update
                  </button>
                  <Link to="/admin/product" className="btn btn-danger mx-2">
                    Cancel
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
