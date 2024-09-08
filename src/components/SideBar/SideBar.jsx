import "./SideBar.css";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { FaListAlt } from "react-icons/fa";
const SideBar = () => {
  return (
    <div className="sidebar">
      <Link to={"/addProduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <CiCirclePlus size={40} color="black" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={"/listProduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <FaListAlt size={40} color="black" />
          <p>Product List</p>
        </div>
      </Link>
      <Link to={"/listCart"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <FaCartPlus size={40} color="black" />
          <p>List Order</p>
        </div>
      </Link>
    </div>
  );
};

export default SideBar;
