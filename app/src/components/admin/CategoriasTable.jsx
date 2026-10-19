// CategoriasTable.jsx — listado de categorías en tabla, con Editar/Eliminar.

function CategoriasTable({ categorias, onEditar, onEliminar }) {
  const nombrePadre = (idCategoriaPadre) => {
    if (!idCategoriaPadre) return '—';
    const padre = categorias.find((c) => c.id === idCategoriaPadre);
    return padre ? padre.nombre : '—';
  };

  if (categorias.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-700 p-8 text-center text-slate-400">
        No hay categorías cargadas todavía.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800">
      <table className="w-full text-left text-sm text-slate-300">
        <thead className="bg-slate-900 text-xs uppercase text-slate-400">
          <tr>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Categoría padre</th>
            <th className="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id} className="border-t border-slate-800 hover:bg-slate-900/50">
              <td className="px-4 py-3 font-medium text-white">{categoria.nombre}</td>
              <td className="px-4 py-3">{nombrePadre(categoria.idCategoriaPadre)}</td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => onEditar(categoria)}
                  className="mr-2 rounded-lg border border-slate-600 px-3 py-1 text-xs font-medium text-slate-200 hover:bg-slate-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => onEliminar(categoria)}
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

export default CategoriasTable;
