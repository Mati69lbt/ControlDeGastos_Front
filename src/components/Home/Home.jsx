// cSpell:ignore Matias, observacion, matias, segunditos, Resetear

import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import Tablas from "./Tablas";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import Resetear_Tabla from "../../helpers/Resetear_Tabla";

const Home = () => {
  const [gastos_Matias, setGastos_Matias] = useState([]);
  const [gastos_Carolina, setGastos_Carolina] = useState([]);
  const [total_Carolina, setTotal_Carolina] = useState(0);
  const [total_Matias, setTotal_Matias] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mes, setMes] = useState("");

  const mesActual = () => {
    let mesItem =
      gastos_Carolina.length > 0
        ? gastos_Carolina[0]
        : gastos_Matias.length > 0
        ? gastos_Matias[0]
        : null;
    if (mesItem) {
      const fechaCompleta = mesItem.fecha;
      const fecha = new Date(fechaCompleta);
      const nombreMes = fecha.toLocaleString("es", { month: "long" });
      const mesCapitalizado =
        nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1);
      const year = fecha.getFullYear();
      const fechaFormateada = mesCapitalizado + " - " + year;
      setMes(fechaFormateada);
    } else {
      setMes("Aun no hay mes");
    }
  };

  // Captura de Pantalla
  const captureScreen = async () => {
    // Captura el cuerpo del documento utilizando `html2canvas`
    const canvas = await html2canvas(document.body);

    // Convierte el canvas a una imagen en formato Data URL
    const imgData = canvas.toDataURL("image/jpg");

    return imgData;
  };

  const cerrarMes = async () => {
    try {
      const confirmación = window.confirm("¿Está seguro de finalizar el mes?");
      if (confirmación) {
        const screenshot = await captureScreen();

        if (!screenshot) {
          alert("La captura de pantalla no está lista.");
          return;
        }

        // Convertir Data URL a Blob
        const fetchResponse = await fetch(screenshot);
        const blob = await fetchResponse.blob();

        const formData = new FormData();
        formData.append("captura", blob, "screenshot.jpg");
        formData.append("mes", mes);

        const response = await fetch(Global.url_backend + "/subirImagen", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (data.status === "success") {
          Resetear_Tabla(setGastos_Matias, setGastos_Carolina);
        }
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
    mesActual();
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
              <th colSpan={1} rowSpan={4}>
                {" "}
                {mes}
              </th>
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
      <Link to="/registros">
        <button>Ver Gastos de Meses Anteriores</button>
      </Link>
      <hr />
    </div>
  );
};

export default Home;
