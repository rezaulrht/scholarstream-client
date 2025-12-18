import { motion } from "framer-motion";
import { HiAcademicCap, HiCalendar, HiLocationMarker } from "react-icons/hi";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../../components/Loading/Loading";

const TopScholarships = () => {
  // Fetch top 6 scholarships from database
  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["top-scholarships"],
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:5000/scholarships?limit=6"
      );
      return response.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

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
              key={scholarship._id}
              variants={item}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-base-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-neutral/10"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-base-200">
                <img
                  src={scholarship.universityImage}
                  alt={scholarship.scholarshipName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-primary text-primary-content text-xs font-semibold rounded-full">
                    {scholarship.scholarshipCategory}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral mb-2 line-clamp-2">
                  {scholarship.scholarshipName}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-neutral/70">
                    <HiAcademicCap className="w-4 h-4 text-primary" />
                    <span>{scholarship.universityName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral/70">
                    <HiLocationMarker className="w-4 h-4 text-primary" />
                    <span>{scholarship.universityCountry}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral/70">
                    <HiCalendar className="w-4 h-4 text-primary" />
                    <span>
                      Deadline:{" "}
                      {new Date(
                        scholarship.applicationDeadline
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral/10">
                  <div>
                    <p className="text-xs text-neutral/60">Award Amount</p>
                    <p className="text-lg font-bold text-primary">
                      ${scholarship.applicationFees}
                    </p>
                  </div>
                  <Link
                    to={`/scholarships/${scholarship._id}`}
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
