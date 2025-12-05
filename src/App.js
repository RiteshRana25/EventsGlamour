import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from 'react-helmet';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout/Layout";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import ServicesView from "./pages/ServicesView";
import Portfolio from "./pages/Portfolio";
import PortfolioDetail from "./pages/PortfolioDetail";

function App() {
  return (
    <>
    <Helmet>
        <title>Events Glamour</title>
        <meta
          name="description"
          content="Events Glamour is a premier event management company in Dubai offering weddings, corporate events, luxury parties, catering, furniture rentals, entertainment, and production services. We design unforgettable experiences with elegance, creativity, and precision."
        />
      </Helmet>
    <Router>
      <Routes>
        {/* Wrap all main routes inside the Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceName" element={<ServicesView />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />
        </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
