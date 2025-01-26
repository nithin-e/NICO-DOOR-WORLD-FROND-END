import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import AdminNavbar from './AdminNavbar';
import AdminFooter from './AdminFooter';

const AdminHome = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Classic Wood Door', category: 'Interior', price: 199.99, stock: 50 },
    { id: 2, name: 'Modern Steel Door', category: 'Exterior', price: 299.99, stock: 30 },
    { id: 3, name: 'Rustic Barn Door', category: 'Specialty', price: 249.99, stock: 20 },
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (productData) => {
    if (selectedProduct) {
      // Edit existing product
      setProducts(products.map(p => 
        p.id === selectedProduct.id ? { ...p, ...productData } : p
      ));
    } else {
      // Add new product
      const newProduct = {
        ...productData,
        id: products.length + 1
      };
      setProducts([...products, newProduct]);
    }
    setIsModalOpen(false);
  };

  return (
    <>
    <AdminNavbar/>
    <div className="min-h-screen bg-amber-50 p-8">


      <div className="container mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-amber-900">Product Management</h1>
          <button 
            onClick={handleAddProduct}
            className="bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition flex items-center"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Product
          </button>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-amber-100">
              <th className="border p-3 text-left">ID</th>
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Category</th>
              <th className="border p-3 text-left">Price</th>
              <th className="border p-3 text-left">Stock</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-amber-50">
                <td className="border p-3">{product.id}</td>
                <td className="border p-3">{product.name}</td>
                <td className="border p-3">{product.category}</td>
                <td className="border p-3">${product.price.toFixed(2)}</td>
                <td className="border p-3">{product.stock}</td>
                <td className="border p-3 text-center">
                  <div className="flex justify-center space-x-2">
                    <button 
                      onClick={() => handleEditProduct(product)}
                      className="text-amber-800 hover:text-amber-600"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <ProductModal 
            product={selectedProduct}
            onSave={handleSaveProduct}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    
    </div>
    <AdminFooter/>
    </>
  );
};

// Product Modal Component
const ProductModal = ({ product, onSave, onClose }) => {
  const [formData, setFormData] = useState(product ? { ...product } : {
    name: '',
    category: '',
    price: '',
    stock: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-amber-900">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            step="0.01"
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock Quantity"
            required
            className="w-full p-2 border rounded-md"
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminHome;