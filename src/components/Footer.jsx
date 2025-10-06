import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink,
  Facebook,
  Instagram,
  Youtube
} from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { title: 'Consultas Civiles', href: '#consultas' },
    { title: 'Certificaciones Digitales', href: '#certificaciones', external: true },
    { title: 'Documento de Identidad', href: '#cedula' },
    { title: 'Lugar de Votación', href: '#votacion' },
    { title: 'Transparencia', href: '#transparencia' },
    { title: 'Participación Política de Mujeres', href: '#mujeres' }
  ];

  const institutionalLinks = [
    { title: 'Sobre el TSE', href: '#sobre' },
    { title: 'Misión y Visión', href: '#mision' },
    { title: 'Organigrama', href: '#organigrama' },
    { title: 'Directorio Telefónico', href: '#directorio' },
    { title: 'Licitaciones', href: '#licitaciones' },
    { title: 'Empleo', href: '#empleo' }
  ];

  const legalLinks = [
    { title: 'Mapa del Sitio', href: '#mapa' },
    { title: 'Política de Privacidad', href: '#privacidad' },
    { title: 'Términos y Condiciones', href: '#terminos' },
    { title: 'Accesibilidad', href: '#accesibilidad' },
    { title: 'Licencia Creative Commons', href: 'http://creativecommons.org/licenses/by-sa/4.0/', external: true }
  ];

  const socialMedia = [
    { 
      name: 'Facebook', 
      href: 'https://facebook.com/tse.cr', 
      icon: Facebook,
      label: 'Síguenos en Facebook'
    },
    { 
      name: 'Instagram', 
      href: 'https://instagram.com/tse.cr', 
      icon: Instagram,
      label: 'Síguenos en Instagram'
    },
    { 
      name: 'YouTube', 
      href: 'https://youtube.com/tse.cr', 
      icon: Youtube,
      label: 'Suscríbete a nuestro canal de YouTube'
    }
  ];

  const ContactInfo = ({ icon: Icon, title, children }) => (
    <div className="footer__contact-item">
      <div className="footer__contact-icon">
        <Icon size={20} aria-hidden="true" />
      </div>
      <div className="footer__contact-content">
        <h4 className="footer__contact-title">{title}</h4>
        <div className="footer__contact-details">
          {children}
        </div>
      </div>
    </div>
  );

  const LinkList = ({ title, links, className = '' }) => (
    <div className={`footer__link-section ${className}`}>
      <h3 className="footer__section-title">{title}</h3>
      <ul className="footer__link-list" role="list">
        {links.map((link) => (
          <li key={link.title}>
            <a 
              href={link.href}
              className="footer__link"
              target={link.external ? '_blank' : '_self'}
              rel={link.external ? 'noopener noreferrer' : undefined}
            >
              {link.title}
              {link.external && (
                <ExternalLink 
                  size={14} 
                  className="footer__external-icon"
                  aria-label="(se abre en nueva ventana)"
                />
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__main">
          {/* Información institucional */}
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-emblem">
                <img 
                  src="https://www.tse.go.cr/imgs/iconos/logo-TSE.svg" 
                  alt="Escudo TSE" 
                  className="footer__logo-shield"
                />
              </div>
              <div className="footer__logo-content">
                <h2 className="footer__logo-title">TSE</h2>
                <p className="footer__logo-subtitle">Tribunal Supremo de Elecciones</p>
              </div>
            </div>
            
            <p className="footer__description">
              Institución constitucional autónoma encargada de organizar, dirigir y vigilar 
              los actos relativos al sufragio y garantizar el ejercicio efectivo de los derechos 
              políticos ciudadanos.
            </p>

            {/* Información de contacto */}
            <div className="footer__contact">
              <ContactInfo icon={MapPin} title="Dirección">
                <address className="footer__address">
                  Avenida Primera y Tercera, Calle 15<br />
                  San José, Costa Rica
                </address>
                <a 
                  href="https://maps.google.com/tse-costa-rica" 
                  className="footer__map-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver en Google Maps
                  <ExternalLink size={14} aria-label="(se abre en nueva ventana)" />
                </a>
              </ContactInfo>

              <ContactInfo icon={Phone} title="Teléfonos">
                <a href="tel:+50625472555" className="footer__phone">
                  Central: 2547-2555
                </a>
                <a href="tel:+50625472000" className="footer__phone">
                  Consultas: 2547-2000
                </a>
              </ContactInfo>

              <ContactInfo icon={Clock} title="Horario de Atención">
                <p className="footer__hours">
                  Lunes a Viernes: 7:00 a.m. - 4:00 p.m.
                </p>
              </ContactInfo>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <LinkList 
            title="Servicios Más Utilizados" 
            links={quickLinks}
            className="footer__quick-links"
          />

          {/* Enlaces institucionales */}
          <LinkList 
            title="Información Institucional" 
            links={institutionalLinks}
            className="footer__institutional-links"
          />

          {/* Redes sociales */}
          <div className="footer__social">
            <h3 className="footer__section-title">Síguenos</h3>
            <p className="footer__social-description">
              Mantente informado sobre nuestras actividades y servicios
            </p>
            <div className="footer__social-links">
              {socialMedia.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="footer__social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                  >
                    <Icon size={24} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="footer__divider" aria-hidden="true"></div>

        {/* Footer bottom */}
        <div className="footer__bottom">
          <div className="footer__legal">
            <LinkList 
              title="" 
              links={legalLinks}
              className="footer__legal-links"
            />
          </div>

          <div className="footer__copyright">
            <p>
              © {currentYear} Tribunal Supremo de Elecciones de Costa Rica. 
              Todos los derechos reservados.
            </p>
            <p className="footer__update-info">
              Sitio de actualización diaria
            </p>
          </div>

          {/* Sello de accesibilidad y certificaciones */}
          <div className="footer__certifications">
            <div className="footer__cert-item">
              <span className="footer__cert-label">Accesibilidad</span>
              <span className="footer__cert-level">WCAG 2.1 AA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;