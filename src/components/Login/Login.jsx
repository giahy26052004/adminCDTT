import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

import "./Login.css"; // Import CSS
import { redirect } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin)
      await fetch("https://backendcdtt.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: username, password: password }),
      })
        .then(async (res) => {
          return await res.json();
        })
        .then((data) => {
          if (data.success) {
            localStorage.setItem("token", data.token); // Giả lập tạo token
            onLogin(); // Call the function to navigate to the admin screen
          } else {
            alert("Invalid username or password"); // Show error message if login fails
            redirect("/");
          }
        });
  };
  return (
    <div className="form-container">
      <h1>LOGIN ADMIN</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
