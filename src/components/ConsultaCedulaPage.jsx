import React, { useState } from 'react';
import { 
  ArrowLeft,
  FileText,
  Search,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { obtenerDatosPorCedula } from '../data/personaData';
import './ConsultaCedulaPage.css';

function ConsultaCedulaPage() {
  const [cedula, setCedula] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const formatCedula = (value) => {
    // Remover todo lo que no sean números
    const numbers = value.replace(/\D/g, '');
    
    // Limitar a 9 dígitos
    const limited = numbers.slice(0, 9);
    
    return limited;
  };

  const validateCedula = (cedula) => {
    if (!cedula) return 'El número de cédula es requerido';
    if (cedula.length !== 9) return 'El número de cédula debe tener 9 dígitos';
    if (!/^\d{9}$/.test(cedula)) return 'El número de cédula solo debe contener números';
    return null;
  };

  const handleCedulaChange = (e) => {
    const formatted = formatCedula(e.target.value);
    setCedula(formatted);
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateCedula(cedula);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Simulación de tiempo de consulta
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Buscar datos reales por cédula
      const personaEncontrada = obtenerDatosPorCedula(cedula);
      
      if (personaEncontrada) {
        // Transformar los datos al formato esperado por la UI
        const resultado = {
          cedula: personaEncontrada.cedula,
          nombre: personaEncontrada.nombreCompleto.split(' ')[0], // JOSE
          primerApellido: personaEncontrada.nombreCompleto.split(' ')[1], // ANGEL
          segundoApellido: personaEncontrada.nombreCompleto.split(' ')[2] + ' ' + personaEncontrada.nombreCompleto.split(' ')[3], // CAMPOS AGUILAR
          fechaNacimiento: personaEncontrada.fechaNacimiento,
          nacionalidad: personaEncontrada.nacionalidad,
          edad: personaEncontrada.edad,
          marginal: personaEncontrada.marginal,
          padre: personaEncontrada.hijoDe,
          identificacionPadre: personaEncontrada.identificacionPadre,
          madre: personaEncontrada.madre,
          identificacionMadre: personaEncontrada.identificacionMadre,
          // Información adicional completa
          datosCompletos: personaEncontrada
        };
        
        setResult(resultado);
      } else {
        setError('No se encontró información para el número de cédula ingresado.');
        setResult(null);
      }
    } catch (err) {
      setError('Error al consultar la información. Por favor intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="consulta-cedula-page">
      <Header />
      
      <main className="cedula-main">
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
              <button 
                className="breadcrumb-link"
                onClick={() => window.navigate ? window.navigate('/consultas-civiles') : (window.location.href = '/consultas-civiles')}
              >
                Consultas Civiles
              </button>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">Consulta por Cédula</span>
            </nav>
          </div>
        </div>

        {/* Header Section */}
        <section className="page-header">
          <div className="container">
            <div className="header-content">
              <div className="header-text">
                <h1 className="page-title">
                  <FileText className="page-title-icon" />
                  Consulta por Número de Cédula
                </h1>
                <p className="page-subtitle">
                  Consulte información del Registro Civil utilizando el número de cédula
                </p>
                <p className="page-description">
                  Ingrese el número de cédula de la persona a consultar. 
                  No utilice guiones ni espacios en blanco.
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

        {/* Separador Bandera Costa Rica */}
        <div className="cr-flag-separator"></div>

        {/* Form Section */}
        <section className="form-section">
          <div className="container">
            <div className="form-container">
              {!result ? (
                <form onSubmit={handleSubmit} className="consulta-form">
                  <div className="form-header">
                    <h2 className="form-title">
                      <Search size={20} />
                      Consulta por Cédula
                    </h2>
                  </div>

                  <div className="form-body">
                    <div className="cedula-field">
                      <label htmlFor="cedula" className="cedula-label">
                        NÚMERO DE CÉDULA *
                      </label>
                      <div className="cedula-input-wrapper">
                        <input
                          type="text"
                          id="cedula"
                          name="cedula"
                          value={cedula}
                          onChange={handleCedulaChange}
                          className={`cedula-input ${error ? 'error' : ''}`}
                          placeholder="101110111"
                          maxLength="9"
                          autoComplete="off"
                        />
                        {error && (
                          <AlertTriangle className="error-icon" size={18} />
                        )}
                      </div>
                      
                      <div className="cedula-help">
                        Formato: 9 dígitos sin guiones ni espacios
                      </div>
                      
                      {error && (
                        <div className="cedula-error">
                          {error}
                        </div>
                      )}
                    </div>

                    <button 
                      type="submit" 
                      className="cedula-submit-btn"
                      disabled={loading || !cedula}
                    >
                      {loading ? (
                        <>
                          <Loader className="spinner" size={20} />
                          Consultando...
                        </>
                      ) : (
                        <>
                          <Search size={20} />
                          Consultar
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="person-info-card">
                  {/* Header de Certificaciones */}
                  <div className="cert-header">
                    <h2 className="cert-title">SOLICITUD DE CERTIFICACIONES</h2>
                    <div className="cert-tabs">
                      <button className="cert-tab">SOLICITAR CERTIFICACIÓN DE NACIMIENTO</button>
                      <button className="cert-tab">SOLICITAR CERTIFICACIÓN DE ESTADO CIVIL</button>
                      <button className="cert-tab">SOLICITAR CERTIFICACIÓN DE DEFUNCIÓN</button>
                    </div>
                  </div>

                  {/* Sección de Detalles */}
                  <div className="person-details">
                    <h3 className="details-title">DETALLE DEL NACIMIENTO PARA ESTA PERSONA</h3>
                    
                    {/* Grid reorganizado para mejor comprensión */}
                    <div className="details-grid">
                      <span className="detail-label">Número de Cédula :</span>
                      <span className="detail-value highlight">{result.cedula}</span>
                      <span className="detail-label">Fecha Nacimiento :</span>
                      <span className="detail-value">{result.fechaNacimiento}</span>

                      <span className="detail-label">Nombre Completo :</span>
                      <span className="detail-value">{result.nombre} {result.primerApellido} {result.segundoApellido}</span>
                      <span className="detail-label">Nacionalidad :</span>
                      <span className="detail-value">{result.nacionalidad}</span>

                      <span className="detail-label">Conocido/a Como :</span>
                      <span className="detail-value">-</span>
                      <span className="detail-label">Edad :</span>
                      <span className="detail-value">{result.edad} AÑOS</span>

                      <span className="detail-label">Hijo/a de:</span>
                      <span className="detail-value">{result.padre}</span>
                      <span className="detail-label">Marginal :</span>
                      <span className="detail-value">{result.marginal || 'NO'}</span>

                      <span className="detail-label">Identificación:</span>
                      <span className="detail-value">{result.identificacionPadre || '0'}</span>
                      <span className="detail-label"></span>
                      <span className="detail-value"></span>
                      
                      <span className="detail-label">Y:</span>
                      <span className="detail-value">{result.madre}</span>
                      <span className="detail-label"></span>
                      <span className="detail-value"></span>

                      <span className="detail-label">Identificación:</span>
                      <span className="detail-value">{result.identificacionMadre || '0'}</span>
                      <span className="detail-label"></span>
                      <span className="detail-value"></span>
                    </div>
                    
                    {/* Botón centrado fuera del grid */}
                    <div className="ver-mas-container">
                      <button className="ver-mas-btn">Ver Más Detalles</button>
                    </div>
                  </div>

                  {/* Sección de Servicios Adicionales */}
                  <div className="additional-services">
                    <div className="service-note">
                      Si tiene inconvenientes al desplegar la información de Hijos Registrados, Matrimonios Registrados y/o Lugar de Votación, por favor siga las siguientes instrucciones: 
                      <span className="compatibility-link">Compatibilidad</span>
                    </div>
                    
                    <div className="services-grid">
                      <div className="service-section">
                        <h4 className="service-title">HIJOS REGISTRADOS</h4>
                        <p className="service-description">
                          Esta consulta desplegará la información de hijos registrados ocurridos a partir del año 2000.
                        </p>
                        <button className="service-btn">Mostrar</button>
                      </div>
                      
                      <div className="service-section">
                        <h4 className="service-title">MATRIMONIOS REGISTRADOS</h4>
                        <p className="service-description">
                          Esta consulta desplegará la información de matrimonios celebrados a partir del año 1955.
                        </p>
                        <button className="service-btn">Mostrar</button>
                      </div>
                      
                      <div className="service-section">
                        <h4 className="service-title">LUGAR DE VOTACIÓN</h4>
                        <p className="service-description">
                          Consulta el lugar de votación asignado para esta persona.
                        </p>
                        <button className="service-btn">Mostrar</button>
                      </div>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="person-actions">
                    <button 
                      className="action-btn action-btn--back"
                      onClick={() => {
                        setCedula('');
                        setResult(null);
                        setError('');
                      }}
                    >
                      <ArrowLeft size={16} />
                      Nueva Consulta
                    </button>
                    
                    <button className="action-btn action-btn--print">
                      <FileText size={16} />
                      Solicitar Certificación
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Separador Bandera Costa Rica */}
        <div className="cr-flag-separator"></div>

        {/* Help Section */}
        <section className="help-section">
          <div className="container">
            <div className="help-content">
              <h2 className="help-title">Información Importante</h2>
              
              <div className="help-grid">
                <div className="help-card help-card--info">
                  <div className="help-header">
                    <AlertTriangle className="help-icon" />
                    <h3 className="help-card-title">Formato de Cédula</h3>
                  </div>
                  <div className="help-card-content">
                    <p>
                      El número de cédula debe ingresarse sin guiones ni espacios, 
                      utilizando únicamente los 9 dígitos. Ejemplo: 101110111
                    </p>
                  </div>
                </div>
                
                <div className="help-card help-card--contact">
                  <div className="help-header">
                    <Mail className="help-icon" />
                    <h3 className="help-card-title">¿Encontró Errores?</h3>
                  </div>
                  <div className="help-card-content">
                    <p>
                      Si detecta inconsistencias en la información, puede reportarlas a:
                    </p>
                    <a href="mailto:actualizaciondedatos@tse.go.cr?subject=Corrección%20de%20Datos">
                      actualizaciondedatos@tse.go.cr
                    </a>
                  </div>
                </div>
                
                <div className="help-card help-card--support">
                  <div className="help-header">
                    <Phone className="help-icon" />
                    <h3 className="help-card-title">Soporte Técnico</h3>
                  </div>
                  <div className="help-card-content">
                    <p>
                      Para asistencia técnica puede contactarnos al teléfono 2287-5555 
                      en horario de oficina.
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

export default ConsultaCedulaPage;