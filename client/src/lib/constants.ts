export const SITE_NAME = "SillyGeeks";
export const SITE_DESCRIPTION = "AI-Powered Tech News";
export const SITE_URL = "https://sillygeeks.tech";

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "AI", href: "/category/ai" },
  { name: "Gadgets", href: "/category/gadgets" },
  { name: "Reviews", href: "/category/reviews" },
  { name: "Software", href: "/category/software" }
];

export const TRENDING_TOPICS = [
  { name: "AI Ethics", articles: 187, slug: "ai-ethics", imageUrl: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a" },
  { name: "Quantum Computing", articles: 243, slug: "quantum-computing", imageUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f" },
  { name: "Mixed Reality", articles: 156, slug: "mixed-reality", imageUrl: "https://images.unsplash.com/photo-1622979135226-a2de68307431" },
  { name: "Crypto", articles: 142, slug: "crypto", imageUrl: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74" },
  { name: "Smartphones", articles: 118, slug: "smartphones", imageUrl: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1" },
  { name: "Robotics", articles: 97, slug: "robotics", imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81" }
];

export const POPULAR_TAGS = [
  "MachineLearning", "SmartHome", "Cybersecurity", "5G", 
  "DeepLearning", "CloudComputing", "IoT", "AR", "BigData"
];

export const AI_INSIGHTS = [
  { 
    name: "Neuromorphic Computing", 
    increase: "189% increase in last 24 hours",
    color: "primary" 
  },
  { 
    name: "Sustainable Tech", 
    increase: "142% increase in last 24 hours",
    color: "secondary" 
  },
  { 
    name: "Open Source AI Models", 
    increase: "97% increase in last 24 hours",
    color: "yellow" 
  }
];

export const TRENDING_SEARCHES = ["GPT-5", "RTX 5090", "Web3"];

export const DEFAULT_PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1620712943543-bcc4688e7485";

export const formatDate = (date: string | Date) => {
  const d = new Date(date);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000 / 60); // minutes

  if (diff < 1) return 'just now';
  if (diff < 60) return `${diff} minute${diff > 1 ? 's' : ''} ago`;
  
  const hours = Math.floor(diff / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};
