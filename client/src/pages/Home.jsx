import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import AdminProfile from "../components/AdminProfile";
import InstallModal from "../components/InstallModal";
import InstallGuide from "../components/InstallGuide";
import usePWAInstall from "../hooks/usePWAInstall";
import Footer from "../components/Footer";

function CategoryCard({ title, image, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-3xl cursor-pointer shadow-2xl hover:scale-[1.02] active:scale-[0.99] transition duration-300"
    >
      {/* IMAGE */}
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="w-full h-[220px] md:h-[320px] object-cover group-hover:scale-110 transition duration-700"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>

      {/* CONTENT */}
      <div className="absolute bottom-5 left-5">
        <h2 className="text-2xl md:text-4xl font-bold text-white">{title}</h2>
        <p className="text-slate-300 text-sm md:text-base mt-2">
          Explore premium texture finishes
        </p>
      </div>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

  const [showInstallModal, setShowInstallModal] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

 const { install, canInstall, isInstalled } = usePWAInstall();

  const handleInstall = async () => {
    if (canInstall) {
      await install();
      setShowInstallModal(false);
    } else {
      setShowInstallModal(false);
      setShowGuide(true);
    }
  };

  // FETCH REVIEWS
  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        const response = await api.get("/reviews");
        setReviews(response.data);
      } catch (err) {
        console.log(err);
        setError("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  // ADD REVIEW
  const addReview = async (newReview) => {
    try {
      const response = await api.post("/reviews", newReview);

      setReviews((prev) => [response.data, ...prev]);
      setShowReviewForm(false);
      setSelectedRating(0);

      return response.data;
    } catch (err) {
      console.error("Review submit failed:", err);
      throw err;
    }
  };
      
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          {/* LOGO */}
          <div>
            <h1 className="text-lg sm:text-2xl md:text-4xl font-extrabold tracking-wide leading-tight">
              A³ Texture Finishes
            </h1>

            <p className="hidden sm:block text-slate-400 text-sm md:text-base mt-1">
              Premium Interior & Exterior Designs
            </p>
          </div>

          {!isInstalled && (
  <button
    onClick={() => setShowInstallModal(true)}
    className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black px-6 py-3 rounded-xl font-bold transition-all"
  >
    📱 Install App
  </button>
)}
          {/* PROFILE */}
          <AdminProfile />
        </div>
      </header>

      {/* CATEGORY GRID */}
      <section className="px-4 md:px-8 pt-8 pb-20">
        <div className="mb-8">
          <h2 className="text-2xl md:text-4xl font-bold">Our Categories</h2>

          <p className="text-slate-400 mt-2 text-sm md:text-base">
            Discover beautiful texture collections
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* INTERIOR */}
          <CategoryCard
            title="Interior"
            image="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
            onClick={() => navigate("/interior")}
          />

          {/* EXTERIOR */}
          <CategoryCard
            title="Exterior"
            image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
            onClick={() => navigate("/products/Exterior")}
          />
        </div>
      </section>

      {/* REVIEWS */}
      <section className="px-4 md:px-8 pb-24">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl">
          {/* STAR RATING UI */}
          {!showReviewForm && (
            <div className="flex flex-col items-center justify-center py-10">
              <h3 className="text-2xl font-bold mb-4">
                Rate A³ Texture Finishes
              </h3>

              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => {
                      setSelectedRating(star);
                      setShowReviewForm(true);
                    }}
                    className={`text-5xl hover:scale-125 transition ${
                      star <= selectedRating
                        ? "text-yellow-400"
                        : "text-slate-500"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <p className="text-slate-400 mt-4">Tap stars to write a review</p>
            </div>
          )}

          {/* HEADER */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-4xl font-bold">
              Customer Reviews ⭐
            </h2>

            <p className="text-slate-400 mt-3 text-sm md:text-lg">
              Trusted feedback from our valuable customers
            </p>
          </div>

          {/* REVIEW FORM */}
          {showReviewForm && (
            <div className="mb-14">
              <ReviewForm
                addReview={addReview}
                selectedRating={selectedRating}
                onCancel={() => {
                  setShowReviewForm(false);
                  setSelectedRating(0);
                }}
              />
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 rounded-2xl px-5 py-4 mb-8">
              {error}
            </div>
          )}

          {/* LOADING */}
          {loading ? (
            <div className="text-center text-slate-400 text-lg">
              Loading reviews...
            </div>
          ) : (
            <ReviewList
              reviews={reviews}
              onDelete={(id) =>
                setReviews((prev) =>
                  prev.filter((review) => review._id !== id)
                )
              }
            />
          )}
        </div>
      </section>

      {/* PWA INSTALL MODAL */}
  <InstallModal
  open={showInstallModal}
  onClose={() => setShowInstallModal(false)}
  onInstall={handleInstall}
  onGuide={() => {
    setShowInstallModal(false);
    setShowGuide(true);
  }}
/>

      {/* PWA INSTALL GUIDE (manual fallback) */}
      <InstallGuide
  open={showGuide}
  onClose={() => setShowGuide(false)}
/>

<footer className="mt-16">
  <Footer />
</footer>

    </div>
  );
}

export default Home;
