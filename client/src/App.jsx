import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";

import Interior from "./pages/Interior";

import Login from "./pages/Login";

import AdminDashboard from "./pages/AdminDashboard";

import AdminSettings from "./pages/AdminSettings";

import ProtectedRoute from "./components/ProtectedRoute";

import AddProduct from "./pages/AddProduct";

import Products from "./pages/Products";

import EditProduct from "./pages/EditProduct";

import Exterior from "./pages/Exterior";

import AllCollections from "./pages/AllCollections";

import AddReview from "./pages/AddReview";

function App() {

useEffect(() => {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    window.deferredPrompt = e;
  });
}, []);

  return (

    <BrowserRouter>

      <Routes>

        {/* 🏠 HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* 🎨 INTERIOR */}
        <Route
          path="/interior"
          element={<Interior />}
        />

        {/* 🛍️ PRODUCTS */}
        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/products/:category"
          element={<Products />}
        />

        {/* 👤 ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        {/* 🔐 ADMIN LOGIN */}
        <Route
          path="/admin/login"
          element={<Login />}
        />

        {/* ⚙️ ADMIN SETTINGS */}
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <AdminSettings />
            </ProtectedRoute>
          }
        />

        {/* ➕ ADD PRODUCT */}
        <Route
          path="/admin/add-product"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
            path="/admin/edit-product/:id"
                   element={
                    <ProtectedRoute>
                   <EditProduct />
                </ProtectedRoute>
                      }
                       />
                       <Route
                   path="/exterior"
                  element={<Exterior />}
                       />
                       <Route
  path="/admin/collections"
  element={
    <ProtectedRoute>
      <AllCollections />
    </ProtectedRoute>
  }
/> 
    <Route
  path="/add-review"
  element={<AddReview />}
/>
      </Routes>

    </BrowserRouter>

  );

}

export default App;