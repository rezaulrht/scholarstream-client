import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { HiCalendar, HiClock, HiUser, HiArrowLeft } from "react-icons/hi";
import { blogPosts } from "../../data/blogData";
import Error404 from "../../components/Error/Error404";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Error404 />;

  return (
    <div className="min-h-screen bg-base-100 py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            <HiArrowLeft className="w-5 h-5" />
            Back to Articles
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 bg-primary text-primary-content text-xs font-semibold rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-base-content mb-4">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-base-content/60 mb-6">
            <div className="flex items-center gap-1.5">
              <HiUser className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HiCalendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HiClock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl overflow-hidden mb-10 shadow-md"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-80 object-cover"
          />
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Excerpt */}
          <p className="text-lg text-base-content/80 font-medium leading-relaxed border-l-4 border-primary pl-4">
            {post.excerpt}
          </p>

          {/* Sections */}
          {post.content.map((section, index) => (
            <div key={index}>
              <h2 className="text-xl md:text-2xl font-bold text-base-content mb-3">
                {section.heading}
              </h2>
              <p className="text-base text-base-content/80 leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Back to Blog */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-base-content/10"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-content font-semibold rounded-xl hover:bg-secondary transition-colors"
          >
            <HiArrowLeft className="w-5 h-5" />
            Back to All Articles
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;
