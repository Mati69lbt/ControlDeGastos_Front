import { Global } from "../../../helpers/Global";

const editar_Producto = async (
  form,
  setProductos,
  idProducto,
  setProductoBuscado
) => {
  let productoEditado = form;

  try {
    const response = await fetch(
      Global.url_backend + "/editar-producto/" + idProducto,
      {
        method: "PUT",
        body: JSON.stringify(productoEditado),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (data.status === "success") {
      alert("Producto Actualizado");
      setProductos((prevProductos) =>
        prevProductos.map((prod) =>
          prod._id === idProducto ? { ...prod, ...productoEditado } : prod
        )
      );
      setProductoBuscado([]);
    }
  } catch (error) {
    console.log("error", error);
  }
};

export default editar_Producto;
