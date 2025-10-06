import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Globe, User } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detectar scroll para cambiar estilo del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Manejo del teclado para el menú móvil
  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const mainMenuItems = [
    {
      title: 'Sobre el TSE',
      href: '#sobre-tse',
      description: 'Información institucional del Tribunal'
    },
    {
      title: 'Servicios Registro Civil',
      href: '#servicios-registro',
      description: 'Cédulas, certificaciones y trámites civiles'
    },
    {
      title: 'Elecciones y Partidos',
      href: '#elecciones',
      description: 'Procesos electorales y partidos políticos'
    },
    {
      title: 'Jurisprudencia',
      href: '#jurisprudencia',
      description: 'Normativa y resoluciones'
    },
    {
      title: 'Formación en Democracia',
      href: '#formacion',
      description: 'Educación cívica y democrática'
    },
    {
      title: 'Publicaciones',
      href: '#publicaciones',
      description: 'Documentos y recursos'
    }
  ];

  const quickAccessItems = [
    { title: 'Consultas Civiles', href: '#consultas' },
    { title: 'Certificaciones Digitales', href: '#certificaciones' },
    { title: 'Documento de Identidad', href: '#cedula' },
    { title: 'Lugar de Votación', href: '#votacion' }
  ];

  return (
    <>
      {/* Skip links para accesibilidad */}
      <a href="#main-content" className="skip-link">
        Ir al contenido principal
      </a>
      <a href="#main-navigation" className="skip-link">
        Ir a la navegación
      </a>



      <header className={`header ${isScrolled ? 'header--scrolled' : ''}`} role="banner">
        <div className="container">
          <div className="header__content">
            {/* Logo del TSE */}
            <div className="header__logo">
              <a href={import.meta.env.BASE_URL} className="header__logo-link" aria-label="Tribunal Supremo de Elecciones - Inicio">
                <div className="header__logo-container">
                  <div className="header__logo-emblem">
                    <img 
                      src="https://www.tse.go.cr/imgs/iconos/logo-TSE.svg" 
                      alt="Escudo TSE" 
                      className="header__logo-shield"
                    />
                  </div>
                  <div className="header__logo-text-container">
                    <div className="header__logo-main">TSE</div>
                    <div className="header__logo-subtitle">Costa Rica</div>
                  </div>
                </div>
              </a>
            </div>

            {/* Navegación principal - Desktop */}
            <nav className="header__nav" id="main-navigation" aria-label="Navegación principal">
              <ul className="header__nav-list" role="list">
                {mainMenuItems.map((item) => (
                  <li key={item.title} className="header__nav-item">
                    <a 
                      href={item.href} 
                      className="header__nav-link"
                      title={item.description}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Accesos rápidos y utilidades */}
            <div className="header__actions">
              <div className="header__quick-access">
                <details className="header__dropdown">
                  <summary className="header__dropdown-trigger" aria-label="Accesos rápidos">
                    <User size={20} aria-hidden="true" />
                    <span>Servicios</span>
                  </summary>
                  <div className="header__dropdown-content" role="menu">
                    {quickAccessItems.map((item) => (
                      <a 
                        key={item.title}
                        href={item.href} 
                        className="header__dropdown-link"
                        role="menuitem"
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                </details>
              </div>

              <button 
                className="header__search-btn btn btn-outline"
                aria-label="Buscar en el sitio"
                title="Buscar"
              >
                <Search size={18} aria-hidden="true" />
                <span className="sr-only">Buscar</span>
              </button>

              <button 
                className="header__accessibility-btn btn btn-outline"
                aria-label="Opciones de accesibilidad"
                title="Accesibilidad"
              >
                <Globe size={18} aria-hidden="true" />
                <span className="sr-only">Accesibilidad</span>
              </button>

              {/* Botón menú móvil */}
              <button
                className="header__menu-toggle"
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              >
                {isMenuOpen ? (
                  <X size={24} aria-hidden="true" />
                ) : (
                  <Menu size={24} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil */}
        <div 
          className={`header__mobile-menu ${isMenuOpen ? 'header__mobile-menu--open' : ''}`}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          <div className="header__mobile-menu-content">
            <nav className="header__mobile-nav" aria-label="Navegación móvil">
              <ul className="header__mobile-nav-list" role="list">
                {mainMenuItems.map((item) => (
                  <li key={item.title} className="header__mobile-nav-item">
                    <a 
                      href={item.href} 
                      className="header__mobile-nav-link"
                      onClick={closeMenu}
                    >
                      <span className="header__mobile-nav-title">{item.title}</span>
                      <span className="header__mobile-nav-desc">{item.description}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="header__mobile-divider"></div>

              <div className="header__mobile-quick">
                <h3 className="header__mobile-quick-title">Accesos Rápidos</h3>
                <ul className="header__mobile-quick-list" role="list">
                  {quickAccessItems.map((item) => (
                    <li key={item.title}>
                      <a 
                        href={item.href} 
                        className="header__mobile-quick-link"
                        onClick={closeMenu}
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
        </div>

        {/* Overlay para cerrar menú móvil */}
        {isMenuOpen && (
          <div 
            className="header__overlay"
            onClick={closeMenu}
            aria-hidden="true"
          ></div>
        )}
      </header>
    </>
  );
};

export default Header;