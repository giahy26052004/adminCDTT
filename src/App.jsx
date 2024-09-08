import NavBar from "./components/NavBar/NavBar";
import Admin from "./page/Admin/Admin";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div>
      <NavBar />
      <Admin />
      <Toaster />
    </div>
  );
}

export default App;
