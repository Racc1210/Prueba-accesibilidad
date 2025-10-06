import React, { useState } from 'react';
import { 
  ArrowLeft,
  ArrowRight,
  User, 
  Users, 
  FileText, 
  Search,
  Heart,
  X as Cross,
  Phone,
  Mail,
  ExternalLink,
  AlertCircle,
  FileDown
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import './ConsultasCivilesPage.css';

function ConsultasCivilesPage() {
  const [selectedCategory, setSelectedCategory] = useState('nacionales');

  // Opciones para personas nacionales (con navegación interna)
  const consultasNacionales = [
    {
      id: 'cedula',
      title: 'Consulta por número de cédula',
      description: 'Consulte información civil utilizando el número de cédula de identidad.',
      icon: <FileText size={28} />,
      route: '/consulta-cedula',
      isInternal: true
    },
    {
      id: 'nombres',
      title: 'Consulta por nombre y apellidos',
      description: 'Busque información civil utilizando nombres y apellidos completos.',
      icon: <User size={28} />,
      route: '/consulta-nombre',
      isInternal: true
    }
  ];

  // Opciones para personas extranjeras (interactivas pero sin redirección)
  const consultasExtranjeras = [
    {
      id: 'matrimonios',
      title: 'Consulta de matrimonios',
      description: 'Consulte información sobre matrimonios de personas extranjeras registrados en Costa Rica.',
      icon: <Heart size={28} />,
      isInteractive: true
    },
    {
      id: 'defunciones',
      title: 'Consulta de defunciones',
      description: 'Consulte información sobre defunciones de personas extranjeras registradas en Costa Rica.',
      icon: <Cross size={28} />,
      isInteractive: true
    }
  ];

  const handleConsultaClick = (consulta) => {
    if (consulta.isInternal && window.navigate) {
      window.navigate(consulta.route);
    } else if (consulta.url) {
      window.open(consulta.url, '_blank', 'noopener,noreferrer');
    }
    // Para extranjeras: interactivas pero sin acción específica
  };

  return (
    <div className="consultas-page">
      <Header />
      
      <main className="consultas-main">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <div className="container">
            <nav className="breadcrumb-nav" aria-label="Navegación de migas de pan">
              <button 
                className="breadcrumb-link"
                onClick={() => window.navigate ? window.navigate('/') : (window.location.href = '/')}
              >
                <ArrowLeft size={16} />
                Inicio
              </button>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">Consultas Civiles</span>
            </nav>
          </div>
        </div>

        {/* Header Section */}
        <section className="page-header">
          <div className="container">
            <div className="header-content">
              <div className="header-text">
                <h1 className="page-title">
                  <Search className="page-title-icon" />
                  Consultas Civiles
                </h1>
                <p className="page-subtitle">
                  Sistema de consultas del Registro Civil del Tribunal Supremo de Elecciones
                </p>
                <p className="page-description">
                  Acceda a la información registral de personas nacionales y extranjeras. 
                  Este servicio permite consultar datos civiles oficiales de manera segura y confiable.
                </p>
              </div>
              
              <div className="header-visual">
                <div className="tse-emblem">
                  <img 
                    src="https://www.tse.go.cr/imgs/iconos/logo-TSE.svg" 
                    alt="Escudo del TSE" 
                    className="emblem-logo"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="emblem-fallback" style={{display: 'none'}}>
                    TSE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="consultas-tabs-section">
          <div className="container">
            <div className="tabs-container">
              <div className="tabs-header">
                <button 
                  className={`tab-button ${selectedCategory === 'nacionales' ? 'tab-button--active' : ''}`}
                  onClick={() => setSelectedCategory('nacionales')}
                  role="tab"
                  aria-selected={selectedCategory === 'nacionales'}
                  aria-controls="panel-nacionales"
                >
                  <Users size={20} />
                  Personas Nacionales
                </button>
                
                <button 
                  className={`tab-button ${selectedCategory === 'extranjeras' ? 'tab-button--active' : ''}`}
                  onClick={() => setSelectedCategory('extranjeras')}
                  role="tab"
                  aria-selected={selectedCategory === 'extranjeras'}
                  aria-controls="panel-extranjeras"
                >
                  <User size={20} />
                  Personas Extranjeras
                </button>
              </div>

              {/* Personas Nacionales Panel */}
              {selectedCategory === 'nacionales' && (
                <div 
                  className="tab-panel"
                  id="panel-nacionales"
                  role="tabpanel"
                  aria-labelledby="tab-nacionales"
                >
                  <div className="panel-header">
                    <h2 className="panel-title">Consultas para Personas Nacionales</h2>
                    <p className="panel-description">
                      Consulte información registral de ciudadanos costarricenses utilizando 
                      número de cédula o nombres completos.
                    </p>
                  </div>
                  
                  <div className="consultas-grid">
                    {consultasNacionales.map((consulta) => (
                      <div 
                        key={consulta.id}
                        className="consulta-card consulta-card--interactive"
                        onClick={() => handleConsultaClick(consulta)}
                        tabIndex={0}
                        role="button"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleConsultaClick(consulta);
                          }
                        }}
                      >
                        <div className="consulta-icon">
                          {consulta.icon}
                        </div>
                        <div className="consulta-content">
                          <h3 className="consulta-title">{consulta.title}</h3>
                          <p className="consulta-description">{consulta.description}</p>
                        </div>
                        <div className="consulta-action">
                          <ArrowRight className="consulta-arrow" size={20} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Personas Extranjeras Panel */}
              {selectedCategory === 'extranjeras' && (
                <div 
                  className="tab-panel"
                  id="panel-extranjeras"
                  role="tabpanel"
                  aria-labelledby="tab-extranjeras"
                >
                  <div className="panel-header">
                    <h2 className="panel-title">Consultas para Personas Extranjeras</h2>
                    <p className="panel-description">
                      Consulte información sobre matrimonios y defunciones de personas extranjeras 
                      registrados en el sistema civil costarricense.
                    </p>
                  </div>
                  
                  <div className="consultas-grid">
                    {consultasExtranjeras.map((consulta) => (
                      <div 
                        key={consulta.id}
                        className="consulta-card consulta-card--interactive"
                        onClick={() => handleConsultaClick(consulta)}
                        tabIndex={0}
                        role="button"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleConsultaClick(consulta);
                          }
                        }}
                      >
                        <div className="consulta-icon">
                          {consulta.icon}
                        </div>
                        <div className="consulta-content">
                          <h3 className="consulta-title">{consulta.title}</h3>
                          <p className="consulta-description">{consulta.description}</p>
                        </div>
                        <div className="consulta-action">
                          <ArrowRight className="consulta-arrow" size={20} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="info-section">
          <div className="container">
            <div className="info-grid">
              {/* Important Notice */}
              <div className="info-card info-card--important">
                <div className="info-header">
                  <AlertCircle className="info-icon" />
                  <h3 className="info-title">Información Importante</h3>
                </div>
                <div className="info-content">
                  <p>
                    En caso de detectar alguna inconsistencia en la información que se refleja 
                    en este servicio de consultas civiles, podrá solicitar su aclaración o 
                    corrección mediante correo electrónico.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="info-card info-card--contact">
                <div className="info-header">
                  <Mail className="info-icon" />
                  <h3 className="info-title">Correcciones y Actualizaciones</h3>
                </div>
                <div className="info-content">
                  <div className="contact-item">
                    <Mail size={16} />
                    <a href="mailto:actualizaciondedatos@tse.go.cr?subject=Actualización%20a%20la%20Base%20de%20Datos">
                      actualizaciondedatos@tse.go.cr
                    </a>
                  </div>
                  <p className="contact-note">
                    Deberá completar y adjuntar el formulario de corrección correspondiente.
                  </p>
                </div>
              </div>

              {/* Download Form */}
              <div className="info-card info-card--download">
                <div className="info-header">
                  <FileDown className="info-icon" />
                  <h3 className="info-title">Formulario de Corrección</h3>
                </div>
                <div className="info-content">
                  <p>Descargue el formulario para solicitar correcciones en la base de datos:</p>
                  <a 
                    href="https://servicioselectorales.tse.go.cr/chc/docs/ANEXO%201%20-%20Formulario%20para%20solicitar%20correcci%C3%B3n%20general%20en%20la%20base%20de%20datos.docm"
                    className="download-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileDown size={16} />
                    Descargar Formulario
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="help-section">
          <div className="container">
            <div className="help-content">
              <h2 className="help-title">¿Necesita Ayuda?</h2>
              <p className="help-description">
                Si requiere asistencia adicional o tiene consultas sobre el uso de estos servicios, 
                puede contactarnos a través de los siguientes medios:
              </p>
              
              <div className="help-contacts">
                <div className="help-contact">
                  <Phone className="help-contact-icon" />
                  <div>
                    <strong>Teléfono</strong>
                    <p>2287-5555</p>
                  </div>
                </div>
                
                <div className="help-contact">
                  <Mail className="help-contact-icon" />
                  <div>
                    <strong>Correo Electrónico</strong>
                    <p>info@tse.go.cr</p>
                  </div>
                </div>
                
                <div className="help-contact">
                  <ExternalLink className="help-contact-icon" />
                  <div>
                    <strong>Sitio Web Principal</strong>
                    <p>
                      <a href="https://www.tse.go.cr" target="_blank" rel="noopener noreferrer">
                        www.tse.go.cr
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ConsultasCivilesPage;
