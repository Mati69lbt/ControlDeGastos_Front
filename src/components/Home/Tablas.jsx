// cSpell:ignore Matias, observacion, matias, segunditos, Elim
import { Link } from "react-router-dom";
import Fecha_Formateada from "../../helpers/Fecha_Formateada";
import { Global } from "../../helpers/Global";
import "../../styles/tablas.css";

const Tablas = ({
  gastos_Carolina,
  gastos_Matias,
  total_Matias,
  total_Carolina,
  setGastos_Matias,
  setGastos_Carolina,
}) => {
  const borrarGasto = async (id) => {
    try {
      const request = await fetch(Global.url_backend + "/borrar/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await request.json();

      if (data.status === "success") {
        alert(data.message);
        setGastos_Matias((prevGastos) =>
          prevGastos.filter((gasto) => gasto._id !== id)
        );
        setGastos_Carolina((prevGastos) =>
          prevGastos.filter((gasto) => gasto._id !== id)
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="tabla_general">
      <table border={1}>
        <thead>
          <tr>
            <th colSpan={6}>Carolina</th>
          </tr>
          <tr>
            <th>Nº</th>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Monto</th>
            <th>Edit/Elim</th>
            <th>Observación</th>
          </tr>
        </thead>
        <tbody>
          {gastos_Carolina.length >= 1 &&
            gastos_Carolina.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td>{Fecha_Formateada(item.fecha)}</td>
                  <td>{item.lugar}</td>
                  <td style={{ textAlign: "right" }}>
                    $ {item.monto.toFixed(2)}
                  </td>
                  <td>
                    <Link to={"/editar/" + item._id}>
                      <button>Edit</button>
                    </Link>
                    <button
                      onClick={() => {
                        const confirmBorrar = window.confirm(
                          "¿Desea eliminar este gasto?"
                        );
                        if (confirmBorrar) {
                          borrarGasto(item._id);
                        }
                      }}
                    >
                      X
                    </button>
                  </td>
                  <td>{item.observacion}</td>
                </tr>
              );
            })}
          <tr>
            <th colSpan={3} style={{ textAlign: "right" }}>
              TOTAL:
            </th>
            <td colSpan={3} style={{ textAlign: "center" }}>
              $ {total_Carolina.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
      <table border={1}>
        <thead>
          <tr>
            <th colSpan={6}>Matias</th>
          </tr>
          <tr>
            <th>Nº</th>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Monto</th>
            <th>Edit/Elim</th>
            <th>Observación</th>
          </tr>
        </thead>
        <tbody>
          {gastos_Matias.length >= 1 &&
            gastos_Matias.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td>{Fecha_Formateada(item.fecha)}</td>
                  <td>{item.lugar}</td>
                  <td style={{ textAlign: "right" }}>
                    $ {item.monto.toFixed(2)}
                  </td>
                  <td>
                    <Link to={"/editar/" + item._id}>
                      <button>Edit</button>
                    </Link>
                    <button
                      onClick={() => {
                        const confirmBorrar = window.confirm(
                          "¿Desea eliminar este gasto?"
                        );
                        if (confirmBorrar) {
                          borrarGasto(item._id);
                        }
                      }}
                    >
                      X
                    </button>
                  </td>
                  <td>{item.observacion}</td>
                </tr>
              );
            })}
          <tr>
            <th colSpan={3} style={{ textAlign: "right" }}>
              TOTAL:
            </th>
            <td colSpan={3} style={{ textAlign: "center" }}>
              $ {total_Matias.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Tablas;
