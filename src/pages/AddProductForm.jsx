import { useState } from "react";
import axiosInstance from '../cors/axiousInstence'
import ProductValidation from "../util/productValidation";

const ProductModal = ({ product, onSave, onClose }) => {

  const [error,setError]=useState('')
  const [images, setImages] = useState([]);
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
   const {name,value}=e.target

   let newData={...formData}
        newData[name]=value
        setFormData(newData)

  };

  const handleImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...imageUrls]);
  };



  
  const handleRemoveImage = (url) => {
    setImages((prevImages) => prevImages.filter((image) => image !== url));
  };





  const handleSubmit =async (e) => {
    e.preventDefault()

    try {

const { isValid, errors }=ProductValidation(formData)

if(isValid){
  const formDataToSend = new FormData();
      
      // Append form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Append images
      images.forEach((image, index) => {
        formDataToSend.append(`images`, image);
      });
  const response = await axiosInstance.post('http://localhost:4000/api/addProduct', formDataToSend, {
    headers: { 'Content-Type': 'application/json' },
});
console.log(response)
}else{
  setError(errors)
}
      
    } catch (error) {
      console.log('this is catch block');
      console.log(error);
    }

  };




  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
<div className="bg-white p-8 rounded-xl w-full max-w-md sm:w-3/4 lg:w-1/2 xl:w-1/3 max-h-[90vh] overflow-y-auto scrollbar-hide">
<h2 className="text-2xl font-bold mb-6 text-amber-900">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        {error.name &&(<p className="text-red-500 text-xs">{error.name }</p>) }
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
           
            className="w-full p-2 border rounded-md"
          />

   <div className="w-full">
      <label
        htmlFor="images"
        className="block text-sm font-medium text-amber-800 mb-2"
      >
        Upload Images
      </label>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="images"
          className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-amber-800 rounded-md bg-amber-50 p-4 hover:border-amber-600 transition"
        >
          <svg
            className="h-10 w-10 text-amber-600 mb-2"
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
          <p className="text-sm text-amber-800">
            Click to upload or drag & drop files
          </p>
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

      {/* Render Uploaded Images */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {images.map((image, index) => (
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
              className="absolute top-2 right-2 bg-red-600 text-white text-xs p-1 rounded-md opacity-0 group-hover:opacity-100 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>



          {error.price&&(<p className="text-red-500 text-xs" >{error.price}</p>)}
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            step="0.01"
            
            className="w-full p-2 border rounded-md"
          />
           {error.stock&&(<p className="text-red-500 text-xs">{error.stock}</p>)}

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock Quantity"
         
            className="w-full p-2 border rounded-md"
          />
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Brand"
            
            className="w-full p-2 border rounded-md"
          />
         {error.material&&(<p className="text-red-500 text-xs">{error.material}</p>)}
          <input
            type="text"
            name="material"
            value={formData.material}
            onChange={handleChange}
            placeholder="Material"
          
            className="w-full p-2 border rounded-md"
          />
        {error.color&&(<p className="text-red-500 text-xs">{error.color}</p>)}
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="Color"
           
            className="w-full p-2 border rounded-md"
          />
      {error.lockIncluded&&(<p className="text-red-500 text-xs" >{error.lockIncluded}</p>)}
          <input
            type="text"
            name="lockIncluded"
            value={formData.lockIncluded}
            onChange={handleChange}
            placeholder="Lock Included (Yes/No)"
           
            className="w-full p-2 border rounded-md"
          />
        {error.suitableFor&&(<p className="text-red-500 text-xs" >{error.suitableFor}</p>)}
          <input
            type="text"
            name="suitableFor"
            value={formData.suitableFor}
            onChange={handleChange}
            placeholder="Suitable For"
           
            className="w-full p-2 border rounded-md"
          />
        {error.description&&(<p className="text-red-500 text-xs" >{error.description}</p>)}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
           
            className="w-full p-2 border rounded-md h-24 resize-none"
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

export default ProductModal;
