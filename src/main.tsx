import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Clear admin login state on fresh app load to ensure clean state
// This ensures admin is logged out by default on preview links
if (!sessionStorage.getItem('appLoaded')) {
  localStorage.removeItem('isAdminLoggedIn');
  sessionStorage.setItem('appLoaded', 'true');
}

createRoot(document.getElementById("root")!).render(<App />);
