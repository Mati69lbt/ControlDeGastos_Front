// cSpell:ignore Matias, observacion, matias, segunditos

import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import Tablas from "./Tablas";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";

const Home = () => {
  const [gastos_Matias, setGastos_Matias] = useState([]);
  const [gastos_Carolina, setGastos_Carolina] = useState([]);
  const [total_Carolina, setTotal_Carolina] = useState(0);
  const [total_Matias, setTotal_Matias] = useState(0);
  const [loading, setLoading] = useState(false);

  // Captura de Pantalla
  const [screenshot, setScreenshot] = useState(null);
  console.log(screenshot);

  const captureScreen = () => {
    // Suponemos que quieres capturar el body del documento, puedes ajustar el selector según necesites
    html2canvas(document.body).then((canvas) => {
      // Convierte el canvas a una imagen en formato Data URL
      const imgData = canvas.toDataURL("image/jpg");
      setScreenshot(imgData);
    });
  };

  const cerrarMes = async () => {
    try {
      const confirmación = window.confirm("¿Está seguro de finalizar el mes?");
      if (confirmación) {
        captureScreen();
        const formData = new FormData();
        formData.append("captura", screenshot);
        formData.append("mes", "Abril");
        const response = await fetch(Global.url_backend + "/subirImagen", {
          method: "POST",
          body: formData,
        });
        console.log(response);
      } else {
        return false;
      }
    } catch (error) {
      console.log("error", error);
    }
  };

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
      setLoading(true);
      const response = await fetch(Global.url_backend + "/listado", {
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
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <Link to="/crear">
        <button>Nuevo Gasto</button>
      </Link>

      <hr />
      {loading ? (
        <p>Cargando Datos... Espero unos segunditos...</p>
      ) : (
        <Tablas
          gastos_Carolina={gastos_Carolina}
          gastos_Matias={gastos_Matias}
          total_Carolina={total_Carolina}
          total_Matias={total_Matias}
          getGastos
          setGastos_Matias={setGastos_Matias}
          setGastos_Carolina={setGastos_Carolina}
        />
      )}

      <hr />
      <div>
        <table border={1}>
          <tbody>
            <tr>
              <th>Total Gastos Entre Los Dos</th>
              <td>$ {subTotal.toFixed(2)} </td>
            </tr>
            <tr>
              <th>Costo Para Cada Uno</th>
              <td>$ {costo_cada_uno.toFixed(2)}</td>
            </tr>
            <tr>
              <th>Diferencia Matias</th>
              <td style={{ color: diferencia_matias < 0 ? "red" : "black" }}>
                $ {diferencia_matias.toFixed(2)}
              </td>
            </tr>
            <tr>
              <th>Diferencia Carolina</th>
              <td style={{ color: diferencia_carolina < 0 ? "red" : "black" }}>
                $ {diferencia_carolina.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr />
      <button onClick={cerrarMes}>Cerrar Mes</button>
      <button>Ver Gastos de Meses Anteriores</button>
      <hr />
      {screenshot && <img src={screenshot} alt="Captura de pantalla" />}
    </div>
  );
};

export default Home;
