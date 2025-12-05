import './Contact.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {

  const accessKey = "8d091216-3e29-4c67-bc69-e34d3be9e905"; // Web3Forms access key

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.info("Sending message...", { autoClose: 2000 });

    const formDataToSend = new FormData(e.target);
    formDataToSend.append("access_key", accessKey);
    formDataToSend.append("subject", "New Contact Form Submission");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Message sent successfully!", { autoClose: 3000 });
        e.target.reset(); // reset form fields
      } else {
        toast.error("Failed to send message. Please try again.", { autoClose: 3000 });
        console.error("Web3Forms API response:", data);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", { autoClose: 3000 });
      console.error(error);
    }
  };

  return (
    <div className="contact-container">
      <h1>Let’s Make Your Next Event Glamorous!</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            placeholder="Name *"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email *"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number *"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="service">What Service Are You Interested In?</label>
          <select name="service" id="service" defaultValue="wedding planning" required>
            <option value="wedding planning">Wedding Planning</option>
            <option value="corporate event planning">Corporate Event Planning</option>
            <option value="floristry design">Floristry Design</option>
            <option value="party decor rentals">Party Decor Rentals</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="guests">How Many Guests Are You Planning For?</label>
          <select name="guests" id="guests" defaultValue="0-50" required>
            <option value="0-50">0-50</option>
            <option value="50-100">50-100</option>
            <option value="100-200">100-200</option>
            <option value="200-300">200-300</option>
            <option value="300-400">300-400</option>
            <option value="more than 400">More than 400</option>
          </select>
        </div>

        <div className="form-group">
          <textarea
            name="message"
            placeholder="Write About Your Event Details Here..."
            rows="5"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Send Message</button>
      </form>

      {/* Toast Container */}
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
