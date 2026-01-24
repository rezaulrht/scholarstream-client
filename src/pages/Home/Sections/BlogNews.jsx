import { motion } from "framer-motion";
import { HiCalendar, HiArrowRight, HiClock, HiUser } from "react-icons/hi";
import { Link } from "react-router";

const BlogNews = () => {
  const newsItems = [
    {
      id: 1,
      title: "Top 10 Scholarship Application Tips for 2026",
      excerpt:
        "Discover the most effective strategies to make your scholarship application stand out from the competition and increase your chances of success.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop",
      category: "Application Tips",
      date: "January 20, 2026",
      readTime: "5 min read",
      author: "Sarah Johnson",
    },
    {
      id: 2,
      title: "New Full-Ride Scholarships Announced for International Students",
      excerpt:
        "Universities across the US and Europe have announced exciting new full-ride scholarship opportunities for international students this year.",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop",
      category: "News",
      date: "January 18, 2026",
      readTime: "4 min read",
      author: "Michael Chen",
    },
    {
      id: 3,
      title: "How to Write a Winning Scholarship Essay",
      excerpt:
        "Learn from experts about crafting compelling scholarship essays that capture attention and showcase your unique story and achievements.",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop",
      category: "Guide",
      date: "January 15, 2026",
      readTime: "7 min read",
      author: "Emily Rodriguez",
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Latest Updates
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral mb-4">
            News & Resources
          </h2>
          <p className="text-base md:text-lg text-neutral/70 max-w-2xl mx-auto">
            Stay updated with the latest scholarship news, application tips, and
            success stories from our community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-primary-content text-xs font-semibold rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-7">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs md:text-sm text-neutral/60 mb-3">
                  <div className="flex items-center gap-1.5">
                    <HiCalendar className="w-4 h-4" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <HiClock className="w-4 h-4" />
                    <span>{item.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-neutral mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm md:text-base text-neutral/70 mb-4 line-clamp-3">
                  {item.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <HiUser className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-neutral">
                      {item.author}
                    </span>
                  </div>
                  <button className="text-primary font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all group/btn">
                    Read More
                    <HiArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10 md:mt-12"
        >
          <button className="px-8 py-3.5 bg-white border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-primary-content transition-all duration-300 inline-flex items-center gap-2 group">
            View All Articles
            <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogNews;
