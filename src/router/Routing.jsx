import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing_Page from "../components/Landing_Page/Landing_Page";
import Home from "../components/Home/Home";
import Crear from "../components/Gasto/Crear";
import Editar from "../components/Gasto/Editar";
import Registros from "../components/Registros/Registros";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing_Page />} />
        <Route path="/home" element={<Home />} />
        <Route path="/crear" element={<Crear />} />
        <Route path="/editar/:id" element={<Editar />} />
        <Route path="/registros" element={<Registros />} />

      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
