// cSpell:ignore Matias, observacion, matias, segunditos, descripcion,

import { Link, useNavigate, useParams } from "react-router-dom";
import useForm from "../../helpers/useForm";
import { Global } from "../../helpers/Global";
import { useEffect, useState } from "react";

const Editar = () => {
  const [gasto, setGasto] = useState([]);
  const { form, changed } = useForm({});

  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    buscarGasto();
  }, []);

  const buscarGasto = async () => {
    try {
      const response = await fetch(
        Global.url_backend + "/buscar/" + params.id,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (data.status === "success") {
        setGasto(data.gasto);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const gasto_editar = async (e) => {
    e.preventDefault();

    let gastoEditado = form;

    try {
      const confirmación = window.confirm(
        `¿Esta seguro de modificar el gasto?`
      );
      if (confirmación) {
        const response = await fetch(
          Global.url_backend + "/editar/" + params.id,
          {
            method: "PUT",
            body: JSON.stringify(gastoEditado),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        navigate(-1);
      } else return;
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <h1>Editar Gasto</h1>
      <form action="" onSubmit={gasto_editar}>
        <div>
          <label htmlFor="fecha">Fecha</label>
          <input
            type="date"
            name="fecha"
            id="fecha"
            required
            onChange={changed}
            value={gasto.fecha ? gasto.fecha.slice(0, 10) : ""}
          />
        </div>
        <div>
          <label htmlFor="lugar">Descripción</label>
          <input
            type="text"
            name="lugar"
            id="lugar"
            required
            onChange={changed}
            defaultValue={gasto.lugar}
          />
        </div>
        <div>
          <label htmlFor="monto">Monto</label>
          <input
            type="number"
            name="monto"
            id="monto"
            onChange={changed}
            defaultValue={gasto.monto}
          />
        </div>
        <div>
          <label htmlFor="pagadoPor">Pagado por:</label>
          <select
            name="pagadoPor"
            id="pagadoPor"
            required
            onChange={changed}
            value={gasto.pagadoPor}
          >
            <option value="">Seleccionar</option>
            <option value="Carolina">Carolina</option>
            <option value="Matias">Matias</option>
          </select>
        </div>
        <div>
          <label htmlFor="observacion">Observación:</label>
          <input
            type="text"
            name="observacion"
            id="observacion"
            onChange={changed}
            defaultValue={gasto.observacion}
          />
        </div>
        <button type="submit">Guardar</button>
      </form>
      <Link to="/home">
        <button>Volver</button>
      </Link>
    </div>
  );
};

export default Editar;
