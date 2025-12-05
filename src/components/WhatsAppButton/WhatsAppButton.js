import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppButton.css"; // Create this CSS file or inline style

const WhatsappButton = () => {
  const phoneNumber = "971524460569"; // Without "+" or leading 0

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
    >
      <FaWhatsapp />
    </a>
  );
};

export default WhatsappButton;
