import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Hero } from "./Components/Hero";
import ProductList from "./Components/ProductList";
import ProductDetails from "./Components/ProductDetails";
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/AdminDashBoard";
import AddProductForm from "./pages/AddProductForm";
import ContactForNicco from "./Components/ContactForNicco";
import ProtectedRoute from './pages/ProtectedRoute'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/ProductList" element={<ProductList />} />
        <Route path="/ProductDetails/:id" element={<ProductDetails />} />
        <Route path="/adminLoginPage" element={<AdminLogin />} />
        <Route path="/adminHome" element={<ProtectedRoute element={AdminHome} />} />
        <Route path="/addProductForm"  element={<ProtectedRoute element={AddProductForm } />} />
        <Route path="/Contact" element={<ContactForNicco />} />
      </Routes>
    </div>
  );
}

export default App;
