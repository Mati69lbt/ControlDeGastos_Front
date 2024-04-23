import { Global } from "../../../helpers/Global";

const buscar_producto = async (id, setProductoBuscado) => {
  try {
    const response = await fetch(
      Global.url_backend + "/buscar-producto/" + id,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (data.status === "success") {
      setProductoBuscado(data.producto);
    }
  } catch (error) {
    console.log("error", error);
  }
};

export default buscar_producto;
