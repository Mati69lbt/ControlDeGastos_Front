// cSpell:ignore Matias, observacion, matias

import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";

const Home = () => {
  const [gastos_Matias, setGastos_Matias] = useState([]);
  const [gastos_Carolina, setGastos_Carolina] = useState([]);
  const [total_Carolina, setTotal_Carolina] = useState(0);
  const [total_Matias, setTotal_Matias] = useState(0);

  const subTotal = total_Matias + total_Carolina;

  const costo_cada_uno = subTotal / 2;

  const diferencia_matias = total_Matias - costo_cada_uno;
  const diferencia_carolina = total_Carolina - costo_cada_uno;

  const calcularTotalMatias = () => {
    const total_matias = gastos_Matias.reduce(
      (acumulado, gastoActual) => acumulado + gastoActual.monto,
      0
    );
    const total_carolina = gastos_Carolina.reduce(
      (acumulado, gastoActual) => acumulado + gastoActual.monto,
      0
    );
    setTotal_Matias(total_matias);
    setTotal_Carolina(total_carolina);
  };

  useEffect(() => {
    getGastos();
    calcularTotalMatias();
  }, []);

  useEffect(() => {
    calcularTotalMatias();
  }, [gastos_Carolina, gastos_Matias]);

  const getGastos = async () => {
    try {
      const response = await fetch(Global.url_backend + "/" + "listado", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.status === "success") {
        const gastosCarolina = [];
        const gastosMatias = [];
        data.gastos.forEach((gasto) => {
          if (gasto.pagadoPor === "Carolina") {
            gastosCarolina.push(gasto);
          } else {
            gastosMatias.push(gasto);
          }
        });
        setGastos_Carolina(gastosCarolina);
        setGastos_Matias(gastosMatias);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <button>Nuevo Gasto</button>
      <button>Ver Gastos de Meses Anteriores</button>

      <hr />
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
                    <td>{index + 1}</td>
                    <td>{item.fecha}</td>
                    <td>{item.lugar}</td>
                    <td style={{ textAlign: "right" }}>$ {item.monto}</td>
                    <td>{item.observacion}</td>
                  </tr>
                );
              })}
            <tr>
              <th colSpan={3} style={{ textAlign: "right" }}>
                TOTAL:
              </th>
              <td colSpan={3} style={{ textAlign: "center" }}>
                $ {total_Carolina}
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
                    <td>{index + 1}</td>
                    <td>{item.fecha}</td>
                    <td>{item.lugar}</td>
                    <td>$ {item.monto}</td>
                    <td>{item.observacion}</td>
                  </tr>
                );
              })}
            <tr>
              <th colSpan={3} style={{ textAlign: "right" }}>
                TOTAL:
              </th>
              <td colSpan={3} style={{ textAlign: "center" }}>
                $ {total_Matias}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr />
      <div>
        <table border={1}>
          <tr>
            <th>Total Gastos Entre Los Dos</th>
            <td>$ {subTotal}</td>
          </tr>
          <tr>
            <th>Costo Para Cada Uno</th>
            <td>$ {costo_cada_uno}</td>
          </tr>
          <tr>
            <th>Diferencia Matias</th>
            <td>$ {diferencia_matias}</td>
          </tr>
          <tr>
            <th>Diferencia Carolina</th>
            <td>$ {diferencia_carolina}</td>
          </tr>
        </table>
      </div>
      <hr />
    </div>
  );
};

export default Home;
