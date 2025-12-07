import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router";

const FinalCTA = () => {
  return (
    <section className="py-16 md:py-24 bg-base-100 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-neutral mb-6 leading-tight">
              Your Academic Journey{" "}
              <span className="text-primary">Starts Here</span>
            </h2>
            <p className="text-lg md:text-xl text-neutral/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Don't let finances hold you back from achieving your dreams.
              Explore thousands of scholarships and find the perfect opportunity
              for your future.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/all-scholarships"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-content font-bold rounded-xl hover:bg-secondary hover:shadow-2xl transition-all duration-300 shadow-lg text-lg"
            >
              Explore All Scholarships
              <HiArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-neutral font-bold rounded-xl hover:bg-base-200 hover:shadow-xl transition-all duration-300 shadow-md text-lg border-2 border-neutral/10"
            >
              Create Free Account
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center items-center gap-6 md:gap-8"
          >
            {[
              "100% Free",
              "Verified Scholarships",
              "Daily Updates",
              "Expert Support",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
              >
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm font-medium text-neutral">
                  {feature}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Additional Message */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 text-neutral/60 italic"
          >
            Join thousands of students who have already found their dream
            scholarships
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
