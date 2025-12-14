import { Link } from "react-router";
import { HiXCircle, HiArrowLeft, HiArrowPath } from "react-icons/hi2";

const PaymentFailed = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4">
      <div className="card bg-base-100 shadow-2xl max-w-2xl w-full">
        <div className="card-body text-center p-8">
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-error/20 p-6">
              <HiXCircle className="text-error text-7xl" />
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-4xl font-bold text-error mb-4">Payment Failed</h1>
          <p className="text-xl mb-2">Your payment could not be processed.</p>
          <p className="text-base-content/70 mb-8">
            Don't worry, your application has been saved and no charges were
            made.
          </p>

          {/* Info Box */}
          <div className="bg-warning/10 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-lg mb-3">What Happened?</h3>
            <ul className="space-y-2 text-base-content/80">
              <li>• Payment was cancelled or declined</li>
              <li>• Your application is saved with "Unpaid" status</li>
              <li>• You can complete payment later from "My Applications"</li>
              <li>• No charges were made to your account</li>
            </ul>
          </div>

          {/* Common Reasons */}
          <div className="bg-base-200 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-lg mb-3">
              Common Reasons for Failed Payments:
            </h3>
            <ul className="space-y-2 text-base-content/70 text-sm">
              <li>• Insufficient funds in your account</li>
              <li>• Incorrect card details</li>
              <li>• Card expired or blocked</li>
              <li>• Payment cancelled by user</li>
              <li>• Network connectivity issues</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard/applications" className="btn btn-primary">
              <HiArrowPath className="text-xl" />
              Go to My Applications
            </Link>
            <Link to="/all-scholarships" className="btn btn-outline">
              <HiArrowLeft className="text-xl" />
              Browse Scholarships
            </Link>
          </div>

          {/* Help Section */}
          <div className="mt-8 pt-6 border-t border-base-300">
            <p className="text-sm text-base-content/60">
              Need help? Contact our support team at{" "}
              <a
                href="mailto:support@scholarstream.com"
                className="link link-primary"
              >
                support@scholarstream.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
