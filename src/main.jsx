import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Remove HashRouter import - No need
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />    {/* No HashRouter wrapper */}
  </StrictMode>,
)