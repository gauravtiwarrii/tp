import { createContext, useContext, useState, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { TRENDING_SEARCHES } from "@/lib/constants";

interface SearchContextType {
  searchQuery: string;
  updateSearchQuery: (query: string) => void;
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  suggestions: string[];
  loading: boolean;
  clearSearch: () => void;
  performSearch: (query?: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  // Get search suggestions based on user input
  const { isLoading: loading } = useQuery({
    queryKey: ['/api/suggestions', searchQuery],
    queryFn: async () => {
      if (!searchQuery || searchQuery.trim().length < 2) {
        setSuggestions([]);
        return null;
      }
      
      try {
        // For simplicity, we'll use a basic filter on trending searches
        // In a real app, you would call the API for suggestions
        const filteredSuggestions = TRENDING_SEARCHES.filter(term => 
          term.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        // Add the actual search query if it's not in suggestions
        if (!filteredSuggestions.includes(searchQuery) && searchQuery.trim().length > 0) {
          filteredSuggestions.unshift(searchQuery);
        }
        
        setSuggestions(filteredSuggestions);
        return filteredSuggestions;
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        return [];
      }
    },
    enabled: searchQuery.trim().length >= 2,
  });
  
  const updateSearchQuery = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length >= 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };
  
  const clearSearch = () => {
    setSearchQuery("");
    setShowSuggestions(false);
  };
  
  const performSearch = (query?: string) => {
    const finalQuery = query || searchQuery;
    if (finalQuery.trim().length > 0) {
      // Using window.location to navigate to search page with query
      window.location.href = `/search?q=${encodeURIComponent(finalQuery)}`;
    }
  };
  
  return (
    <SearchContext.Provider 
      value={{
        searchQuery,
        updateSearchQuery,
        showSuggestions,
        setShowSuggestions,
        suggestions,
        loading,
        clearSearch,
        performSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
