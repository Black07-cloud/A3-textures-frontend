import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

export default function AllCollections() {

  const navigate = useNavigate();

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH PRODUCTS
  useEffect(() => {

    async function fetchProducts() {

      try {

        const response =
          await api.get(
            "/textures"
          );

        setProducts(
          response.data
        );

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    }

    fetchProducts();

  }, []);

  // COUNTS
  const interiorCount =
    products.filter(
      (p) =>
        p.category ===
        "Interior"
    ).length;

  const exteriorCount =
    products.filter(
      (p) =>
        p.category ===
        "Exterior"
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

      {/* HEADER */}
      <div className="mb-10">

       <h1 className="text-3xl md:text-4xl font-extrabold">

          📦 All Collections

        </h1>

        <p className="text-slate-400 mt-3 text-lg">

          Manage all texture collections

        </p>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

        {/* TOTAL */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">

          <h2 className="text-slate-400 text-lg">
            Total Products
          </h2>

          <h1 className="text-4xl font-extrabold mt-3 text-green-400">

            {products.length}

          </h1>

        </div>

        {/* INTERIOR */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">

          <h2 className="text-slate-400 text-lg">
            Interior
          </h2>

          <h1 className="text-5xl font-extrabold mt-4 text-blue-400">

            {interiorCount}

          </h1>

        </div>

        {/* EXTERIOR */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">

          <h2 className="text-slate-400 text-lg">
            Exterior
          </h2>

          <h1 className="text-5xl font-extrabold mt-4 text-orange-400">

            {exteriorCount}

          </h1>

        </div>

      </div>

      {/* COLLECTIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {products.map((product) => (

          <div
            key={product._id}
           className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:scale-[1.01] transition"
          >

            {/* IMAGE */}
            <img
              src={product.image}
              alt={product.name}
             className="w-full h-[190px] object-cover"
            />

            {/* CONTENT */}
            <div className="p-4">

              {/* CATEGORY */}
              <span className="inline-block bg-green-500/20 text-green-400 px-4 py-2 rounded-xl text-sm font-semibold">

                {product.category}

              </span>

              {/* NAME */}
              <h2 className="text-xl font-bold mt-3">

                {product.name}

              </h2>

              {/* RATE */}
              <div className="flex items-center justify-between mt-4 bg-slate-800 rounded-xl px-4 py-3">

                <p className="text-slate-400">
                  Sq Ft Rate
                </p>

                <h3 className="text-2xl font-extrabold text-green-400">

                  ₹{product.sqftRate}

                </h3>

              </div>

              {/* BUTTONS */}
              <div className="flex gap-4 mt-6">

                <button
                  onClick={() =>
                    navigate(
                      `/admin/edit-product/${product._id}`
                    )
                  }
               className="flex-1 bg-blue-500 hover:bg-blue-600 transition py-2.5 rounded-xl font-semibold text-sm"
                >
                  ✏ Edit
                </button>

                <button
                  className="flex-1 bg-red-500 hover:bg-red-600 transition py-3 rounded-2xl font-semibold"
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