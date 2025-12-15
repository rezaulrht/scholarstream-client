import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { HiOutlineTrash, HiOutlineStar } from "react-icons/hi2";
import { HiOutlineBookOpen } from "react-icons/hi";

const AllReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch all reviews using TanStack Query
  const {
    data: reviews = [],
    isLoading: loading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const response = await axiosSecure.get("/reviews");
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

  const handleDeleteReview = async (reviewId, scholarshipName) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete review for "${scholarshipName}"? This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/reviews/${reviewId}`);
        Swal.fire("Deleted!", "The review has been deleted.", "success");
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
          No reviews have been posted by students yet.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral">All Reviews</h1>
        <p className="text-neutral/60 mt-2">
          Moderate and manage all student reviews
        </p>
        <div className="mt-4">
          <span className="badge badge-primary badge-lg">
            Total Reviews: {reviews.length}
          </span>
        </div>
      </div>

      {/* Cards Grid for Desktop and Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="card bg-base-300 shadow-lg border border-neutral/10 hover:shadow-xl transition-shadow"
          >
            <div className="card-body p-4 md:p-6">
              {/* User Info */}
              <div className="flex items-center gap-3 mb-3">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={review.userImage || "/default-avatar.png"}
                      alt={review.userName}
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-neutral truncate">
                    {review.userName}
                  </p>
                  <p className="text-xs text-neutral/60 truncate">
                    {review.userEmail}
                  </p>
                </div>
              </div>

              {/* Scholarship Info */}
              <div className="space-y-2 mb-3">
                <div>
                  <p className="text-xs text-neutral/60">Scholarship</p>
                  <p className="font-semibold text-neutral text-sm">
                    {review.scholarshipName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral/60">University</p>
                  <p className="text-sm text-neutral/80">
                    {review.universityName}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-3">
                <p className="text-xs text-neutral/60 mb-1">Rating</p>
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
              </div>

              {/* Review Comment */}
              <div className="mb-3">
                <p className="text-xs text-neutral/60 mb-1">Review</p>
                <p className="text-sm text-neutral/80 line-clamp-3">
                  {review.reviewComment}
                </p>
              </div>

              {/* Review Date */}
              <div className="mb-4">
                <p className="text-xs text-neutral/60">
                  Posted on {new Date(review.reviewDate).toLocaleDateString()}
                </p>
              </div>

              {/* Actions */}
              <div className="card-actions justify-end pt-3 border-t border-neutral/10">
                <button
                  onClick={() =>
                    handleDeleteReview(review._id, review.scholarshipName)
                  }
                  className="btn btn-error btn-sm"
                  title="Delete Review"
                >
                  <HiOutlineTrash className="text-base" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
