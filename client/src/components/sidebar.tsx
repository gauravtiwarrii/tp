import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { POPULAR_TAGS, AI_INSIGHTS } from "@/lib/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { Brain, Star } from "lucide-react";

interface Tag {
  id: number;
  name: string;
  slug: string;
}

interface EditorsPick {
  id: number;
  title: string;
  imageUrl?: string;
  publishedAt: string;
}

export default function Sidebar() {
  const { data: tags, isLoading: tagsLoading } = useQuery<Tag[]>({
    queryKey: ['/api/tags'],
  });
  
  const { data: editorsPicks, isLoading: picksLoading } = useQuery<EditorsPick[]>({
    queryKey: ['/api/articles?limit=3'],
  });
  
  // Render tag badges
  const renderTags = () => {
    if (tagsLoading) {
      return (
        <div className="flex flex-wrap gap-2">
          {[...Array(9)].map((_, i) => (
            <Skeleton key={i} className="w-20 h-6 rounded-full" />
          ))}
        </div>
      );
    }
    
    const displayTags = tags || POPULAR_TAGS.map((name, id) => ({ id, name, slug: name.toLowerCase() }));
    
    return (
      <div className="flex flex-wrap gap-2">
        {displayTags.map((tag, i) => (
          <Link
            key={i}
            href={`/tag/${tag.slug}`}
            className="px-3 py-1 bg-dark-300 text-gray-300 hover:bg-primary-900 hover:text-primary-300 rounded-full text-xs font-medium transition-colors"
          >
            #{typeof tag === 'string' ? tag : tag.name}
          </Link>
        ))}
      </div>
    );
  };
  
  // Render editor's picks
  const renderEditorsPicks = () => {
    if (picksLoading) {
      return (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="flex-shrink-0 w-20 h-20 rounded-lg" />
              <div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-16 mt-1" />
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    const picks = editorsPicks || [];
    
    return (
      <div className="space-y-4">
        {picks.map((pick, i) => (
          <Link key={i} href={`/article/${pick.id}`} className="flex gap-3 group">
            <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
              <img 
                src={pick.imageUrl || `https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=80&q=80`} 
                alt={pick.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
              />
            </div>
            <div>
              <h4 className="text-white text-sm font-medium group-hover:text-primary-400 transition-colors duration-200">
                {pick.title}
              </h4>
              <p className="text-gray-400 text-xs mt-1">
                {new Date(pick.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <aside>
      {/* AI Insights Panel */}
      <div className="bg-gradient-to-br from-dark-400 to-dark-500 rounded-xl p-5 border border-dark-300 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Brain className="text-primary-500 mr-2 h-5 w-5" /> AI Insights
          </h3>
          <span className="animate-pulse-slow inline-flex h-2 w-2 rounded-full bg-primary-500"></span>
        </div>
        <p className="text-gray-300 text-sm mb-4">Our AI has detected rising interest in these emerging topics:</p>
        <div className="space-y-3">
          {AI_INSIGHTS.map((insight, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`flex-shrink-0 w-2 h-10 bg-${insight.color}-500 rounded-full`}></div>
              <div>
                <h4 className="text-white font-medium text-sm">{insight.name}</h4>
                <p className="text-gray-400 text-xs">{insight.increase}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor's Picks */}
      <div className="bg-dark-400 rounded-xl p-5 mb-8">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Star className="text-yellow-500 mr-2 h-5 w-5" /> Editor's Picks
        </h3>
        {renderEditorsPicks()}
      </div>

      {/* Popular Tags */}
      <div className="bg-dark-400 rounded-xl p-5 mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Popular Tags</h3>
        {renderTags()}
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-xl p-5 mb-8 border border-primary-700">
        <h3 className="text-lg font-semibold text-white mb-2">Stay Updated</h3>
        <p className="text-primary-200 text-sm mb-4">Get the latest tech news delivered to your inbox, AI-curated just for you.</p>
        <form className="space-y-3">
          <div>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full px-4 py-2 bg-primary-800/50 border border-primary-700 rounded-lg text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-white/20" 
            />
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="privacy" className="mr-2" />
            <label htmlFor="privacy" className="text-xs text-primary-200">I agree to receive personalized news</label>
          </div>
          <button 
            type="submit" 
            className="w-full py-2 bg-white text-primary-900 rounded-lg font-medium hover:bg-primary-100 transition-colors"
          >
            Subscribe Now
          </button>
        </form>
      </div>
    </aside>
  );
}
