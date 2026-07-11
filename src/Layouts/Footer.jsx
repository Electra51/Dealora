import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/Logo.png";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { name: "About Us", path: "/about" },
      { name: "Contact", path: "/contact" },
      { name: "FAQs", path: "/faqs" },
      { name: "Careers", path: "/careers" },
      { name: "Blog", path: "/blog" },
    ],
    customerService: [
      { name: "Return Policy", path: "/return-policy" },
      { name: "Shipping Info", path: "/shipping" },
      { name: "Track Order", path: "/track-order" },
      { name: "Size Guide", path: "/size-guide" },
      { name: "Terms & Conditions", path: "/terms" },
    ],
  };

  const socialLinks = [
    { icon: FaFacebookF, url: "#", label: "Facebook" },
    { icon: FaTwitter, url: "#", label: "Twitter" },
    { icon: FaInstagram, url: "#", label: "Instagram" },
    { icon: FaLinkedinIn, url: "#", label: "LinkedIn" },
    { icon: FaYoutube, url: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-[#1a1a24] text-[#f0f8ff] relative z-50">
     

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img src={logo} alt="Dealora Logo" className="h-12 w-auto" />
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted online shopping destination for quality products at amazing prices. Shop with confidence and style.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500 transition-all duration-300 group"
                >
                  <social.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-orange-500 transition-colors duration-300 inline-block hover:translate-x-1 transform"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Customer Service</h3>
            <ul className="space-y-3">
              {footerLinks.customerService.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-orange-500 transition-colors duration-300 inline-block hover:translate-x-1 transform"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="w-5 h-5 text-orange-500 mt-1 shrink-0" />
                <span className="text-gray-400">123 Shopping Street, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="w-5 h-5 text-orange-500 shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="w-5 h-5 text-orange-500 shrink-0" />
                <span className="text-gray-400">support@dealora.com</span>
              </li>
              <li className="flex items-center gap-3">
                <FiClock className="w-5 h-5 text-orange-500 shrink-0" />
                <span className="text-gray-400">Mon - Fri: 9AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Dealora. All rights reserved. Made with ❤️ by safayet
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;