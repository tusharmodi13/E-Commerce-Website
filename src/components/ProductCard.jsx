import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col">
      <Link to={`/products/${product.id}`} className="block">
        <div className="h-56 bg-gray-50 flex items-center justify-center p-4">
          <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-indigo-600 transition">{product.title}</h3>
        </Link>
        <div className="flex items-center gap-1 mt-2">
          <span className="text-yellow-400 text-sm">{'★'.repeat(Math.round(product.rating?.rate || 0))}</span>
          <span className="text-xs text-gray-500">({product.rating?.count || 0})</span>
        </div>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-indigo-600">₹{product.price?.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-indigo-600 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
