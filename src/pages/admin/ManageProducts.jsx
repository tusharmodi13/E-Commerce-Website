import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage first, fallback to API
    const stored = localStorage.getItem('admin_products');
    if (stored) {
      setProducts(JSON.parse(stored));
      setLoading(false);
    } else {
      fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
          setProducts(data);
          localStorage.setItem('admin_products', JSON.stringify(data));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, []);

  const handleDelete = (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('admin_products', JSON.stringify(updated));
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Products</h2>
        <Link
          to="/admin/products/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
        >
          + Add Product
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Image</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Title</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Category</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Price</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Rating</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img src={product.image} alt="" className="w-10 h-10 object-contain" />
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate">{product.title}</td>
                  <td className="px-6 py-4 capitalize">{product.category}</td>
                  <td className="px-6 py-4 font-medium">₹{product.price?.toFixed(2)}</td>
                  <td className="px-6 py-4">{product.rating?.rate || '-'}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="text-indigo-600 hover:underline text-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-500 hover:underline text-sm cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-4">{products.length} products total</p>
    </div>
  );
}
