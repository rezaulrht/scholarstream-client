import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { HiSearch } from "react-icons/hi";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/all-scholarships?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/all-scholarships");
    }
  };
  return (
    <section className="relative bg-neutral py-20 md:py-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=1920&h=1080&fit=crop&q=80"
          alt="Students celebrating graduation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-neutral/80"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Find Your Perfect <span className="text-primary">Scholarship</span>
          </motion.h1>

          {/* Typewriter Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 mb-8 min-h-[60px]"
          >
            <TypeAnimation
              sequence={[
                "Unlock opportunities for undergraduate studies worldwide",
                2000,
                "Discover graduate scholarships from top universities",
                2000,
                "Access fully-funded PhD programs globally",
                2000,
                "Find merit-based scholarships tailored for you",
                2000,
              ]}
              wrapper="p"
              speed={50}
              repeat={Infinity}
              className="font-medium"
            />
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <form
              onSubmit={handleSearch}
              className="relative max-w-2xl mx-auto"
            >
              <div className="flex items-center bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent focus-within:border-primary transition-all duration-300">
                <HiSearch className="w-6 h-6 text-neutral/50 ml-5 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search scholarships by country, degree, or major..."
                  className="w-full px-4 py-4 md:py-5 text-neutral outline-none"
                />
                <button
                  type="submit"
                  className="px-6 md:px-8 py-4 md:py-5 bg-primary text-primary-content font-semibold hover:bg-secondary transition-all duration-300 shrink-0"
                >
                  Search
                </button>
              </div>
            </form>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/all-scholarships"
              className="px-8 py-4 bg-primary text-primary-content font-semibold rounded-xl hover:bg-secondary hover:shadow-xl transition-all duration-300 shadow-lg inline-block min-w-[200px]"
            >
              Browse All Scholarships
            </Link>
            <Link
              to="/how-it-works"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 hover:shadow-xl transition-all duration-300 shadow-md inline-block min-w-[200px] border-2 border-white/30"
            >
              How It Works
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
