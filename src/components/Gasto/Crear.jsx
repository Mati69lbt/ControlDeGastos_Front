// cSpell:ignore Matias, observacion, matias, segunditos, descripcion, valorNumerico, Swal, sweetalert2, confirmacion

import useForm from "../../helpers/useForm";
import { Link, useNavigate } from "react-router-dom";
import { Global } from "../../helpers/Global";
import Fecha_Formateada from "../../helpers/Fecha_Formateada";
import "./crear.css";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import Swal from "sweetalert2";

const Crear = () => {
  const [montoVisible, setMontoVisible] = useState("");
  const navigate = useNavigate();

  const getFechaActual = () => {
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, "0");
    const dd = String(hoy.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const { form, changed } = useForm({
    fecha: getFechaActual(),
    pagadoPor: "Carolina",
  });

  const guardar_Gasto = async (e) => {
    e.preventDefault();

    let nuevo_gasto = form;
    
    try {
      const confirmacion = await Swal.fire({
        title: "¿Confirmar gasto?",
        html: `${Fecha_Formateada(nuevo_gasto.fecha)}<br>
               ¿Guardar gasto de <strong>${nuevo_gasto.pagadoPor}</strong> en 
               "<strong>${nuevo_gasto.lugar}</strong>" por 
               <strong>$${nuevo_gasto.monto}</strong>?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
      });

      if (confirmacion.isConfirmed) {
        const response = await fetch(Global.url_backend + "/crear", {
          method: "POST",
          body: JSON.stringify(nuevo_gasto),
          headers: {
            "Content-Type": "application/json",
          },
        });
        navigate(-1);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="container_crear">
      <h1>Nuevo Gasto punto</h1>
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
            value={form.fecha}
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
          <NumericFormat
            placeholder="Ingrese monto"
            id="monto"
            name="monto"
            className="form_crear"
            thousandSeparator="."
            decimalSeparator=","
            prefix="$ "
            allowNegative={false}
            decimalScale={2}
            fixedDecimalScale
            inputMode="decimal"
            value={montoVisible}
            onValueChange={({ floatValue, formattedValue }) => {
              setMontoVisible(formattedValue);
              changed({
                target: {
                  name: "monto",
                  value: floatValue ?? "",
                },
              });
            }}
          />
        </div>
        <div>
  <label className="label_crear">Pagado por:</label>
  <div className="checkbox-toggle">
    <label>
      <input
        type="checkbox"
        name="pagadoPor"
        checked={(form.pagadoPor || gasto.pagadoPor) === "Carolina"}
        onChange={() =>
          changed({
            target: { name: "pagadoPor", value: "Carolina" },
          })
        }
      />
      Carolina
    </label>

    <label>
      <input
        type="checkbox"
        name="pagadoPor"
        checked={(form.pagadoPor || gasto.pagadoPor) === "Matias"}
        onChange={() =>
          changed({
            target: { name: "pagadoPor", value: "Matias" },
          })
        }
      />
      Matias
    </label>
  </div>
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
      <p>Version 30-05-2025</p>
    </div>
  );
};

export default Crear;
