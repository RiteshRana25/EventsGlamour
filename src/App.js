import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout/Layout";
import About from "./pages/About";
import Services from "./pages/Services";
import Wedding from "./pages/Wedding";
import Events from "./pages/Events";
import Celebrations from "./pages/Celebrations";
import Contact from "./pages/Contact";
import ServicesView from "./pages/ServicesView";
import WeddingDetail from "./pages/WeddingDetail";
import EventDetail from "./pages/EventDetail";
import CelebrationDetail from "./pages/CelebrationDetail";
import Portfolio from "./pages/Portfolio";
import PortfolioDetail from "./pages/PortfolioDetail";

function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap all main routes inside the Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceName" element={<ServicesView />} />
          <Route path="/wedding" element={<Wedding />} />
          <Route path="/wedding/:weddingId" element={<WeddingDetail />} />
          <Route path="/corporate-events" element={<Events />} />
          <Route path="/corporate-events/:eventId" element={<EventDetail />} />
          <Route path="/celebrations" element={<Celebrations />} />
          <Route path="/celebrations/:celebrationId" element={<CelebrationDetail />} />          
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
