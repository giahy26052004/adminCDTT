import { useEffect, useState } from "react";
import "./ListProduct.css";
import toast from "react-hot-toast";
import AddProduct from "../AddProduct/AddProduct";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchInfo = async () => {
    try {
      const res = await fetch("https://backendcdtt.onrender.com/allproducts");
      const data = await res.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleRemove = async (id) => {
    await fetch(`https://backendcdtt.onrender.com/removeProduct`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }).then(async (res) => {
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Product removed successfully");
        fetchInfo();
      }
    });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);

  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="list-product">
      <h1>Lists Product</h1>
      <div className="listproduct-format-main  ">
        <p>Products</p>
        <p>Title</p>
        <p>Image</p>
        <p></p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>

        <p>Status</p>
      </div>
      <div className="listproduct-allProducts">
        <hr />
        {allProducts.map((product, index) => {
          return (
            <div
              className="listproduct-format-main listproduct-format"
              key={index}
            >
              <p></p>

              <p className="listproduct-product-name">{product.name}</p>
              <p>
                <img
                  style={{
                    width: "160px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                  src={product.image}
                  alt={product.name}
                  className="listproduct-product-image"
                />
              </p>

              <p style={{ marginLeft: "110px" }}>{product.old_price}</p>
              <p style={{ marginLeft: "40px" }}>{product.new_price}</p>
              <p></p>

              <p style={{ marginRight: "30px" }}>{product.category}</p>

              <p style={{ marginRight: "5px", display: "block" }}>
                <button
                  className="listproduct-remove-btn"
                  onClick={() => {
                    handleRemove(product.id);
                  }}
                >
                  Remove
                </button>
                <button
                  className="listproduct-edit-btn"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
              </p>
            </div>
          );
        })}
      </div>
      {editingProduct && (
        <AddProduct fetchInfo={fetchInfo} preProduct={editingProduct} />
      )}
    </div>
  );
};

export default ListProduct;
