import { Global } from "../../../helpers/Global";

const getProductos = async (setProductos) => {
  try {
    const response = await fetch(Global.url_backend + "/leer-productos", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.status === "success") {
      setProductos(data.productos);
    }
  } catch (error) {
    console.log("error", error);
  }
};

export default getProductos;
