import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { HiCheckCircle, HiArrowRight } from "react-icons/hi2";
import Confetti from "react-confetti";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const updatePaymentStatus = async () => {
      if (!sessionId) {
        setError("No session ID found");
        setLoading(false);
        return;
      }

      try {
        axiosSecure
          .patch(`/payment-success?session_id=${sessionId}`)
          .then((response) => {
            console.log("Payment verified:", response.data);
          });
        setLoading(false);
      } catch (err) {
        console.error("Error verifying payment:", err);
        setError("Failed to verify payment");
        setLoading(false);
      }
    };

    updatePaymentStatus();
  }, [sessionId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card bg-base-100 shadow-xl max-w-md">
          <div className="card-body text-center">
            <h2 className="card-title text-error justify-center">Error</h2>
            <p>{error}</p>
            <div className="card-actions justify-center mt-4">
              <Link to="/dashboard" className="btn btn-primary">
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={500}
        gravity={0.3}
      />
      <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4">
        <div className="card bg-base-100 shadow-2xl max-w-2xl w-full">
          <div className="card-body text-center p-8">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-success/20 p-6">
                <HiCheckCircle className="text-success text-7xl" />
              </div>
            </div>

            {/* Success Message */}
            <h1 className="text-4xl font-bold text-success mb-4">
              Payment Successful!
            </h1>
            <p className="text-xl mb-2">
              Your scholarship application payment has been processed
              successfully.
            </p>

            {/* Info Box */}
            <div className="bg-primary/10 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-lg mb-3">What's Next?</h3>
              <ul className="space-y-2 text-base-content/80">
                <li className="flex items-start gap-2">
                  <HiCheckCircle className="text-success mt-1 shrink-0" />
                  <span>
                    Your application is now being reviewed by the scholarship
                    committee
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <HiCheckCircle className="text-success mt-1 flex-shrink-0" />
                  <span>You will receive an email confirmation shortly</span>
                </li>
                <li className="flex items-start gap-2">
                  <HiCheckCircle className="text-success mt-1 flex-shrink-0" />
                  <span>Check your application status in the dashboard</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard/applications" className="btn btn-primary">
                View My Applications
                <HiArrowRight className="text-xl" />
              </Link>
              <Link to="/all-scholarships" className="btn btn-outline">
                Browse More Scholarships
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
