// cSpell:ignore Matias, observacion, matias, segunditos, descripcion,

import useForm from "../../helpers/useForm";
import { Link, useNavigate } from "react-router-dom";
import { Global } from "../../helpers/Global";
import Fecha_Formateada from "../../helpers/Fecha_Formateada";
import "./crear.css";

const Crear = () => {
  const { form, changed } = useForm({});

  const navigate = useNavigate();

  const guardar_Gasto = async (e) => {
    e.preventDefault();

    let nuevo_gasto = form;

    try {
      const confirmación = window.confirm(
        `${Fecha_Formateada(
          nuevo_gasto.fecha
        )}: ¿Esta seguro que quiere guardar un nuevo gasto de ${
          nuevo_gasto.pagadoPor
        }, en "${nuevo_gasto.lugar}" por $ ${nuevo_gasto.monto}?`
      );

      if (confirmación) {
        const response = await fetch(Global.url_backend + "/crear", {
          method: "POST",
          body: JSON.stringify(nuevo_gasto),
          headers: {
            "Content-Type": "application/json",
          },
        });
        navigate(-1);
      } else return;
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="container_crear">
      <h1>Nuevo Gasto</h1>
      <form action="" onSubmit={guardar_Gasto} className="form_crear">
        <div>
          <label htmlFor="fecha" className="label_crear">
            Fecha
          </label>

          <input
            className="form_crear"
            type="date"
            name="fecha"
            id="fecha"
            required
            onChange={changed}
          />
        </div>
        <div>
          <label className="label_crear" htmlFor="lugar">
            Descripción
          </label>
          <input
            className="form_crear"
            type="text"
            name="lugar"
            id="lugar"
            required
            onChange={changed}
          />
        </div>
        <div>
          <label htmlFor="monto" className="label_crear">
            Monto
          </label>
          <input
            type="number"
            name="monto"
            id="monto"
            onChange={changed}
            className="form_crear"
          />
        </div>
        <div>
          <label htmlFor="pagadoPor" className="label_crear">
            Pagado por:
          </label>
          <select
            name="pagadoPor"
            className="form_crear"
            id="pagadoPor"
            required
            onChange={changed}
          >
            <option value="">Seleccionar</option>
            <option value="Carolina">Carolina</option>
            <option value="Matias">Matias</option>
          </select>
        </div>
        <div>
          <label htmlFor="observacion" className="label_crear">
            Observación:
          </label>
          <input
            type="text"
            name="observacion"
            id="observacion"
            onChange={changed}
            className="form_crear"
          />
        </div>
        <button className="form_crear" type="submit">
          Guardar
        </button>
      </form>
      <Link to="/home" className="link_crear">
        <button>Volver</button>
      </Link>
    </div>
  );
};

export default Crear;
