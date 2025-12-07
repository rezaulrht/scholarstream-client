import { motion } from "framer-motion";
import { HiAcademicCap, HiCalendar, HiLocationMarker } from "react-icons/hi";
import { Link } from "react-router";

const TopScholarships = () => {
  // Mock scholarship data - replace with actual data from API
  const scholarships = [
    {
      id: 1,
      title: "Harvard University Global Scholarship",
      university: "Harvard University",
      location: "USA",
      amount: "$50,000",
      deadline: "2025-03-15",
      type: "Full Scholarship",
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Oxford Rhodes Scholarship",
      university: "University of Oxford",
      location: "UK",
      amount: "Full Funding",
      deadline: "2025-04-20",
      type: "Full Scholarship",
      image:
        "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "ETH Zurich Excellence Scholarship",
      university: "ETH Zurich",
      location: "Switzerland",
      amount: "$45,000",
      deadline: "2025-05-10",
      type: "Merit-Based",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      title: "University of Tokyo MEXT Scholarship",
      university: "University of Tokyo",
      location: "Japan",
      amount: "$40,000",
      deadline: "2025-06-01",
      type: "Full Scholarship",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      title: "Australian National University Scholarship",
      university: "ANU",
      location: "Australia",
      amount: "$35,000",
      deadline: "2025-04-30",
      type: "Merit-Based",
      image:
        "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop",
    },
    {
      id: 6,
      title: "MIT Presidential Fellowship",
      university: "MIT",
      location: "USA",
      amount: "Full Funding",
      deadline: "2025-03-25",
      type: "Full Scholarship",
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
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
            Top <span className="text-primary">Scholarships</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-neutral/70 max-w-2xl mx-auto"
          >
            Discover the most sought-after scholarship opportunities from
            prestigious universities worldwide
          </motion.p>
        </div>

        {/* Scholarship Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {scholarships.map((scholarship) => (
            <motion.div
              key={scholarship.id}
              variants={item}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-base-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-neutral/10"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-base-200">
                <img
                  src={scholarship.image}
                  alt={scholarship.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-primary text-primary-content text-xs font-semibold rounded-full">
                    {scholarship.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral mb-2 line-clamp-2">
                  {scholarship.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-neutral/70">
                    <HiAcademicCap className="w-4 h-4 text-primary" />
                    <span>{scholarship.university}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral/70">
                    <HiLocationMarker className="w-4 h-4 text-primary" />
                    <span>{scholarship.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral/70">
                    <HiCalendar className="w-4 h-4 text-primary" />
                    <span>
                      Deadline:{" "}
                      {new Date(scholarship.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral/10">
                  <div>
                    <p className="text-xs text-neutral/60">Award Amount</p>
                    <p className="text-lg font-bold text-primary">
                      {scholarship.amount}
                    </p>
                  </div>
                  <Link
                    to={`/scholarship/${scholarship.id}`}
                    className="px-4 py-2 bg-primary text-primary-content font-medium rounded-lg hover:bg-secondary transition-colors duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            to="/all-scholarships"
            className="inline-block px-8 py-4 bg-neutral text-white font-semibold rounded-xl hover:bg-primary hover:shadow-lg transition-all duration-300"
          >
            View All Scholarships
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TopScholarships;
