import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";
import ArticleList from "@/components/article-list";
import { ThemeToggle } from "@/components/theme-toggle";
import { formatDate, DEFAULT_PLACEHOLDER_IMAGE } from "@/lib/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Bookmark, BookmarkCheck, Share2, MessageSquare, Eye, 
  ChevronLeft, SendHorizonal, ThumbsUp, Facebook, Twitter, Linkedin, Copy, ThumbsDown
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

interface Comment {
  id: number;
  author: string;
  avatarUrl?: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies?: Comment[];
}

export default function ArticlePage() {
  const { id } = useParams();
  const articleId = parseInt(id);
  const { toast } = useToast();
  
  // Local state
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Tech Enthusiast",
      avatarUrl: "https://ui-avatars.com/api/?name=Tech+Enthusiast&background=random",
      content: "This is one of the most insightful articles I've read about this technology. Very well explained!",
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      likes: 12,
    },
    {
      id: 2,
      author: "AI Developer",
      avatarUrl: "https://ui-avatars.com/api/?name=AI+Developer&background=random",
      content: "I've been following this development closely. The applications are going to be revolutionary.",
      timestamp: new Date(Date.now() - 43200000), // 12 hours ago
      likes: 8,
      replies: [
        {
          id: 3,
          author: "Data Scientist",
          avatarUrl: "https://ui-avatars.com/api/?name=Data+Scientist&background=random",
          content: "Agreed! Especially when combined with large dataset analytics.",
          timestamp: new Date(Date.now() - 21600000), // 6 hours ago
          likes: 3,
        }
      ]
    }
  ]);

  // Query article data
  const { data: article, isLoading, error } = useQuery<ArticleDetails>({
    queryKey: [`/api/articles/${articleId}`],
    enabled: !isNaN(articleId),
  });

  // Check if article is bookmarked on load
  useEffect(() => {
    const bookmarkedArticles = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
    if (articleId && bookmarkedArticles.includes(articleId)) {
      setIsBookmarked(true);
    }
  }, [articleId]);

  // Bookmark handling
  const toggleBookmark = () => {
    const bookmarkedArticles = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
    
    if (isBookmarked) {
      // Remove from bookmarks
      const updatedBookmarks = bookmarkedArticles.filter((id: number) => id !== articleId);
      localStorage.setItem('bookmarkedArticles', JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
      toast({
        title: "Removed from bookmarks",
        description: "Article has been removed from your saved items.",
      });
    } else {
      // Add to bookmarks
      bookmarkedArticles.push(articleId);
      localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarkedArticles));
      setIsBookmarked(true);
      toast({
        title: "Added to bookmarks",
        description: "Article has been saved to your bookmarks.",
      });
    }
  };

  // Share functionality
  const shareArticle = (platform: string) => {
    const url = window.location.href;
    const title = article?.title || 'Check out this article';
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          toast({
            title: "Link copied!",
            description: "Article link has been copied to your clipboard.",
          });
        });
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  // Comment handling
  const submitComment = () => {
    if (!commentText.trim()) return;
    
    const newComment: Comment = {
      id: Date.now(),
      author: "You",
      avatarUrl: "https://ui-avatars.com/api/?name=You&background=random",
      content: commentText,
      timestamp: new Date(),
      likes: 0,
    };
    
    setComments([newComment, ...comments]);
    setCommentText("");
    
    toast({
      title: "Comment posted",
      description: "Your comment has been added to the discussion.",
    });
  };

  // Likes handling
  const handleLike = (commentId: number) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 };
      }
      if (comment.replies) {
        return {
          ...comment,
          replies: comment.replies.map(reply => 
            reply.id === commentId ? { ...reply, likes: reply.likes + 1 } : reply
          )
        };
      }
      return comment;
    }));
  };

  // Loading state
  if (isLoading) {
    return (
      <>
        <ThemeToggle />
        <Header />
        <main className="container mx-auto px-4">
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
        <main className="container mx-auto px-4">
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

      <main className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {/* Article Content */}
            <article className="mb-10">
              <Link href="/" className="inline-flex items-center text-gray-400 hover:text-primary-400 mb-4 group">
                <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" /> 
                Back to Home
              </Link>
              
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 relative">
                <span className="relative inline-block">
                  {article.title}
                  <span className="absolute -inset-1 -z-10 opacity-10 blur-md bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg"></span>
                </span>
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6 border-b border-gray-800 pb-4">
                <span className="flex items-center">
                  <span className="inline-block w-4 h-4 mr-2 rounded-full bg-gradient-to-r from-primary-600 to-primary-400"></span>
                  AI-Curated from {article.sourceName}
                </span>
                <span>{formatDate(article.publishedAt)}</span>
                
                {article.category && (
                  <Link 
                    href={`/category/${article.category.slug}`}
                    className="bg-dark-400/50 text-primary-400 px-3 py-1 rounded-full text-xs border border-dark-300 hover:border-primary-500/50 transition-colors"
                  >
                    {article.category.name}
                  </Link>
                )}
                
                <div className="flex items-center ml-auto space-x-4">
                  <span className="flex items-center">
                    <Eye className="mr-1 h-4 w-4" /> {article.viewCount}
                  </span>
                  <button 
                    className="flex items-center text-gray-400 hover:text-primary-400 transition-colors"
                    onClick={() => setShowComments(!showComments)}
                  >
                    <MessageSquare className="mr-1 h-4 w-4" /> {comments.length}
                  </button>
                  
                  {/* Bookmark Button */}
                  <button 
                    className="text-gray-400 hover:text-yellow-500 transition-colors relative group"
                    onClick={toggleBookmark}
                    aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this article"}
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <Bookmark className="h-4 w-4" />
                    )}
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-dark-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {isBookmarked ? "Saved" : "Save for later"}
                    </span>
                  </button>
                  
                  {/* Share Button with Popover */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <button 
                        className="text-gray-400 hover:text-primary-400 transition-colors relative group"
                        aria-label="Share this article"
                      >
                        <Share2 className="h-4 w-4" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-dark-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Share
                        </span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-3 bg-dark-600 border border-dark-400">
                      <h3 className="font-medium text-white mb-2">Share this article</h3>
                      <div className="flex justify-between mb-4">
                        <button 
                          onClick={() => shareArticle('facebook')} 
                          className="p-2 rounded-full bg-[#1877f2] text-white hover:bg-opacity-90 transition-opacity"
                          aria-label="Share on Facebook"
                        >
                          <Facebook className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => shareArticle('twitter')} 
                          className="p-2 rounded-full bg-[#1da1f2] text-white hover:bg-opacity-90 transition-opacity"
                          aria-label="Share on Twitter"
                        >
                          <Twitter className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => shareArticle('linkedin')} 
                          className="p-2 rounded-full bg-[#0077b5] text-white hover:bg-opacity-90 transition-opacity"
                          aria-label="Share on LinkedIn"
                        >
                          <Linkedin className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => shareArticle('copy')} 
                          className="p-2 rounded-full bg-gray-600 text-white hover:bg-opacity-90 transition-opacity"
                          aria-label="Copy link"
                        >
                          <Copy className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="text-center text-xs text-gray-400">
                        Share this with your network
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              {/* Featured Image with 3D effect */}
              <div className="mb-8 transform perspective-1000 group">
                <div className="relative rounded-xl overflow-hidden shadow-xl transition-transform hover:scale-[1.01] duration-300">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/20 to-transparent mix-blend-overlay rounded-xl"></div>
                  <img 
                    src={article.imageUrl || DEFAULT_PLACEHOLDER_IMAGE} 
                    alt={article.title} 
                    className="w-full h-auto object-cover transition-all duration-500 group-hover:brightness-105" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
              </div>
              
              {/* Article Tags with 3D effect */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {article.tags.map(tag => (
                    <Link 
                      key={tag.id} 
                      href={`/tag/${tag.slug}`}
                      className="px-3 py-1 bg-dark-500/80 text-gray-300 rounded-full text-xs border border-dark-400
                      hover:border-primary-500/50 hover:text-primary-300 transition-all duration-300
                      transform hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              )}
              
              {/* Article Content with enhanced styling */}
              <div className="prose prose-invert prose-lg max-w-none">
                {/* Process and render article content properly */}
                {article.content.split('\n\n').map((paragraph, index) => {
                  // Handle markdown-style headers by removing # symbols and adding the appropriate header element
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-white relative inline-block">
                        {paragraph.replace('## ', '')}
                        <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-r from-primary-500 to-transparent"></span>
                      </h2>
                    );
                  } else if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-white">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  } else if (paragraph.startsWith('#### ')) {
                    return (
                      <h4 key={index} className="text-lg font-semibold mt-5 mb-2 text-white">
                        {paragraph.replace('#### ', '')}
                      </h4>
                    );
                  } else if (paragraph.startsWith('# ')) {
                    return (
                      <h1 key={index} className="text-3xl font-bold mt-10 mb-5 text-white">
                        {paragraph.replace('# ', '')}
                      </h1>
                    );
                  } else if (paragraph.startsWith('![')) {
                    // Handle image markdown syntax ![alt text](image url)
                    try {
                      const altText = paragraph.match(/!\[(.*?)\]/)?.[1] || 'Image';
                      const imageUrl = paragraph.match(/\((.*?)\)/)?.[1];
                      
                      if (imageUrl) {
                        return (
                          <figure key={index} className="my-8 perspective-1000">
                            <div className="transform transition-transform hover:scale-[1.01] duration-300 shadow-xl rounded-lg overflow-hidden border border-dark-700">
                              <img 
                                src={imageUrl} 
                                alt={altText} 
                                className="w-full h-auto" 
                              />
                            </div>
                            <figcaption className="text-center text-sm text-gray-400 mt-2">{altText}</figcaption>
                          </figure>
                        );
                      }
                    } catch (e) {
                      // If we can't parse the image markdown, just render it as text
                      return <p key={index}>{paragraph}</p>;
                    }
                  } else if (paragraph.startsWith('- ')) {
                    // Handle unordered lists
                    const items = paragraph.split('\n').map(item => item.replace('- ', ''));
                    return (
                      <ul key={index} className="list-disc pl-6 my-4 space-y-2">
                        {items.map((item, i) => (
                          <li key={i} className="text-gray-300">{item}</li>
                        ))}
                      </ul>
                    );
                  } else if (/^\d+\.\s/.test(paragraph)) {
                    // Handle ordered lists
                    const items = paragraph.split('\n').map(item => item.replace(/^\d+\.\s/, ''));
                    return (
                      <ol key={index} className="list-decimal pl-6 my-4 space-y-2">
                        {items.map((item, i) => (
                          <li key={i} className="text-gray-300">{item}</li>
                        ))}
                      </ol>
                    );
                  } else if (paragraph.startsWith('```')) {
                    // Handle code blocks
                    const code = paragraph.replace(/```.*\n/, '').replace(/```$/, '');
                    return (
                      <pre key={index} className="bg-dark-800 p-4 rounded-lg overflow-x-auto my-6 border border-dark-700">
                        <code className="text-sm font-mono text-gray-300">{code}</code>
                      </pre>
                    );
                  } else if (paragraph.startsWith('>')) {
                    // Handle blockquotes
                    return (
                      <blockquote key={index} className="border-l-4 border-primary-500 pl-4 py-1 my-6 italic text-gray-400">
                        {paragraph.replace('> ', '')}
                      </blockquote>
                    );
                  } else {
                    // Regular paragraph with first paragraph special styling
                    return (
                      <p key={index} className={`${index === 0 ? 'first-letter:text-4xl first-letter:font-bold first-letter:text-primary-500 first-letter:mr-1 first-letter:float-left' : ''} leading-relaxed text-gray-200`}>
                        {paragraph}
                      </p>
                    );
                  }
                })}
                
                {/* Original Source Link with 3D effect */}
                <div className="mt-8 p-6 bg-gradient-to-br from-dark-900 to-black rounded-xl border border-dark-700 transform transition-transform hover:scale-[1.01] shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                  <p className="text-sm text-gray-300 mb-0 flex items-center">
                    <span className="inline-block w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse-subtle"></span>
                    This article has been AI-summarized from the original source. Read the full article at:
                    <a 
                      href={article.originalUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ml-1 text-primary-400 hover:text-primary-300 hover:underline"
                    >
                      {article.sourceName}
                    </a>
                  </p>
                </div>
              </div>
            </article>

            {/* Comments Section */}
            <div className={`mb-10 transition-all duration-300 ${showComments ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" /> Discussion ({comments.length})
              </h2>
              
              {/* Comment Form */}
              <div className="mb-8 bg-dark-500/50 p-4 rounded-xl border border-dark-400">
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10 border-2 border-primary-500/30">
                    <AvatarImage src="https://ui-avatars.com/api/?name=You&background=random" alt="Your profile" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea 
                      placeholder="Share your thoughts on this article..." 
                      className="bg-dark-600 border-dark-400 mb-2"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <Button 
                        onClick={submitComment}
                        disabled={!commentText.trim()}
                        className="bg-primary-600 hover:bg-primary-500"
                      >
                        <SendHorizonal className="mr-2 h-4 w-4" /> Post Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Comments List */}
              <div className="space-y-6">
                {comments.map(comment => (
                  <div key={comment.id} className="bg-dark-500/30 p-4 rounded-xl border border-dark-400 transition-all hover:border-dark-300">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10 border-2 border-primary-500/30">
                        <AvatarImage src={comment.avatarUrl} alt={comment.author} />
                        <AvatarFallback>{comment.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-medium text-white">{comment.author}</h4>
                          <span className="text-xs text-gray-400">
                            {new Date(comment.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-300 mb-2">{comment.content}</p>
                        <div className="flex items-center gap-6">
                          <button 
                            className="flex items-center text-gray-400 hover:text-primary-400 text-xs"
                            onClick={() => handleLike(comment.id)}
                          >
                            <ThumbsUp className="mr-1 h-3 w-3" /> {comment.likes} Likes
                          </button>
                          <button className="flex items-center text-gray-400 hover:text-primary-400 text-xs">
                            <MessageSquare className="mr-1 h-3 w-3" /> Reply
                          </button>
                        </div>
                        
                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="mt-4 pl-6 border-l-2 border-dark-400 space-y-4">
                            {comment.replies.map(reply => (
                              <div key={reply.id} className="bg-dark-600/30 p-3 rounded-lg">
                                <div className="flex items-start gap-2">
                                  <Avatar className="h-8 w-8 border border-primary-500/30">
                                    <AvatarImage src={reply.avatarUrl} alt={reply.author} />
                                    <AvatarFallback>{reply.author[0]}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex justify-between mb-1">
                                      <h5 className="font-medium text-white text-sm">{reply.author}</h5>
                                      <span className="text-xs text-gray-400">
                                        {new Date(reply.timestamp).toLocaleString()}
                                      </span>
                                    </div>
                                    <p className="text-gray-300 text-sm">{reply.content}</p>
                                    <button 
                                      className="flex items-center text-gray-400 hover:text-primary-400 text-xs mt-1"
                                      onClick={() => handleLike(reply.id)}
                                    >
                                      <ThumbsUp className="mr-1 h-3 w-3" /> {reply.likes} Likes
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Related Articles */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-white mb-6 relative inline-block">
                Related Articles
                <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-primary-500 to-transparent"></span>
              </h2>
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
