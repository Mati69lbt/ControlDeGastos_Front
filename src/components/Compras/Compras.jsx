// cSpell:ignore Matias, observacion, matias, segunditos, Elim
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import getProductos from "./helper_compras/getProductos";
import useForm from "../../helpers/useForm";
import "./compras.css";

import borrar_Producto from "./helper_compras/borrar_Producto";
import guardar_Producto from "./helper_compras/guardar_Producto";
import editar_Producto from "./helper_compras/editar_Producto";
import buscar_producto from "./helper_compras/buscar_producto";
import useForm_edit from "./helper_compras/useForm_edit";
import borrar_ListaDeCompras from "./helper_compras/borrar_ListaDeCompras";

const Compras = () => {
  const { form, changed, reset } = useForm({});
  const { form_edit, changed_edit, reset_edit } = useForm_edit({});
  const [productos, setProductos] = useState([]);
  const [productoBuscado, setProductoBuscado] = useState([]);

  const formRef = useRef();

  useEffect(() => {
    getProductos(setProductos);
  }, []);

  const handleGuardarProducto = async (e) => {
    e.preventDefault();

    await guardar_Producto(form, setProductos);

    reset();
  };

  const handleBuscarProducto = async (id) => {
    buscar_producto(id, setProductoBuscado);
    formRef.current.producto.focus();
  };

  const handleEditarProducto = async (e) => {
    e.preventDefault();
    await editar_Producto(
      form_edit,
      setProductos,
      productoBuscado._id,
      setProductoBuscado
    );

    reset_edit();
  };

  const eliminar_ListaDeCompras = async () => {
    borrar_ListaDeCompras(setProductos);
  };

  return (
    <div>
      <h1>Lista de Compras</h1>
      <Link to="/home">
        <button className="btn_gasto">Control de Gastos</button>
      </Link>
      <hr />
      <h3>Agregar Producto a la Lista de Compras</h3>
      <form action="" onSubmit={handleGuardarProducto} className="form_crear">
        <div>
          <label htmlFor="producto">Producto</label>
          <input
            type="text"
            name="producto"
            id="producto"
            required
            value={form.producto || ""}
            onChange={changed}
          />
        </div>
        <div>
          <label htmlFor="observacion">Observación</label>
          <input
            type="text"
            name="observacion"
            id="observacion"
            value={form.observacion || ""}
            onChange={changed}
          />
        </div>
        <input type="submit" value="Agregar" className="btn_gasto" />
      </form>
      <hr />
      <table border={"2"} className="tabla-compras">
        <thead>
          <tr>
            <th></th>
            <th>Producto</th>
            <th>Editar / Eliminar</th>
            <th>Observación</th>
          </tr>
        </thead>
        <tbody>
          {productos.length < 1 ? (
            <tr>
              <th colSpan={4}>No hay productos aun en la lista de compras</th>
            </tr>
          ) : (
            productos.length >= 1 &&
            productos.map((prod, index) => {
              return (
                <tr key={prod._id}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td>{prod.producto}</td>
                  <td>
                    <div className="btn_celda_edit_elim">
                      <button onClick={() => handleBuscarProducto(prod._id)}>
                        E
                      </button>

                      <button
                        onClick={() => {
                          const confirmBorrar = window.confirm(
                            "¿Desea eliminar toda la lista de compras?"
                          );
                          if (confirmBorrar) {
                            borrar_Producto(prod._id, setProductos);
                          }
                        }}
                      >
                        X
                      </button>
                    </div>
                  </td>
                  <td>{prod.observacion}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <hr />
      <h3>Editar Producto </h3>
      <form
        key={productoBuscado._id || "new"}
        onSubmit={handleEditarProducto}
        className="form_crear"
      >
        <div>
          <label htmlFor="producto">Producto</label>
          <input
            ref={(input) => {
              formRef.current = { producto: input };
            }}
            type="text"
            name="producto"
            id="producto"
            required
            onChange={changed_edit}
            defaultValue={productoBuscado.producto || ""}
          />
        </div>
        <div>
          <label htmlFor="observacion">Observación</label>
          <input
            type="text"
            name="observacion"
            id="observacion"
            onChange={changed_edit}
            defaultValue={productoBuscado.observacion || ""}
          />
        </div>
        <input type="submit" value="Actualizar" className="btn_gasto" />
      </form>
      <hr />
      <button
        onClick={() => {
          const confirmBorrar = window.confirm(
            "¿Desea eliminar este producto?"
          );
          if (confirmBorrar) {
            eliminar_ListaDeCompras();
          }
        }}
      >
        Eliminar Tabla
      </button>
      <hr />
    </div>
  );
};

export default Compras;
