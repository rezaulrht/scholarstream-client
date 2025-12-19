import { motion } from "framer-motion";
import {
  HiAcademicCap,
  HiGlobe,
  HiLightBulb,
  HiTrendingUp,
  HiUserGroup,
  HiBeaker,
} from "react-icons/hi";
import { Link } from "react-router";

const ScholarshipCategories = () => {
  const categories = [
    {
      id: 1,
      name: "Full fund",
      description: "100% tuition coverage with living expenses and stipends",
      icon: HiAcademicCap,
      gradient: "from-primary/10 to-primary/5",
    },
    {
      id: 2,
      name: "Partial",
      description: "Partial tuition coverage or financial assistance",
      icon: HiTrendingUp,
      gradient: "from-secondary/10 to-secondary/5",
    },
    {
      id: 3,
      name: "Self-fund",
      description: "Self-funded programs with admission support",
      icon: HiBeaker,
      gradient: "from-accent/10 to-accent/5",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 },
  };

  return (
    <section className="py-16 md:py-24 bg-white">
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
            Browse by <span className="text-primary">Category</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-neutral/70 max-w-2xl mx-auto"
          >
            Find the perfect scholarship that matches your academic goals and
            aspirations
          </motion.p>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                variants={item}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Link
                  to={`/all-scholarships?category=${encodeURIComponent(
                    category.name
                  )}`}
                  className="block bg-base-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-neutral/10 group h-full"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-neutral mb-2 group-hover:text-primary transition-colors duration-300">
                        {category.name}
                      </h3>
                      <p className="text-sm text-neutral/70 mb-3">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-end">
                        <span className="text-primary group-hover:translate-x-2 transition-transform duration-300">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ScholarshipCategories;
