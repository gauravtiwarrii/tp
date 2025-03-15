import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ArticleList from "@/components/article-list";
import Sidebar from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { DEFAULT_PLACEHOLDER_IMAGE } from "@/lib/constants";
import { Skeleton } from "@/components/ui/skeleton";

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
}

export default function CategoryPage() {
  const { slug } = useParams();
  
  const { data: category, isLoading, error } = useQuery<Category>({
    queryKey: [`/api/categories/${slug}`],
    queryFn: async () => {
      const categoriesRes = await fetch('/api/categories');
      if (!categoriesRes.ok) throw new Error('Failed to fetch categories');
      
      const categories = await categoriesRes.json();
      const foundCategory = categories.find((cat: Category) => cat.slug === slug);
      
      if (!foundCategory) throw new Error('Category not found');
      return foundCategory;
    },
  });
  
  return (
    <>
      <ThemeToggle />
      <Header />
      
      <main className="container mx-auto px-4 pt-28 md:pt-32">
        {/* Category Header */}
        <section className="mb-10">
          {isLoading ? (
            <div className="relative rounded-2xl overflow-hidden h-48 md:h-64 mb-6">
              <Skeleton className="w-full h-full" />
            </div>
          ) : error || !category ? (
            <div className="bg-dark-400 rounded-xl p-8 text-center mb-6">
              <p className="text-gray-300">Category not found.</p>
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden h-48 md:h-64 mb-6">
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent z-10"></div>
              <img 
                src={category.imageUrl || DEFAULT_PLACEHOLDER_IMAGE} 
                alt={category.name} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{category.name}</h1>
                {category.description && (
                  <p className="text-gray-300 max-w-2xl">{category.description}</p>
                )}
              </div>
            </div>
          )}
        </section>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <ArticleList 
              title={`Latest in ${category?.name || 'this category'}`} 
              endpoint={`/api/categories/${slug}/articles`} 
            />
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
