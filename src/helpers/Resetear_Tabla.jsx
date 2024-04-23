// cSpell:ignore Resetear, Matias

import { Global } from "./Global";

const Resetear_Tabla = async (setGastos_Matias, setGastos_Carolina) => {
  try {
    const response = await fetch(Global.url_backend + "/eliminarTabla", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.status === "success") {
      alert(data.mensaje);
      setGastos_Matias([]);
      setGastos_Carolina([]);
    }
  } catch (error) {
    console.log("error", error);
  }
};

export default Resetear_Tabla;
