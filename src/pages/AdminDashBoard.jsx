import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import axiosInstance from '../cors/axiousInstence';
import AdminNavbar from './AdminNavbar';
import AdminFooter from './AdminFooter';
import ProductModal from './AddProductForm';

const AdminHome = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function productDataFetching() {
      try {
        const response = await axiosInstance.get('http://localhost:4000/api/productData', {
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.data && response.data.data) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    }
    productDataFetching();
  }, []);

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product._id !== productId));
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-amber-50 p-4 sm:p-8">
        <div className="container mx-auto bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-4 sm:mb-0">Product Management</h1>
            <button
              onClick={handleAddProduct}
              className="bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition flex items-center"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add Product
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm sm:text-base">
              <thead>
                <tr className="bg-amber-100 text-left">
                  <th className="border p-2 sm:p-3">Img</th>
                  <th className="border p-2 sm:p-3">Name</th>
                  <th className="border p-2 sm:p-3">Brand</th>
                  <th className="border p-2 sm:p-3">Material</th>
                  <th className="border p-2 sm:p-3">Color</th>
                  <th className="border p-2 sm:p-3">Lock</th>
                  <th className="border p-2 sm:p-3">Suitable For</th>
                  <th className="border p-2 sm:p-3">Price</th>
                  <th className="border p-2 sm:p-3">Stock</th>
                  <th className="border p-2 sm:p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-amber-50">
                    <td className="border p-2 sm:p-3">
                      {product.images && product.images.length > 0 ? (
                        <img src={product.images[0]} alt={product.name} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded" />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td className="border p-2 sm:p-3">{product.name}</td>
                    <td className="border p-2 sm:p-3">{product.brand}</td>
                    <td className="border p-2 sm:p-3">{product.material}</td>
                    <td className="border p-2 sm:p-3">{product.color}</td>
                    <td className="border p-2 sm:p-3">{product.lockIncluded ? 'Yes' : 'No'}</td>
                    <td className="border p-2 sm:p-3">{product.suitableFor}</td>
                    <td className="border p-2 sm:p-3">{product.price}</td>
                    <td className="border p-2 sm:p-3">{product.stock}</td>
                    <td className="border p-2 sm:p-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-amber-800 hover:text-amber-600"
                        >
                          <Edit className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
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
              onSave={() => setIsModalOpen(false)}
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
