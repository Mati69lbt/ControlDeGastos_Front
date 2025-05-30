// cSpell:ignore Matias, observacion, matias, segunditos, Elim, elim, Swal, sweetalert2
import { Link } from "react-router-dom";
import Fecha_Formateada from "../../helpers/Fecha_Formateada";
import { Global } from "../../helpers/Global";
import { toast } from "react-toastify";
import Swal from "sweetalert2";


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
        toast.success(data.message);
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
      <table border={1} className="tablaCyM">
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
                  <td className="index_tabla">{index + 1}</td>
                  <td className="celda_formato">
                    {Fecha_Formateada(item.fecha)}
                  </td>
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
                          Swal.fire({
                            title: "¿Eliminar gasto?",
                            text: "Esta acción no se puede deshacer.",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Eliminar",
                            cancelButtonText: "Cancelar",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              borrarGasto(item._id);
                            }
                          });
                        }}
                      >
                        X
                      </button>
                    </div>
                  </td>
                  <td className="celda_formato">{item.observacion}</td>
                </tr>
              );
            })}
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
              {total_Carolina.toLocaleString("es-ES", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </td>
          </tr>
        </tbody>
      </table>
      <table border={1} className="tablaCyM">
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
                  <td className="celda_formato">
                    {Fecha_Formateada(item.fecha)}
                  </td>
                  <td className="celda_formato">{item.lugar}</td>

                  <td
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
                          Swal.fire({
                            title: "¿Eliminar gasto?",
                            text: "Esta acción no se puede deshacer.",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Eliminar",
                            cancelButtonText: "Cancelar",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              borrarGasto(item._id);
                            }
                          });
                        }}
                      >
                        X
                      </button>
                    </div>
                  </td>
                  <td className="celda_formato">{item.observacion}</td>
                </tr>
              );
            })}
          <tr>
            <th
              className="celda_total"
              colSpan={3}
              style={{ textAlign: "right" }}
            >
              TOTAL:
            </th>
            <td colSpan={3} style={{ textAlign: "center" }}>
              ${" "}
              {total_Matias.toLocaleString("es-ES", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Tablas;
