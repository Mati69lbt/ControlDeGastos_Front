// cSpell:ignore Matias
import React from "react";
import { Link } from "react-router-dom";
import "./Landing_page.css";

const Landing_Page = () => {
  return (
    <div className="container">
      <h1 className="titulo">Hola, ¿Cómo estas hoy?</h1>
      <div className="inicio">
        <Link to="/home">
          <button className="btn_inicio">Control de Gastos</button>
        </Link>
        <Link to="/compras">
          <button className="btn_inicio">Lista de Compras</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing_Page;
