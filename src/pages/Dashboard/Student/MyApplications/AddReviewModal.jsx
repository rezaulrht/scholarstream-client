import { HiOutlineStar } from "react-icons/hi2";

const AddReviewModal = ({
  selectedApplication,
  showReviewModal,
  setShowReviewModal,
  reviewData,
  setReviewData,
  handleAddReview,
}) => {
  if (!showReviewModal || !selectedApplication) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-base-300 border border-neutral/10">
        <h3 className="font-bold text-2xl mb-4 text-neutral">Add Review</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-neutral/60 mb-2">University</p>
            <p className="font-semibold text-neutral">
              {selectedApplication.universityName}
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
                  onClick={() => setReviewData({ ...reviewData, rating: star })}
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
              setShowReviewModal(false);
              setReviewData({ rating: 5, comment: "" });
            }}
            className="btn btn-ghost"
          >
            Cancel
          </button>
          <button onClick={handleAddReview} className="btn btn-primary">
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;
