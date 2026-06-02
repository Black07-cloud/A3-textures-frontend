import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";

function EditProduct() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [updating, setUpdating] = useState(false);

  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "",
    sqftRate: "",
    image: null
  });

  // FETCH PRODUCT
  useEffect(() => {

    async function fetchProduct() {

      try {

        const response = await api.get("/textures");

        const product = response.data.find(
          (item) => item._id === id
        );

        if (!product) {
          return navigate("/products");
        }

        setForm({
          name: product.name,
          category: product.category,
          sqftRate: product.sqftRate,
          image: null
        });

        setPreview(product.image);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    }

    fetchProduct();

  }, [id, navigate]);

  // INPUT CHANGE
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  // IMAGE CHANGE
  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setForm({
      ...form,
      image: file
    });

    setPreview(
      URL.createObjectURL(file)
    );

  };

  // UPDATE
  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      setUpdating(true);

      const formData = new FormData();

      formData.append("name", form.name);

      formData.append("category", form.category);

      formData.append("sqftRate", form.sqftRate);

      if (form.image) {
        formData.append("image", form.image);
      }

      await api.put(
        `/textures/${id}`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

      alert("✅ Product updated");

      navigate(
        `/products/${form.category}`
      );

    } catch (err) {

      console.log(err);

      alert("Update failed");

    } finally {

      setUpdating(false);

    }

  };

  // LOADING
  if (loading) {

    return (

      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-2xl">
        Loading...
      </div>

    );

  }

  return (

    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-10">

      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-4xl md:text-5xl font-extrabold">
            ✏️ Edit Product
          </h1>

          <p className="text-slate-400 mt-3">
            Update texture product details
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleUpdate}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl"
        >

          {/* NAME */}
          <div>

            <label className="block mb-3 font-medium">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none"
            />

          </div>

          {/* CATEGORY */}
          <div>

            <label className="block mb-3 font-medium">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none"
            >

              <option value="Royal Play">
                Royal Play
              </option>

              <option value="Wood Grains">
                Wood Grains
              </option>

              <option value="Silk Plast Wallpaper">
                Silk Plast Wallpaper
              </option>

              <option value="Exterior">
                Exterior
              </option>

            </select>

          </div>

          {/* RATE */}
          <div>

            <label className="block mb-3 font-medium">
              Sq Ft Rate
            </label>

            <input
              type="number"
              name="sqftRate"
              value={form.sqftRate}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none"
            />

          </div>

          {/* IMAGE */}
          <div>

            <label className="block mb-3 font-medium">
              Upload New Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4"
            />

          </div>

          {/* PREVIEW */}
          {preview && (

            <div className="overflow-hidden rounded-3xl border border-slate-700">

              <img
                src={preview}
                alt="Preview"
                className="w-full h-[320px] object-cover"
              />

            </div>

          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={updating}
            className="w-full bg-blue-500 hover:bg-blue-600 transition py-4 rounded-2xl text-lg font-bold shadow-lg"
          >
            {updating
              ? "Updating..."
              : "🚀 Update Product"}
          </button>

        </form>

      </div>

    </div>

  );

}

export default EditProduct;