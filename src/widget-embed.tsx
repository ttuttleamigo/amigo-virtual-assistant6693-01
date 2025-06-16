import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ChatWidget from './components/ChatWidget';
import './index.css';
import './widget-embed.css';

// Create query client for the widget
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Widget component with providers
const AmigoWidget = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatWidget />
    </QueryClientProvider>
  );
};

// Global widget interface
interface WidgetConfig {
  containerId?: string;
  theme?: 'light' | 'dark';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

// Global widget object
declare global {
  interface Window {
    AmigoWidget: {
      init: (config?: WidgetConfig) => void;
      destroy: () => void;
    };
  }
}

let widgetRoot: any = null;

// Widget initialization function
const initWidget = (config: WidgetConfig = {}) => {
  const { containerId = 'amigo-widget-container' } = config;
  
  // Create container if it doesn't exist
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.style.position = 'fixed';
    container.style.zIndex = '999999';
    container.style.pointerEvents = 'none';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    document.body.appendChild(container);
  }

  // Mount the widget
  if (!widgetRoot) {
    widgetRoot = createRoot(container);
    widgetRoot.render(<AmigoWidget />);
  }
};

// Widget destruction function
const destroyWidget = () => {
  if (widgetRoot) {
    widgetRoot.unmount();
    widgetRoot = null;
  }
  
  const container = document.getElementById('amigo-widget-container');
  if (container) {
    container.remove();
  }
};

// Expose global widget object
window.AmigoWidget = {
  init: initWidget,
  destroy: destroyWidget,
};

// Auto-initialize if data attribute is present
document.addEventListener('DOMContentLoaded', () => {
  const autoInit = document.querySelector('[data-amigo-widget="auto"]');
  if (autoInit) {
    initWidget();
  }
});

export { AmigoWidget, initWidget, destroyWidget };
