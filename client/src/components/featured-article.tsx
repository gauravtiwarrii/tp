import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_PLACEHOLDER_IMAGE, formatDate } from "@/lib/constants";
import { Bookmark, Share2, Bot } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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

interface FeaturedArticle {
  id: number;
  title: string;
  summary: string;
  imageUrl?: string;
  publishedAt: string;
  category?: Category;
  tags: ArticleTag[];
}

export default function FeaturedArticle() {
  const { data: article, isLoading, error } = useQuery<FeaturedArticle>({
    queryKey: ['/api/featured-article'],
  });

  if (isLoading) {
    return (
      <section className="mb-12 pt-4">
        <div className="relative overflow-hidden rounded-2xl bg-dark-400 h-72 md:h-96">
          <Skeleton className="w-full h-full" />
          <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-10 w-full mb-3" />
            <Skeleton className="h-4 w-3/4 mb-4" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !article) {
    return (
      <section className="mb-12 pt-4">
        <div className="relative overflow-hidden rounded-2xl bg-dark-400 h-72 md:h-96">
          <div className="absolute inset-0 z-20 p-8 flex flex-col justify-center items-center">
            <p className="text-gray-400 text-center">Failed to load featured article</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12 pt-4">
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent z-10"></div>
        <img
          src={article.imageUrl || DEFAULT_PLACEHOLDER_IMAGE}
          alt={article.title}
          className="w-full h-72 md:h-96 object-cover"
        />
        <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
          <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-medium inline-flex items-center mb-4 w-fit">
            <Bot className="mr-1 h-3 w-3" /> AI-Generated
          </span>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">{article.title}</h1>
          <p className="text-sm md:text-base text-gray-300 mb-4 max-w-3xl">{article.summary}</p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-sm text-gray-400">
                AI-Curated • <span className="text-gray-300">{formatDate(article.publishedAt)}</span>
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button className="text-gray-400 hover:text-white transition-colors">
                <Bookmark className="h-4 w-4" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
