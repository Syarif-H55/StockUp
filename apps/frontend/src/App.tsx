import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

// React Query client configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 menit
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * Root component StockUp Frontend.
 * Menyediakan providers: Router, React Query, Toast notifications.
 * Routing akan diimplementasikan di Phase 2.
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="app">
          <main className="main-content">
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              gap: '1rem',
            }}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-primary-700)' }}>
                🚀 StockUp
              </h1>
              <p style={{ fontSize: '1.125rem', color: 'var(--color-neutral-600)' }}>
                Smarter Sourcing Discovery Platform for Food Businesses & Beverage
              </p>
              <div style={{
                marginTop: '2rem',
                padding: '1.5rem 2rem',
                background: 'var(--color-primary-50)',
                borderRadius: '12px',
                border: '1px solid var(--color-primary-200)',
              }}>
                <p style={{ color: 'var(--color-primary-700)', fontWeight: 500 }}>
                  ✅ Phase 1: Project Foundation — Selesai
                </p>
                <p style={{ color: 'var(--color-neutral-500)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  Monorepo, Backend (NestJS), Frontend (React/Vite), Database (Prisma), Shared Types
                </p>
              </div>
            </div>
          </main>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                borderRadius: '8px',
                background: 'var(--color-neutral-900)',
                color: '#fff',
                fontSize: '0.875rem',
              },
            }}
          />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
