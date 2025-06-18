import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Optional: React Query Devtools (for debugging)
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
