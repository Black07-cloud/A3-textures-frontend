import { useNavigate } from "react-router-dom";

function ExteriorCard({
  title,
  image,
  onClick
}) {

  return (

    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-3xl cursor-pointer shadow-2xl hover:scale-[1.02] transition duration-300"
    >

      {/* IMAGE */}
      <img
        src={image}
        alt={title}
        className="w-full h-[260px] md:h-[320px] object-cover group-hover:scale-110 transition duration-700"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>

      {/* CONTENT */}
      <div className="absolute bottom-5 left-5">

        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          {title}
        </h2>

        <p className="text-slate-300 mt-2">
          Premium exterior texture finishes
        </p>

      </div>

    </div>

  );

}

function Exterior() {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-slate-950 text-white px-4 md:px-8 py-10">

      {/* HEADER */}
      <div className="mb-12">

        <h1 className="text-4xl md:text-6xl font-extrabold">
          Exterior Collections 🏢
        </h1>

        <p className="text-slate-400 mt-4 text-lg">
          Explore premium exterior texture finishes
        </p>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* EXTERIOR */}
        <ExteriorCard
          title="Exterior Designs"
          image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
          onClick={() =>
            navigate("/products/Exterior")
          }
        />

      </div>

    </div>

  );

}

export default Exterior;