const Fecha_Formateada = (fecha) => {
  const dateObj = new Date(fecha);

  const opciones = {
    month: "short",
    day: "numeric",
  };

  const fechaFormateada = dateObj.toLocaleDateString("es-ES", opciones);

  return fechaFormateada;
};

export default Fecha_Formateada;
