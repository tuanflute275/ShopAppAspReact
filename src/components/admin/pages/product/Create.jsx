import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as productService from "../../../../services/ProductService";
import * as categoryService from "../../../../services/CategoryService";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const Create = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [imgPreview, setImgPreview] = useState();

  useEffect(() => {
    const fetchCategories = async () => {
      const [res, err] = await categoryService.findAll();
      if (res) {
        setCategory(res.data.data);
      } else {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  const formik = useFormik({
    initialValues: {
      Name: "",
      ImageFile: null,
      Price: 0,
      SalePrice: 0,
      Category: 0,
      Status: true,
      Description: "",
    },
    validationSchema: Yup.object({
      Name: Yup.string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters"),
      ImageFile: Yup.mixed().required("Image file is required"),
      Price: Yup.number()
        .required("Price is required")
        .min(0, "Price must be greater than or equal to 0"),
      SalePrice: Yup.number().min(
        0,
        "Sale price must be greater than or equal to 0"
      ),
      Category: Yup.string().required("Category is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("ProductName", values.Name);
      formData.append("ImageFile", values.ImageFile);
      formData.append("ProductPrice", values.Price);
      formData.append("ProductSalePrice", values.SalePrice);
      formData.append("ProductStatus", values.Status === "true");
      formData.append("CategoryId", Number(values.Category));
      formData.append("ProductDescription", values.Description);

      const [result, error] = await productService.save(formData);
      if (result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/product");
      }
      if (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message || "Failed to add!",
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
      setImgPreview(file);
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
                  <h4 className="card-title">Add Product</h4>
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
                        src={
                          imgPreview
                            ? URL.createObjectURL(imgPreview)
                            : "/add-image-icon.jpg"
                        }
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
                      value={formik.values.Name}
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
                      value={formik.values.Price}
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
                      value={formik.values.SalePrice}
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
                      value={formik.values.Category}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Select a category...</option>
                      {category &&
                        category.length > 0 &&
                        category.map((item) => (
                          <option key={item.categoryId} value={item.categoryId}>
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
                      value={formik.values.Status}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Select a status...</option>
                     <option value="true">Active</option>
                     <option value="false">InActive</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="Description"
                      className="form-control"
                      rows="5"
                      placeholder="Enter your description..."
                      value={formik.values.Description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></textarea>
                    {formik.errors.Description &&
                      formik.touched.Description && (
                        <small className="text-danger">
                          {formik.errors.Description}
                        </small>
                      )}
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                  <Link to={"/admin/product"} className="btn btn-danger ml-2">
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

export default Create;
