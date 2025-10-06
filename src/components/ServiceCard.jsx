import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import './ServiceCard.css';

const ServiceCard = ({ 
  icon, 
  title, 
  description, 
  href, 
  isExternal = false,
  isRoute = false,
  featured = false,
  className = '' 
}) => {
  const cardClasses = [
    'service-card',
    featured && 'service-card--featured',
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (isRoute) {
      e.preventDefault();
      if (window.navigate) {
        window.navigate(href);
      }
    }
  };

  return (
    <article className={cardClasses}>
      <a 
        href={href}
        className="service-card__link"
        target={isExternal ? '_blank' : '_self'}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        aria-describedby={`service-${title.replace(/\s+/g, '-').toLowerCase()}-desc`}
        onClick={handleClick}
      >
        <div className="service-card__content">
          <div className="service-card__icon-wrapper">
            <div className="service-card__icon" aria-hidden="true">
              {icon}
            </div>
          </div>
          
          <div className="service-card__text">
            <h3 className="service-card__title">
              {title}
              {isExternal && (
                <ExternalLink 
                  size={16} 
                  className="service-card__external-icon" 
                  aria-label="(se abre en nueva ventana)"
                />
              )}
            </h3>
            <p 
              className="service-card__description"
              id={`service-${title.replace(/\s+/g, '-').toLowerCase()}-desc`}
            >
              {description}
            </p>
          </div>
          
          <div className="service-card__arrow" aria-hidden="true">
            <ArrowRight size={20} />
          </div>
        </div>
        
        <div className="service-card__hover-overlay" aria-hidden="true"></div>
      </a>
    </article>
  );
};

export default ServiceCard;