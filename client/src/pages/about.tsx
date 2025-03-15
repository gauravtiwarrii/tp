import Header from "@/components/header";
import Footer from "@/components/footer";
import { Cpu, Bot, BarChart, Database, Shield, Users, Code, Rocket, Award } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero section with gradient background */}
        <div className="relative bg-gradient-to-b from-black via-dark-950 to-dark-900 py-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className={`text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-blue-400 transition-all duration-1000 ${isLoaded ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-4'}`}>
                About {SITE_NAME}
              </h1>
              <p className={`text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-4'}`}>
                Transforming how you consume tech news with AI-powered intelligence and human expertise.
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500/20 via-primary-500/80 to-primary-500/20"></div>
        </div>
            
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <section className="mb-16">
              <div className="relative mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white inline-block">Our Mission</h2>
                <div className="absolute -bottom-1 left-0 h-1 w-24 bg-gradient-to-r from-primary-500 to-transparent"></div>
              </div>
              
              <div className="bg-dark-900/50 p-8 rounded-xl border border-dark-800 shadow-[0_10px_30px_rgba(0,0,0,0.2)] relative overflow-hidden mb-8">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <p className="text-gray-300 mb-4 relative z-10 leading-relaxed">
                  At {SITE_NAME}, we're revolutionizing tech news consumption through cutting-edge AI technology. 
                  Our mission is to keep you informed about the latest technology trends, innovations, and news 
                  with content that's automatically curated, summarized, and categorized for maximum relevance.
                </p>
                <p className="text-gray-300 relative z-10 leading-relaxed">
                  We believe that staying informed about technology shouldn't require hours of reading. 
                  Our AI-powered platform sifts through the noise to bring you the most important tech news 
                  in a clear, concise format, saving you time while keeping you knowledgeable.
                </p>
              </div>
            </section>

            <section className="mb-16">
              <div className="relative mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white inline-block">How Our Platform Works</h2>
                <div className="absolute -bottom-1 left-0 h-1 w-24 bg-gradient-to-r from-primary-500 to-transparent"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-dark-900/70 p-6 rounded-xl border border-dark-800 shadow-md transform transition-transform hover:scale-[1.02] duration-300 hover:shadow-primary-500/20 group">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center mr-4 border border-dark-700 group-hover:border-primary-500/30 transition-colors shadow-inner">
                      <Database className="h-6 w-6 text-primary-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Content Aggregation</h3>
                  </div>
                  <p className="text-gray-300">
                    Our system constantly scans reputable tech news sources across the web, 
                    collecting the latest articles and updates from trusted publications every 10 minutes.
                  </p>
                </div>
                
                <div className="bg-dark-900/70 p-6 rounded-xl border border-dark-800 shadow-md transform transition-transform hover:scale-[1.02] duration-300 hover:shadow-primary-500/20 group">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center mr-4 border border-dark-700 group-hover:border-primary-500/30 transition-colors shadow-inner">
                      <Bot className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">AI Processing</h3>
                  </div>
                  <p className="text-gray-300">
                    Advanced AI models analyze the content, extract key information, generate 
                    concise summaries, and categorize articles with remarkable accuracy.
                  </p>
                </div>
                
                <div className="bg-dark-900/70 p-6 rounded-xl border border-dark-800 shadow-md transform transition-transform hover:scale-[1.02] duration-300 hover:shadow-primary-500/20 group">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center mr-4 border border-dark-700 group-hover:border-primary-500/30 transition-colors shadow-inner">
                      <BarChart className="h-6 w-6 text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Relevance Ranking</h3>
                  </div>
                  <p className="text-gray-300">
                    Our algorithms prioritize content based on significance, timeliness, and 
                    reader engagement, ensuring you see the most important news first.
                  </p>
                </div>
                
                <div className="bg-dark-900/70 p-6 rounded-xl border border-dark-800 shadow-md transform transition-transform hover:scale-[1.02] duration-300 hover:shadow-primary-500/20 group">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center mr-4 border border-dark-700 group-hover:border-primary-500/30 transition-colors shadow-inner">
                      <Users className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Human Oversight</h3>
                  </div>
                  <p className="text-gray-300">
                    While AI drives our platform, our team regularly reviews the process to 
                    ensure quality, accuracy, and adherence to our editorial standards.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-16">
              <div className="relative mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white inline-block">Our Values</h2>
                <div className="absolute -bottom-1 left-0 h-1 w-24 bg-gradient-to-r from-primary-500 to-transparent"></div>
              </div>
              
              <div className="space-y-6">
                <div className="flex bg-dark-900/70 p-6 rounded-xl border border-dark-800 shadow-md transform transition-transform hover:scale-[1.01] duration-300 hover:shadow-primary-500/20">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center flex-shrink-0 mr-4 border border-dark-700 shadow-inner">
                    <Shield className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Credibility & Transparency</h3>
                    <p className="text-gray-300">
                      We clearly indicate when content has been processed by AI and maintain links to original sources.
                      Our priority is providing trustworthy information from reputable sources.
                    </p>
                  </div>
                </div>
                
                <div className="flex bg-dark-900/70 p-6 rounded-xl border border-dark-800 shadow-md transform transition-transform hover:scale-[1.01] duration-300 hover:shadow-primary-500/20">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center flex-shrink-0 mr-4 border border-dark-700 shadow-inner">
                    <Cpu className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Innovation in Tech Journalism</h3>
                    <p className="text-gray-300">
                      We're constantly improving our AI models and refining our processes to deliver 
                      the most efficient, accurate, and valuable tech news experience possible.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Team Section with Creator info */}
            <section className="mb-16">
              <div className="relative mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white inline-block">Our Team</h2>
                <div className="absolute -bottom-1 left-0 h-1 w-24 bg-gradient-to-r from-primary-500 to-transparent"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-dark-900/70 p-6 rounded-xl border border-dark-800 shadow-md text-center group hover:border-primary-500/30 transition-colors">
                  <div className="relative mx-auto w-32 h-32 mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-blue-500 blur-md opacity-50 group-hover:opacity-70 transition-opacity"></div>
                    <Avatar className="w-32 h-32 border-4 border-dark-800 group-hover:border-primary-500/50 transition-colors">
                      <AvatarImage src="https://ui-avatars.com/api/?name=Gaurav+Tiwari&background=random&size=256" />
                      <AvatarFallback className="bg-dark-800 text-primary-400 text-2xl font-bold">GT</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-1">Gaurav Tiwari</h3>
                  <p className="text-primary-400 mb-4 font-medium">Founder & Developer</p>
                  <p className="text-gray-300 text-sm">
                    Tech visionary and innovative entrepreneur with expertise in AI and web development.
                    Creator of {SITE_NAME}.
                  </p>
                </div>
              
                <div className="bg-dark-900/70 p-6 rounded-xl border border-dark-800 shadow-md text-center group hover:border-primary-500/30 transition-colors">
                  <div className="relative mx-auto w-32 h-32 mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-md opacity-50 group-hover:opacity-70 transition-opacity"></div>
                    <Avatar className="w-32 h-32 border-4 border-dark-800 group-hover:border-primary-500/50 transition-colors">
                      <AvatarImage src="https://ui-avatars.com/api/?name=AI+Engineer&background=random&size=256" />
                      <AvatarFallback className="bg-dark-800 text-blue-400 text-2xl font-bold">AI</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-1">AI Team</h3>
                  <p className="text-blue-400 mb-4 font-medium">Content Processing</p>
                  <p className="text-gray-300 text-sm">
                    Our advanced AI models power the content aggregation, summarization,
                    and categorization processes.
                  </p>
                </div>
                
                <div className="bg-dark-900/70 p-6 rounded-xl border border-dark-800 shadow-md text-center group hover:border-primary-500/30 transition-colors">
                  <div className="relative mx-auto w-32 h-32 mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-md opacity-50 group-hover:opacity-70 transition-opacity"></div>
                    <Avatar className="w-32 h-32 border-4 border-dark-800 group-hover:border-primary-500/50 transition-colors">
                      <AvatarImage src="https://ui-avatars.com/api/?name=Editorial+Team&background=random&size=256" />
                      <AvatarFallback className="bg-dark-800 text-purple-400 text-2xl font-bold">ET</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-1">Editorial Team</h3>
                  <p className="text-purple-400 mb-4 font-medium">Quality Assurance</p>
                  <p className="text-gray-300 text-sm">
                    Our team ensures accuracy and quality of all content, maintaining 
                    editorial standards and oversight.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-16">
              <div className="relative mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white inline-block">Our Technology</h2>
                <div className="absolute -bottom-1 left-0 h-1 w-24 bg-gradient-to-r from-primary-500 to-transparent"></div>
              </div>
              
              <div className="bg-dark-900/70 p-8 rounded-xl border border-dark-800 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center p-4 bg-dark-800/50 rounded-lg border border-dark-700 hover:border-primary-500/30 transition-colors">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-dark-700 to-dark-800 flex items-center justify-center mb-4 border border-dark-600 shadow-inner">
                      <Code className="h-8 w-8 text-primary-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Modern Stack</h4>
                    <p className="text-gray-300 text-sm">
                      Built with React, Node.js, and cutting-edge web technologies for optimal performance.
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4 bg-dark-800/50 rounded-lg border border-dark-700 hover:border-primary-500/30 transition-colors">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-dark-700 to-dark-800 flex items-center justify-center mb-4 border border-dark-600 shadow-inner">
                      <Rocket className="h-8 w-8 text-blue-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">AI Integration</h4>
                    <p className="text-gray-300 text-sm">
                      Leveraging state-of-the-art AI models for content processing and analysis.
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4 bg-dark-800/50 rounded-lg border border-dark-700 hover:border-primary-500/30 transition-colors">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-dark-700 to-dark-800 flex items-center justify-center mb-4 border border-dark-600 shadow-inner">
                      <Award className="h-8 w-8 text-yellow-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Premium Experience</h4>
                    <p className="text-gray-300 text-sm">
                      Designed for optimal user experience with responsive, 3D-styled interfaces.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="relative mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white inline-block">Contact Us</h2>
                <div className="absolute -bottom-1 left-0 h-1 w-24 bg-gradient-to-r from-primary-500 to-transparent"></div>
              </div>
              
              <div className="bg-dark-900/70 p-8 rounded-xl border border-dark-800 shadow-md transform transition-transform hover:scale-[1.01] duration-300 hover:shadow-primary-500/20">
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Have questions, feedback, or suggestions? We'd love to hear from you. 
                  Visit our <a href="/contact" className="text-primary-400 hover:text-primary-300 hover:underline transition-colors">Contact page</a> or 
                  email us at <a href="mailto:info@sillygeeks.tech" className="text-primary-400 hover:text-primary-300 hover:underline transition-colors">info@sillygeeks.tech</a>.
                </p>
                
                <div className="flex justify-center">
                  <a 
                    href="/contact" 
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-blue-600 text-white font-medium rounded-lg hover:from-primary-500 hover:to-blue-500 transition-all duration-300 shadow-md hover:shadow-primary-500/20"
                  >
                    Get in Touch
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}