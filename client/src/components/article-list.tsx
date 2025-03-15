import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ArticleCard, { ArticleProps } from "@/components/article-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface ArticleListProps {
  title?: string;
  endpoint: string;
  initialLimit?: number;
}

export default function ArticleList({ 
  title = "Latest Articles", 
  endpoint = "/api/articles", 
  initialLimit = 4 
}: ArticleListProps) {
  const [limit, setLimit] = useState(initialLimit);
  const [activeFilter, setActiveFilter] = useState("All");

  const { data, isLoading, error, refetch } = useQuery<ArticleProps[]>({
    queryKey: [endpoint, limit],
    queryFn: async () => {
      return fetch(`${endpoint}?limit=${limit}`).then(res => {
        if (!res.ok) throw new Error("Failed to fetch articles");
        return res.json();
      });
    },
  });

  const loadMore = () => {
    setLimit(prev => prev + 4);
  };

  // Render loading skeletons
  if (isLoading) {
    return (
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <div className="flex">
            <button className="text-sm px-3 py-1 rounded-l-lg bg-dark-400 text-white border-r border-dark-300">All</button>
            <button className="text-sm px-3 py-1 bg-dark-400 text-gray-400 border-r border-dark-300">AI</button>
            <button className="text-sm px-3 py-1 bg-dark-400 text-gray-400 border-r border-dark-300">Software</button>
            <button className="text-sm px-3 py-1 rounded-r-lg bg-dark-400 text-gray-400">Hardware</button>
          </div>
        </div>

        <div className="space-y-6">
          {[...Array(initialLimit)].map((_, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-4 bg-dark-400 rounded-xl overflow-hidden">
              <div className="md:w-1/3 h-48 md:h-auto">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="flex flex-col p-4 md:p-6 flex-grow">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
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
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
        <div className="bg-dark-400 rounded-xl p-8 text-center">
          <p className="text-gray-300">Failed to load articles. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <div className="flex">
          {["All", "AI", "Software", "Hardware"].map((filter) => (
            <button
              key={filter}
              className={`text-sm px-3 py-1 ${
                filter === "All" ? "rounded-l-lg" : ""
              } ${
                filter === "Hardware" ? "rounded-r-lg" : "border-r border-dark-300"
              } bg-dark-400 ${
                activeFilter === filter ? "text-white" : "text-gray-400"
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 px-4 md:px-6 lg:px-8"> {/* Added grid and responsive classes */}
        {data.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}

        {/* Load More Button */}
        {data.length >= limit && (
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
      </div>
    </section>
  );
}