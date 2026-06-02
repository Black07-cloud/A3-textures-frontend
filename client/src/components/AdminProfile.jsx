import { useNavigate } from "react-router-dom";

export default function AdminProfile() {

  const navigate = useNavigate();

  return (

    <div
      onClick={() => navigate("/admin")}
      className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 transition px-3 py-2 rounded-2xl cursor-pointer shadow-lg"
    >

      {/* PROFILE ICON */}
      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-lg font-bold shrink-0">
        👤
      </div>

      {/* TEXT */}
      <div className="hidden sm:block">

        

        <h3 className="font-semibold text-white">
          Admin
        </h3>

      </div>

    </div>

  );
}