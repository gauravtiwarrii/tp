import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";
import ArticleList from "@/components/article-list";
import { ThemeToggle } from "@/components/theme-toggle";
import { formatDate, DEFAULT_PLACEHOLDER_IMAGE } from "@/lib/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { Bookmark, Share2, MessageSquare, Eye, ChevronLeft } from "lucide-react";

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

interface ArticleDetails {
  id: number;
  title: string;
  content: string;
  summary: string;
  originalUrl: string;
  imageUrl?: string;
  publishedAt: string;
  sourceId: string;
  sourceName: string;
  viewCount: number;
  category?: Category;
  tags: ArticleTag[];
}

export default function ArticlePage() {
  const { id } = useParams();
  const articleId = parseInt(id);

  const { data: article, isLoading, error } = useQuery<ArticleDetails>({
    queryKey: [`/api/articles/${articleId}`],
    enabled: !isNaN(articleId),
  });

  // Loading state
  if (isLoading) {
    return (
      <>
        <ThemeToggle />
        <Header />
        <main className="container mx-auto px-4 pt-28 md:pt-32">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="mb-8">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <div className="flex items-center space-x-4 mb-6">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-64 w-full mb-6 rounded-xl" />
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
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

  // Error state
  if (error || !article) {
    return (
      <>
        <ThemeToggle />
        <Header />
        <main className="container mx-auto px-4 pt-28 md:pt-32">
          <div className="bg-dark-400 rounded-xl p-8 text-center">
            <p className="text-gray-300">Article not found or an error occurred.</p>
            <Link href="/" className="text-primary-500 mt-4 inline-block">
              Return to home page
            </Link>
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
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {/* Article Content */}
            <article className="mb-10">
              <Link href="/" className="inline-flex items-center text-gray-400 hover:text-primary-400 mb-4">
                <ChevronLeft className="h-4 w-4 mr-1" /> Back to Home
              </Link>
              
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">{article.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
                <span>AI-Curated from {article.sourceName}</span>
                <span>{formatDate(article.publishedAt)}</span>
                
                {article.category && (
                  <Link 
                    href={`/category/${article.category.slug}`}
                    className="bg-dark-400 text-primary-400 px-3 py-1 rounded-full text-xs"
                  >
                    {article.category.name}
                  </Link>
                )}
                
                <div className="flex items-center ml-auto space-x-4">
                  <span className="flex items-center">
                    <Eye className="mr-1 h-4 w-4" /> {article.viewCount}
                  </span>
                  <span className="flex items-center">
                    <MessageSquare className="mr-1 h-4 w-4" /> {Math.floor(Math.random() * 50)}
                  </span>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <Bookmark className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Featured Image */}
              <div className="mb-6">
                <img 
                  src={article.imageUrl || DEFAULT_PLACEHOLDER_IMAGE} 
                  alt={article.title} 
                  className="w-full h-auto rounded-xl" 
                />
              </div>
              
              {/* Article Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {article.tags.map(tag => (
                    <Link 
                      key={tag.id} 
                      href={`/tag/${tag.slug}`}
                      className="px-3 py-1 bg-dark-400 text-gray-300 hover:bg-primary-900 hover:text-primary-300 rounded-full text-xs"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              )}
              
              {/* Article Content */}
              <div className="prose prose-invert prose-lg max-w-none">
                {/* Display full article content or paragraphs */}
                {article.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                
                {/* Original Source Link */}
                <div className="mt-8 p-4 bg-dark-400 rounded-lg">
                  <p className="text-sm text-gray-300">
                    This article has been AI-summarized from the original source. Read the full article at:
                    <a 
                      href={article.originalUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ml-1 text-primary-400 hover:underline"
                    >
                      {article.sourceName}
                    </a>
                  </p>
                </div>
              </div>
            </article>
            
            {/* Related Articles */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-white mb-6">Related Articles</h2>
              {article.category && (
                <ArticleList 
                  title="More from this category" 
                  endpoint={`/api/categories/${article.category.slug}/articles`} 
                  initialLimit={3} 
                />
              )}
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
