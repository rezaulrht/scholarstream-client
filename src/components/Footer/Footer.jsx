import { Link } from "react-router";
import Logo from "../Logo/Logo";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiLocationMarker, HiMail, HiPhone } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="bg-white text-neutral">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm leading-relaxed opacity-80">
              Empowering students worldwide to achieve their academic dreams
              through accessible scholarship opportunities and comprehensive
              support.
            </p>
            <div className="flex gap-4">
              {/* Social Media Links */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="X (Twitter)"
              >
                <FaXTwitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-neutral">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-all duration-300 inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-scholarships"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-all duration-300 inline-block"
                >
                  All Scholarships
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-all duration-300 inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-all duration-300 inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-neutral">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/faq"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-all duration-300 inline-block"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/how-to-apply"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-all duration-300 inline-block"
                >
                  How to Apply
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-all duration-300 inline-block"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/success-stories"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-all duration-300 inline-block"
                >
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-neutral">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm opacity-80">
                <HiLocationMarker className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>123 Education Street, Academic City, AC 12345</span>
              </li>
              <li className="flex items-center gap-3 text-sm opacity-80">
                <HiMail className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="mailto:info@scholarstream.com"
                  className="hover:text-primary transition-colors duration-300"
                >
                  info@scholarstream.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm opacity-80">
                <HiPhone className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="hover:text-primary transition-colors duration-300"
                >
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-neutral/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-80 text-center md:text-left">
              © {new Date().getFullYear()} ScholarStream. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/privacy-policy"
                className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-all duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-all duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
