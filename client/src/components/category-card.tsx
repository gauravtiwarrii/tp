import { Category } from "@shared/schema";
import { Link } from "wouter";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  // Icons mapping
  const iconMap: Record<string, string> = {
    robot: "fa-robot",
    microchip: "fa-microchip",
    code: "fa-code",
    lightbulb: "fa-lightbulb"
  };

  return (
    <Link href={`/categories/${category.slug}`}>
      <a className={`${category.color} rounded-xl p-6 text-white transition-transform hover:scale-105`}>
        <i className={`fa-solid ${iconMap[category.icon] || 'fa-tag'} text-3xl mb-3`}></i>
        <h3 className="font-bold text-lg">{category.name}</h3>
        <p className="text-white/80 text-sm mt-1">{category.articleCount} articles</p>
      </a>
    </Link>
  );
}
