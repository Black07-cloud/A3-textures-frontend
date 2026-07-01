import { useState } from "react";

import api from "../services/api";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    sqftRate: "",
    image: null
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setForm({
      ...form,
      image: file
    });

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("sqftRate", form.sqftRate);
      formData.append("image", form.image);

      await api.post("/textures", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Product added successfully");

      setForm({
        name: "",
        category: "",
        sqftRate: "",
        image: null
      });

      setPreview("");
      e.target.reset();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Add Product
          </h1>

          <p className="text-slate-400 mt-3 text-lg">
            Add new texture products securely
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl"
        >
          <div>
            <label className="block mb-3 text-slate-300 font-medium">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter Product Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="block mb-3 text-slate-300 font-medium">
              Select Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-green-500"
            >
              <option value="">Select Category</option>
              <option value="Royal Play">Royal Play</option>
              <option value="Wood Grains">Wood Grains</option>
              <option value="Silk Plast Wallpaper">Silk Plast Wallpaper</option>
              <option value="Exterior">Exterior</option>
            </select>
          </div>

          <div>
            <label className="block mb-3 text-slate-300 font-medium">
              Sq Ft Rate
            </label>

            <input
              type="number"
              name="sqftRate"
              placeholder="Enter Rate"
              value={form.sqftRate}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="block mb-3 text-slate-300 font-medium">
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageChange}
              required
              className="hidden"
              id="productImage"
            />

            <label
              htmlFor="productImage"
              className="flex cursor-pointer items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-slate-700 bg-slate-800 px-5 py-8 text-center hover:border-green-500 transition"
            >
              <span className="text-3xl" aria-hidden="true">
                Camera
              </span>

              <span>
                <span className="block font-semibold text-white">
                  Camera / Gallery
                </span>

                <span className="block text-sm text-slate-400 mt-1">
                  Tap to capture or choose an image
                </span>
              </span>
            </label>
          </div>

          {preview && (
            <div className="overflow-hidden rounded-3xl border border-slate-700">
              <img
                src={preview}
                alt="Selected product preview"
                className="w-full h-[300px] object-cover"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 transition py-4 rounded-2xl text-lg font-bold shadow-lg disabled:opacity-50"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
