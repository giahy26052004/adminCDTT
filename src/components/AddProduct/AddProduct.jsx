import { useEffect, useState } from "react";
import "./AddProduct.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const AddProduct = ({ preProduct, fetchInfo }) => {
  const [image, setImage] = useState("");
  const [product, setProduct] = useState({
    name: "",
    old_price: "",
    new_price: "",
    category: "women",
    image: "",
  });

  useEffect(() => {
    if (preProduct) {
      setProduct(preProduct);
    }
  }, [preProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (image) {
        formData.append("product", image);
      }

      // If image is provided, upload it
      let imageUrl = product.image; // Default to existing image
      if (image) {
        const uploadResponse = await fetch(
          "https://backendcdtt.onrender.com/upload",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
            },
            body: formData,
          }
        );
        const uploadData = await uploadResponse.json();
        if (uploadData.success) {
          imageUrl = uploadData.image_url; // Get the uploaded image URL
        }
      }

      // Prepare the product data
      const productData = { ...product, image: imageUrl };

      // Determine whether to add or edit the product
      const apiUrl = preProduct
        ? "https://backendcdtt.onrender.com/editproduct"
        : "https://backendcdtt.onrender.com/addproduct";
      const method = preProduct ? "PUT" : "POST";
      const token = localStorage.getItem("token");
      const res = await fetch(apiUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
          "auth-token": token, // Include the auth-token here
        },
        body: JSON.stringify(productData),
      });
      const resData = await res.json();
      console.log(resData);
      toast.success(
        preProduct ? "Successfully updated!" : "Successfully created!"
      );
      fetchInfo();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          value={product.name}
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="Enter Name"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            onChange={handleChange}
            value={product.old_price}
            type="text"
            name="old_price"
            placeholder="Enter Price"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            onChange={handleChange}
            value={product.new_price}
            type="text"
            name="new_price"
            placeholder="Enter Offer Price"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Category</p>
        <select
          onChange={handleChange}
          value={product.category}
          name="category"
          className="addproduct-selector"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <div className="addproduct-thumnail-Imgwrapper">
            <div className="addproduct-thumnail-img">
              <FaCloudUploadAlt size={50} />
            </div>
            {image ? (
              <img
                className="addproduct-thumnail-img-preview"
                src={URL.createObjectURL(image)}
                alt="image"
              />
            ) : (
              preProduct?.image && (
                <img
                  className="addproduct-thumnail-img-preview"
                  src={preProduct.image}
                  alt="Existing"
                />
              )
            )}
          </div>
        </label>
        <input
          onChange={handleImage}
          type="file"
          id="file-input"
          name="image"
          hidden
        />
      </div>
      <button className="addproduct-btn" onClick={handleSubmit}>
        {preProduct ? "EDIT" : "ADD"}
      </button>
    </div>
  );
};

AddProduct.propTypes = {
  preProduct: PropTypes.object,
};

export default AddProduct;
