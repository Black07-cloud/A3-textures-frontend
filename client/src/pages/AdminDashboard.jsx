import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

import adminPhoto from "../assets/admin.jpeg";

function AdminDashboard() {

  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);

  const [loading, setLoading] = useState(true);

  

  useEffect(() => {

    async function checkAdmin() {

      try {

        const response = await api.get("/auth/verify");

        if (response.data?.admin) {

          setIsAdmin(true);

        }

      } catch {

        setIsAdmin(false);

      } finally {

        setLoading(false);

      }

    }

    checkAdmin();

  }, []);

  // LOGOUT
  const logout = async () => {

    try {

      await api.post("/auth/logout");

      setIsAdmin(false);

   navigate("/", {
  replace: true
});

    } catch (err) {

      console.log(err);

    }

  };

  
  // ADD PRODUCT
  const goAddProduct = () => {

    navigate("/admin/add-product");

  };

  if (loading) {

    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-2xl">
        Loading...
      </div>
    );

  }

  return (

    <div className="min-h-screen bg-slate-950 text-white flex flex-col lg:flex-row">

      {/* LEFT IMAGE */}
      <div className="w-full lg:w-1/2 h-[320px] lg:h-screen">

        <img
          src={adminPhoto}
          alt="Admin"
          className="w-full h-full object-cover"
        />

      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/2 p-6 md:p-14 flex flex-col justify-center">

        <h2 className="text-4xl md:text-6xl font-extrabold">
          Angamuthu A
        </h2>

        <p className="text-green-400 text-xl mt-3">
          A³ Texture Finishes
        </p>

        <p className="text-slate-300 mt-3 text-lg">
          📞 +91 99948 86016
        </p>

        {/* ABOUT */}
        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">

          <div>

            <h3 className="text-2xl font-bold mb-3">
              About A³ Texture And Finishes
            </h3>

            <p className="text-slate-300 leading-relaxed">
              A³ Texture Finishes is a premium texture painting company
              specializing in luxury interior and exterior designs.

               We ensure customer satisfaction through skilled workmanship,
    creative designs, and reliable service.
            </p>

          </div>

        </div>

        {/* ACTIONS */}
        <div className="flex flex-col gap-5 mt-8">

          {!isAdmin && (

            <button
              onClick={() => navigate("/admin/login")}
              className="bg-green-500 hover:bg-green-600 transition px-6 py-4 rounded-2xl font-semibold shadow-lg"
            >
              🔐 Admin Login
            </button>

          )}

          {isAdmin && (

            <>

           




              {/* ADD PRODUCT */}
              <button
                onClick={goAddProduct}
                className="bg-green-500 hover:bg-green-600 transition px-6 py-4 rounded-2xl font-semibold"
              >
                ➕ Add Product
              </button>

              <button
  onClick={() =>
    navigate(
      "/admin/collections"
    )
  }
  className="bg-purple-500 hover:bg-purple-600 transition px-6 py-4 rounded-2xl font-semibold"
>
  📦 All Collections
</button>

             {/* CHANGE USERNAME and PASSWORD */}

            <button
                     onClick={() => navigate("/admin/settings")}
                            className="bg-blue-500 hover:bg-blue-600 transition px-6 py-4 rounded-2xl font-semibold"
                          >
                             ⚙️ Change Name & Password
                                 </button>

              {/* LOGOUT */}
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 transition px-6 py-4 rounded-2xl font-semibold"
              >
                🚪 Logout
              </button>

            </>

          )}

        </div>

      </div>

    </div>

  );
}

export default AdminDashboard;