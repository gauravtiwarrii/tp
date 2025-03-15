import Header from "@/components/header";
import Footer from "@/components/footer";
import { Cpu, Bot, BarChart, Database, Shield, Users } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">About {SITE_NAME}</h1>
            
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                At {SITE_NAME}, we're revolutionizing tech news consumption through cutting-edge AI technology. 
                Our mission is to keep you informed about the latest technology trends, innovations, and news 
                with content that's automatically curated, summarized, and categorized for maximum relevance.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                We believe that staying informed about technology shouldn't require hours of reading. 
                Our AI-powered platform sifts through the noise to bring you the most important tech news 
                in a clear, concise format, saving you time while keeping you knowledgeable.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">How Our Platform Works</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <Database className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-xl font-medium">Content Aggregation</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our system constantly scans reputable tech news sources across the web, 
                    collecting the latest articles and updates from trusted publications.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <Bot className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-xl font-medium">AI Processing</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Advanced AI models analyze the content, extract key information, generate 
                    concise summaries, and categorize articles with remarkable accuracy.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <BarChart className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-xl font-medium">Relevance Ranking</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our algorithms prioritize content based on significance, timeliness, and 
                    reader engagement, ensuring you see the most important news first.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <Users className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-xl font-medium">Human Oversight</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    While AI drives our platform, our team regularly reviews the process to 
                    ensure quality, accuracy, and adherence to our editorial standards.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
              
              <div className="space-y-4">
                <div className="flex">
                  <Shield className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-medium mb-2">Credibility & Transparency</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We clearly indicate when content has been processed by AI and maintain links to original sources.
                      Our priority is providing trustworthy information from reputable sources.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <Cpu className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-medium mb-2">Innovation in Tech Journalism</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We're constantly improving our AI models and refining our processes to deliver 
                      the most efficient, accurate, and valuable tech news experience possible.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Have questions, feedback, or suggestions? We'd love to hear from you. 
                Visit our <a href="/contact" className="text-primary hover:underline">Contact page</a> or 
                email us at <a href="mailto:info@sillygeeks.tech" className="text-primary hover:underline">info@sillygeeks.tech</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}