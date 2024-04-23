import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { Link } from "react-router-dom";

const Registros = () => {
  const [loading, setLoading] = useState(false);
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    getRegistros();
  }, []);

  const getRegistros = async () => {
    try {
      setLoading(true);
      const response = await fetch(Global.url_backend + "/registros", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.status === "success") {
        setRegistros(data.capturas);
      } else {
        alert("Error al obtener los registros");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <hr />
      <table border={1}>
        <thead>
          <tr>
            <th>Mes</th>
            <th>Registro</th>
          </tr>
        </thead>
        <tbody>
          {registros.length >= 1 &&
            registros.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{item.mes}</td>
                  <td>
                    <img src={item.imagen} alt="imagen" width={900} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <hr />
      <Link to="/home">
        <button>Volver</button>
      </Link>
    </div>
  );
};

export default Registros;
