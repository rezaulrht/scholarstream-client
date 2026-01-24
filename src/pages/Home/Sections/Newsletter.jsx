import { motion } from "framer-motion";
import { HiMail, HiCheckCircle } from "react-icons/hi";
import { useState } from "react";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Simulate subscription (in real app, this would call an API)
    toast.success("Successfully subscribed to newsletter!");
    setIsSubscribed(true);
    setEmail("");

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000);
  };

  const benefits = [
    "Weekly scholarship opportunities delivered to your inbox",
    "Exclusive tips and guides for successful applications",
    "Early access to new scholarship listings",
    "Success stories and student testimonials",
  ];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-primary/90 via-secondary/90 to-accent/90 dark:from-primary/70 dark:via-secondary/70 dark:to-accent/70 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-base-100/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-base-100/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-base-100/20 backdrop-blur-sm rounded-2xl mb-6">
              <HiMail className="w-8 h-8 md:w-10 md:h-10 text-base-100" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-100 mb-4">
              Never Miss an Opportunity
            </h2>
            <p className="text-base md:text-lg text-base-100/90 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest scholarship
              opportunities, application tips, and success stories delivered
              straight to your inbox.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-base-100 rounded-2xl shadow-2xl p-6 md:p-10"
          >
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <div className="flex-1 relative">
                  <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/50" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-3 md:py-4 border-2 border-base-content/20 bg-base-100 text-base-content rounded-xl focus:border-primary focus:outline-none transition-colors text-sm md:text-base"
                    disabled={isSubscribed}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubscribed}
                  className={`px-6 md:px-8 py-3 md:py-4 font-semibold rounded-xl transition-all duration-300 text-sm md:text-base ${
                    isSubscribed
                      ? "bg-success text-success-content cursor-not-allowed"
                      : "bg-primary text-primary-content hover:bg-secondary hover:scale-105"
                  }`}
                >
                  {isSubscribed ? (
                    <span className="flex items-center gap-2">
                      <HiCheckCircle className="w-5 h-5" />
                      Subscribed
                    </span>
                  ) : (
                    "Subscribe Now"
                  )}
                </button>
              </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <HiCheckCircle className="w-5 h-5 md:w-6 md:h-6 text-success shrink-0 mt-0.5" />
                  <p className="text-sm md:text-base text-base-content/80">
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </div>

            <p className="text-xs md:text-sm text-base-content/60 text-center mt-6">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
