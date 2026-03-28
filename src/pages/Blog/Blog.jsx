import { motion } from "framer-motion";
import { Link } from "react-router";
import { HiCalendar, HiArrowRight, HiClock, HiUser } from "react-icons/hi";
import { blogPosts } from "../../data/blogData";

const Blog = () => {
  return (
    <div className="min-h-screen bg-base-100 py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Latest Updates
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-4">
            News & Resources
          </h1>
          <p className="text-base md:text-lg text-base-content/70 max-w-2xl mx-auto">
            Stay updated with the latest scholarship news, application tips, and
            success stories from our community
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-base-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-base-content/10"
            >
              {/* Image */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-primary-content text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-7">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs md:text-sm text-base-content/60 mb-3">
                  <div className="flex items-center gap-1.5">
                    <HiCalendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <HiClock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-lg md:text-xl font-bold text-base-content mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm md:text-base text-base-content/70 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-base-content/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <HiUser className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-base-content">
                      {post.author}
                    </span>
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-primary font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all group/btn"
                  >
                    Read More
                    <HiArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
