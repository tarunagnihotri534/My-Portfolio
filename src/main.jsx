import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ProjectsPage from './ProjectsPage.jsx'
import ScrollToTop from './ScrollToTop.jsx'

// StrictMode removed — it double-invokes useEffect in dev which
// creates two Lenis instances fighting each other, causing the
// "pause-then-scroll" stutter. Everything still works correctly.
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/projects" element={<ProjectsPage />} />
    </Routes>
  </BrowserRouter>
)
