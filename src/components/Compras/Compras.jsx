// cSpell:ignore Matias, observacion, matias, segunditos, Elim, swal, index_produc, sweetalert2, btn_celda_edit_elim
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import getProductos from "./helper_compras/getProductos";
import useForm from "../../helpers/useForm";
import "./compras.css";
import Swal from "sweetalert2";

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
    <div className="container_compras">
      <h1>Lista de Compras</h1>
      <Link to="/home">
        <button className="btn_gasto">Control de Gastos</button>
      </Link>
      <hr />
      <h3>Agregar Producto a la Lista de Compras</h3>
      <form
        action=""
        onSubmit={handleGuardarProducto}
        className="formulario_compras"
      >
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
      <table border={"2"} className="tabla_compras_mejorada">
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
                  <td className="index_produc">{index + 1}</td>
                  <td className="prod_tabla">
                    {prod.producto.charAt(0).toUpperCase() +
                      prod.producto.slice(1)}
                  </td>
                  <td>
                    <div className="btn_celda_edit_elim">
                      <button onClick={() => handleBuscarProducto(prod._id)}>
                        E
                      </button>

                      <button
                        onClick={() => {
                          Swal.fire({
                            title: "¿Estás seguro?",
                            text: `Vas a eliminar "${prod.producto}"`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#d33",
                            cancelButtonColor: "#3085d6",
                            confirmButtonText: "Sí, eliminar",
                            cancelButtonText: "Cancelar",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              borrar_Producto(prod._id, setProductos);
                            }
                          });
                        }}
                      >
                        X
                      </button>
                    </div>
                  </td>
                  <td style={{ padding: "0px 5px 0px 5px" }}>
                    {prod.observacion}
                  </td>
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
          Swal.fire({
            title: "¿Eliminar toda la lista?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar todo",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              eliminar_ListaDeCompras();
            }
          });
        }}
      >
        Eliminar Tabla
      </button>

      <hr />
    </div>
  );
};

export default Compras;
