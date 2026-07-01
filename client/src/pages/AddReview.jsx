import { useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import api from "../services/api";

export default function AddReview() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedRating = location.state?.rating || 0;

  const [form, setForm] = useState({
    reviewerName: "",
    rating: selectedRating,
    comment: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const selectRating = (star) => {
    setForm((prev) => ({
      ...prev,
      rating: star
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.rating) {
      return alert("Please select rating");
    }

    try {
      setLoading(true);

      await api.post("/reviews", {
        reviewerName: form.reviewerName,
        rating: form.rating,
        comment: form.comment
      });

      alert("Review submitted 😎🔥");
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-20 md:py-10">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="fixed left-4 top-4 z-50 rounded-2xl border border-red-400 bg-red-500 px-5 py-3 font-bold text-white shadow-lg shadow-red-500/30 transition hover:bg-red-600"
      >
        Cancel
      </button>

      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Add Review
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 rounded-[40px] p-6 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        >
          <div className="mb-10">
            <label className="block text-center text-white text-xl font-bold mb-6">
              Your Rating
            </label>

            <div className="flex justify-center items-center gap-2 sm:gap-4 overflow-x-auto">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => selectRating(star)}
                  className={`
                    w-14 h-14
                    sm:w-16 sm:h-16
                    md:w-20 md:h-20

                    flex items-center justify-center

                    text-5xl
                    sm:text-6xl
                    md:text-7xl

                    rounded-full

                    transition-all duration-300

                    hover:scale-125
                    active:scale-95

                    ${
                      star <= form.rating
                        ? "text-yellow-400 drop-shadow-[0_0_18px_rgba(250,204,21,0.7)]"
                        : "text-slate-200 hover:text-yellow-300"
                    }
                  `}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="mb-7">
            <label className="block text-slate-300 font-semibold mb-3">
              Your Name
            </label>

            <input
              type="text"
              name="reviewerName"
              placeholder="Enter your name"
              value={form.reviewerName}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition"
            />
          </div>

          <div className="mb-8">
            <label className="block text-slate-300 font-semibold mb-3">
              Your Review
            </label>

            <textarea
              name="comment"
              placeholder="Write your experience..."
              rows="6"
              value={form.comment}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition resize-none"
            />
          </div>

          <div className="grid gap-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 transition py-4 rounded-2xl text-lg font-bold text-white shadow-lg shadow-green-500/20 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full border-2 border-red-400 bg-red-500 hover:bg-red-600 transition py-4 rounded-2xl text-lg font-bold text-white shadow-lg shadow-red-500/20"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
