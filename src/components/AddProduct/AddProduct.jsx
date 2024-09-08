import { useState } from "react";
import "./AddProduct.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import toast from "react-hot-toast";
const AddProduct = () => {
  const [image, setImage] = useState("");
  const [product, setProduct] = useState({
    name: "",
    old_price: "",
    new_price: "",
    category: "women",
    image: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("product", image);
      await fetch("https://backendcdtt.onrender.com/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })
        .then(async (res) => await res.json())
        .then(async (data) => {
          console.log(data);
          if (data.success) {
            product.image = data.image_url;
            await fetch("https://backendcdtt.onrender.com/addproduct", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(product),
            })
              .then((res) => res.json())
              .then((res) => {
                console.log(res);
                toast.success("Successfully created!");
              });
          }
        });
      console.log(product);
    } catch (error) {
      console.log(error);
    }
  };
  const handleImage = (e) => {
    setImage(e.target.files[0]);
    console.log(image);
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
          <option value={"Women"}>Women</option>
          <option value={"Men"}>Men</option>
          <option value={"Kid"}>Kid</option>
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
              ""
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
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
