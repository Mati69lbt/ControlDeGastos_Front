// cSpell:ignore Matias, observacion, matias, segunditos, descripcion, formkit

import useForm from "../../helpers/useForm";
import { Link, useNavigate } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { format } from "@formkit/tempo";
import { useState } from "react";

const Crear = () => {
  const { form, changed } = useForm({});

  const navigate = useNavigate();

  const guardar_Gasto = async (e) => {
    e.preventDefault();

    let nuevo_gasto = form;
    

    try {
      const confirmación = window.confirm(
       `${nuevo_gasto.fecha}: ¿Esta seguro que quiere guardar un nuevo gasto de ${nuevo_gasto.pagadoPor}, en "${nuevo_gasto.lugar}" por $ ${nuevo_gasto.monto}?`
      );

      if (confirmación) {
        const response = await fetch(Global.url_backend + "/" + "crear", {
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
    <div>
      <h1>Nuevo Gasto</h1>
      <form action="" onSubmit={guardar_Gasto}>
        <div>
          <label htmlFor="fecha">Fecha</label>

          <input
            type="date"
            name="fecha"
            id="fecha"
            required
            onChange={changed}
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
          />
        </div>
        <div>
          <label htmlFor="monto">Monto</label>
          <input type="number" name="monto" id="monto" onChange={changed} />
        </div>
        <div>
          <label htmlFor="pagadoPor">Pagado por:</label>
          <select name="pagadoPor" id="pagadoPor" required onChange={changed}>
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

export default Crear;
