// cspell: ignore Toastify
import "./App.css";
import Routing from "./router/Routing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Routing />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
