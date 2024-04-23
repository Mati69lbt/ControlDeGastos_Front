import { Global } from "../../../helpers/Global";
import getProductos from "./getProductos";

const guardar_Producto = async (form, setProductos) => {
  let nuevo_producto = form;
  try {
    const response = await fetch(Global.url_backend + "/nuevo-producto", {
      method: "POST",
      body: JSON.stringify(nuevo_producto),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data.status === "success") {
      getProductos(setProductos);
    }
  } catch (error) {
    console.log("error", error);
  }
};

export default guardar_Producto;
