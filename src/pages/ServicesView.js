import { useParams } from 'react-router-dom';
import { servicesDescriptions } from '../ServicesData'; // Import the description
import './ServicesView.css'

const ServiceView = () => {
  const { serviceName } = useParams(); // Get the dynamic service name from the route params

  // Retrieve the description for the selected service
  const serviceDescription = servicesDescriptions[serviceName];

  return (
    <div className="service-view-container">
      <h2>{serviceName}</h2>
      <div className="service-content">
        <div className="service-image">
          <img
            src={`https://picsum.photos/seed/${Math.random()}/600/400`}
            alt={serviceName}
          />
        </div>
        <div className="service-description">
          <h3>{serviceName}</h3>
          <p>{serviceDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceView;
