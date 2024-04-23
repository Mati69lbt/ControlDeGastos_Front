import { Global } from "../../../helpers/Global";

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
      alert(data.mensaje);
      setProductos([]);
    }
  } catch (error) {
    console.log("error", error);
  }
};

export default borrar_ListaDeCompras;
