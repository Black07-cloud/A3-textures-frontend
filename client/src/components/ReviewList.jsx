import { useEffect, useState } from "react";

import api from "../services/api";

export default function ReviewList({
  reviews,
  onDelete
}) {

  const [isAdmin, setIsAdmin] =
    useState(false);

  // CHECK ADMIN
  useEffect(() => {

    async function checkAdmin() {

      try {

        await api.get(
          "/auth/verify"
        );

        setIsAdmin(true);

      } catch {

        setIsAdmin(false);

      }

    }

    checkAdmin();

  }, []);

  // DELETE REVIEW
  const deleteReview = async (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Delete this review?"
      );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/reviews/${id}`
      );

      if (onDelete) {
        onDelete(id);
      }

    } catch (err) {

      console.log(err);

      alert(
        "Failed to delete review"
      );

    }

  };

  // EMPTY
  if (!reviews.length) {

    return (

      <p className="text-slate-400">
        No reviews yet.
      </p>

    );

  }

  return (

    <div className="grid gap-6">

      {reviews.map((review) => (

        <div
          key={
            review._id ||
            review.id
          }
          className="bg-slate-800 border border-slate-700 rounded-3xl p-6 hover:border-green-500 transition"
        >

          {/* TOP */}
          <div className="flex justify-between items-start gap-4 flex-wrap">

            {/* LEFT */}
            <div>

              <h3 className="font-bold text-lg">
                {review.reviewerName}
              </h3>

              <p className="text-slate-400 text-sm mt-1">

                {new Date(
                  review.createdAt
                ).toLocaleDateString()}

              </p>

            </div>

            {/* RIGHT */}
            <div className="flex flex-col items-end gap-3">

              {/* RATING */}
              <div className="text-yellow-400 text-2xl">

                {"★".repeat(
                  review.rating
                )}

              </div>

              {/* DELETE BUTTON */}
              {isAdmin && (

                <button
                  onClick={() =>
                    deleteReview(
                      review._id
                    )
                  }
                  className="bg-red-500 hover:bg-red-600 active:scale-95 transition px-4 py-2 rounded-xl text-sm font-semibold"
                >
                  🗑 Delete
                </button>

              )}

            </div>

          </div>

          {/* COMMENT */}
          <p className="text-slate-300 leading-relaxed mt-5">

            {review.comment}

          </p>

        </div>

      ))}

    </div>

  );

}