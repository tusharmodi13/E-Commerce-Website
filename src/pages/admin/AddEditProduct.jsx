import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function AddEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      const products = JSON.parse(localStorage.getItem('admin_products') || '[]');
      const product = products.find(p => String(p.id) === String(id));
      if (product) {
        setForm({
          title: product.title,
          price: String(product.price),
          description: product.description,
          category: product.category,
          image: product.image,
        });
      }
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.title || !form.price || !form.category) {
      setError('Title, price, and category are required.');
      return;
    }

    const products = JSON.parse(localStorage.getItem('admin_products') || '[]');

    if (isEdit) {
      const updated = products.map(p => {
        if (String(p.id) === String(id)) {
          return { ...p, title: form.title, price: parseFloat(form.price), description: form.description, category: form.category, image: form.image };
        }
        return p;
      });
      localStorage.setItem('admin_products', JSON.stringify(updated));
    } else {
      const newProduct = {
        id: Date.now(),
        title: form.title,
        price: parseFloat(form.price),
        description: form.description,
        category: form.category,
        image: form.image || 'https://via.placeholder.com/300',
        rating: { rate: 0, count: 0 },
      };
      products.push(newProduct);
      localStorage.setItem('admin_products', JSON.stringify(products));
    }

    navigate('/admin/products');
  };

  return (
    <div className="max-w-2xl">
      <Link to="/admin/products" className="text-indigo-600 hover:underline text-sm mb-4 inline-block">← Back to Products</Link>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{isEdit ? 'Edit Product' : 'Add New Product'}</h2>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm rounded-lg p-3 mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Title *</label>
          <input name="title" value={form.title} onChange={handleChange} required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
            <input name="price" type="number" step="0.01" min="0" value={form.price} onChange={handleChange} required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select name="category" value={form.category} onChange={handleChange} required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">Select category</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelry</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input name="image" value={form.image} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="https://example.com/image.jpg" />
        </div>
        {form.image && (
          <div className="flex items-center gap-4">
            <img src={form.image} alt="Preview" className="w-20 h-20 object-contain border rounded-lg p-1" />
            <span className="text-sm text-gray-500">Image preview</span>
          </div>
        )}
        <div className="flex gap-3 pt-2">
          <button type="submit" className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition cursor-pointer">
            {isEdit ? 'Update Product' : 'Add Product'}
          </button>
          <Link to="/admin/products" className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
