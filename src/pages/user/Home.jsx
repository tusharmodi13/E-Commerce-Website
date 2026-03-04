import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';

const categories = [
  { name: "Electronics", slug: "electronics", icon: "💻" },
  { name: "Jewelry", slug: "jewelery", icon: "💎" },
  { name: "Men's Clothing", slug: "men's clothing", icon: "👔" },
  { name: "Women's Clothing", slug: "women's clothing", icon: "👗" },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=8')
      .then(res => res.json())
      .then(data => { setFeatured(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to ShopEase</h1>
          <p className="text-lg md:text-xl mb-8 text-indigo-100">Discover amazing products at unbeatable prices</p>
          <Link
            to="/products"
            className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              to={`/products?category=${encodeURIComponent(cat.slug)}`}
              className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition"
            >
              <span className="text-4xl">{cat.icon}</span>
              <p className="mt-3 font-semibold text-gray-700">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
          <Link to="/products" className="text-indigo-600 font-semibold hover:underline">View All →</Link>
        </div>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Banner */}
      <section className="bg-indigo-50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Shop With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow">
              <span className="text-3xl">🚚</span>
              <h3 className="font-semibold mt-3">Free Shipping</h3>
              <p className="text-sm text-gray-500 mt-1">On orders over $50</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow">
              <span className="text-3xl">🔒</span>
              <h3 className="font-semibold mt-3">Secure Payment</h3>
              <p className="text-sm text-gray-500 mt-1">100% secure checkout</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow">
              <span className="text-3xl">↩️</span>
              <h3 className="font-semibold mt-3">Easy Returns</h3>
              <p className="text-sm text-gray-500 mt-1">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
