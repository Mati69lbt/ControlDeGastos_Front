// cSpell:ignore Matias, observacion, matias, segunditos, Elim, elim
import { Link } from "react-router-dom";
import Fecha_Formateada from "../../helpers/Fecha_Formateada";
import { Global } from "../../helpers/Global";
import TablaIndividual from "./TablaIndividual";

const Tablas = ({
  gastos_Carolina,
  gastos_Matias,
  total_Matias,
  total_Carolina,
  setGastos_Matias,
  setGastos_Carolina,
}) => {
  return (
    <div className="tabla_general">
      <TablaIndividual
        nombre={"Carolina"}
        gastos={gastos_Carolina}
        total={total_Carolina}
        setGastos={setGastos_Carolina}
      />
      <TablaIndividual
        nombre={"Matias"}
        gastos={gastos_Matias}
        total={total_Matias}
        setGastos={setGastos_Matias}
      />
    </div>
  );
};
export default Tablas;
