import React from 'react';
import { 
  User, 
  FileText, 
  Vote, 
  Scale, 
  GraduationCap, 
  BookOpen,
  Search,
  MapPin,
  Shield,
  Users,
  Calendar,
  Award
} from 'lucide-react';
import Header from './components/Header';
import ServiceCard from './components/ServiceCard';
import NewsCard from './components/NewsCard';
import Footer from './components/Footer';
import './App.css';

function App() {
  // Datos de servicios principales basados en el sitio del TSE
  const mainServices = [
    {
      icon: <User size={28} />,
      title: "Sobre el TSE",
      description: "Información institucional, misión, visión y estructura organizacional del Tribunal.",
      href: "#sobre-tse"
    },
    {
      icon: <FileText size={28} />,
      title: "Servicios Registro Civil",
      description: "Cédulas de identidad, certificaciones de nacimiento, defunción y matrimonio.",
      href: "#servicios-registro"
    },
    {
      icon: <Vote size={28} />,
      title: "Elecciones y Partidos",
      description: "Procesos electorales, inscripción de partidos políticos y resultados.",
      href: "#elecciones"
    },
    {
      icon: <Scale size={28} />,
      title: "Jurisprudencia y Normativa",
      description: "Marco legal, resoluciones y jurisprudencia electoral.",
      href: "#jurisprudencia"
    },
    {
      icon: <GraduationCap size={28} />,
      title: "Formación en Democracia",
      description: "Programas educativos y promoción de valores democráticos.",
      href: "#formacion"
    },
    {
      icon: <BookOpen size={28} />,
      title: "Publicaciones",
      description: "Documentos, estudios, revista de derecho electoral y recursos.",
      href: "#publicaciones"
    }
  ];

  // Servicios más visitados
  const quickServices = [
    {
      icon: <Search size={24} />,
      title: "Consultas Civiles",
      description: "Verificación de estado civil y datos personales.",
      href: "/consultas-civiles",
      isRoute: true
    },
    {
      icon: <Shield size={24} />,
      title: "Certificaciones Digitales",
      description: "Validación y verificación de documentos digitales.",
      href: "#certificaciones",
    },
    {
      icon: <FileText size={24} />,
      title: "Documento de Identidad",
      description: "Renovación y trámites relacionados con cédula.",
      href: "#cedula"
    },
    {
      icon: <MapPin size={24} />,
      title: "Lugar de Votación",
      description: "Consulta tu centro de votación por código QR.",
      href: "#votacion"
    }
  ];

  // Noticias destacadas basadas en el contenido del sitio
  const featuredNews = [
    {
      title: "Costarricenses podrán obtener su documento digital de identidad",
      summary: "El TSE implementa nueva tecnología para facilitar la obtención del documento digital de identidad, mejorando la eficiencia en los trámites ciudadanos.",
      date: "2025-08-01",
      href: "#noticia-1",
      category: "Servicios Digitales",
    },
    {
      title: "Costarricenses podrán conocer su lugar de votación a través de código QR",
      summary: "Nueva funcionalidad permite a los ciudadanos consultar rápidamente su centro de votación mediante códigos QR.",
      date: "2025-08-14",
      href: "#noticia-2",
      category: "Procesos Electorales"
    },
    {
      title: "Costarricenses radicados en el extranjero pueden solicitar cambios en su domicilio electoral",
      summary: "El TSE facilita los trámites para ciudadanos en el exterior que necesiten actualizar su información electoral.",
      date: "2025-08-07",
      href: "#noticia-3",
      category: "Servicios al Ciudadano"
    }
  ];

  // Sección destacada adicional
  const highlightedSections = [
    {
      icon: <Users size={32} />,
      title: "Transparencia y Rendición de Cuentas",
      description: "Acceso a información pública, presupuestos y rendición de cuentas institucional.",
      href: "#transparencia"
    },
    {
      icon: <Award size={32} />,
      title: "Participación Política de las Mujeres",
      description: "Programas e iniciativas para promover la participación femenina en la política.",
      href: "#mujeres"
    },
    {
      icon: <BookOpen size={32} />,
      title: "Revista de Derecho Electoral",
      description: "Publicación especializada en temas de derecho electoral y democracia.",
      href: "#revista"
    }
  ];

  return (
    <div className="app">
      <Header />
      
      <main id="main-content" className="main">
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <div className="hero__content">
              <div className="hero__text">
                <h1 className="hero__title">
                  Tribunal Supremo de Elecciones
                  <span className="hero__subtitle">República de Costa Rica</span>
                </h1>
                <p className="hero__description">
                  Institución constitucional autónoma encargada de organizar, dirigir y vigilar 
                  los actos relativos al sufragio, garantizando el ejercicio efectivo de los 
                  derechos políticos de la ciudadanía costarricense.
                </p>
                <div className="hero__actions">
                  <a href="#servicios" className="btn btn-primary btn-hero">
                    Explorar Servicios
                  </a>
                </div>
              </div>
              
              <div className="hero__visual">
                <div className="hero__emblem">
                  <div className="hero__emblem-inner">
                    <img 
                      src="https://www.tse.go.cr/imgs/iconos/logo-TSE.svg" 
                      alt="Escudo del Tribunal Supremo de Elecciones" 
                      className="hero__emblem-logo"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hero__emblem-fallback" style={{display: 'none'}}>
                      TSE
                    </div>
                  </div>
                  <div className="hero__emblem-rings">
                    <div className="hero__ring hero__ring--1"></div>
                    <div className="hero__ring hero__ring--2"></div>
                    <div className="hero__ring hero__ring--3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Servicios más visitados */}
        <section className="quick-services" aria-labelledby="quick-services-title">
          <div className="container">
            <div className="section-header">
              <h2 id="quick-services-title" className="section-title">
                Servicios Más Utilizados
              </h2>
              <p className="section-description">
                Accesos rápidos a los servicios más consultados por la ciudadanía
              </p>
            </div>
            
            <div className="quick-services__grid">
              {quickServices.map((service, index) => (
                <ServiceCard 
                  key={index} 
                  {...service} 
                  className="service-card--compact"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Servicios principales */}
        <section id="servicios" className="main-services" aria-labelledby="main-services-title">
          <div className="container">
            <div className="section-header">
              <h2 id="main-services-title" className="section-title">
                Servicios Institucionales
              </h2>
              <p className="section-description">
                Explore todos los servicios que el TSE pone a disposición de la ciudadanía
              </p>
            </div>
            
            <div className="services-grid">
              {mainServices.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </section>

        {/* Secciones destacadas */}
        <section className="highlighted-sections" aria-labelledby="highlighted-title">
          <div className="container">
            <div className="section-header">
              <h2 id="highlighted-title" className="section-title">
                Secciones Destacadas
              </h2>
            </div>
            
            <div className="highlighted-grid">
              {highlightedSections.map((section, index) => (
                <ServiceCard key={index} {...section} />
              ))}
            </div>
          </div>
        </section>

        {/* Noticias */}
        <section className="news-section" aria-labelledby="news-title">
          <div className="container">
            <div className="section-header">
              <h2 id="news-title" className="section-title">
                Noticias Recientes
              </h2>
              <p className="section-description">
                Manténgase informado sobre las últimas actividades y servicios del TSE
              </p>
            </div>
            
            <div className="news-grid">
              {featuredNews.map((news, index) => (
                <NewsCard key={index} {...news} />
              ))}
            </div>
            
            <div className="news-actions">
              <a href="#todas-noticias" className="btn btn-outline">
                Ver Todas las Noticias
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
