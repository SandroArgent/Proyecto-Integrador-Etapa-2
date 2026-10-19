// Carrito.jsx — revisión del carrito antes de pagar: permite ajustar
// cantidades, sacar productos, y ver el total calculado en vivo (viene
// directo de CartContext, no hay que recalcular nada acá).

import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function Carrito() {
  const { items, actualizarCantidad, quitarItem, subtotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Si no está logueado, lo mandamos a loguearse primero. El carrito no
    // se pierde: sigue guardado en localStorage mientras tanto.
    navigate(isAuthenticated ? '/checkout' : '/login');
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Tu carrito está vacío</h1>
        <Link to="/catalogo" className="mt-4 inline-block text-indigo-600 hover:underline">
          Ir al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Tu carrito</h1>

      <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
        {items.map((item) => (
          <div key={item.idProducto} className="flex items-center gap-4 p-4">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
              {item.imagen && <img src={item.imagen} alt={item.nombre} className="h-full w-full object-cover" />}
            </div>

            <div className="flex-1">
              <p className="font-medium text-slate-900">{item.nombre}</p>
              <p className="text-sm text-slate-500">${item.precio.toLocaleString('es-AR')} c/u</p>
            </div>

            <input
              type="number"
              min="1"
              value={item.cantidad}
              onChange={(e) => actualizarCantidad(item.idProducto, Number(e.target.value))}
              className="w-16 rounded-lg border border-slate-300 px-2 py-1 text-center"
            />

            <p className="w-24 text-right font-semibold text-slate-900">
              ${(item.precio * item.cantidad).toLocaleString('es-AR')}
            </p>

            <button
              onClick={() => quitarItem(item.idProducto)}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Quitar
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
        <span className="text-lg font-semibold text-slate-900">Total</span>
        <span className="text-2xl font-bold text-slate-900">${subtotal.toLocaleString('es-AR')}</span>
      </div>

      <button
        onClick={handleCheckout}
        className="mt-6 w-full rounded-xl bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-500"
      >
        Finalizar compra
      </button>
    </div>
  );
}

export default Carrito;
