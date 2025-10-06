// Base de datos de personas reales extraídas del sistema TSE
export const personasData = [
  // JOSE ANGEL CAMPOS AGUILAR
  {
    // Información básica
    cedula: "702310760",
    nombreCompleto: "JOSE ANGEL CAMPOS AGUILAR",
    fechaNacimiento: "12/11/1994",
    nacionalidad: "COSTARRICENSE",
    edad: "30",
    marginal: "NO",
    
    // Información familiar
    hijoDe: "GERARDO CAMPOS ALVARADO",
    madre: "MAUREEN AGUILAR GRANADOS",
    identificacionPadre: "107850964",
    identificacionMadre: "0",
    
    // Información adicional del TSE
    provincia: "LIMON",
    canton: "CENTRAL", 
    distritoAdministrativo: "LIMON",
    distritoElectoral: "SANTA EDUVIGIS",
    
    // Información de hijos registrados
    hijosRegistrados: [
      {
        cedula: "704310615",
        fechaNacimiento: "19/02/2021",
        nombre: "MATIAS GABRIEL CAMPOS ANGULO"
      }
    ],
    
    // Estado civil y matrimonios
    matrimoniosRegistrados: "*** No existen matrimonios asociados - Ver detalle ***",
    
    // Certificaciones disponibles
    certificacionesDisponibles: {
      nacimiento: true,
      estadoCivil: true,
      defuncion: false
    },
    
    // Metadata del sistema
    ultimaActualizacion: "2021-02-19",
    estadoRegistro: "ACTIVO",
    observaciones: "Registro completo y actualizado"
  },
  
  // DAVID CALVO GARCIA
  {
    // Información básica
    cedula: "703260035",
    nombreCompleto: "DAVID CALVO GARCIA",
    fechaNacimiento: "25/08/2006",
    nacionalidad: "COSTARRICENSE",
    edad: "19 AÑOS",
    marginal: "NO",
    
    // Información familiar
    hijoDe: "JOSE ANGEL CALVO VILLARREAL",
    madre: "ELSA OFELIA GARCIA MARTINEZ",
    identificacionPadre: "700690485",
    identificacionMadre: "700740627",
    
    // Información adicional del TSE
    provincia: "LIMON",
    canton: "CENTRAL", 
    distritoAdministrativo: "LIMON",
    distritoElectoral: "CORALES 2",
    
    // Información de hijos registrados
    hijosRegistrados: [], // No tiene hijos registrados
    
    // Estado civil y matrimonios
    matrimoniosRegistrados: "*** No existen matrimonios asociados - Ver detalle ***",
    
    // Certificaciones disponibles
    certificacionesDisponibles: {
      nacimiento: true,
      estadoCivil: true,
      defuncion: false
    },
    
    // Metadata del sistema
    ultimaActualizacion: "2006-08-25",
    estadoRegistro: "ACTIVO",
    observaciones: "Registro completo y actualizado"
  }
];

// Para compatibilidad con código existente
export const personaData = personasData[0];

// Función para validar cédula exacta
export const validarCedulaExacta = (cedulaIngresada) => {
  const cedula = cedulaIngresada?.toString().trim();
  return personasData.find(persona => persona.cedula === cedula) || null;
};

// Función para buscar por nombre y apellidos (más estricta)
export const buscarPorNombre = (nombre, primerApellido, segundoApellido = '') => {
  // Validar que al menos nombre y primer apellido estén presentes
  if (!nombre || !primerApellido || 
      nombre.trim().length < 2 || primerApellido.trim().length < 2) {
    return [];
  }
  
  // Normalizar entradas
  const nombreBusq = nombre.trim().toLowerCase();
  const primerApBusq = primerApellido.trim().toLowerCase();
  const segundoApBusq = segundoApellido.trim().toLowerCase();
  
  // Buscar en todas las personas registradas
  const resultados = [];
  
  for (const persona of personasData) {
    // Dividir el nombre completo de cada persona
    const partesNombre = persona.nombreCompleto.toLowerCase().split(/\s+/);
    
    // Determinar cuántas palabras son nombres vs apellidos
    // Para "JOSE ANGEL CAMPOS AGUILAR": nombres=["jose", "angel"], apellidos=["campos", "aguilar"]
    // Para "DAVID CALVO GARCIA": nombres=["david"], apellidos=["calvo", "garcia"]
    const nombres = partesNombre.slice(0, partesNombre.length >= 4 ? 2 : 1);
    const apellidos = partesNombre.slice(nombres.length);
    
    // Verificar coincidencia en nombre
    const nombreCoincide = nombres.some(n => 
      n.includes(nombreBusq) || nombreBusq.includes(n)
    );
    
    // Verificar coincidencia en primer apellido
    const primerApellidoCoincide = apellidos.some(ap => 
      ap.includes(primerApBusq) || primerApBusq.includes(ap)
    );
    
    // Si se proporciona segundo apellido, también debe coincidir
    let segundoApellidoCoincide = true;
    if (segundoApBusq) {
      segundoApellidoCoincide = apellidos.some(ap => 
        ap.includes(segundoApBusq) || segundoApBusq.includes(ap)
      );
    }
    
    // Debe coincidir nombre Y primer apellido (y segundo apellido si se proporciona)
    if (nombreCoincide && primerApellidoCoincide && segundoApellidoCoincide) {
      resultados.push(persona);
    }
  }
  
  return resultados;
};

// Función para búsqueda por texto libre (menos estricta, para casos especiales)
export const buscarPorTextoLibre = (textoCompleto) => {
  if (!textoCompleto || textoCompleto.trim().length < 4) {
    return [];
  }
  
  const textoBusqueda = textoCompleto.trim().toLowerCase();
  
  return personasData.filter(persona => 
    persona.nombreCompleto.toLowerCase().includes(textoBusqueda)
  );
};

// Función para obtener datos completos por cédula
export const obtenerDatosPorCedula = (cedula) => {
  return validarCedulaExacta(cedula);
};

// Función para obtener información de debug
export const getDebugInfo = () => {
  return {
    totalPersonas: personasData.length,
    personas: personasData.map(p => ({
      nombre: p.nombreCompleto,
      cedula: p.cedula,
      partes: p.nombreCompleto.split(' ')
    }))
  };
};