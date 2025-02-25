import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Loader, ChevronLeft, ChevronRight } from 'lucide-react';
import axiosInstance from '../cors/axiousInstence';
import AdminNavbar from './AdminNavbar';
import AdminFooter from './AdminFooter';
import ProductModal from './AddProductForm';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  useEffect(() => {
    async function productDataFetching() {
      try {
        const response = await axiosInstance.get("/api/productData", {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
        if (response.data && response.data.data) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    }
    productDataFetching();
  }, [setProducts]);

  async function handleDeleteProduct(productId) {
    setLoadingProductId(productId);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await axiosInstance.post(
        "/api/deletingProduct",
        { productId },
        { 
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      if (!response.data.success) {
        toast.failed(response.data.message || "Sorry, something went wrong please try again.");
      }

      if (response.data.success) {
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
      }
    } catch (error) {
      console.log('Error deleting product:', error);
    } finally {
      setLoadingProductId(null);
    }
  }

  const handleAddProduct = () => {
    navigate('/AddProductForm');
  };

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Pagination controls
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-amber-50 p-4 sm:p-8">
        <div className="container mx-auto bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-4 sm:mb-0">Product Management</h1>
            <button
              onClick={handleAddProduct}
              className="bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition cursor-pointer flex items-center"
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
                {currentProducts.map((product) => (
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
                          onClick={() => handleDeleteProduct(product._id)}
                          className={`transition-colors ${
                            loadingProductId === product._id
                              ? 'text-gray-400'
                              : 'text-red-600 hover:text-red-800 cursor-pointer'
                          }`}
                          disabled={loadingProductId === product._id}
                        >
                          {loadingProductId === product._id ? (
                            <Loader className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="mt-4 flex items-center justify-center space-x-4 cursor-pointer ">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-md cursor-pointer ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed  '
                    : 'bg-amber-800 text-white hover:bg-amber-700 cursor-pointer '
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <div className="flex space-x-2 ">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === number
                        ? 'bg-amber-800 text-white'
                        : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-amber-800 text-white hover:bg-amber-700 cursor-pointer'
                }`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
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