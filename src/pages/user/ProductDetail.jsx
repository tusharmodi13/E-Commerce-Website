import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => { setProduct(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!product) {
    return <p className="text-center py-24 text-gray-500">Product not found.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/products" className="text-indigo-600 hover:underline text-sm mb-6 inline-block">← Back to Products</Link>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Image */}
        <div className="bg-gray-50 flex items-center justify-center p-8 md:p-12">
          <img src={product.image} alt={product.title} className="max-h-96 object-contain" />
        </div>
        {/* Details */}
        <div className="p-8 flex flex-col">
          <span className="text-xs uppercase tracking-wide text-indigo-600 font-semibold">{product.category}</span>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">{product.title}</h1>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-yellow-400">{'★'.repeat(Math.round(product.rating?.rate || 0))}</span>
            <span className="text-sm text-gray-500">{product.rating?.rate} ({product.rating?.count} reviews)</span>
          </div>
          <p className="text-3xl font-bold text-indigo-600 mt-4">₹{product.price?.toFixed(2)}</p>
          <p className="text-gray-600 mt-4 leading-relaxed flex-1">{product.description}</p>
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3 rounded-lg font-semibold text-white transition cursor-pointer ${
                added ? 'bg-green-500' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <Link
              to="/cart"
              className="px-6 py-3 rounded-lg border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition text-center"
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
