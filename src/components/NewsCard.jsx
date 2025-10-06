import React from 'react';
import { Calendar, Clock, ExternalLink } from 'lucide-react';
import './NewsCard.css';

const NewsCard = ({ 
  title, 
  summary, 
  date, 
  href, 
  imageUrl,
  isExternal = false,
  featured = false,
  category = null,
  className = ''
}) => {
  const cardClasses = [
    'news-card',
    featured && 'news-card--featured',
    className
  ].filter(Boolean).join(' ');

  // Formatear fecha para mejor legibilidad
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Hace 1 día';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    
    return date.toLocaleDateString('es-CR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formattedDate = formatDate(date);
  const newsId = `news-${title.replace(/\s+/g, '-').toLowerCase().substring(0, 50)}`;

  return (
    <article className={cardClasses}>
      <a 
        href={href}
        className="news-card__link"
        target={isExternal ? '_blank' : '_self'}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        aria-describedby={`${newsId}-summary`}
        aria-labelledby={`${newsId}-title`}
      >
        {imageUrl && (
          <div className="news-card__image-wrapper">
            <img 
              src={imageUrl} 
              alt={title ? `Imagen de la noticia: ${title}` : "Imagen de noticia"}
              className="news-card__image"
              loading="lazy"
            />
            <div className="news-card__image-overlay"></div>
          </div>
        )}
        
        <div className="news-card__content">
          {category && (
            <div className="news-card__category">
              <span className="news-card__category-text">{category}</span>
            </div>
          )}
          
          <h3 
            className="news-card__title"
            id={`${newsId}-title`}
          >
            {title}
            {isExternal && (
              <ExternalLink 
                size={16} 
                className="news-card__external-icon"
                aria-label="(se abre en nueva ventana)"
              />
            )}
          </h3>
          
          <p 
            className="news-card__summary"
            id={`${newsId}-summary`}
          >
            {summary}
          </p>
          
          <div className="news-card__meta">
            <div className="news-card__date">
              <Calendar size={16} aria-hidden="true" />
              <time 
                dateTime={date}
                className="news-card__date-text"
              >
                {formattedDate}
              </time>
            </div>
            
            <div className="news-card__read-more">
              <span>Leer más</span>
              <div className="news-card__arrow" aria-hidden="true">
                →
              </div>
            </div>
          </div>
        </div>
        
        <div className="news-card__hover-overlay" aria-hidden="true"></div>
      </a>
    </article>
  );
};

export default NewsCard;
