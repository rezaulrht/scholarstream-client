import { motion } from "framer-motion";
import {
  HiCheckCircle,
  HiClock,
  HiShieldCheck,
  HiSparkles,
} from "react-icons/hi";

const WhyChooseUs = () => {
  const features = [
    {
      icon: HiSparkles,
      title: "Curated Opportunities",
      description:
        "Handpicked scholarships from verified sources, ensuring quality and authenticity for your academic journey.",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: HiShieldCheck,
      title: "Verified & Trusted",
      description:
        "Every scholarship is thoroughly vetted and verified by our expert team to protect you from scams.",
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
    {
      icon: HiClock,
      title: "Real-Time Updates",
      description:
        "Stay informed with instant notifications about deadlines, new opportunities, and application status.",
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      icon: HiCheckCircle,
      title: "Application Support",
      description:
        "Get expert guidance throughout your application process with tips, templates, and personalized assistance.",
      color: "text-info",
      bg: "bg-info/10",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <section className="py-16 md:py-24 bg-base-200">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-neutral mb-4"
          >
            Why Choose <span className="text-primary">ScholarStream</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-neutral/70 max-w-2xl mx-auto"
          >
            We're committed to making scholarship discovery simple, trustworthy,
            and accessible for everyone
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`shrink-0 w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center`}
                  >
                    <Icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-neutral/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-lg max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: "98%", label: "Student Satisfaction" },
              { value: "$50M+", label: "Awarded Annually" },
              { value: "24/7", label: "Support Available" },
              { value: "100%", label: "Free to Use" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-neutral/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
