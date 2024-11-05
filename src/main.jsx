import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { WordsProvider } from './context/WordsContext.jsx';
import "./css/index.css";
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <WordsProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </WordsProvider>
  </StrictMode>,
)
