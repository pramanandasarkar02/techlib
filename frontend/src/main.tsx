
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider, UserProvider } from './contexts/userContext.tsx'

createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <ThemeProvider>
    <App />
    </ThemeProvider>
  </UserProvider>  
    
  ,
)
