import { useState } from "react";

export default function ReviewForm({
  addReview,
  selectedRating
}) {

  const [form, setForm] =
    useState({

      reviewerName: "",

      rating:
        selectedRating || 0,

      comment: ""

    });

  const [loading, setLoading] =
    useState(false);

  // HANDLE INPUT
  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value

    });

  };

  // SELECT STAR
  const selectRating = (
    star
  ) => {

    setForm({

      ...form,

      rating: star

    });

  };

  // SUBMIT
  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    if (
      !form.rating &&
      !selectedRating
    ) {

      return alert(
        "Please select rating"
      );

    }

    try {

      setLoading(true);

      await addReview({

        ...form,

        rating:
          form.rating ||
          selectedRating

      });

      // RESET
      setForm({

        reviewerName: "",

        rating: 0,

        comment: ""

      });

    } finally {

      setLoading(false);

    }

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-slate-800/70 border border-slate-700 rounded-3xl p-6 md:p-8 shadow-2xl"
    >

      {/* HEADER */}
      <div className="mb-8">

        <h2 className="text-2xl md:text-3xl font-bold text-white">

          Rate Your Experience

        </h2>

        <p className="text-slate-400 mt-2">

          Share your feedback about A³ Texture Finishes

        </p>

      </div>

      {/* NAME */}
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

      {/* RATING */}
      <div className="mb-6">

        <label className="block text-slate-300 mb-4 font-medium">

          Rating

        </label>

        <div className="flex gap-3">

          {[1,2,3,4,5].map((star) => (

            <button
              key={star}
              type="button"
              onClick={() =>
                selectRating(star)
              }
              className={`text-5xl hover:scale-125 transition ${
                star <= (
                  form.rating ||
                  selectedRating
                )
                  ? "text-yellow-400"
                  : "text-slate-600"
              }`}
            >
              ★
            </button>

          ))}

        </div>

      </div>

      {/* COMMENT */}
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

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 active:scale-[0.99] transition py-4 rounded-2xl text-lg font-bold shadow-lg disabled:opacity-50"
      >

        {loading
          ? "Submitting..."
          : "🚀 Submit Review"}

      </button>

    </form>

  );

}