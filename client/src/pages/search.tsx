import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ArticleCard, { ArticleProps } from "@/components/article-card";
import Sidebar from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown, Search } from "lucide-react";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(8);
  
  // Parse search query from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) {
      setSearchQuery(q);
    }
  }, []);
  
  const { data: articles, isLoading, error } = useQuery<ArticleProps[]>({
    queryKey: [`/api/search?query=${encodeURIComponent(searchQuery)}&limit=${limit}`, searchQuery, limit],
    enabled: searchQuery.length > 0,
  });
  
  const loadMore = () => {
    setLimit(prev => prev + 4);
  };
  
  // Render loading state
  if (isLoading) {
    return (
      <>
        <ThemeToggle />
        <Header />
        <main className="container mx-auto px-4 pt-28 md:pt-32">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Search Results for "<Skeleton className="inline-block w-32 h-6 align-middle" />"
            </h1>
            <p className="text-gray-400">
              <Skeleton className="inline-block w-64 h-4" />
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex flex-col md:flex-row gap-4 bg-dark-400 rounded-xl overflow-hidden">
                    <div className="md:w-1/3 h-48 md:h-auto">
                      <Skeleton className="w-full h-full" />
                    </div>
                    <div className="flex flex-col p-4 md:p-6 flex-grow">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <div className="mt-auto flex items-center justify-between">
                        <Skeleton className="h-3 w-32" />
                        <div className="flex items-center space-x-3">
                          <Skeleton className="h-3 w-10" />
                          <Skeleton className="h-3 w-10" />
                          <Skeleton className="h-4 w-4 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/3">
              <Sidebar />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <ThemeToggle />
      <Header />
      <main className="container mx-auto px-4 pt-28 md:pt-32">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center">
            <Search className="mr-2 h-6 w-6" />
            Search Results for "{searchQuery}"
          </h1>
          {articles && (
            <p className="text-gray-400">
              Found {articles.length} articles that match your search
            </p>
          )}
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {error ? (
              <div className="bg-dark-400 rounded-xl p-8 text-center">
                <p className="text-gray-300">Error searching for articles. Please try again.</p>
              </div>
            ) : articles && articles.length > 0 ? (
              <>
                <div className="space-y-6">
                  {articles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
                
                {/* Load More Button */}
                {articles.length >= limit && (
                  <div className="flex justify-center mt-8">
                    <Button 
                      variant="outline" 
                      onClick={loadMore}
                      className="px-5 py-2 bg-dark-300 text-gray-300 rounded-lg hover:bg-dark-200 hover:text-white transition-colors duration-200 flex items-center"
                    >
                      Load More <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : searchQuery ? (
              <div className="bg-dark-400 rounded-xl p-8 text-center">
                <p className="text-gray-300">No articles found matching "{searchQuery}".</p>
              </div>
            ) : (
              <div className="bg-dark-400 rounded-xl p-8 text-center">
                <p className="text-gray-300">Enter a search query to find articles.</p>
              </div>
            )}
          </div>
          
          <div className="lg:w-1/3">
            <Sidebar />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
