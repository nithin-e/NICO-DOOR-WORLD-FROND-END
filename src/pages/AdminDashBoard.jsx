import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import AdminNavbar from './AdminNavbar';
import AdminFooter from './AdminFooter';
import ProductModal from './AddProductForm'

const AdminHome = () => {
  const [products, setProducts] = useState([
    { id: 1, name: '', price: 0, stock: 0, brand: '', material: '', color: '', lockIncluded: '', suitableFor: '', description: '' },
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
      <AdminNavbar />
      <div className="min-h-screen bg-amber-50 p-4 sm:p-8">
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

          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-amber-100">
                  <th className="border p-3 text-left">ID</th>
                  <th className="border p-3 text-left">Name</th>
                  <th className="border p-3 text-left">Brand</th>
                  <th className="border p-3 text-left">Material</th>
                  <th className="border p-3 text-left">Color</th>
                  <th className="border p-3 text-left">Lock Included</th>
                  <th className="border p-3 text-left">SuitableFor</th>
                  <th className="border p-3 text-left">Price</th>
                  <th className="border p-3 text-left">Stock</th>
                  <th className="border p-3 text-left">Description</th>
                  <th className="border p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-amber-50">
                    <td className="border p-3">{product.id}</td>
                    <td className="border p-3">{product.name}</td>
                    <td className="border p-3">{product.brand}</td>
                    <td className="border p-3">{product.material}</td>
                    <td className="border p-3">{product.color}</td>
                    <td className="border p-3">{product.lockIncluded ? 'Yes' : 'No'}</td>
                    <td className="border p-3">{product.suitableFor}</td>
                    <td className="border p-3">{product.price}</td>
                    <td className="border p-3">{product.stock}</td>
                    <td className="border p-3">{product.description}</td>
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
          </div>

          {isModalOpen && (
            <ProductModal
              product={selectedProduct}
              onSave={handleSaveProduct}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </div>
      </div>
      <AdminFooter />
    </>
  );
};

export default AdminHome;
