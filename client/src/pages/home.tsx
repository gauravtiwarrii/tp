import Header from "@/components/header";
import Footer from "@/components/footer";
import FeaturedArticle from "@/components/featured-article";
import TrendingTopics from "@/components/trending-topics";
import ArticleList from "@/components/article-list";
import Sidebar from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Show back to top button when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      <ThemeToggle />
      <Header />

      <main className="container mx-auto px-4 pt-28 md:pt-32">
        <FeaturedArticle />
        <TrendingTopics />

        {/* Latest Articles and Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <ArticleList endpoint="/api/articles" />
          </div>

          <div className="lg:w-1/3">
            <Sidebar />
          </div>
        </div>
      </main>

      <Footer />

      {/* Back to Top Button */}
      <Button
        variant="default"
        size="icon"
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 ${
          showBackToTop ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <ChevronUp className="h-5 w-5" />
        <span className="sr-only">Back to top</span>
      </Button>
    </>
  );
}
