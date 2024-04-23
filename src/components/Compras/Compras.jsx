// cSpell:ignore Matias, observacion, matias, segunditos, Elim
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import getProductos from "./helper_compras/getProductos";
import useForm from "../../helpers/useForm";

import borrar_Producto from "./helper_compras/borrar_Producto";
import guardar_Producto from "./helper_compras/guardar_Producto";
import editar_Producto from "./helper_compras/editar_Producto";
import buscar_producto from "./helper_compras/buscar_producto";
import useForm_edit from "./helper_compras/useForm_edit";

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

  return (
    <div>
      <h1>Lista de Compras</h1>
      <Link to="/home">
        <button>Control de Gastos</button>
      </Link>
      <hr />
      <h3>Agregar Producto a la Lista de Compras</h3>
      <form action="" onSubmit={handleGuardarProducto}>
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
        <input type="submit" value="Agregar" />
      </form>
      <hr />
      <table border={"2"} width="75%">
        <thead>
          <tr>
            <th></th>
            <th>Producto</th>
            <th>Editar / Eliminar</th>
            <th>Observación</th>
          </tr>
        </thead>
        <tbody>
          {productos.length >= 1 &&
            productos.map((prod, index) => {
              return (
                <tr key={prod._id}>
                  <td>{index + 1}</td>
                  <td>{prod.producto}</td>
                  <td>
                    <button onClick={() => handleBuscarProducto(prod._id)}>
                      Editar
                    </button>

                    <button
                      onClick={() => {
                        const confirmBorrar = window.confirm(
                          "¿Desea eliminar este producto?"
                        );
                        if (confirmBorrar) {
                          borrar_Producto(prod._id, setProductos);
                        }
                      }}
                    >
                      X
                    </button>
                  </td>
                  <td>{prod.observacion}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <hr />
      <h3>Editar Producto </h3>
      <form key={productoBuscado._id || "new"} onSubmit={handleEditarProducto}>
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
        <input type="submit" value="Actualizar" />
      </form>
      <hr />
    </div>
  );
};

export default Compras;
