import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { NAV_LINKS } from "@/lib/constants";
import SearchBar from "@/components/search-bar";
import MobileMenu from "@/components/mobile-menu";
import AIStatus from "@/components/ai-status";
import { Cpu, ChevronUp, ZapIcon, CircuitBoard } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle scroll events to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
      setShowScrollTop(scrollPosition > 300);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Set loaded state for animations
    setIsLoaded(true);
    
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
          ? "bg-black/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.4)]" 
          : "bg-gradient-to-b from-black via-dark-950 to-transparent"
      }`}>
        {/* Animated tech border */}
        <div className="h-[2px] w-full bg-gradient-to-r from-blue-500 via-primary-500 to-violet-500 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-20 bg-white/20 animate-shimmer"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className={`flex items-center justify-between h-16 md:h-20 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-1000 animate-tilt"></div>
                <div className="relative w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-lg border border-gray-800 group-hover:border-primary-500/50 transition-colors">
                  <CircuitBoard className="h-5 w-5 text-primary-500 group-hover:text-primary-400 transition-colors" />
                </div>
              </div>
              <Link href="/" className="text-xl md:text-2xl font-bold text-white tracking-tight hover:scale-105 transition-transform flex items-center">
                <div className="relative overflow-hidden">
                  <span className="inline-block transform hover:scale-105 transition-transform">Silly</span>
                  <span className="text-primary-500 animate-pulse-subtle inline-block">Geeks</span>
                  {/* Cyber underline */}
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary-500 to-transparent"></div>
                </div>
              </Link>
              <div className="hidden sm:flex items-center px-3 py-1 ml-1 rounded-md bg-gradient-to-r from-dark-800 to-dark-900 text-xs text-primary-300 border border-dark-700 shadow-inner">
                <ZapIcon className="mr-1 h-3 w-3 text-yellow-500" /> AI-Powered
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-md font-medium transition-all duration-200 overflow-hidden ${
                    location === link.href
                      ? "text-white bg-gradient-to-br from-dark-800/80 to-dark-900/80 border border-primary-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                      : "text-gray-300 hover:bg-dark-800/50 hover:text-white hover:shadow-lg border border-transparent hover:border-dark-700"
                  }`}
                >
                  {/* Tech glow effect */}
                  {location === link.href && (
                    <span className="absolute inset-0 w-full h-full">
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-500 to-transparent"></span>
                    </span>
                  )}
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
                className="text-gray-400 hover:text-white focus:outline-none rounded-lg p-2 hover:bg-dark-700 transition-colors"
                aria-label="Open navigation menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="border-t border-dark-800 py-3 px-4 hidden md:block backdrop-blur-sm bg-black/40">
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
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)] text-white transition-all duration-300 
          bg-gradient-to-r from-primary-600 to-blue-500 hover:from-primary-500 hover:to-blue-400
          ${showScrollTop ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>

      {/* Add offset padding to ensure content doesn't hide under the fixed header */}
      <div className="h-36 md:h-40"></div>
    </>
  );
}
