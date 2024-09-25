import { useEffect, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Admin from "./page/Admin/Admin";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login/Login";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  useEffect(() => {});
  return (
    <div>
      <NavBar />
      {isLoggedIn ? <Admin /> : <Login onLogin={handleLogin} />}
      <Toaster />
    </div>
  );
}

export default App;
