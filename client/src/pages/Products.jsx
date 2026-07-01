import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


function Products() {
const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  const [isAdmin, setIsAdmin] = useState(false);

  const { category } = useParams();

  const selectedCategory = category || "All";

  // FETCH PRODUCTS + ADMIN
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

    async function checkAdmin() {

      try {

        const response = await api.get("/auth/verify");

        if (response.data?.admin) {

          setIsAdmin(true);

        }

      } catch {

        setIsAdmin(false);

      }

    }

    fetchProducts();

    checkAdmin();

  }, []);

  // DELETE PRODUCT
  const deleteProduct = async (id) => {

    const confirmDelete = confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`/textures/${id}`);

      setProducts(
        products.filter(
          (product) => product._id !== id
        )
      );

      alert("✅ Product deleted");

    } catch (err) {

      console.log(err);

      alert("Delete failed");

    }

  };

  // LOADING
  if (loading) {

    return (

      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-2xl">
        Loading Products...
      </div>

    );

  }

  return (

    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 md:p-10">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
          ✨ {selectedCategory} Collections
        </h1>

        <p className="text-slate-400 mt-3 text-base md:text-lg">
          Premium interior & exterior texture finishes
        </p>

      </div>

      {/* SEARCH */}
      <div className="mb-8">

        <input
          type="text"
          placeholder="Search textures..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full md:w-[400px] bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 outline-none"
        />

      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">

        {products

          .filter((product) => {

            if (selectedCategory === "All") {
              return true;
            }

            return (
              product.category
                .toLowerCase()
                .trim() ===
              selectedCategory
                .toLowerCase()
                .trim()
            );

          })

          .filter((product) =>

            product.name
              .toLowerCase()
              .includes(search.toLowerCase())

          )

          .map((product) => (

            <div
              key={product._id}
              className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-[28px] overflow-hidden shadow-2xl hover:-translate-y-2 transition duration-300"
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden">

                <img
                  src={product.image}
                  alt={product.name}
                  onClick={() =>
                    setSelectedImage(product.image)
                  }
                  className="w-full h-[240px] sm:h-[260px] object-cover cursor-pointer hover:scale-110 transition duration-500"
                />

                {/* CATEGORY */}
                <div className="absolute top-4 left-4">

                  <span className="bg-black/60 backdrop-blur text-green-400 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold">
                    {product.category}
                  </span>

                </div>

              </div>

              {/* CONTENT */}
              <div className="p-5 sm:p-6 space-y-5">

                {/* NAME */}
                <h2 className="text-2xl font-extrabold leading-tight">
                  {product.name}
                </h2>
                   {/* RATE */}
                   <div className="flex items-center justify-between bg-slate-800 rounded-2xl px-5 py-4">

                <p className="text-slate-400 text-sm sm:text-base">
                     Sq Ft Rate
                           </p>

                         <h3 className="text-2xl sm:text-3xl font-extrabold text-green-400">
                              ₹{
                               product.sqftRate ||
                               product.sqFtRate ||
                                product.rate
                            }
                                   </h3>

                           </div>
             

                {/* CUSTOMER */}
                {!isAdmin && (

                 <a
  href={`https://wa.me/919994886016?text=${encodeURIComponent(

`✨ A³ Texture Enquiry

📂 Category: ${product.category}

🎨 Product Name: ${product.name}

💰 Sq Ft Rate: ₹${product.sqftRate}

🖼 Image:
${product.image}

Hello, I am interested in this texture design. Please share more details.`

  )}`}
  target="_blank"
  rel="noreferrer"
  className="block text-center bg-green-500 hover:bg-green-600 active:scale-95 transition py-4 rounded-2xl font-bold text-lg shadow-lg"
>
  🛒 Order in WhatsApp
</a>

                )}

                {/* ADMIN */}
                {isAdmin && (

                  <div className="flex gap-3">
                    <button
             onClick={() =>
    navigate(
      `/admin/edit-product/${product._id}`
    )
  }
  className="flex-1 bg-blue-500 hover:bg-blue-600 active:scale-95 transition py-3 rounded-2xl font-bold"
>
  ✏️ Edit
</button>

                    <button
                      onClick={() =>
                        deleteProduct(product._id)
                      }
                      className="flex-1 bg-red-500 hover:bg-red-600 active:scale-95 transition py-3 rounded-2xl font-bold"
                    >
                      🗑 Delete
                    </button>

                  </div>

                )}

              </div>

            </div>

          ))}

      </div>

      {/* IMAGE MODAL */}
      {selectedImage && (

        <div
          onClick={() =>
            setSelectedImage(null)
          }
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6"
        >

          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-full max-h-full rounded-3xl"
          />

        </div>

      )}

    </div>

  );

}

export default Products;