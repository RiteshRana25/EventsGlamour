import { useState } from "react";
import { FaPhone, FaEnvelope, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Reveal from "../components/Reveal/Reveal";
import SEO from "../components/SEO/SEO";
import { cldHero } from "../utils/cloudinary";
import "./Contact.css";

const Contact = () => {
  const accessKey = "8d091216-3e29-4c67-bc69-e34d3be9e905";
  const [contactSending, setContactSending] = useState(false);
  const [reviewSending, setReviewSending] = useState(false);

  const submitToWeb3Forms = async (e, subject, successMessage, setSending) => {
    e.preventDefault();
    setSending(true);
    toast.info("Sending...", { autoClose: 2000 });

    const formDataToSend = new FormData(e.target);
    formDataToSend.append("access_key", accessKey);
    formDataToSend.append("subject", subject);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        toast.success(successMessage, { autoClose: 3000 });
        e.target.reset();
      } else {
        toast.error("Failed to send. Please try again.", { autoClose: 3000 });
        console.error("Web3Forms API response:", data);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", { autoClose: 3000 });
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  const handleContactSubmit = (e) =>
    submitToWeb3Forms(
      e,
      "New Contact Form Submission",
      "Message sent successfully!",
      setContactSending
    );

  const handleReviewSubmit = (e) =>
    submitToWeb3Forms(
      e,
      "New Review Submission",
      "Thank you for your review!",
      setReviewSending
    );

  return (
    <div className="contact-page">
      <SEO
        title="Contact Us | Events Glamour Dubai"
        description="Contact Events Glamour in Dubai for weddings, corporate events, and luxury celebrations. Call +971 52 446 0569 or email info@eventsglamour.com."
        path="/contact"
      />
      <section className="contact-hero">
        <div className="contact-hero-media" aria-hidden="true">
          <img
            src={cldHero(
              "https://res.cloudinary.com/dfdhunrxn/image/upload/v1764154523/IMG_0848_v6egib.jpg"
            )}
            alt=""
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="contact-hero-veil" aria-hidden="true" />
        <div className="contact-hero-content">
          <p className="contact-brand">Events Glamour</p>
          <h1>Contact Us</h1>
          <p className="contact-hero-text">
            Tell us about your celebration — we&apos;ll craft every detail with care.
          </p>
        </div>
      </section>

      <section className="contact-main">
        <Reveal>
          <div className="contact-layout">
            <aside className="contact-aside">
              <h2>Reach Out</h2>
              <p className="contact-aside-lead">
                Whether you&apos;re planning a wedding, corporate gathering, or an
                intimate soirée — we&apos;re here to listen.
              </p>

              <div className="contact-details">
                <a href="tel:+971524460569" className="contact-detail">
                  <span className="contact-detail-icon">
                    <FaPhone />
                  </span>
                  <span>
                    <span className="contact-detail-label">Phone</span>
                    <span className="contact-detail-value">+971 52 446 0569</span>
                  </span>
                </a>

                <a href="mailto:info@eventsglamour.com" className="contact-detail">
                  <span className="contact-detail-icon">
                    <FaEnvelope />
                  </span>
                  <span>
                    <span className="contact-detail-label">Email</span>
                    <span className="contact-detail-value">info@eventsglamour.com</span>
                  </span>
                </a>
              </div>

              <div className="contact-social">
                <span className="contact-social-label">Follow us</span>
                <div className="contact-social-links">
                  <a
                    href="https://www.instagram.com/eventsglamour.ae/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://www.facebook.com/share/17ridaj5R2/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/events-glamour-a49a42384?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </aside>

            <form className="contact-form" onSubmit={handleContactSubmit}>
              <h2>Inquire</h2>
              <p className="contact-form-lead">
                Share a few details and we&apos;ll get back to you shortly.
              </p>

              <div className="form-group">
                <label htmlFor="firstName">Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+971 ..."
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="service">Service</label>
                  <select
                    name="service"
                    id="service"
                    defaultValue="wedding planning"
                    required
                  >
                    <option value="wedding planning">Wedding Planning</option>
                    <option value="corporate event planning">
                      Corporate Event Planning
                    </option>
                    <option value="floristry design">Floristry Design</option>
                    <option value="party decor rentals">Party Decor Rentals</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="guests">Guests</label>
                  <select name="guests" id="guests" defaultValue="0-50" required>
                    <option value="0-50">0–50</option>
                    <option value="50-100">50–100</option>
                    <option value="100-200">100–200</option>
                    <option value="200-300">200–300</option>
                    <option value="300-400">300–400</option>
                    <option value="more than 400">More than 400</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Event details</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Date, venue, vision — whatever helps us prepare..."
                  rows="5"
                  required
                />
              </div>

              <button type="submit" className="submit-btn" disabled={contactSending}>
                {contactSending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </Reveal>
      </section>

      <section className="review-section">
        <Reveal>
          <div className="review-inner">
            <h2>Leave a Review</h2>
            <p className="review-intro">
              Shared a celebration with us? We&apos;d love to hear how it felt.
            </p>

            <form className="review-form" onSubmit={handleReviewSubmit}>
              <div className="form-group">
                <label htmlFor="reviewName">Name</label>
                <input
                  type="text"
                  id="reviewName"
                  name="name"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="review">Your review</label>
                <textarea
                  id="review"
                  name="review"
                  placeholder="Tell us about your experience..."
                  rows="5"
                  required
                />
              </div>

              <button type="submit" className="submit-btn" disabled={reviewSending}>
                {reviewSending ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </Reveal>
      </section>

      <ToastContainer
        position="top-right"
        newestOnTop={true}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
};

export default Contact;
