import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing_Page from "../components/Landing_Page/Landing_Page";
import Home from "../components/Home/Home";
import Crear from "../components/Gasto/Crear";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing_Page />} />
        <Route path="/home" element={<Home />} />
        <Route path="/crear" element={<Crear />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
