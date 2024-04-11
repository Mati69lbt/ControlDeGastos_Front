// cSpell:ignore Matias, observacion, matias, segunditos
import Fecha_Formateada from "../../helpers/Fecha_Formateada";

const Tablas = ({
  gastos_Carolina,
  gastos_Matias,
  total_Matias,
  total_Carolina,
}) => {
  return (
    <div className="tabla_general">
      <table border={1}>
        <thead>
          <tr>
            <th colSpan={5}>Carolina</th>
          </tr>
          <tr>
            <th>Nº</th>
            <th>Fecha</th>
            <th>Lugar</th>
            <th>Monto</th>
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
            <th colSpan={5}>Matias</th>
          </tr>
          <tr>
            <th>Nº</th>
            <th>Fecha</th>
            <th>Lugar</th>
            <th>Monto</th>
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
