import { useEffect, useState } from "react";
import "./ListProduct.css";
import toast from "react-hot-toast";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const fetchInfo = async () => {
    await fetch("http://localhost:3003/allproducts")
      .then(async (res) => {
        const data = await res.json();
        return data;
      })
      .then((data) => {
        setAllProducts(data);
      });
  };
  const handleRemove = async (id) => {
    await fetch(`http://localhost:3003/removeProduct`, {
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
  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="list-product">
      <h1>Lists Product</h1>
      <div className="listproduct-format-main  ">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
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

              <p className="listproduct-product-name">
                {product.name}

                <img
                  src={product.image}
                  alt={product.name}
                  className="listproduct-product-image"
                />
              </p>

              <p>{product.old_price}</p>
              <p>{product.new_price}</p>
              <p>{product.category}</p>
              <button
                className="listproduct-remove-btn"
                onClick={() => {
                  handleRemove(product.id);
                }}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
