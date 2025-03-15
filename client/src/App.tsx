import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/lib/theme-provider";
import { SearchProvider } from "@/context/search-context";
import { Suspense, lazy, useEffect } from "react";
import { Loader2 } from "lucide-react";

// Lazy load components for better performance
const Home = lazy(() => import("@/pages/home"));
const ArticlePage = lazy(() => import("@/pages/article"));
const CategoryPage = lazy(() => import("@/pages/category"));
const SearchPage = lazy(() => import("@/pages/search"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex h-[70vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-lg font-medium text-muted-foreground">Loading content...</p>
      </div>
    </div>
  );
}

function Router() {
  const [location] = useLocation();
  
  // Prefetch data for adjacent pages to make transitions smoother
  useEffect(() => {
    // Prefetch home data when on any page
    if (location !== '/') {
      queryClient.prefetchQuery({
        queryKey: ['/api/featured-article'],
      });
      queryClient.prefetchQuery({
        queryKey: ['/api/articles'],
      });
    }
    
    // If on article page, prefetch related articles
    if (location.startsWith('/article/')) {
      const articleId = location.split('/')[2];
      const nextArticleId = parseInt(articleId) + 1;
      queryClient.prefetchQuery({
        queryKey: [`/api/articles/${nextArticleId}`],
      });
    }
    
    // If on category page, prefetch popular categories
    if (location.startsWith('/category/')) {
      queryClient.prefetchQuery({
        queryKey: ['/api/categories'],
      });
    }
  }, [location]);

  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/article/:id" component={ArticlePage} />
        <Route path="/category/:slug" component={CategoryPage} />
        <Route path="/search" component={SearchPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SearchProvider>
          <Router />
          <Toaster />
        </SearchProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
