import React from "react";
import { Clock,MapPin,Phone,Mail,Heart,Facebook,Instagram,Twitter,ChevronRight } from "lucide-react";

const Footer = () => {
    return (
        <footer className="relative bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 overflow-hidden">
            {/* Decorative elements  */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-br from-gray-300 to-gray-500"></div>

            {/* Pattern overlay  */}
            <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="watchPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" fill="none" />
                            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
                            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" fill="none" />
                            <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1" fill="none" />
                            <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
                        </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#watchPattern)" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 relative z-10">
                {/* Newsletter Section  */}
                <div className="py-12 border-b border-gray-200 border-dashed">
                    <div className="text-center">
                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                            Timeless Elegance, Delivered
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                            Subscribe to our newsletter for exclusive offers, new collection announcements, and styling tips.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Your email address"
                                aria-label="Email address"
                                className="px-4 py-3 w-full rounded-t-lg sm:rounded-l-lg sm:rounded-r-none rounded-b-lg sm:mb-0 mb-3 border border-gray-300 focus:outline-none"
                            />
                            <button
                                aria-label="Subscribe"
                                className="px-6 py-3 bg-gradient-to-br from-gray-300 to-gray-500 text-white font-medium rounded-b-lg sm:rounded-r-lg sm:rounded-l-none rounded-t-lg transition-colors shadow-md hover:shadow-lg"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
                <div className="py-12 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand section */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full bg-amber-200 animate-ping opacity-20"></div>
                                <Clock className="h-10 w-10 text-gray-500 relative z-10" />
                            </div>
                            <span className="ml-3 text-2xl font-bold font-serif bg-black bg-clip-text text-transparent">
                                ChronoÉlite
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
                            Crafting timeless pieces for the discerning individual. Where precision meets elegance in every detail.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            {[Facebook, Instagram, Twitter].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="h-10 w-10 rounded-full bg-white flex items-center justify-center hover:text-black text-gray-500 transition-all duration-300 shadow-sm hover:shadow-md"
                                    aria-label={index === 0 ? "Facebook" : index === 1 ? "Instagram" : "Twitter"}
                                >
                                    <Icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-serif font-semibold text-gray-900 mb-4 flex items-center">
                            <ChevronRight className="h-5 w-5 text-gray-500 mr-1" />
                            Explore
                        </h3>
                        <ul className="space-y-3">
                            {['Collections', 'New Arrivals', 'Best Sellers', 'Limited Editions', 'Our Story'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors flex items-center group">
                                        <ChevronRight className="h-4 w-4 text-black opacity-0 group-hover:opacity-100 transition-opacity mr-1" />
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-serif font-semibold text-gray-900 mb-4 flex items-center">
                            <ChevronRight className="h-5 w-5 text-gray-500 mr-1" />
                            Support
                        </h3>
                        <ul className="space-y-3">
                            {['Contact Us', 'Shipping & Returns', 'Product Care', 'Warranty', 'FAQ'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors flex items-center group">
                                        <ChevronRight className="h-4 w-4 text-black opacity-0 group-hover:opacity-100 transition-opacity mr-1" />
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-serif font-semibold text-gray-900 mb-4 flex items-center">
                            <ChevronRight className="h-5 w-5 text-gray-500 mr-1" />
                            Connect
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center flex-shrink-0 mr-3">
                                    <MapPin className="h-5 w-5 text-black " />
                                </div>
                                <span className="text-sm text-gray-600">123 Luxury Avenue, Geneva, Switzerland</span>
                            </li>
                            <li className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center flex-shrink-0 mr-3">
                                    <Phone className="h-5 w-5 text-black" />
                                </div>
                                <span className="text-sm text-gray-600">+41 22 345 6789</span>
                            </li>
                            <li className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center flex-shrink-0 mr-3">
                                    <Mail className="h-5 w-5 text-black" />
                                </div>
                                <span className="text-sm text-gray-600">info@chronoelite.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="py-8 flex flex-col md:flex-row justify-between items-center border-t border-gray-200 border-dashed">
                    <p className="text-xs text-gray-500 flex items-center mb-4 md:mb-0">
                        © {new Date().getFullYear()} ChronoÉlite. Crafted with <Heart className="h-3 w-3 mx-1 text-amber-600 fill-current" /> in Switzerland
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                        <p className="text-xs text-gray-500">
                            Designed by{" "}
                            <a
                                href="https://hexagondigitalservices.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600 transition-colors"
                            >
                                Hexagon Digital Services
                            </a>
                        </p>
                    </div>

                </div>
            </div>

            {/* small CSS to tune exact-1024px and ensure consistent spacing on sm/md */}
            <style>{`
        /* keep visual behavior identical but tune exact 1024px breakpoint (laptop) if needed */
        @media (width: 1024px) {
          /* slightly increase top/bottom padding of main grid for 1024px displays */
          .max-w-7xl > .py-12 {
            padding-top: 3rem;
            padding-bottom: 3rem;
          }
        }

        /* make sure input/button radii behave consistently across breakpoints */
        @media (min-width: 640px) {
          input[type="email"] {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          button[aria-label="Subscribe"] {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        }

        /* minor tweak: ensure pattern opacity not overpowering on small screens */
        @media (max-width: 640px) {
          footer .opacity-5 { opacity: 0.03 !important; }
        }
      `}</style>
        </footer>
    )
}

export default Footer