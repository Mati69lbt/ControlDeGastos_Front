import { Global } from "../../../helpers/Global";
import { toast } from "react-toastify";

const borrar_ListaDeCompras = async (setProductos) => {
  try {
    const response = await fetch(
      Global.url_backend + "/eliminar-todos-los-productos",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.status === "success") {
      toast.success(data.mensaje);
      setProductos([]);
    }
  } catch (error) {
    toast.error("Error al eliminar la lista de compras");
    console.log("error", error);
  }
};

export default borrar_ListaDeCompras;
