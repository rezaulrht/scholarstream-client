import {
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClock,
} from "react-icons/hi";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

const ApplicationStatusModal = ({
  application,
  onClose,
  onUpdateStatus,
  onSwitchToFeedback,
}) => {
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg md:text-xl text-neutral mb-4">
          Update Application Status
        </h3>
        <p className="text-sm text-neutral/70 mb-6">
          Change status for{" "}
          <span className="font-semibold">{application.userName}</span>'s
          application
        </p>
        <div className="space-y-3">
          {application.applicationStatus === "pending" && (
            <button
              onClick={() => {
                onUpdateStatus(application._id, "processing");
                onClose();
              }}
              className="btn btn-block bg-info/10 text-info hover:bg-info hover:text-info-content border-info/30"
            >
              <HiOutlineCheckCircle className="w-5 h-5" />
              Mark as Processing
            </button>
          )}
          {application.applicationStatus === "processing" && (
            <>
              <button
                onClick={() => onSwitchToFeedback("accept")}
                className="btn btn-block bg-success/10 text-success hover:bg-success hover:text-success-content border-success/30"
              >
                <HiOutlineCheckCircle className="w-5 h-5" />
                Accept Application
              </button>
              <button
                onClick={() => onSwitchToFeedback("reject")}
                className="btn btn-block bg-error/10 text-error hover:bg-error hover:text-error-content border-error/30"
              >
                <HiOutlineXCircle className="w-5 h-5" />
                Reject Application
              </button>
              <button
                onClick={() => onSwitchToFeedback("revision")}
                className="btn btn-block bg-orange-500/10 text-orange-600 hover:bg-orange-500 hover:text-white border-orange-500/30"
              >
                <HiOutlineExclamationTriangle className="w-5 h-5" />
                Request Revision
              </button>
              <button
                onClick={() => {
                  onUpdateStatus(application._id, "pending");
                  onClose();
                }}
                className="btn btn-block bg-base-300 text-neutral hover:bg-base-200 border-neutral/30"
              >
                <HiOutlineClock className="w-5 h-5" />
                Send Back to Pending
              </button>
            </>
          )}
        </div>
        <div className="modal-action">
          <button onClick={onClose} className="btn btn-ghost">
            Cancel
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default ApplicationStatusModal;
