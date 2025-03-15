import { KeyboardEvent, useEffect, useRef } from "react";
import { useSearch } from "@/context/search-context";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar({ mobile = false }: { mobile?: boolean }) {
  const { 
    searchQuery, 
    updateSearchQuery, 
    showSuggestions, 
    setShowSuggestions,
    suggestions,
    performSearch
  } = useSearch();
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the suggestions dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        !searchInputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowSuggestions]);

  // Handle key press events (like Enter)
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      performSearch();
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Input
          ref={searchInputRef}
          type="text"
          placeholder={mobile 
            ? "Search for AI, gadgets, reviews..." 
            : "Search for AI, gadgets, reviews, and more..."
          }
          value={searchQuery}
          onChange={(e) => updateSearchQuery(e.target.value)}
          onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          className={`w-full ${mobile 
            ? "bg-dark-400 border border-dark-300 rounded-lg py-3 pl-10 pr-4" 
            : "bg-dark-400 border border-dark-300 rounded-lg py-2 pl-10 pr-4"
          } text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300`}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
      </div>
      
      {/* Search Suggestions */}
      {showSuggestions && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-dark-400 border border-dark-300 rounded-lg shadow-lg p-2 z-30"
        >
          {suggestions.length > 0 ? (
            <>
              {suggestions.map((suggestion, index) => (
                <div 
                  key={index}
                  className="flex items-center px-3 py-2 hover:bg-dark-300 rounded-md cursor-pointer"
                  onClick={() => {
                    updateSearchQuery(suggestion);
                    performSearch(suggestion);
                    setShowSuggestions(false);
                  }}
                >
                  <Search className="text-gray-500 text-xs mr-2 h-3 w-3" />
                  <span className="text-gray-300 text-sm">{suggestion}</span>
                </div>
              ))}
            </>
          ) : (
            <div className="px-3 py-2 text-sm text-gray-400">
              No suggestions found
            </div>
          )}
          
          <div className="mt-1 border-t border-dark-300 pt-1">
            <p className="text-xs text-gray-500 px-3 py-1">
              Trending: 
              {["GPT-5", "RTX 5090", "Web3"].map((term, i) => (
                <span 
                  key={i} 
                  className="text-primary-400 ml-1 cursor-pointer"
                  onClick={() => {
                    updateSearchQuery(term);
                    performSearch(term);
                    setShowSuggestions(false);
                  }}
                >
                  {i > 0 && ", "}
                  {term}
                </span>
              ))}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
