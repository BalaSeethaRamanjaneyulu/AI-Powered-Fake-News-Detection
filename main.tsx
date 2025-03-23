// src/main.tsx
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);

// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

// src/pages/Index.tsx
import { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import ChatInterface from '@/components/ChatInterface';
import ArticleAnalyzer from '@/components/ArticleAnalyzer';
import ResultCard from '@/components/ResultCard';
import Footer from '@/components/Footer';

const Index = () => {
  // Example recent results
  const recentResults = [
    {
      title: "Groundbreaking New Study Reveals Shocking Health Benefits",
      url: "healthnews.example.com",
      date: "2 hours ago",
      credibilityScore: 0.25,
      summary: "This article makes exaggerated claims not supported by the actual study referenced.",
      details: [
        "The headline uses sensationalist language not justified by the findings.",
        "The study cited was preliminary and had a very small sample size.",
        "Key limitations of the research were not mentioned.",
        "Quotes from researchers were taken out of context."
      ]
    },
    {
      title: "Global Economic Report Predicts Major Shifts in Market Trends",
      url: "economicreview.example.com",
      date: "Yesterday",
      credibilityScore: 0.85,
      summary: "This article accurately summarizes findings from a reputable economic report.",
      details: [
        "Information is presented objectively with proper context.",
        "Claims are backed by data from credible sources.",
        "Expert opinions are presented with appropriate qualifications.",
        "Balanced presentation of different viewpoints on the implications."
      ]
    },
    {
      title: "Political Scandal Rocks Administration - What You Need to Know",
      url: "newsdaily.example.com",
      date: "3 days ago",
      credibilityScore: 0.55,
      summary: "This article contains some factual reporting mixed with unverified claims.",
      details: [
        "Core events are accurately reported based on public records.",
        "Some anonymous sources are cited without corroboration.",
        "Contains opinion statements presented as facts.",
        "Timeline of events is presented with some inaccuracies."
      ]
    }
  ];
  
  // Smooth scroll to anchor links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    
    // Handle hash on page load
    handleHashChange();
    
    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <NavBar />
      
      <main className="flex-1">
        <Hero />
        
        <ChatInterface />
        
        <ArticleAnalyzer />
        
        {/* Recent Analyses Section */}
        <section id="how-it-works" className="w-full py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Recent Analyses</h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                See examples of our AI's analysis of recent news articles from across the web.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 animate-fade-in">
              {recentResults.map((result, index) => (
                <ResultCard 
                  key={index}
                  {...result}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="w-full py-20 px-6 bg-secondary/40">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                Our advanced AI system analyzes news content using multiple verification methods
                to determine credibility.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Content Analysis",
                  description: "Our AI examines the text for sensationalist language, logical fallacies, and factual inconsistencies."
                },
                {
                  title: "Source Verification",
                  description: "We evaluate the credibility of the publication, author, and cited sources to establish reliability."
                },
                {
                  title: "Cross-referencing",
                  description: "Facts are checked against a database of verified information from reliable sources."
                }
              ].map((step, index) => (
                <div 
                  key={index}
                  className="glass-panel rounded-xl p-6 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-primary">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-foreground/70">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

// src/components/NavBar.tsx
import { useState, useEffect } from 'react';
import { useAnimatedMount } from '@/utils/animationUtils';
import { cn } from '@/lib/utils';

const NavBar = () => {
  const isMounted = useAnimatedMount();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 md:px-10 py-6",
        scrolled ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-subtle" : "bg-transparent",
        isMounted ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-primary/90 animate-pulse-subtle" />
          </div>
          <span className="font-medium text-lg tracking-tight">TruthLens</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {['Home', 'How it works', 'About', 'FAQ'].map((item, index) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className={cn(
                "text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative py-2",
                "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary/70 after:transition-all after:duration-300",
                "hover:after:w-full after:w-0"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="text-sm font-medium px-4 py-2 text-primary/90 hover:text-primary transition-colors">
            Log in
          </button>
          <button className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-full hover:shadow-md transition-all duration-300 active:scale-[0.98]">
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;

// src/components/Hero.tsx
import { useState } from 'react';
import { useAnimatedMount, staggeredDelay } from '@/utils/animationUtils';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const isMounted = useAnimatedMount();
  const [isHovering, setIsHovering] = useState(false);
  
  const scrollToChat = () => {
    const chatSection = document.getElementById('chat-section');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center pt-20 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent" />
      
      {/* Animated gradient circles */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-60 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-60 -right-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDuration: '10s' }} />
      
      <div className={cn(
        "max-w-3xl mx-auto text-center z-10 transition-all duration-1000",
        isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <div className="inline-block mb-6 px-4 py-1.5 bg-primary/10 rounded-full">
          <span className="text-sm font-medium text-primary/90">AI-powered Fake News Detection</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
          Discover the Truth Behind the Headlines
        </h1>
        
        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 text-balance">
          TruthLens uses advanced AI to analyze news articles and detect potential misinformation, helping you navigate the complex information landscape with confidence.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button 
            onClick={scrollToChat}
            className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium shadow-subtle hover:shadow-elevated transition-all duration-300 active:scale-[0.98]"
          >
            Try it now
          </button>
          
          <button className="w-full sm:w-auto px-8 py-3 bg-white dark:bg-black/40 text-foreground rounded-full font-medium shadow-subtle border border-border/50 hover:border-border transition-all duration-300 active:scale-[0.98]">
            Learn more
          </button>
        </div>
      </div>
      
      <div 
        className={cn(
          "absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer transition-all duration-500",
          isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
        onClick={scrollToChat}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <ChevronDown 
          size={24} 
          className={cn(
            "text-foreground/60 transition-all duration-300",
            isHovering ? "text-foreground animate-bounce-subtle" : ""
          )} 
        />
      </div>
    </section>
  );
};

export default Hero;

// src/components/Footer.tsx
import { useAnimatedMount } from '@/utils/animationUtils';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';

const Footer = () => {
  const isMounted = useAnimatedMount(800);
  
  return (
    <footer 
      className={cn(
        "w-full py-16 px-6 bg-background border-t border-border/40 transition-all duration-1000",
        isMounted ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-primary/90" />
              </div>
              <span className="font-medium text-lg">TruthLens</span>
            </div>
            <p className="text-foreground/70 max-w-md mb-6">
              Empowering users to navigate the complex information landscape with confidence through
              advanced AI-powered fake news detection and analysis.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'facebook', 'instagram', 'github'].map((social) => (
                <a 
                  key={social}
                  href={`#${social}`}
                  className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-foreground/70 hover:text-foreground hover:border-border transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="w-5 h-5" aria-hidden="true">
                    <rect width="100%" height="100%" fill="transparent" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-base mb-4">Product</h3>
            <ul className="space-y-3">
              {['Features', 'How it works', 'Pricing', 'FAQ'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-foreground/70 hover:text-foreground transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-base mb-4">Company</h3>
            <ul className="space-y-3">
              {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-foreground/70 hover:text-foreground transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60 mb-4 md:mb-0">
            ©️ {new Date().getFullYear()} TruthLens. All rights reserved.
          </p>
          <div className="flex items-center text-sm text-foreground/60">
            <span>Made with</span>
            <Heart size={14} className="mx-1 text-red-400" />
            <span>by TruthLens Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// src/utils/animationUtils.ts
import { useState, useEffect, useRef } from 'react';

/**
 * Hook for creating a smooth mount animation with a delay
 */
export const useAnimatedMount = (delay = 0) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return isMounted;
};

/**
 * Helper function to generate staggered animation delays
 */
export const staggeredDelay = (index: number, baseDelay = 100) => {
  return `${index * baseDelay}ms`;
};

/**
 * Hook for creating a typing effect
 */
export const useTypingEffect = (text: string, speed = 50, delay = 0) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTyping, setStartTyping] = useState(false);
  
  useEffect(() => {
    // Reset when text changes
    setDisplayedText('');
    setCurrentIndex(0);
    
    // Delay before starting
    const startTimer = setTimeout(() => {
      setStartTyping(true);
    }, delay);
    
    return () => clearTimeout(startTimer);
  }, [text, delay]);
  
  useEffect(() => {
    if (!startTyping) return;
    
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed, startTyping]);
  
  return displayedText;
};

// src/utils/apiService.ts
/**
 * API Service for connecting to the backend running on localhost
 */

const API_BASE_URL = 'http://localhost:3000'; // Change this port if your backend runs on a different port

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Generic API request function with error handling
 */
async function apiRequest<T>(
  endpoint: string, 
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any
): Promise<ApiResponse<T>> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      method,
      headers,
      credentials: 'include', // Includes cookies for cross-origin requests if needed
    };

    if (body && (method === 'POST' || method === 'PUT')) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || `Error: ${response.status} ${response.statusText}`
      };
    }

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error("API request failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * API methods for article analysis
 */
export const articleApi = {
  /**
   * Analyze an article by URL
   */
  analyzeArticle: async (url: string): Promise<ApiResponse<any>> => {
    return apiRequest('/analyze-article', 'POST', { url });
  },
  
  /**
   * Get recent article analyses
   */
  getRecentAnalyses: async (): Promise<ApiResponse<any[]>> => {
    return apiRequest('/recent-analyses');
  }
};

/**
 * API methods for chat functionality
 */
export const chatApi = {
  /**
   * Send a message to get fact-checking analysis
   */
  sendMessage: async (message: string): Promise<ApiResponse<any>> => {
    return apiRequest('/chat', 'POST', { message });
  },
  
  /**
   * Get chat history
   */
  getChatHistory: async (): Promise<ApiResponse<any[]>> => {
    return apiRequest('/chat-history');
  }
};

// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// src/index.css
/* 
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 210 40% 98%;
    --foreground: 222 47% 11%;

    --card: 0 0% 100%;
    --card-foreground: 222 47% 11%;

    --popover: 0 0% 100%;
    --popover-foreground: 222 47% 11%;

    --primary: 222 47% 11%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96%;
    --secondary-foreground: 222 47% 11%;

    --muted: 210 40% 96%;
    --muted-foreground: 215 16% 47%;

    --accent: 210 40% 96%;
    --accent-foreground: 222 47% 11%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 210 40% 98%;

    --border: 214 32% 91%;
    --input: 214 32% 91%;
    --ring: 222 47% 11%;

    --radius: 0.75rem;

    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5% 26%;
    --sidebar-primary: 240 6% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 5% 96%;
    --sidebar-accent-foreground: 240 6% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217 91% 60%;
  }

  .dark {
    --background: 222 47% 7%;
    --foreground: 210 40% 98%;

    --card: 222 47% 11%;
    --card-foreground: 210 40% 98%;

    --popover: 222 47% 11%;
    --popover-foreground: 210 40% 98%;

    --primary: 210 40% 98%;
    --primary-foreground: 222 47% 11%;

    --secondary: 217 33% 18%;
    --secondary-foreground: 210 40% 98%;

    --muted: 217 33% 18%;
    --muted-foreground: 215 20% 65%;

    --accent: 217 33% 18%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;

    --border: 217 33% 18%;
    --input: 217 33% 18%;
    --ring: 213 27% 84%;
    
    --sidebar-background: 240 6% 10%;
    --sidebar-foreground: 240 5% 96%;
    --sidebar-primary: 224 76% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 4% 16%;
    --sidebar-accent-foreground: 240 5% 96%;
    --sidebar-border: 240 4% 16%;
    --sidebar-ring: 217 91% 60%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: "ss01", "ss02", "cv01", "cv02";
  }
}

@layer components {
  .glass-panel {
    @apply bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-black/20 shadow-glass;
  }
  
  .text-balance {
    text-wrap: balance;
  }
  
  .input-transition {
    @apply transition-all duration-300 ease-in-out;
  }
  
  .input-focus {
    @apply focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30;
  }
  
  .button-hover {
    @apply hover:shadow-subtle active:scale-[0.98] transition-all duration-200;
  }
  
  .section-transition {
    @apply transition-all duration-500 ease-in-out;
  }
}
*/