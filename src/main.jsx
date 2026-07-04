import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ProjectsPage from './ProjectsPage.jsx'
import ContactPage from './ContactPage.jsx'
import ScrollToTop from './ScrollToTop.jsx'

// Detect if this is a page reload (vs fresh open or SPA navigation)
function isPageReload() {
  try {
    return performance.getEntriesByType('navigation')[0]?.type === 'reload';
  } catch {
    return false;
  }
}

const wasReload = isPageReload();

// Wrapper that redirects to / on reload if not already there
function ReloadRedirect({ element }) {
  if (wasReload && window.location.pathname !== '/') {
    return <Navigate to="/" replace />;
  }
  return element;
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/projects" element={<ReloadRedirect element={<ProjectsPage />} />} />
      <Route path="/contact"  element={<ReloadRedirect element={<ContactPage />} />} />
    </Routes>
  </BrowserRouter>
)
