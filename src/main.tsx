import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { testSupabaseConnection } from './lib/supabase';

// Testar conexão em desenvolvimento
if (process.env.NODE_ENV === 'development') {
  testSupabaseConnection().then(connected => {
    if (connected) console.log('✅ Conectado ao Supabase com sucesso.');
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
