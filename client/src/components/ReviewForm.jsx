import { useState } from "react";

export default function ReviewForm({
  addReview,
  selectedRating,
  onCancel
}) {
  const [form, setForm] = useState({
    reviewerName: "",
    rating: selectedRating || 0,
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

    if (!form.rating && !selectedRating) {
      return alert("Please select rating");
    }

    try {
      setLoading(true);

      const rating = form.rating || selectedRating;

      await addReview({
        reviewerName: form.reviewerName,
        rating,
        comment: form.comment
      });

      setForm({
        reviewerName: "",
        rating: 0,
        comment: ""
      });
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800/70 border border-slate-700 rounded-3xl p-6 md:p-8 shadow-2xl"
    >
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Rate Your Experience
        </h2>

        <p className="text-slate-400 mt-2">
          Share your feedback about A³ Texture Finishes
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-slate-300 mb-3 font-medium">
          Your Name
        </label>

        <input
          type="text"
          name="reviewerName"
          placeholder="Enter your name"
          value={form.reviewerName}
          onChange={handleChange}
          required
          className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-green-500 transition"
        />
      </div>

      <div className="mb-6">
        <label className="block text-slate-300 mb-4 font-medium">
          Rating
        </label>

        <div className="flex gap-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => selectRating(star)}
              className={`text-5xl hover:scale-125 transition ${
                star <= (form.rating || selectedRating)
                  ? "text-yellow-400"
                  : "text-slate-600"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-slate-300 mb-3 font-medium">
          Review
        </label>

        <textarea
          name="comment"
          placeholder="Tell us about your experience..."
          rows="5"
          value={form.comment}
          onChange={handleChange}
          required
          className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-green-500 transition resize-none"
        />
      </div>

      <div className="grid gap-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 active:scale-[0.99] transition py-4 rounded-2xl text-lg font-bold shadow-lg disabled:opacity-50"
        >
          {loading ? "Submitting..." : "🚀 Submit Review"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="w-full border-2 border-red-400 bg-red-500 hover:bg-red-600 active:scale-[0.99] transition py-4 rounded-2xl text-lg font-bold text-white shadow-lg shadow-red-500/20"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
