// cSpell:ignore Matias, observacion, matias, segunditos, Elim, elim
import { Link } from "react-router-dom";
import Fecha_Formateada from "../../helpers/Fecha_Formateada";
import { Global } from "../../helpers/Global";

const TablaIndividual = ({ nombre, gastos, total, setGastos }) => {
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
        setGastos((prevGastos) =>
          prevGastos.filter((gasto) => gasto._id !== id)
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <table border={1} className="tablaCyM">
      <thead>
        <tr>
          <th colSpan={6}>{nombre}</th>
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
        {gastos.length >= 1 &&
          gastos.map((item, index) => (
            <tr key={item._id}>
              <td className="index_tabla">{index + 1}</td>
              <td className="celda_formato">{Fecha_Formateada(item.fecha)}</td>
              <td className="celda_formato">{item.lugar}</td>
              <td
                className="monto_tabla"
                style={{
                  textAlign: "right",
                  color: item.monto < 0 ? "red" : "black",
                }}
              >
                ${" "}
                {item.monto.toLocaleString("es-ES", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td>
                <div className="btn_celda_edit_elim">
                  <Link to={"/editar/" + item._id}>
                    <button>E</button>
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
                </div>
              </td>
              <td className="celda_formato">{item.observacion}</td>
            </tr>
          ))}
        <tr>
          <th
            className="celda_total"
            colSpan={3}
            style={{ textAlign: "right" }}
          >
            TOTAL:
          </th>
          <td colSpan={3} style={{ textAlign: "center" }}>
            $
            {total.toLocaleString("es-ES", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TablaIndividual;
