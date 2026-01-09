import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppButton.css"; 

const WhatsappButton = () => {
  const phoneNumber = "971524460569"; 

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
