import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AllCollections() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // DELETE PRODUCT
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/textures/${id}`);

      setProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );

      alert("✅ Product deleted successfully");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.error ||
          "Failed to delete product"
      );
    }
  };

  // =========================
  // FETCH PRODUCTS
  // =========================
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get("/textures");
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const interiorCount = products.filter(
    (p) => p.category === "Interior"
  ).length;

  const exteriorCount = products.filter(
    (p) => p.category === "Exterior"
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-2xl">
        Loading Collections...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          📦 All Collections
        </h1>

        <p className="text-slate-400 mt-3 text-lg">
          Manage all texture collections
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h2 className="text-slate-400">Total Products</h2>

          <h1 className="text-4xl font-bold text-green-400 mt-2">
            {products.length}
          </h1>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h2 className="text-slate-400">Interior</h2>

          <h1 className="text-4xl font-bold text-blue-400 mt-2">
            {interiorCount}
          </h1>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h2 className="text-slate-400">Exterior</h2>

          <h1 className="text-4xl font-bold text-orange-400 mt-2">
            {exteriorCount}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">
              <span className="inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded-lg">
                {product.category}
              </span>

              <h2 className="text-xl font-bold mt-3">
                {product.name}
              </h2>

              <div className="mt-4 flex justify-between bg-slate-800 rounded-xl px-4 py-3">
                <span>Sq Ft Rate</span>

                <span className="text-green-400 font-bold">
                  ₹{product.sqftRate}
                </span>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() =>
                    navigate(`/admin/edit-product/${product._id}`)
                  }
                  className="flex-1 bg-blue-500 hover:bg-blue-600 py-3 rounded-xl font-semibold"
                >
                  ✏ Edit
                </button>

                <button
                  onClick={() => handleDelete(product._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}