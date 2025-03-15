import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { NAV_LINKS } from "@/lib/constants";
import SearchBar from "@/components/search-bar";
import MobileMenu from "@/components/mobile-menu";
import AIStatus from "@/components/ai-status";
import { Cpu, ChevronUp } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll events to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
      setShowScrollTop(scrollPosition > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-dark-500/95 backdrop-blur-md shadow-xl" 
          : "bg-gradient-to-b from-dark-500 to-dark-500/80"
      } border-b border-dark-300`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-1">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-1000 animate-tilt"></div>
                <div className="relative w-8 h-8 bg-dark-500 rounded-full flex items-center justify-center shadow-inner">
                  <Cpu className="h-5 w-5 text-primary-500" />
                </div>
              </div>
              <Link href="/" className="text-xl md:text-2xl font-bold text-white tracking-tight hover:scale-105 transition-transform">
                Silly<span className="text-primary-500 animate-pulse-subtle">Geeks</span>
              </Link>
              <div className="hidden sm:flex items-center px-2 py-1 ml-2 rounded-full bg-dark-400/80 text-xs text-secondary-400 border border-dark-300 hover:border-primary-500/50 transition-colors">
                <Cpu className="mr-1 h-3 w-3" /> AI-Powered
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 rounded-lg font-medium transition duration-200 overflow-hidden ${
                    location === link.href
                      ? "text-white after:bg-primary-500 after:h-0.5 after:w-full after:absolute after:bottom-1 after:left-0"
                      : "text-gray-400 hover:bg-dark-400/80 hover:text-white hover:shadow-[0_0_10px_rgba(0,0,0,0.3)]"
                  } before:absolute before:inset-0 before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:to-primary-500/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* AI Status Indicator */}
              <div className="ml-2">
                <AIStatus />
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-400 hover:text-white focus:outline-none rounded-lg p-2 hover:bg-dark-400/80 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="border-t border-dark-300 py-2 px-4 hidden md:block">
          <div className="container mx-auto">
            <div className="relative max-w-2xl mx-auto">
              <SearchBar />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg text-white transition-all duration-300 
          bg-gradient-to-r from-primary-600 to-primary-400 hover:from-primary-500 hover:to-primary-300
          ${showScrollTop ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>

      {/* Add offset padding to ensure content doesn't hide under the fixed header */}
      <div className="h-28 md:h-32"></div>
    </>
  );
}
