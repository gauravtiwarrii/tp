import { Link, useLocation } from "wouter";
import { NAV_LINKS } from "@/lib/constants";
import SearchBar from "@/components/search-bar";
import { X, Cpu } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [location] = useLocation();

  return (
    <div
      className={`fixed inset-0 bg-dark-500 z-50 transform transition duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-dark-400 rounded-full flex items-center justify-center">
              <Cpu className="h-5 w-5 text-primary-500" />
            </div>
            <span className="text-xl font-bold text-white">SillyGeeks</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Search */}
        <div className="mb-6">
          <SearchBar mobile />
        </div>

        {/* Mobile Navigation */}
        <nav className="flex flex-col space-y-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`px-4 py-3 rounded-lg font-medium ${
                location === link.href
                  ? "text-white bg-dark-400"
                  : "text-gray-400 hover:bg-dark-400 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="mt-8 pt-6 border-t border-dark-300">
          <p className="text-sm text-gray-500 mb-4">Trending Topics</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/tag/ai-ethics" onClick={onClose} className="px-3 py-1 bg-dark-400 text-primary-400 rounded-full text-xs font-medium">#AIEthics</Link>
            <Link href="/tag/metaverse" onClick={onClose} className="px-3 py-1 bg-dark-400 text-secondary-400 rounded-full text-xs font-medium">#Metaverse</Link>
            <Link href="/tag/cybersecurity" onClick={onClose} className="px-3 py-1 bg-dark-400 text-yellow-400 rounded-full text-xs font-medium">#Cybersecurity</Link>
            <Link href="/tag/web3" onClick={onClose} className="px-3 py-1 bg-dark-400 text-rose-400 rounded-full text-xs font-medium">#Web3</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
