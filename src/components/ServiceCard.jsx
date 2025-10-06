import React from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
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

  return (
    <article className={cardClasses}>
      {isRoute ? (
        <Link
          to={typeof to !== 'undefined' ? to : href}
          className="service-card__link"
          aria-describedby={`service-${title.replace(/\s+/g, '-').toLowerCase()}-desc`}
        >
          <div className="service-card__content">
            {icon && <div className="service-card__icon">{icon}</div>}
            <div className="service-card__info">
              <h3 className="service-card__title">{title}</h3>
              <p id={`service-${title.replace(/\s+/g, '-').toLowerCase()}-desc`} className="service-card__desc">{description}</p>
            </div>
          </div>
          <div className="service-card__arrow">
            <ArrowRight size={18} />
          </div>
        </Link>
      ) : (
        <a
          href={href}
          className="service-card__link"
          target={isExternal ? '_blank' : '_self'}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          aria-describedby={`service-${title.replace(/\s+/g, '-').toLowerCase()}-desc`}
        >
          <div className="service-card__content">
            {icon && <div className="service-card__icon">{icon}</div>}
            <div className="service-card__info">
              <h3 className="service-card__title">{title}</h3>
              <p id={`service-${title.replace(/\s+/g, '-').toLowerCase()}-desc`} className="service-card__desc">{description}</p>
            </div>
          </div>
          <div className="service-card__arrow">
            {isExternal ? <ExternalLink size={18} /> : <ArrowRight size={18} />}
          </div>
        </a>
      )}
    </article>
  );

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
