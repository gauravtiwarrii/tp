import { Link } from "wouter";
import { TRENDING_TOPICS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Flame } from "lucide-react";

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
}

export default function TrendingTopics() {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  // If we have categories from the API, use those, otherwise fall back to constants
  const topics = categories || TRENDING_TOPICS;
  
  // Display a loading state
  if (isLoading) {
    return (
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Flame className="text-orange-500 mr-2 h-5 w-5" /> Trending Topics
          </h2>
          <button className="text-gray-400 hover:text-white text-sm flex items-center">
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="group relative overflow-hidden rounded-xl aspect-[3/4] flex items-center justify-center">
              <Skeleton className="w-full h-full" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Flame className="text-orange-500 mr-2 h-5 w-5" /> Trending Topics
        </h2>
        <button className="text-gray-400 hover:text-white text-sm flex items-center">
          View All <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {topics.slice(0, 6).map((topic, index) => (
          <Link
            key={index}
            href={`/category/${topic.slug}`}
            className="group relative overflow-hidden rounded-xl aspect-[3/4] flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/70 to-transparent z-10"></div>
            <img 
              src={topic.imageUrl} 
              alt={topic.name} 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
              <h3 className="text-sm font-semibold text-white mb-1">{topic.name}</h3>
              <p className="text-xs text-gray-300">{
                // Use articles count if available or default to category id
                typeof topic.articles === 'number' 
                  ? `${topic.articles} articles` 
                  : `ID: ${topic.id}`
              }</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
