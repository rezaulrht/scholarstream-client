import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineStar,
} from "react-icons/hi2";
import { HiOutlineBookOpen } from "react-icons/hi";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editingReview, setEditingReview] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: "" });

  // Fetch user's reviews using TanStack Query
  const {
    data: reviews = [],
    isLoading: loading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["my-reviews", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/reviews/user/${user.email}`);
      return response.data;
    },
    enabled: !!user?.email,
  });

  // Show error if query fails
  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to load reviews",
    });
  }

  const handleEditClick = (review) => {
    setEditingReview(review);
    setReviewData({
      rating: review.ratingPoint,
      comment: review.reviewComment,
    });
    setShowEditModal(true);
  };

  const handleUpdateReview = async () => {
    if (!reviewData.comment.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Comment",
        text: "Please write a review comment",
      });
      return;
    }

    try {
      await axiosSecure.patch(`/reviews/${editingReview._id}`, {
        ratingPoint: reviewData.rating,
        reviewComment: reviewData.comment,
      });

      Swal.fire({
        icon: "success",
        title: "Review Updated",
        text: "Your review has been updated successfully",
      });

      setShowEditModal(false);
      setEditingReview(null);
      setReviewData({ rating: 5, comment: "" });
      refetch();
    } catch (error) {
      console.error("Error updating review:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update review",
      });
    }
  };

  const handleDeleteReview = async (reviewId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/reviews/${reviewId}`);
        Swal.fire("Deleted!", "Your review has been deleted.", "success");
        refetch();
      } catch (error) {
        console.error("Error deleting review:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete review",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="mb-6">
          <HiOutlineBookOpen className="text-8xl text-primary/50 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No Reviews Yet</h2>
        <p className="text-base-content/70 mb-6">
          You haven't written any reviews yet. Apply for scholarships and share
          your experience!
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral">My Reviews</h1>
        <p className="text-neutral/60 mt-2">
          Manage all the reviews you've written
        </p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto bg-base-300 rounded-lg shadow-md border border-neutral/10">
        <table className="table">
          <thead className="bg-primary/20">
            <tr>
              <th className="text-neutral font-semibold">Scholarship Name</th>
              <th className="text-neutral font-semibold">University Name</th>
              <th className="text-neutral font-semibold">Review Comment</th>
              <th className="text-neutral font-semibold">Review Date</th>
              <th className="text-neutral font-semibold">Rating</th>
              <th className="text-neutral font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr
                key={review._id}
                className="hover:bg-primary/5 transition-colors"
              >
                <td className="font-semibold text-neutral">
                  {review.scholarshipName}
                </td>
                <td className="text-sm text-neutral/70">
                  {review.universityName}
                </td>
                <td className="max-w-md">
                  <p className="text-sm text-neutral/80 line-clamp-2">
                    {review.reviewComment}
                  </p>
                </td>
                <td className="text-sm text-neutral/70">
                  {new Date(review.reviewDate).toLocaleDateString()}
                </td>
                <td>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <HiOutlineStar
                        key={star}
                        className={`text-lg ${
                          star <= review.ratingPoint
                            ? "fill-warning text-warning"
                            : "text-base-content/30"
                        }`}
                      />
                    ))}
                  </div>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(review)}
                      className="btn btn-ghost btn-sm hover:bg-accent/20 hover:text-accent"
                      title="Edit Review"
                    >
                      <HiOutlinePencil className="text-lg" />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                      title="Delete Review"
                    >
                      <HiOutlineTrash className="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="card bg-base-300 shadow-md border border-neutral/10"
          >
            <div className="card-body">
              <h3 className="card-title text-lg text-neutral">
                {review.scholarshipName}
              </h3>
              <div className="space-y-2 text-sm text-neutral/80">
                <p>
                  <span className="font-semibold text-neutral">
                    University:
                  </span>{" "}
                  {review.universityName}
                </p>
                <p>
                  <span className="font-semibold text-neutral">Comment:</span>{" "}
                  <span className="text-neutral/70">
                    {review.reviewComment}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-neutral">Date:</span>{" "}
                  {new Date(review.reviewDate).toLocaleDateString()}
                </p>
                <div className="flex gap-2 items-center">
                  <span className="font-semibold text-neutral">Rating:</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <HiOutlineStar
                        key={star}
                        className={`text-base ${
                          star <= review.ratingPoint
                            ? "fill-warning text-warning"
                            : "text-base-content/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="card-actions justify-end mt-4">
                <button
                  onClick={() => handleEditClick(review)}
                  className="btn btn-sm btn-ghost hover:bg-accent/20"
                >
                  <HiOutlinePencil /> Edit
                </button>
                <button
                  onClick={() => handleDeleteReview(review._id)}
                  className="btn btn-sm btn-error"
                >
                  <HiOutlineTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Review Modal */}
      {showEditModal && editingReview && (
        <div className="modal modal-open">
          <div className="modal-box bg-base-300 border border-neutral/10">
            <h3 className="font-bold text-2xl mb-4 text-neutral">
              Edit Review
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-neutral/60 mb-2">Scholarship</p>
                <p className="font-semibold text-neutral">
                  {editingReview.scholarshipName}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral/60 mb-2">University</p>
                <p className="font-semibold text-neutral">
                  {editingReview.universityName}
                </p>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Rating</span>
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() =>
                        setReviewData({ ...reviewData, rating: star })
                      }
                      className="btn btn-ghost btn-sm"
                    >
                      <HiOutlineStar
                        className={`text-2xl ${
                          star <= reviewData.rating
                            ? "fill-warning text-warning"
                            : "text-base-content/30"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Your Review</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-32"
                  placeholder="Share your experience with this scholarship..."
                  value={reviewData.comment}
                  onChange={(e) =>
                    setReviewData({ ...reviewData, comment: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
            <div className="modal-action">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingReview(null);
                  setReviewData({ rating: 5, comment: "" });
                }}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button onClick={handleUpdateReview} className="btn btn-primary">
                Update Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
