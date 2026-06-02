import { useNavigate } from "react-router-dom";

function InteriorCard({ title, image, desc, category }) {

  const navigate = useNavigate();

  return (

    <div
      onClick={() =>
        navigate(`/products/${category}`)
      }
      className="bg-slate-800 hover:bg-slate-700 transition rounded-3xl overflow-hidden shadow-xl cursor-pointer hover:scale-[1.02]"
    >

      <img
        src={image}
        alt={title}
        className="w-full h-56 object-cover"
      />

      <div className="p-6">

        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        <p className="text-slate-400 mt-3 leading-relaxed">
          {desc}
        </p>

      </div>

    </div>

  );

}

export default function Interior() {

  return (

    <div className="min-h-screen bg-slate-950 text-white px-4 md:px-8 py-10">

      {/* HEADER */}
      <div className="mb-12">

        <h1 className="text-4xl md:text-6xl font-extrabold">
          Interior Collections 🎨
        </h1>

        <p className="text-slate-400 mt-4 text-lg">
          Explore premium texture finishes for elegant interiors
        </p>

      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* ROYAL PLAY */}
        <InteriorCard
          title="Royal Play Works"
          category="Royal Play"
          image="https://yespainter.com/wp-content/uploads/2021/05/Asian-Paints-Royale-Play-Spatula-Texture-Best-House-Painting-service-in-bangaloreRoyale-Play-Spatula-1140x640-1.jpg"
          desc="Luxury decorative wall finishes with premium texture effects."
        />

        {/* WOOD GRAINS */}
        <InteriorCard
          title="Wood Grain Works"
          category="Wood Grains"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIGIeRKPLb6zDCNawUu9o3UR9jJAqFbxNkDg&s"
          desc="Natural wood-inspired textures for stylish modern interiors."
        />

        {/* SILK PLAST */}
        <InteriorCard
          title="Silk Plast Wallpaper"
          category="Silk Plast Wallpaper"
          image="https://5.imimg.com/data5/SELLER/Default/2024/1/380654695/UQ/JA/RL/122464298/silk-plaster-liquid-wallpaper.jpg"
          desc="Elegant smooth wallpaper textures with luxury finish quality."
        />

      </div>

    </div>

  );

}