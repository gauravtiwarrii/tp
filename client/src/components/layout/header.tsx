import { useState } from "react";
import { Link } from "wouter";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Search, Menu, Moon, X } from "lucide-react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">SG</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Silly<span className="text-primary">Geeks</span>
              </h1>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <a className="font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Home</a>
            </Link>
            <Link href="/categories">
              <a className="font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Categories</a>
            </Link>
            <Link href="/trending">
              <a className="font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Trending</a>
            </Link>
            <Link href="/about">
              <a className="font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">About</a>
            </Link>
          </nav>
          
          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Search button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </Button>
            
            {/* Theme toggle */}
            <div className="flex items-center space-x-2">
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
                className="bg-gray-300 data-[state=checked]:bg-primary"
              />
              <Moon className="h-4 w-4 hidden sm:block text-gray-700 dark:text-primary" />
            </div>
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Search Overlay */}
      {searchOpen && (
        <div className="bg-white dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-800 transition-all duration-300">
          <div className="container mx-auto">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for tech news..." 
                className="w-full p-3 pl-10 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Trending Searches:</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-primary hover:text-white transition-colors">AI Neural Networks</span>
                <span className="text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-primary hover:text-white transition-colors">Apple Vision Pro</span>
                <span className="text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-primary hover:text-white transition-colors">Web 3.0</span>
                <span className="text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-primary hover:text-white transition-colors">Quantum Computing</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-all duration-300">
          <div className="container mx-auto py-3 px-4">
            <nav className="flex flex-col space-y-3">
              <Link href="/">
                <a className="py-2 px-3 font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Home</a>
              </Link>
              <Link href="/categories">
                <a className="py-2 px-3 font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Categories</a>
              </Link>
              <Link href="/trending">
                <a className="py-2 px-3 font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Trending</a>
              </Link>
              <Link href="/about">
                <a className="py-2 px-3 font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">About</a>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
