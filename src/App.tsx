
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChatProvider } from './context/ChatContext';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

// Import page components at the top level so they have a stable reference.
import IndexPage from './pages/Index'; 
import WidgetPage from './pages/Widget';
import NotFoundPage from './pages/NotFound';

// Create the query client instance outside of the component function.
const queryClient = new QueryClient();

function App() {
  // The App component should only return the provider and routing structure.
  // There should be no component definitions inside this function.
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter> {/* 1. Router is now a high-level provider. */}
        <TooltipProvider>
          <ChatProvider> {/* 2. Chat state is now safely inside the router. */}
            <Toaster />
            <Sonner />
            
            {/* The Routes component now renders stable component references. */}
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="/widget" element={<WidgetPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>

          </ChatProvider>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
