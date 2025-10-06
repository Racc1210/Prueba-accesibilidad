import React, { useState } from 'react';
import { 
  ArrowLeft,
  User,
  Search,
  Users,
  Calendar,
  MapPin,
  Phone,
  Mail,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader,
  ChevronDown,
  FileText
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { buscarPorNombre } from '../data/personaData';
import './ConsultaNombrePage.css';

function ConsultaNombrePage() {
  const [formData, setFormData] = useState({
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    cantidadResultados: '50'
  });
  
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [errors, setErrors] = useState({});
  const [viewMode, setViewMode] = useState('form'); // 'form', 'results', 'detail'

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }
    
    if (!formData.primerApellido.trim()) {
      newErrors.primerApellido = 'El primer apellido es requerido';
    } else if (formData.primerApellido.trim().length < 2) {
      newErrors.primerApellido = 'El primer apellido debe tener al menos 2 caracteres';
    }
    
    // Segundo apellido es opcional
    if (formData.segundoApellido && formData.segundoApellido.trim().length < 2) {
      newErrors.segundoApellido = 'Si proporciona segundo apellido, debe tener al menos 2 caracteres';
    }
    
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Permitir solo letras, espacios y algunos caracteres especiales para nombres
    const cleanValue = name === 'cantidadResultados' 
      ? value 
      : value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s']/g, '');
    
    setFormData(prev => ({
      ...prev,
      [name]: cleanValue
    }));
    
    // Limpiar error si existe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setResults(null);
    setViewMode('form');

    try {
      // Simulación de tiempo de consulta
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Buscar usando la función más estricta que requiere nombre + primer apellido
      const personasEncontradas = buscarPorNombre(
        formData.nombre.trim(),
        formData.primerApellido.trim(),
        formData.segundoApellido.trim()
      );
      
      if (personasEncontradas.length > 0) {
        // Transformar datos al formato esperado por la UI
        const resultados = personasEncontradas.map(persona => ({
          cedula: persona.cedula,
          nombre: persona.nombreCompleto.split(' ')[0], // JOSE
          primerApellido: persona.nombreCompleto.split(' ')[1], // ANGEL
          segundoApellido: persona.nombreCompleto.split(' ').slice(2).join(' '), // CAMPOS AGUILAR
          fechaNacimiento: persona.fechaNacimiento,
          lugarNacimiento: `${persona.provincia}, COSTA RICA`,
          estadoCivil: persona.matrimoniosRegistrados.includes('No existen') ? 'SOLTERO(A)' : 'CASADO(A)',
          sexo: 'MASCULINO', // Inferido del nombre JOSE
          // Datos completos para vista detallada
          datosCompletos: persona
        }));
        
        const limitedResults = resultados.slice(0, parseInt(formData.cantidadResultados));
        setResults({
          total: resultados.length,
          shown: limitedResults.length,
          data: limitedResults
        });
        setViewMode('results');
      } else {
        // No se encontraron resultados
        setResults({
          total: 0,
          shown: 0,
          data: []
        });
        setViewMode('results');
      }
    } catch (err) {
      setErrors({ general: 'Error al consultar la información. Por favor intente nuevamente.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPerson = (person) => {
    // Usar los datos reales completos que están en person.datosCompletos
    if (person.datosCompletos) {
      const detailedPerson = {
        // Datos básicos
        cedula: person.datosCompletos.cedula,
        nombre: person.nombre,
        primerApellido: person.primerApellido,
        segundoApellido: person.segundoApellido,
        fechaNacimiento: person.datosCompletos.fechaNacimiento,
        
        // Datos familiares reales
        nacionalidad: person.datosCompletos.nacionalidad,
        edad: person.datosCompletos.edad,
        marginal: person.datosCompletos.marginal,
        padre: person.datosCompletos.hijoDe,
        identificacionPadre: person.datosCompletos.identificacionPadre,
        madre: person.datosCompletos.madre,
        identificacionMadre: person.datosCompletos.identificacionMadre,
        
        // Información adicional completa
        provincia: person.datosCompletos.provincia,
        canton: person.datosCompletos.canton,
        distritoAdministrativo: person.datosCompletos.distritoAdministrativo,
        distritoElectoral: person.datosCompletos.distritoElectoral,
        hijosRegistrados: person.datosCompletos.hijosRegistrados,
        matrimoniosRegistrados: person.datosCompletos.matrimoniosRegistrados,
        
        // Mantener referencia completa
        datosCompletos: person.datosCompletos
      };
      setSelectedPerson(detailedPerson);
    } else {
      // Fallback si no hay datos completos (no debería ocurrir)
      setSelectedPerson(person);
    }
    setViewMode('detail');
  };

  const handleNewSearch = () => {
    setFormData({
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      cantidadResultados: '10'
    });
    setResults(null);
    setSelectedPerson(null);
    setErrors({});
    setViewMode('form');
  };

  const handleBackToResults = () => {
    setSelectedPerson(null);
    setViewMode('results');
  };

  return (
    <div className="consulta-nombre-page">
      <Header />
      
      <main className="nombre-main">
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
              <span className="breadcrumb-current">Consulta por Nombre</span>
            </nav>
          </div>
        </div>

        {/* Header Section */}
        <section className="page-header">
          <div className="container">
            <div className="header-content">
              <div className="header-text">
                <h1 className="page-title">
                  <User className="page-title-icon" />
                  Consulta por Nombre y Apellidos
                </h1>
                <p className="page-subtitle">
                  Busque información del Registro Civil utilizando nombres completos
                </p>
                <p className="page-description">
                  Ingrese el nombre y apellidos de la persona a consultar. 
                  El sistema acepta mayúsculas y minúsculas.
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

        {/* Dynamic Content Section */}
        <section className="form-section">
          <div className="container">
            <div className="form-container">
              {viewMode === 'form' && (
                <form onSubmit={handleSubmit} className="consulta-form">
                  <div className="form-header">
                    <h2 className="form-title">
                      <Search size={20} />
                      Búsqueda por Nombres
                    </h2>
                  </div>

                  <div className="form-body">
                    {errors.general && (
                      <div className="form-error form-error--general" role="alert">
                        <AlertTriangle size={20} />
                        {errors.general}
                      </div>
                    )}

                    <div className="search-form">
                      <div className="input-group">
                        <div className="input-field">
                          <label>NOMBRE *</label>
                          <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            placeholder="Nombre"
                            className={errors.nombre ? 'error' : ''}
                          />
                        </div>
                        
                        <div className="input-field">
                          <label>PRIMER APELLIDO *</label>
                          <input
                            type="text"
                            name="primerApellido"
                            value={formData.primerApellido}
                            onChange={handleInputChange}
                            placeholder="Apellido"
                            className={errors.primerApellido ? 'error' : ''}
                          />
                        </div>
                        
                        <div className="input-field">
                          <label>SEGUNDO APELLIDO</label>
                          <input
                            type="text"
                            name="segundoApellido"
                            value={formData.segundoApellido}
                            onChange={handleInputChange}
                            placeholder="Opción"
                          />
                        </div>
                        
                        <div className="input-field select-field">
                          <label>LÍMITE</label>
                          <select
                            name="cantidadResultados"
                            value={formData.cantidadResultados}
                            onChange={handleInputChange}
                          >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>
                        </div>
                      </div>
                      
                      <button 
                        type="submit" 
                        className="search-btn"
                        disabled={loading || !formData.nombre.trim() || !formData.primerApellido.trim()}
                      >
                        {loading ? (
                          <>
                            <Loader size={16} />
                            Buscando...
                          </>
                        ) : (
                          <>
                            <Search size={16} />
                            BUSCAR
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {viewMode === 'results' && results && (
                <div className="results-container">
                  <div className="results-header">
                    <div className="results-title-section">
                      <h2 className="results-main-title">
                        <Users size={24} />
                        Resultados de Búsqueda
                      </h2>
                      <p className="results-summary">
                        Se encontraron {results.total} personas. Seleccione una para ver más detalles.
                      </p>
                    </div>
                    <button 
                      className="back-to-search-btn"
                      onClick={handleNewSearch}
                    >
                      <ArrowLeft size={16} />
                      Nueva Búsqueda
                    </button>
                  </div>
                  
                  <div className="results-list">
                    {results.data.map((person, index) => (
                      <div key={person.cedula} className="result-card clickable" onClick={() => handleSelectPerson(person)}>
                        <div className="result-number">#{index + 1}</div>
                        <div className="result-info">
                          <h3 className="result-name">
                            {person.nombre} {person.primerApellido} {person.segundoApellido}
                          </h3>
                          <div className="result-details">
                            <span className="result-cedula">Cédula: {person.cedula}</span>
                            <span className="result-birth">Nacimiento: {person.fechaNacimiento}</span>
                          </div>
                        </div>
                        <div className="result-action">
                          <ArrowLeft size={20} className="select-icon" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {viewMode === 'detail' && selectedPerson && (
                <div className="person-info-card">
                  {/* Usar la misma estructura que la consulta por cédula */}
                  <div className="cert-header">
                    <h2 className="cert-title">SOLICITUD DE CERTIFICACIONES</h2>
                    <div className="cert-tabs">
                      <button className="cert-tab">SOLICITAR CERTIFICACIÓN DE NACIMIENTO</button>
                      <button className="cert-tab">SOLICITAR CERTIFICACIÓN DE ESTADO CIVIL</button>
                      <button className="cert-tab">SOLICITAR CERTIFICACIÓN DE DEFUNCIÓN</button>
                    </div>
                  </div>

                  <div className="person-details">
                    <h3 className="details-title">DETALLE DEL NACIMIENTO PARA ESTA PERSONA</h3>
                    
                    {/* Grid reorganizado para mejor comprensión */}
                    <div className="details-grid">
                      <span className="detail-label">Número de Cédula :</span>
                      <span className="detail-value highlight">{selectedPerson.cedula}</span>
                      <span className="detail-label">Fecha Nacimiento :</span>
                      <span className="detail-value">{selectedPerson.fechaNacimiento}</span>

                      <span className="detail-label">Nombre Completo :</span>
                      <span className="detail-value">{selectedPerson.nombre} {selectedPerson.primerApellido} {selectedPerson.segundoApellido}</span>
                      <span className="detail-label">Nacionalidad :</span>
                      <span className="detail-value">{selectedPerson.nacionalidad}</span>

                      <span className="detail-label">Conocido/a Como :</span>
                      <span className="detail-value">-</span>
                      <span className="detail-label">Edad :</span>
                      <span className="detail-value">{selectedPerson.edad} AÑOS</span>

                      <span className="detail-label">Hijo/a de:</span>
                      <span className="detail-value">{selectedPerson.padre}</span>
                      <span className="detail-label">Marginal :</span>
                      <span className="detail-value">{selectedPerson.marginal || 'NO'}</span>

                      <span className="detail-label">Identificación:</span>
                      <span className="detail-value">{selectedPerson.identificacionPadre || '0'}</span>
                      <span className="detail-label"></span>
                      <span className="detail-value"></span>
                      
                      <span className="detail-label">Y:</span>
                      <span className="detail-value">{selectedPerson.madre}</span>
                      <span className="detail-label"></span>
                      <span className="detail-value"></span>

                      <span className="detail-label">Identificación:</span>
                      <span className="detail-value">{selectedPerson.identificacionMadre || '0'}</span>
                      <span className="detail-label"></span>
                      <span className="detail-value"></span>
                    </div>
                    
                    {/* Botón centrado fuera del grid */}
                    <div className="ver-mas-container">
                      <button className="ver-mas-btn">Ver Más Detalles</button>
                    </div>
                  </div>

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

                  <div className="person-actions">
                    <button 
                      className="action-btn action-btn--back"
                      onClick={handleBackToResults}
                    >
                      <ArrowLeft size={16} />
                      Volver a Resultados
                    </button>
                    
                    <button 
                      className="action-btn action-btn--back"
                      onClick={handleNewSearch}
                    >
                      <Search size={16} />
                      Nueva Búsqueda
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
              <h2 className="help-title">Consejos de Búsqueda</h2>
              
              <div className="help-grid">
                <div className="help-card help-card--tips">
                  <div className="help-header">
                    <Search className="help-icon" />
                    <h3 className="help-card-title">Consejos para Mejores Resultados</h3>
                  </div>
                  <div className="help-card-content">
                    <ul>
                      <li>Use nombres completos sin abreviaciones</li>
                      <li>El sistema acepta mayúsculas y minúsculas</li>
                      <li>Incluya tildes y caracteres especiales cuando corresponda</li>
                      <li>Si hay muchos resultados, sea más específico</li>
                    </ul>
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

export default ConsultaNombrePage;