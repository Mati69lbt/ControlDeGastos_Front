// cSpell:ignore Matias, observacion, matias, segunditos, descripcion, Swal, sweetalert2, confirmacion

import { Link, useNavigate, useParams } from "react-router-dom";
import useForm from "../../helpers/useForm";
import { Global } from "../../helpers/Global";
import { useEffect, useState, useRef } from "react";
import "./crear.css";
import { NumericFormat } from "react-number-format";
import Swal from "sweetalert2";

const Editar = () => {
  const [gasto, setGasto] = useState([]);
  const { form, changed } = useForm({});
  const [montoVisible, setMontoVisible] = useState("");

  const navigate = useNavigate();

  const params = useParams();

  const montoRef = useRef(null);

  const seleccionarTexto = (ref) => {
    if (ref.current) {
      ref.current.select();
    }
  };

  useEffect(() => {
    buscarGasto();
    if (gasto.monto) {
      const valorFormateado = `$${Number(gasto.monto).toLocaleString("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
      setMontoVisible(valorFormateado);
    }
  }, [gasto.monto]);

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
      const confirmacion = await Swal.fire({
        title: "¿Modificar gasto?",
        text: "¿Está seguro de modificar el gasto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, modificar",
        cancelButtonText: "Cancelar",
      });

      if (confirmacion.isConfirmed) {
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
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="container_crear">
      <h1>Editar Gasto</h1>
      <form action="" onSubmit={gasto_editar} className="form_crear">
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
            value={gasto.fecha ? gasto.fecha.slice(0, 10) : ""}
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
            defaultValue={gasto.lugar}
          />
        </div>
        <div>
          <label className="label_crear" htmlFor="monto">
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
            getInputRef={montoRef}
            onClick={() => seleccionarTexto(montoRef)}
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
          <label className="label_crear" htmlFor="observacion">
            Observación:
          </label>
          <input
            className="form_crear"
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
