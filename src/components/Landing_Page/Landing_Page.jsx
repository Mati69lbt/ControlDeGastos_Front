// cSpell:ignore Matias
import React from "react";
import { Link } from "react-router-dom";

const Landing_Page = () => {
  return (
    <div>
      <h1>Usted, ¿Quien es?</h1>
      <Link to="/home">
        <button>Carolina</button>
        <button>Matias</button>
      </Link>
    </div>
  );
};

export default Landing_Page;
