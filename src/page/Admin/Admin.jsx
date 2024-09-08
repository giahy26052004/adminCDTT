import AddProduct from "../../components/Addproduct/AddProduct";
import ListCart from "../../components/ListOrder/ListOrder";
import ListProduct from "../../components/ListProduct/ListProduct";
import SideBar from "../../components/SideBar/SideBar";
import "./Admin.css";
import { Routes, Route } from "react-router-dom";
const Admin = () => {
  return (
    <div className="admin">
      <SideBar />
      <Routes>
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/listProduct" element={<ListProduct />} />
        <Route path="/listCart" element={<ListCart />} />
      </Routes>
    </div>
  );
};

export default Admin;
