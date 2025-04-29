
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {  UserProvider } from './contexts/userContext.tsx'
import { ThemeProvider } from './contexts/themeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <ThemeProvider>
    <App />
    </ThemeProvider>
  </UserProvider>  
    
  ,
)
