// cSpell:ignore Matias, observacion, matias, segunditos

const Crear = () => {
  return (
    <div>
      <h1>Nuevo Gasto</h1>
      <form action="">
        <div>
          <label htmlFor="fecha">Fecha</label>
          <input type="date" name="fecha" id="fecha" required />
        </div>
        <div>
          <label htmlFor="lugar">Lugar</label>
          <input type="text" name="lugar" id="lugar" required />
        </div>
        <div>
          <label htmlFor="monto">Monto</label>
          <input type="number" name="monto" id="monto" />
        </div>
        <div>
          <label htmlFor="pagadoPor">Pagado por:</label>
          <select id="pagadoPor" required>
            <option value="">Seleccionar</option>
            <option value="Carolina">Carolina</option>
            <option value="Matias">Matias</option>
          </select>
        </div>
        <div>
          <label htmlFor="observacion">Observación:</label>
          <input type="text" name="lugar" id="lugar" />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default Crear;
