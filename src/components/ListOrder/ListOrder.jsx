import { useEffect, useState } from "react";
import "./ListOrder.css";

const ListCart = () => {
  const [orders, setOrders] = useState([]);
  const fetchInfo = async () => {
    await fetch("https://backendcdtt.onrender.com/orders")
      .then(async (res) => {
        const data = await res.json();
        return data;
      })
      .then((data) => {
        console.log(data);
        setOrders(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <>
      <div className="list-product">
        <h1>Lists Product</h1>
        <div className="listorder-format-main ">
          <p>Order ID</p>
          <p>Recipient</p>
          <p>Products</p>
          <p>Phone</p>
          <p>Date</p>
        </div>
        <div className="listproduct-allProducts">
          <hr />
          {orders.map((order, index) => {
            return (
              <div
                className="listorder-format-main  listproduct-format"
                key={index}
              >
                <p>{index + 1}</p>
                <p>{order.name}</p>
                <p>
                  {order.line_items.map((item) => {
                    return (
                      <span key={item.id}>
                        {item.product_data?.name} x {item.price_data} USD
                        <br></br>
                      </span>
                    );
                  })}
                </p>

                <p>{order.phone}</p>
                <p>{order.createdAt.replace("T", " ").substring(0, 19)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ListCart;
