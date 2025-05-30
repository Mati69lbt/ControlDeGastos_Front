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
      const productosOrdenados = [...data.productos].sort((a, b) =>
        a.producto.localeCompare(b.producto)
      );
      setProductos(productosOrdenados);
    }
  } catch (error) {
    console.log("error", error);
  }
};

export default getProductos;
