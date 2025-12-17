import { HiStar, HiUser } from "react-icons/hi";

const StudentReviews = ({ reviews, isLoading }) => {
  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.ratingPoint, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  // Render star rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <HiStar
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-yellow-500 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="mt-8 md:mt-12">
      <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral mb-2">
              Student Reviews
            </h2>
            {reviews.length > 0 && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {renderStars(Math.round(averageRating))}
                </div>
                <span className="text-lg font-semibold text-neutral">
                  {averageRating}
                </span>
                <span className="text-neutral/60">
                  ({reviews.length}{" "}
                  {reviews.length === 1 ? "review" : "reviews"})
                </span>
              </div>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <HiStar className="w-16 h-16 mx-auto text-neutral/20 mb-4" />
            <h3 className="text-xl font-semibold text-neutral/70 mb-2">
              No Reviews Yet
            </h3>
            <p className="text-neutral/60">
              Be the first to review this scholarship after applying!
            </p>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border border-neutral/10 rounded-lg md:rounded-xl p-4 md:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                  <div className="flex items-start gap-3 mb-3 md:mb-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <HiUser className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral text-base md:text-lg">
                        {review.userName}
                      </h4>
                      <div className="flex items-center gap-1 mt-1">
                        {renderStars(review.ratingPoint)}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs md:text-sm text-neutral/60">
                    {new Date(review.reviewDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-neutral/80 text-sm md:text-base leading-relaxed">
                  {review.reviewComment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentReviews;
