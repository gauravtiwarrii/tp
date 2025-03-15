import { Link } from "wouter";
import { formatDate, DEFAULT_PLACEHOLDER_IMAGE } from "@/lib/constants";
import { Eye, MessageSquare, Bookmark } from "lucide-react";

interface ArticleTag {
  id: number;
  name: string;
  slug: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
}

export interface ArticleProps {
  id: number;
  title: string;
  summary: string;
  content?: string;
  originalUrl: string;
  imageUrl?: string;
  publishedAt: string;
  sourceName: string;
  viewCount: number;
  category?: Category;
  tags: ArticleTag[];
}

export default function ArticleCard({ article }: { article: ArticleProps }) {
  // Get the category label and icon based on category name
  const getCategoryLabel = () => {
    if (!article.category) return null;
    
    const categoryMap: Record<string, { icon: string, bgColor: string }> = {
      "Artificial Intelligence": { icon: "flask", bgColor: "bg-primary-500/80" },
      "AI": { icon: "flask", bgColor: "bg-primary-500/80" },
      "Gadgets": { icon: "mobile-alt", bgColor: "bg-secondary-500/80" },
      "Hardware": { icon: "microchip", bgColor: "bg-secondary-500/80" },
      "Software": { icon: "code", bgColor: "bg-indigo-500/80" },
      "Cybersecurity": { icon: "shield-alt", bgColor: "bg-red-500/80" },
      "Quantum Computing": { icon: "atom", bgColor: "bg-indigo-500/80" }
    };

    const categoryInfo = categoryMap[article.category.name] || { icon: "newspaper", bgColor: "bg-gray-500/80" };
    
    return (
      <div className={`absolute top-2 right-2 ${categoryInfo.bgColor} backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full`}>
        <i className={`fas fa-${categoryInfo.icon} mr-1`}></i> {article.category.name}
      </div>
    );
  };

  return (
    <article className="flex flex-col md:flex-row gap-4 bg-dark-400 rounded-xl overflow-hidden hover:bg-dark-300 transition-colors duration-200">
      <div className="md:w-1/3 h-48 md:h-auto relative">
        <img 
          src={article.imageUrl || DEFAULT_PLACEHOLDER_IMAGE} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
        {getCategoryLabel()}
      </div>
      <div className="flex flex-col p-4 md:p-6 flex-grow">
        <Link href={`/article/${article.id}`}>
          <h3 className="text-lg md:text-xl font-semibold text-white mb-2 hover:text-primary-400 transition-colors duration-200">
            {article.title}
          </h3>
        </Link>
        <p className="text-gray-300 text-sm md:text-base mb-4">{article.summary}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xs text-gray-400">
              AI-Summarized • {formatDate(article.publishedAt)}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs text-gray-400 flex items-center">
              <Eye className="mr-1 h-3 w-3" /> {article.viewCount || 0}
            </span>
            <span className="text-xs text-gray-400 flex items-center">
              <MessageSquare className="mr-1 h-3 w-3" /> {Math.floor(Math.random() * 100)}
            </span>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Bookmark className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
