import React, { useState, useEffect } from 'react';
import App from './App';
import ConsultasCivilesPage from './components/ConsultasCivilesPage';
import ConsultaCedulaPage from './components/ConsultaCedulaPage';
import ConsultaNombrePage from './components/ConsultaNombrePage';

function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.scrollTo(0, 0); // Forzar scroll al inicio antes de cambiar la ruta
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Proporcionar función de navegación globalmente
  window.navigate = navigate;

  switch (currentPath) {
    case '/consultas-civiles':
      return <ConsultasCivilesPage />;
    case '/consulta-cedula':
      return <ConsultaCedulaPage />;
    case '/consulta-nombre':
      return <ConsultaNombrePage />;
    default:
      return <App />;
  }
}

export default Router;