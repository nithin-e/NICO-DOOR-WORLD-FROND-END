import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import imageCompression from 'browser-image-compression';
import axiosInstance from '../cors/axiousInstence';
import ProductValidation from "../util/productValidation";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGES = 6;

// Optimized image compression options
const compressImage = async (file) => {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 800,
    useWebWorker: true,
    initialQuality: 0.7,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    console.log('...................',compressedFile);
    
    return compressedFile;
  } catch (error) {
    console.error("Error compressing image:", error);
    return file;
  }
};

// Optimized Cloudinary upload with concurrent uploads
const uploadImagesToCloudinary = async (images, updateProgress) => {
  const uploadPromises = images.map(async (file, index) => {
    const compressedFile = await compressImage(file);
    const formData = new FormData();
    formData.append("file", compressedFile);
    formData.append("upload_preset", "nico-door-world");

    try {
      console.log('hey hey');
      
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/ddwsn0bwq/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      
      const data = await response.json();
      console.log('Cloudinary Response:', data); // Log full response
      console.log('Uploaded Image URL:', data.secure_url); // Log URL
      
      updateProgress((index + 1) / images.length * 100);
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return null;
    }
  });

  return Promise.all(uploadPromises);
};

const ProductAddPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [images, setImages] = useState([]);
  const [imageFile, setImageFile] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    material: '',
    color: '',
    lockIncluded: '',
    suitableFor: '',
    description: '',
    price: '',
    stock: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateFile = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`File ${file.name} is too large. Maximum size is 5MB`);
      return false;
    }
    if (!file.type.startsWith('image/')) {
      toast.error(`File ${file.name} is not an image`);
      return false;
    }
    return true;
  };

  const handleImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    if (selectedFiles.length + images.length > MAX_IMAGES) {
      toast.error(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    const validFiles = selectedFiles.filter(validateFile);
    
    if (validFiles.length > 0) {
      setImages(prev => [...prev, ...validFiles]);
      const imageUrls = validFiles.map((file) => URL.createObjectURL(file));
      setImageFile(prev => [...prev, ...imageUrls]);
    }
  };

  const handleRemoveImage = (url, index) => {
    setImageFile(prev => prev.filter(image => image !== url));
    setImages(prev => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadProgress(0);

    try {
      const { isValid, errors } = ProductValidation(formData);

      if (!isValid) {
        setError(errors);
        setLoading(false);
        return;
      }

      if (images.length === 0) {
        toast.error("Please add at least one image");
        setLoading(false);
        return;
      }

      const uploadedImages = await uploadImagesToCloudinary(images, setUploadProgress);
      console.log('All Uploaded Image URLs:', uploadedImages);
      
      const filteredImages = uploadedImages.filter(url => url !== null);

      if (filteredImages.length === 0) {
        throw new Error("Failed to upload images");
      }

      const productData = {
        ...formData,
        images: filteredImages
      };

      const response = await axiosInstance.post(
        "http://localhost:4000/api/addProduct",
        productData,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
          timeout: 5000,
        }
      );

     

      if (response.data) {
        toast.success('Product added successfully!');
        imageFile.forEach(url => URL.revokeObjectURL(url));
        navigate('/adminHome');
      }

    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error(error.response?.data?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleCancel = () => {
    imageFile.forEach(url => URL.revokeObjectURL(url));
    navigate('/adminHome');
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <AdminNavbar />
        <div className="flex items-center justify-center h-[calc(100vh-128px)]">
          <div className="text-center w-64">
            <div className="w-full h-3 bg-gray-200 rounded-full mb-4">
              <div 
                className="h-full bg-amber-600 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="mt-4 text-lg font-medium text-amber-900">
              {uploadProgress < 100 
                ? `Uploading Images... ${Math.round(uploadProgress)}%`
                : 'Saving Product...'}
            </p>
          </div>
        </div>
        <AdminFooter />
      </div>
    );
  }


  return (
    <div className="min-h-screen flex flex-col">
      <Toaster 
  position="top-center"
  toastOptions={{
    success: {
      duration: 2000,
      style: {
        background: 'green',
        color: '#fff',
      },
    },
    error: {
      duration: 8000,
      style: {
        background: 'red',
        color: '#fff',
      },
    },
  }}
/>
      <AdminNavbar />
      <div className="flex-grow container mx-auto px-4 py-8  bg-amber-50">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-amber-900 mb-8 text-center">Add New Product</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {error.name && <p className="text-red-500 text-xs">{error.name}</p>}
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Product Name"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />

                {error.price && <p className="text-red-500 text-xs">{error.price}</p>}
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  step="0.01"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />

                {error.stock && <p className="text-red-500 text-xs">{error.stock}</p>}
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Stock Quantity"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />

                {error.brand && <p className="text-red-500 text-xs">{error.brand}</p>}
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Brand"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div className="space-y-4">
                {error.material && <p className="text-red-500 text-xs">{error.material}</p>}
                <input
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  placeholder="Material"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />

                {error.color && <p className="text-red-500 text-xs">{error.color}</p>}
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="Color"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />

                {error.lockIncluded && <p className="text-red-500 text-xs">{error.lockIncluded}</p>}
                <input
                  type="text"
                  name="lockIncluded"
                  value={formData.lockIncluded}
                  onChange={handleChange}
                  placeholder="Lock Included (Yes/No)"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />

                {error.suitableFor && <p className="text-red-500 text-xs">{error.suitableFor}</p>}
                <input
                  type="text"
                  name="suitableFor"
                  value={formData.suitableFor}
                  onChange={handleChange}
                  placeholder="Suitable For"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-amber-800 mb-2">
                  Upload Images
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="cursor-pointer flex flex-col items-center justify-center w-full border-2 border-dashed border-amber-800 rounded-lg bg-amber-50 p-6 hover:border-amber-600 transition">
                    <svg
                      className="h-12 w-12 text-amber-600 mb-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16.5 9.5L12 14m0 0l-4.5-4.5M12 14V3.5"
                      ></path>
                    </svg>
                    <p className="text-sm text-amber-800">Click to upload or drag & drop files</p>
                    <p className="text-xs text-amber-600 mt-1">(Supports multiple images)</p>
                    <input
                      id="images"
                      type="file"
                      name="images"
                      onChange={handleImageUpload}
                      multiple
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {imageFile.map((image, index) => (
                    <div
                      key={index}
                      className="relative group border rounded-lg overflow-hidden shadow-md"
                    >
                      <img
                        src={image}
                        alt={`Uploaded ${index}`}
                        className="w-full h-40 object-cover"
                      />
                      <button
                        onClick={() => handleRemoveImage(image)}
                        className="absolute top-2 right-2 bg-red-600 text-white text-xs p-2 rounded-md opacity-0 group-hover:opacity-100 transition"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {error.description && <p className="text-red-500 text-xs">{error.description}</p>}
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-800 text-white rounded-lg hover:bg-amber-700 transition"
                  disabled={loading}
                >
                  Save Product
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
};

export default ProductAddPage;
