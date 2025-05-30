import { Global } from "../../../helpers/Global";
import getProductos from "./getProductos";
import { toast } from "react-toastify";

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
      toast.success("Producto eliminado correctamente");
      getProductos(setProductos);
    }
  } catch (error) {
    toast.error("Error al eliminar el producto");
    console.log("error", error);
  }
};

export default borrar_Producto;
