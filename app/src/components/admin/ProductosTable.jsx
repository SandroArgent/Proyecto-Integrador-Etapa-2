// ProductosTable.jsx — listado de productos en tabla, con acciones de
// Editar y Eliminar por fila. Es un componente "de presentación": no sabe
// nada de axios ni de la API, solo recibe datos y funciones por props.

function ProductosTable({ productos, categorias, onEditar, onEliminar }) {
  const nombreCategoria = (idCategoria) => {
    const categoria = categorias.find((c) => c.id === idCategoria);
    return categoria ? categoria.nombre : '—';
  };

  if (productos.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-700 p-8 text-center text-slate-400">
        No hay productos cargados todavía.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800">
      <table className="w-full text-left text-sm text-slate-300">
        <thead className="bg-slate-900 text-xs uppercase text-slate-400">
          <tr>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Categoría</th>
            <th className="px-4 py-3">Precio</th>
            <th className="px-4 py-3">Stock</th>
            <th className="px-4 py-3">Destacado</th>
            <th className="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id} className="border-t border-slate-800 hover:bg-slate-900/50">
              <td className="px-4 py-3 font-medium text-white">{producto.nombre}</td>
              <td className="px-4 py-3">{nombreCategoria(producto.idCategoria)}</td>
              <td className="px-4 py-3">${Number(producto.precio).toLocaleString('es-AR')}</td>
              <td className="px-4 py-3">{producto.stock}</td>
              <td className="px-4 py-3">{producto.destacado ? 'Sí' : 'No'}</td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => onEditar(producto)}
                  className="mr-2 rounded-lg border border-slate-600 px-3 py-1 text-xs font-medium text-slate-200 hover:bg-slate-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => onEliminar(producto)}
                  className="rounded-lg border border-red-800 px-3 py-1 text-xs font-medium text-red-400 hover:bg-red-950"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductosTable;
