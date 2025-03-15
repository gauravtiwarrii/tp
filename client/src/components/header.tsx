import { useState } from "react";
import { Link, useLocation } from "wouter";
import { NAV_LINKS } from "@/lib/constants";
import SearchBar from "@/components/search-bar";
import MobileMenu from "@/components/mobile-menu";
import AIStatus from "@/components/ai-status";
import { Cpu } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 bg-dark-500/80 backdrop-blur-md border-b border-dark-300">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-1">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full blur opacity-60 group-hover:opacity-80 transition duration-1000"></div>
                <div className="relative w-8 h-8 bg-dark-500 rounded-full flex items-center justify-center">
                  <Cpu className="h-5 w-5 text-primary-500" />
                </div>
              </div>
              <Link href="/" className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Silly<span className="text-primary-500">Geeks</span>
              </Link>
              <div className="hidden sm:flex items-center px-2 py-1 ml-2 rounded-full bg-dark-400 text-xs text-secondary-400 border border-dark-300">
                <Cpu className="mr-1 h-3 w-3" /> AI-Powered
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg font-medium transition duration-200 ${
                    location === link.href
                      ? "text-white"
                      : "text-gray-400 hover:bg-dark-400 hover:text-white"
                  }`}
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
                className="text-gray-400 hover:text-white focus:outline-none"
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
    </>
  );
}
