import { Link } from "wouter";
import { SITE_NAME } from "@/lib/constants";
import { Cpu } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark-400 mt-16 border-t border-dark-300">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-dark-300 rounded-full flex items-center justify-center">
                <Cpu className="text-primary-500 h-4 w-4" />
              </div>
              <span className="text-xl font-bold text-white">{SITE_NAME}</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Bringing you the latest tech news and innovations, powered by advanced AI content curation.
            </p>
            <div className="flex space-x-3">
              <Link href="#" className="w-8 h-8 bg-dark-300 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </Link>
              <Link href="#" className="w-8 h-8 bg-dark-300 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </Link>
              <Link href="#" className="w-8 h-8 bg-dark-300 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </Link>
              <Link href="#" className="w-8 h-8 bg-dark-300 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><Link href="/category/ai" className="text-gray-400 hover:text-primary-400 text-sm">Artificial Intelligence</Link></li>
              <li><Link href="/category/gadgets" className="text-gray-400 hover:text-primary-400 text-sm">Gadgets & Hardware</Link></li>
              <li><Link href="/category/software" className="text-gray-400 hover:text-primary-400 text-sm">Software & Apps</Link></li>
              <li><Link href="/category/cybersecurity" className="text-gray-400 hover:text-primary-400 text-sm">Cybersecurity</Link></li>
              <li><Link href="/category/tech-industry" className="text-gray-400 hover:text-primary-400 text-sm">Tech Industry</Link></li>
              <li><Link href="/category/innovation" className="text-gray-400 hover:text-primary-400 text-sm">Innovation</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-primary-400 text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-primary-400 text-sm">Contact</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-primary-400 text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-primary-400 text-sm">Terms of Service</Link></li>
              <li><Link href="/advertise" className="text-gray-400 hover:text-primary-400 text-sm">Advertise</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-primary-400 text-sm">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Our AI Technology</h4>
            <ul className="space-y-2">
              <li><Link href="/how-it-works" className="text-gray-400 hover:text-primary-400 text-sm">How It Works</Link></li>
              <li><Link href="/content-sourcing" className="text-gray-400 hover:text-primary-400 text-sm">Content Sourcing</Link></li>
              <li><Link href="/ethics" className="text-gray-400 hover:text-primary-400 text-sm">Ethics & Guidelines</Link></li>
              <li><Link href="/oversight" className="text-gray-400 hover:text-primary-400 text-sm">Human Oversight</Link></li>
              <li><Link href="/api-docs" className="text-gray-400 hover:text-primary-400 text-sm">API Documentation</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-dark-300 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} {SITE_NAME}. All rights reserved. AI-assisted content.</p>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-500 text-xs">Content is AI-curated from multiple sources and reviewed by our editorial team.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
