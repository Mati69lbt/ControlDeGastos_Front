import { Global } from "../../../helpers/Global";
import getProductos from "./getProductos";

const borrar_Producto = async (id, setProductos) => {
  try {
    const request = await fetch(
      Global.url_backend + "/eliminar-producto/" + id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await request.json();
    if (data.status === "success") {
      alert("Se ha eliminado el producto correctamente");
      getProductos(setProductos);
    }
  } catch (error) {
    console.log("error", error);
  }
};

export default borrar_Producto;
