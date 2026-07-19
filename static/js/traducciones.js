// =========================================================
//  AULAPLC — SISTEMA DE TRADUCCIÓN ES / EN
//  Archivo: traducciones.js
//  Cargado desde base.html — funciona en TODAS las páginas
//  separadas: /cursos  /comunidad  /simulador-plc
//             /simulador-vfd  /dudas  /tienda  /cursos/tia-portal
// =========================================================

const T = {
  es: {
    // ── LOADER ──
    loaderTitle:   "⚡ AULAPLC",
    loaderText:    "INICIANDO PAGINA WEB",

    // ── HEADER ──
    appTitle:      "AULAPLC STUDIO X",
    appSubtitle:   "PLC LADDER ENGINE",

    // ── NAV ──
    navCursos:     "CURSOS",
    navComunidad:  "COMUNIDAD",
    navSimPLC:     "SIMULADOR PLC",
    navSimVFD:     "SIMULADOR VFD",
    navDudas:      "DUDAS",
    navTienda:     "TIENDA",

    // ── SIMULADOR PLC (/simulador-plc) ──
    simEntradas:   "ENTRADAS DIGITALES",
    simSalidas:    "SALIDAS PLC",
    simMotor:      "MOTOR TRIFÁSICO",
    simEventos:    "EVENTOS PLC",
    simForzar:     "FORZAR",
    simSimular:    "SIMULAR PLC",

    // ── CURSOS (/cursos) ──
    cursosTitle:    "CURSOS AULAPLC STUDIO X",
    cursosSubtitle: "Aprende PLC, HMI, SCADA, Variadores y Automatización Industrial.",
    curso1Title:    "PLC SIEMENS TIA PORTAL",
    curso1Desc:     "Curso completo desde cero con Ladder, simulación y proyectos industriales reales.",
    curso2Title:    "HMI + SCADA INDUSTRIAL",
    curso2Desc:     "Diseña pantallas profesionales y sistemas SCADA modernos para procesos industriales.",
    curso3Title:    "VARIADORES DE FRECUENCIA",
    curso3Desc:     "Configuración avanzada de variadores Siemens G120 y control de motores industriales.",
    btnEntrar:      "ENTRAR AL CURSO",
    btnDescargarPDF:"DESCARGAR PDF",
    btnVerVideos:   "VER VIDEOS",
    btnVerCurso:    "VER CURSO",
    btnDescargarMat:"DESCARGAR MATERIAL",
    btnManualesPDF: "MANUALES PDF",

    // ── TIA PORTAL (/cursos/tia-portal) ──
    tiaTitle:       "CURSO PLC SIEMENS TIA PORTAL",
    tiaSubtitle:    "Aprende automatización industrial paso a paso con videos, PDFs y simulaciones reales.",
    tiaDescargaTitle:"DESCARGAR TIA PORTAL",
    tiaDescargaDesc: "Antes de comenzar el curso, instala TIA Portal para poder realizar todas las prácticas, simulaciones y ejercicios de programación PLC Siemens incluidos en los módulos.",
    tiaIncluye:     "Incluye:",
    tiaItem1:       "Descargar TIA Portal",
    tiaItem2:       "Configuración inicial",
    tiaItem3:       "Activación de PLCSIM",
    tiaItem4:       "Preparación para los siguientes módulos",
    tiaVerVideo:    "VER VIDEO DE INSTALACIÓN",
    mod1Title:      "MÓDULO 1 - INTRODUCCIÓN A PLC",
    mod1Desc:       "Aprende qué es un PLC Siemens, funcionamiento de CPU, módulos y arquitectura industrial.",
    mod2Title:      "MÓDULO 2 - PROGRAMACIÓN LADDER",
    mod2Desc:       "Aprende programación Ladder industrial desde cero: contactos NO/NC, bobinas, temporizadores TON, TOF, TP y enclavamientos utilizados en automatización industrial real.",
    mod3Title:      "⚡ MÓDULO 3 - ENTRADAS Y SALIDAS",
    mod3Desc:       "Aprende la configuración de sensores industriales, entradas digitales, salidas digitales y simulación de PLC en entornos industriales reales utilizando TIA Portal y PLCSIM.",
    mod4Title:      "⏱️ MÓDULO 4 - TEMPORIZADORES TON, TOF Y TP",
    mod4Desc:       "Aprende a utilizar temporizadores industriales TON, TOF y TP en sistemas PLC Siemens y procesos automatizados reales.",
    mod5Title:      "🔢 MÓDULO 5 - CONTADORES CTU Y CTD",
    mod5Desc:       "Programación de contadores industriales CTU y CTD utilizados en producción, conteo de piezas y automatización industrial.",
    mod6Title:      "🔒 MÓDULO 6 - FUNCIONES AVANZADAS",
    mod6Desc:       "FC, FB, bloques de datos y programación estructurada en TIA Portal.",
    mod7Title:      "🔒 MÓDULO 7 - HMI SIEMENS",
    mod7Desc:       "Diseño de pantallas HMI profesionales y comunicación con PLC Siemens.",
    mod8Title:      "🔒 MÓDULO 8 - SCADA INDUSTRIAL",
    mod8Desc:       "Supervisión industrial, alarmas y monitoreo en tiempo real.",
    mod9Title:      "🔒 MÓDULO 9 - VARIADORES DE FRECUENCIA",
    mod9Desc:       "Configuración avanzada de variadores Siemens SINAMICS G120.",
    mod10Title:     "🔒 MÓDULO 10 - REDES INDUSTRIALES",
    mod10Desc:      "PROFINET, Modbus TCP, Ethernet/IP y comunicación industrial moderna.",
    btnCompletado:  "COMPLETADO",
    btnAbrirPDF:    "ABRIR PDF",
    btnSimularPLC:  "🖥️ SIMULAR PLC",
    btnDescargarProyecto: "⬇️ DESCARGAR PROYECTO",
    btnVolverCursos:"VOLVER A CURSOS",
    btnBloqueado:   "🔒 BLOQUEADO",
    premiumTitle:   "⚡ DESBLOQUEA EL CURSO COMPLETO",
    premiumDesc:    "Accede a los módulos avanzados (6 al 10) con una sola compra. Tu acceso se activa automáticamente después del pago.",
    premiumBtn:     "💳 ACTIVAR PREMIUM — $ 1.990 CLP",
    premiumAcceso:  "Acceso inmediato tras confirmar el pago",
    premiumYaPagaste:"¿Ya pagaste? Cierra sesión y vuelve a entrar. Si el acceso no se activa en 5 minutos escríbenos a",
    mod6Sub:        "Funciones avanzadas FC y FB",
    mod7Sub:        "HMI Siemens profesional",
    mod8Sub:        "SCADA Industrial",
    mod9Sub:        "Variadores SINAMICS G120",
    mod10Sub:       "Redes industriales PROFINET, Modbus TCP, Ethernet/IP",

    // ── VFD (/simulador-vfd) ──
    vfdControl:     "CONTROL",
    vfdParametros:  "PARÁMETROS",
    vfdMonitoreo:   "MONITOREO",
    vfdAlarmas:     "ALARMAS",
    vfdRefFreq:     "REFERENCIA DE FRECUENCIA",
    vfdComandos:    "COMANDOS PRINCIPALES",
    vfdArrancar:    "ARRANCAR",
    vfdReversa:     "REVERSA",
    vfdDetener:     "DETENER",
    vfdGuardarParam:"GUARDAR PARÁMETROS",
    vfdMonitoreoRT: "MONITOREO EN TIEMPO REAL",
    vfdEstado:      "ESTADO",
    vfdDireccion:   "DIRECCIÓN",
    vfdFrecuencia:  "FRECUENCIA",
    vfdRPM:         "RPM MOTOR",
    vfdTemperatura: "TEMPERATURA",
    vfdVoltaje:     "VOLTAJE SALIDA AC",
    vfdCorriente:   "CORRIENTE",
    vfdPotencia:    "POTENCIA",
    vfdModo:        "MODO",
    vfdComunicacion:"COMUNICACIÓN",
    vfdAlarma:      "ALARMA",
    vfdHistorial:   "HISTORIAL DE ALARMAS",
    vfdUltimaAlarma:"ÚLTIMA ALARMA",
    vfdLimCorriente:"LÍMITE CORRIENTE",
    vfdLimTemp:     "LÍMITE TEMPERATURA",
    vfdFreqNominal: "FRECUENCIA NOMINAL",
    vfdAdvertencia: "ADVERTENCIA",
    vfdResetAlarmas:"RESET ALARMAS",
    vfdAplicarFreq: "APLICAR FRECUENCIA",
    vfdNinguna:     "NINGUNA",

    // ── DUDAS (/dudas) ──
    dudasTitle:     "DUDAS FRECUENTES",
    dudasSubtitle:  "Preguntas comunes sobre automatización industrial, PLC y variadores.",
    faq: [
      ["¿QUÉ ES UN PLC?", "Un PLC es un controlador lógico programable utilizado para automatizar máquinas y procesos industriales."],
      ["¿QUÉ ES UN VARIADOR VFD?", "Es un equipo electrónico que controla la velocidad y frecuencia de motores eléctricos trifásicos."],
      ["¿QUÉ ES LADDER?", "Ladder es un lenguaje gráfico industrial usado para programar PLC mediante contactos y bobinas."],
      ["¿QUÉ ES SCADA?", "SCADA permite supervisar, controlar y visualizar procesos industriales en tiempo real."],
      ["¿QUÉ HACE UN SENSOR?", "Los sensores detectan variables físicas como temperatura, proximidad o presión y envían señales al PLC."],
      ["¿QUÉ ES HMI?", "Una HMI es una interfaz gráfica que permite al operador interactuar con máquinas industriales."],
      ["¿QUÉ ES UN SENSOR INDUCTIVO?", "Detecta objetos metálicos sin contacto físico mediante campos electromagnéticos."],
      ["¿QUÉ ES UN SENSOR CAPACITIVO?", "Detecta materiales metálicos y no metálicos usando variaciones de capacitancia."],
      ["¿QUÉ ES UN CONTACTOR?", "Es un dispositivo eléctrico utilizado para controlar motores y cargas industriales."],
      ["¿QUÉ ES UN RELÉ TÉRMICO?", "Protege motores eléctricos contra sobrecargas prolongadas."],
      ["¿QUÉ ES UN MOTOR TRIFÁSICO?", "Es un motor alimentado por tres fases eléctricas para mayor eficiencia industrial."],
      ["¿QUÉ ES MODBUS?", "Es un protocolo de comunicación industrial usado entre PLC, HMI y variadores."],
      ["¿QUÉ ES PROFINET?", "Es una red Ethernet industrial usada principalmente en automatización Siemens."],
      ["¿QUÉ ES ETHERNET/IP?", "Es un protocolo industrial basado en Ethernet para comunicación en automatización."],
      ["¿QUÉ ES UN TEMPORIZADOR TON?", "Activa una salida después de un tiempo determinado (retardo a la conexión)."],
      ["¿QUÉ ES UN CONTADOR CTU?", "Cuenta pulsos o eventos dentro de un programa PLC."],
      ["¿QUÉ ES UNA ENTRADA DIGITAL?", "Es una señal ON/OFF proveniente desde sensores o pulsadores."],
      ["¿QUÉ ES UNA SALIDA DIGITAL?", "Es una señal enviada por el PLC para activar actuadores."],
      ["¿QUÉ ES UNA ENTRADA ANALÓGICA?", "Permite leer señales variables como presión, temperatura o nivel."],
      ["¿QUÉ ES PID?", "Es un sistema de control automático utilizado para mantener variables estables."],
      ["¿QUÉ ES UN SERVOMOTOR?", "Es un motor de alta precisión utilizado en posicionamiento industrial."],
      ["¿QUÉ ES UN ENCODER?", "Es un sensor que mide posición, velocidad o giro de un eje."],
      ["¿QUÉ ES MANTENIMIENTO PREVENTIVO?", "Consiste en inspecciones programadas para evitar fallas industriales."],
      ["¿QUÉ ES MANTENIMIENTO CORRECTIVO?", "Es la reparación realizada después de una falla o avería."],
      ["¿QUÉ ES UN TABLERO ELÉCTRICO?", "Es un gabinete donde se instalan protecciones y equipos eléctricos."],
      ["¿QUÉ ES UN BREAKER?", "Es un interruptor automático de protección eléctrica."],
      ["¿QUÉ ES UN FUSIBLE?", "Protege circuitos eléctricos fundiéndose ante exceso de corriente."],
      ["¿QUÉ ES UN TRANSFORMADOR?", "Permite aumentar o disminuir niveles de tensión eléctrica."],
      ["¿QUÉ ES UNA FUENTE 24VDC?", "Convierte corriente alterna en corriente continua para PLC y sensores."],
      ["¿QUÉ ES NEUMÁTICA?", "Es la tecnología que utiliza aire comprimido para automatizar movimientos."],
      ["¿QUÉ ES HIDRÁULICA?", "Es un sistema que utiliza fluidos a presión para generar fuerza."],
      ["¿QUÉ ES INDUSTRIA 4.0?", "Es la integración de automatización, datos e inteligencia en procesos industriales."],
      ["¿QUÉ ES IoT INDUSTRIAL?", "Permite conectar máquinas industriales a internet para monitoreo remoto."],
      ["¿QUÉ ES UNA ELECTROVÁLVULA?", "Controla el paso de aire o fluidos mediante señales eléctricas."],
      ["¿QUÉ ES UN ARRANQUE DIRECTO?", "Es el método más simple para arrancar motores trifásicos."],
      ["¿QUÉ ES UN ARRANQUE ESTRELLA TRIÁNGULO?", "Reduce la corriente de arranque de motores industriales."],
      ["¿QUÉ ES UNA FALLA DE SOBRECARGA?", "Ocurre cuando un motor consume más corriente de la permitida."],
      ["¿QUÉ ES TIA PORTAL?", "Es el software de Siemens para programar PLC y HMI."],
      ["¿QUÉ ES UNA RED INDUSTRIAL?", "Permite comunicación entre PLC, sensores y sistemas SCADA."],
      ["¿QUÉ ES UNA LUZ PILOTO?", "Indica visualmente estados de máquinas como RUN o FALLA."],
      ["¿QUÉ ES UN PULSADOR NA Y NC?", "Los NA se activan al presionar y los NC se abren al presionar."],
      ["¿QUÉ ES CORRIENTE ALTERNA?", "Es una corriente eléctrica que cambia de dirección constantemente."],
      ["¿QUÉ ES CORRIENTE CONTINUA?", "Es una corriente eléctrica que circula en una sola dirección."],
      ["¿QUÉ ES VOLTAJE?", "Es la diferencia de potencial eléctrico que impulsa la corriente."],
      ["¿QUÉ ES AMPERAJE?", "Es la cantidad de corriente eléctrica que circula por un circuito."],
      ["¿QUÉ ES POTENCIA ELÉCTRICA?", "Es la energía consumida o entregada por un sistema eléctrico."]
    ],

    // ── TIENDA (/tienda) ──
    tiendaTitle:    "TIENDA AULAPLC",
    tiendaSubtitle: "Productos recomendados para automatización industrial, PLC Siemens, sensores, HMI y variadores.",
    tiendaFiltrar:  "FILTRAR:",
    tiendaTodos:    "TODOS",
    tiendaSensores: "SENSORES",
    tiendaCables:   "CABLES",
    tiendaFuente:   "FUENTE",
    tiendaLuces:    "LUCES",
    tiendaInterruptor:"INTERRUPTOR",
    tiendaVariador: "VARIADOR",
    btnVerProducto: "VER PRODUCTO ↗",

    // ── COMUNIDAD (/comunidad) ──
    comunidadTitle:   "Comunidad AulaPlc",
    comunidadSubtitle:"Hace una pregunta, responde y aprende junto a otros técnicos.",
    comunidadNueva:   "Nueva pregunta",
    comunidadHacer:   "Hacer una pregunta",
    comunidadTituloPlaceholder: "Título claro y concreto de tu pregunta",
    comunidadTextoPlaceholder:  "Describe el problema con detalle. Incluye qué probaste, qué resultado obtienes y qué esperabas.",
    comunidadCancelar:  "Cancelar",
    comunidadPublicar:  "Publicar pregunta",
    comunidadNuevas:    "Nuevas",
    comunidadPopulares: "Populares",
    comunidadSinResp:   "Sin respuesta",
    comunidadRespuestas:"respuestas",
    comunidadResponder: "Responder",
    comunidadEscribe:   "Escribe tu respuesta...",
    comunidadCargando:  "Cargando...",
    comunidadVacia:     "Aún no hay preguntas. ¡Sé el primero!",
    comunidadTodasResp: "Todas las preguntas tienen respuesta 🎉",
    comunidadSinRespAun:"Sin respuestas aún. ¡Sé el primero en responder!",

    // ── LOGIN MODAL ──
    loginTitle:   "Accede a Aula PLC",
    loginDesc:    "Inicia sesión para guardar tu progreso y acceder a los módulos que hayas desbloqueado.",
    loginBtn:     "Continuar con Google",
    loginTerms:   "Al ingresar aceptas los términos del servicio. No guardamos contraseñas.",

    // ── QUIZ ──
    quizTitle:    "🧠 TEST DE PROGRAMACIÓN LADDER",
    quizSiguiente:"➡ SIGUIENTE PREGUNTA",
    quizFin:      "✅ TEST FINALIZADO",
    quizFinDesc:  "Has completado las 8 preguntas de programación Ladder industrial.",
    quizCorrecto: "✅ RESPUESTA CORRECTA",
    quizIncorrecto:"❌ RESPUESTA INCORRECTA",
  },

  en: {
    // ── LOADER ──
    loaderTitle:   "⚡ AULAPLC",
    loaderText:    "LOADING PAGE",

    // ── HEADER ──
    appTitle:      "AULAPLC STUDIO X",
    appSubtitle:   "PLC LADDER ENGINE",

    // ── NAV ──
    navCursos:     "COURSES",
    navComunidad:  "COMMUNITY",
    navSimPLC:     "PLC SIMULATOR",
    navSimVFD:     "VFD SIMULATOR",
    navDudas:      "FAQ",
    navTienda:     "STORE",

    // ── SIMULADOR PLC ──
    simEntradas:   "DIGITAL INPUTS",
    simSalidas:    "PLC OUTPUTS",
    simMotor:      "THREE-PHASE MOTOR",
    simEventos:    "PLC EVENTS",
    simForzar:     "FORCE",
    simSimular:    "SIMULATE PLC",

    // ── CURSOS ──
    cursosTitle:    "AULAPLC STUDIO X COURSES",
    cursosSubtitle: "Learn PLC, HMI, SCADA, Drives and Industrial Automation.",
    curso1Title:    "PLC SIEMENS TIA PORTAL",
    curso1Desc:     "Complete course from scratch with Ladder, simulation and real industrial projects.",
    curso2Title:    "HMI + INDUSTRIAL SCADA",
    curso2Desc:     "Design professional screens and modern SCADA systems for industrial processes.",
    curso3Title:    "FREQUENCY DRIVES",
    curso3Desc:     "Advanced configuration of Siemens G120 drives and industrial motor control.",
    btnEntrar:      "ENTER COURSE",
    btnDescargarPDF:"DOWNLOAD PDF",
    btnVerVideos:   "WATCH VIDEOS",
    btnVerCurso:    "VIEW COURSE",
    btnDescargarMat:"DOWNLOAD MATERIAL",
    btnManualesPDF: "PDF MANUALS",

    // ── TIA PORTAL ──
    tiaTitle:       "PLC SIEMENS TIA PORTAL COURSE",
    tiaSubtitle:    "Learn industrial automation step by step with videos, PDFs and real simulations.",
    tiaDescargaTitle:"DOWNLOAD TIA PORTAL",
    tiaDescargaDesc: "Before starting the course, install TIA Portal to complete all practices, simulations and PLC programming exercises included in the modules.",
    tiaIncluye:     "Includes:",
    tiaItem1:       "Download TIA Portal",
    tiaItem2:       "Initial configuration",
    tiaItem3:       "PLCSIM activation",
    tiaItem4:       "Preparation for the following modules",
    tiaVerVideo:    "WATCH INSTALLATION VIDEO",
    mod1Title:      "MODULE 1 - INTRODUCTION TO PLC",
    mod1Desc:       "Learn what a Siemens PLC is, CPU operation, modules and industrial architecture.",
    mod2Title:      "MODULE 2 - LADDER PROGRAMMING",
    mod2Desc:       "Learn industrial Ladder programming from scratch: NO/NC contacts, coils, TON, TOF, TP timers and interlocks used in real industrial automation.",
    mod3Title:      "⚡ MODULE 3 - INPUTS AND OUTPUTS",
    mod3Desc:       "Learn the configuration of industrial sensors, digital inputs, digital outputs and PLC simulation in real industrial environments using TIA Portal and PLCSIM.",
    mod4Title:      "⏱️ MODULE 4 - TON, TOF AND TP TIMERS",
    mod4Desc:       "Learn to use industrial TON, TOF and TP timers in Siemens PLC systems and real automated processes.",
    mod5Title:      "🔢 MODULE 5 - CTU AND CTD COUNTERS",
    mod5Desc:       "Programming of industrial CTU and CTD counters used in production, parts counting and industrial automation.",
    mod6Title:      "🔒 MODULE 6 - ADVANCED FUNCTIONS",
    mod6Desc:       "FC, FB, data blocks and structured programming in TIA Portal.",
    mod7Title:      "🔒 MODULE 7 - SIEMENS HMI",
    mod7Desc:       "Design of professional HMI screens and communication with Siemens PLC.",
    mod8Title:      "🔒 MODULE 8 - INDUSTRIAL SCADA",
    mod8Desc:       "Industrial supervision, alarms and real-time monitoring.",
    mod9Title:      "🔒 MODULE 9 - FREQUENCY DRIVES",
    mod9Desc:       "Advanced configuration of Siemens SINAMICS G120 drives.",
    mod10Title:     "🔒 MODULE 10 - INDUSTRIAL NETWORKS",
    mod10Desc:      "PROFINET, Modbus TCP, Ethernet/IP and modern industrial communication.",
    btnCompletado:  "COMPLETED",
    btnAbrirPDF:    "OPEN PDF",
    btnSimularPLC:  "🖥️ SIMULATE PLC",
    btnDescargarProyecto: "⬇️ DOWNLOAD PROJECT",
    btnVolverCursos:"BACK TO COURSES",
    btnBloqueado:   "🔒 LOCKED",
    premiumTitle:   "⚡ UNLOCK THE FULL COURSE",
    premiumDesc:    "Access advanced modules (6 to 10) with a single purchase. Your access activates automatically after payment.",
    premiumBtn:     "💳 ACTIVATE PREMIUM — $ 1.990 CLP",
    premiumAcceso:  "Immediate access after confirming payment",
    premiumYaPagaste:"Already paid? Log out and log back in. If access doesn't activate within 5 minutes write us at",
    mod6Sub:        "Advanced FC and FB functions",
    mod7Sub:        "Professional Siemens HMI",
    mod8Sub:        "Industrial SCADA",
    mod9Sub:        "SINAMICS G120 Drives",
    mod10Sub:       "Industrial networks PROFINET, Modbus TCP, Ethernet/IP",

    // ── VFD ──
    vfdControl:     "CONTROL",
    vfdParametros:  "PARAMETERS",
    vfdMonitoreo:   "MONITORING",
    vfdAlarmas:     "ALARMS",
    vfdRefFreq:     "FREQUENCY REFERENCE",
    vfdComandos:    "MAIN COMMANDS",
    vfdArrancar:    "START",
    vfdReversa:     "REVERSE",
    vfdDetener:     "STOP",
    vfdGuardarParam:"SAVE PARAMETERS",
    vfdMonitoreoRT: "REAL-TIME MONITORING",
    vfdEstado:      "STATUS",
    vfdDireccion:   "DIRECTION",
    vfdFrecuencia:  "FREQUENCY",
    vfdRPM:         "MOTOR RPM",
    vfdTemperatura: "TEMPERATURE",
    vfdVoltaje:     "OUTPUT VOLTAGE AC",
    vfdCorriente:   "CURRENT",
    vfdPotencia:    "POWER",
    vfdModo:        "MODE",
    vfdComunicacion:"COMMUNICATION",
    vfdAlarma:      "ALARM",
    vfdHistorial:   "ALARM HISTORY",
    vfdUltimaAlarma:"LAST ALARM",
    vfdLimCorriente:"CURRENT LIMIT",
    vfdLimTemp:     "TEMPERATURE LIMIT",
    vfdFreqNominal: "NOMINAL FREQUENCY",
    vfdAdvertencia: "WARNING",
    vfdResetAlarmas:"RESET ALARMS",
    vfdAplicarFreq: "APPLY FREQUENCY",
    vfdNinguna:     "NONE",

    // ── DUDAS ──
    dudasTitle:     "FREQUENTLY ASKED QUESTIONS",
    dudasSubtitle:  "Common questions about industrial automation, PLC and drives.",
    faq: [
      ["WHAT IS A PLC?", "A PLC is a programmable logic controller used to automate machines and industrial processes."],
      ["WHAT IS A VFD?", "It is an electronic device that controls the speed and frequency of three-phase electric motors."],
      ["WHAT IS LADDER?", "Ladder is an industrial graphical language used to program PLCs using contacts and coils."],
      ["WHAT IS SCADA?", "SCADA allows supervising, controlling and visualizing industrial processes in real time."],
      ["WHAT DOES A SENSOR DO?", "Sensors detect physical variables such as temperature, proximity or pressure and send signals to the PLC."],
      ["WHAT IS HMI?", "An HMI is a graphical interface that allows the operator to interact with industrial machines."],
      ["WHAT IS AN INDUCTIVE SENSOR?", "Detects metallic objects without physical contact using electromagnetic fields."],
      ["WHAT IS A CAPACITIVE SENSOR?", "Detects metallic and non-metallic materials using capacitance variations."],
      ["WHAT IS A CONTACTOR?", "It is an electrical device used to control motors and industrial loads."],
      ["WHAT IS A THERMAL RELAY?", "Protects electric motors against prolonged overloads."],
      ["WHAT IS A THREE-PHASE MOTOR?", "It is a motor powered by three electrical phases for greater industrial efficiency."],
      ["WHAT IS MODBUS?", "It is an industrial communication protocol used between PLCs, HMIs and drives."],
      ["WHAT IS PROFINET?", "It is an industrial Ethernet network used mainly in Siemens automation."],
      ["WHAT IS ETHERNET/IP?", "It is an industrial protocol based on Ethernet for communication in automation."],
      ["WHAT IS A TON TIMER?", "Activates an output after a set time (on-delay)."],
      ["WHAT IS A CTU COUNTER?", "Counts pulses or events within a PLC program."],
      ["WHAT IS A DIGITAL INPUT?", "It is an ON/OFF signal coming from sensors or pushbuttons."],
      ["WHAT IS A DIGITAL OUTPUT?", "It is a signal sent by the PLC to activate actuators."],
      ["WHAT IS AN ANALOG INPUT?", "Allows reading variable signals such as pressure, temperature or level."],
      ["WHAT IS PID?", "It is an automatic control system used to keep variables stable."],
      ["WHAT IS A SERVO MOTOR?", "It is a high-precision motor used in industrial positioning."],
      ["WHAT IS AN ENCODER?", "It is a sensor that measures position, speed or rotation of an axis."],
      ["WHAT IS PREVENTIVE MAINTENANCE?", "It consists of scheduled inspections to prevent industrial failures."],
      ["WHAT IS CORRECTIVE MAINTENANCE?", "It is the repair carried out after a failure or breakdown."],
      ["WHAT IS AN ELECTRICAL PANEL?", "It is a cabinet where protections and electrical equipment are installed."],
      ["WHAT IS A BREAKER?", "It is an automatic electrical protection switch."],
      ["WHAT IS A FUSE?", "Protects electrical circuits by melting under excess current."],
      ["WHAT IS A TRANSFORMER?", "Allows increasing or decreasing electrical voltage levels."],
      ["WHAT IS A 24VDC POWER SUPPLY?", "Converts alternating current to direct current for PLCs and sensors."],
      ["WHAT IS PNEUMATICS?", "It is the technology that uses compressed air to automate movements."],
      ["WHAT IS HYDRAULICS?", "It is a system that uses pressurized fluids to generate force."],
      ["WHAT IS INDUSTRY 4.0?", "It is the integration of automation, data and intelligence in industrial processes."],
      ["WHAT IS INDUSTRIAL IoT?", "Allows connecting industrial machines to the internet for remote monitoring."],
      ["WHAT IS A SOLENOID VALVE?", "Controls the flow of air or fluids via electrical signals."],
      ["WHAT IS DIRECT START?", "It is the simplest method to start three-phase motors."],
      ["WHAT IS STAR-DELTA STARTING?", "Reduces the starting current of industrial motors."],
      ["WHAT IS AN OVERLOAD FAULT?", "Occurs when a motor draws more current than allowed."],
      ["WHAT IS TIA PORTAL?", "It is the Siemens software for programming PLCs and HMIs."],
      ["WHAT IS AN INDUSTRIAL NETWORK?", "Enables communication between PLCs, sensors and SCADA systems."],
      ["WHAT IS A PILOT LIGHT?", "Visually indicates machine states such as RUN or FAULT."],
      ["WHAT IS A NO AND NC PUSHBUTTON?", "NO activates when pressed and NC opens when pressed."],
      ["WHAT IS ALTERNATING CURRENT?", "It is an electric current that constantly changes direction."],
      ["WHAT IS DIRECT CURRENT?", "It is an electric current that flows in one direction only."],
      ["WHAT IS VOLTAGE?", "It is the electrical potential difference that drives current."],
      ["WHAT IS AMPERAGE?", "It is the amount of electric current flowing through a circuit."],
      ["WHAT IS ELECTRIC POWER?", "It is the energy consumed or delivered by an electrical system."]
    ],

    // ── TIENDA ──
    tiendaTitle:    "AULAPLC STORE",
    tiendaSubtitle: "Recommended products for industrial automation, Siemens PLC, sensors, HMI and drives.",
    tiendaFiltrar:  "FILTER:",
    tiendaTodos:    "ALL",
    tiendaSensores: "SENSORS",
    tiendaCables:   "CABLES",
    tiendaFuente:   "POWER SUPPLY",
    tiendaLuces:    "LIGHTS",
    tiendaInterruptor:"SWITCH",
    tiendaVariador: "DRIVE",
    btnVerProducto: "VIEW PRODUCT ↗",

    // ── COMUNIDAD ──
    comunidadTitle:   "AulaPlc Community",
    comunidadSubtitle:"Ask a question, answer and learn with other technicians.",
    comunidadNueva:   "New question",
    comunidadHacer:   "Ask a question",
    comunidadTituloPlaceholder: "Clear and specific title for your question",
    comunidadTextoPlaceholder:  "Describe the problem in detail. Include what you tried, what result you get and what you expected.",
    comunidadCancelar:  "Cancel",
    comunidadPublicar:  "Post question",
    comunidadNuevas:    "New",
    comunidadPopulares: "Popular",
    comunidadSinResp:   "Unanswered",
    comunidadRespuestas:"answers",
    comunidadResponder: "Reply",
    comunidadEscribe:   "Write your answer...",
    comunidadCargando:  "Loading...",
    comunidadVacia:     "No questions yet. Be the first!",
    comunidadTodasResp: "All questions have been answered 🎉",
    comunidadSinRespAun:"No answers yet. Be the first to reply!",

    // ── LOGIN MODAL ──
    loginTitle:   "Access Aula PLC",
    loginDesc:    "Sign in to save your progress and access the modules you've unlocked.",
    loginBtn:     "Continue with Google",
    loginTerms:   "By signing in you accept the terms of service. We don't store passwords.",

    // ── QUIZ ──
    quizTitle:    "🧠 LADDER PROGRAMMING TEST",
    quizSiguiente:"➡ NEXT QUESTION",
    quizFin:      "✅ TEST COMPLETED",
    quizFinDesc:  "You have completed all 8 industrial Ladder programming questions.",
    quizCorrecto: "✅ CORRECT ANSWER",
    quizIncorrecto:"❌ INCORRECT ANSWER",
  }
}

// =========================================================
//  DETECTAR QUÉ PÁGINA ESTÁ ACTIVA
//  Basado en window.location.pathname — sin depender de IDs
//  que solo existen en index.html
// =========================================================
function paginaActual() {
  const p = window.location.pathname
  if (p.includes("simulador-vfd"))   return "vfd"
  if (p.includes("simulador-plc"))   return "plc"
  if (p.includes("tia-portal"))      return "tia"
  if (p.includes("cursos"))          return "cursos"
  if (p.includes("comunidad"))       return "comunidad"
  if (p.includes("dudas"))           return "dudas"
  if (p.includes("tienda"))          return "tienda"
  return "home"
}

// =========================================================
//  MAPA GLOBAL — header + nav (presentes en base.html)
// =========================================================
const MAP_GLOBAL = [
  // Header
  { k:"appTitle",      s:".header-logo-name, .title" },
  { k:"appSubtitle",   s:".header-logo-sub, .subtitle" },
  // Nav
  { k:"navCursos",     s:".nav-btn:nth-child(1)" },
  { k:"navComunidad",  s:".nav-btn:nth-child(2)" },
  { k:"navSimPLC",     s:".nav-btn:nth-child(3)" },
  { k:"navSimVFD",     s:".nav-btn:nth-child(4)" },
  { k:"navDudas",      s:".nav-btn:nth-child(5)" },
  { k:"navTienda",     s:".nav-btn:nth-child(6)" },
  // Loader (si existe)
  { k:"loaderTitle",   s:"#loader h1" },
  { k:"loaderText",    s:"#loader p" },
]

// =========================================================
//  MAPAS POR PÁGINA
// =========================================================
const MAP_POR_PAGINA = {

  // /simulador-plc
  plc: [
    { k:"simEntradas", s:".sidebar .panel:nth-child(1) h2" },
    { k:"simSalidas",  s:".sidebar .panel:nth-child(2) h2" },
    { k:"simMotor",    s:".sidebar .panel:nth-child(3) h2" },
    { k:"simEventos",  s:".sidebar .panel:nth-child(4) h2" },
    { k:"simSimular",  s:".toolbar .btn.green" },
  ],

  // /simulador-vfd
  vfd: [
    { k:"vfdControl",     s:".vfd-tab:nth-child(1)" },
    { k:"vfdParametros",  s:".vfd-tab:nth-child(2)" },
    { k:"vfdMonitoreo",   s:".vfd-tab:nth-child(3)" },
    { k:"vfdAlarmas",     s:".vfd-tab:nth-child(4)" },
    { k:"vfdRefFreq",     s:"#tab-control .vfd-card:nth-child(1) h3" },
    { k:"vfdComandos",    s:"#tab-control .vfd-card:nth-child(2) h3" },
    { k:"vfdArrancar",    s:".vfd-command-grid .cmd-btn.cmd-green" },
    { k:"vfdReversa",     s:".vfd-command-grid .cmd-btn.cmd-dark:nth-child(2)" },
    { k:"vfdDetener",     s:".vfd-command-grid .cmd-btn.cmd-red" },
    { k:"vfdGuardarParam",s:"#tab-parametros .cmd-btn.cmd-green" },
    { k:"vfdMonitoreoRT", s:"#tab-monitoreo .vfd-card h3" },
    { k:"vfdHistorial",   s:"#tab-alarmas .vfd-card h3" },
    { k:"vfdResetAlarmas",s:"#tab-alarmas .cmd-btn.cmd-red" },
    { k:"vfdAplicarFreq", s:"#tab-control > .vfd-card:nth-child(1) .cmd-btn.cmd-green" },
  ],

  // /cursos
  cursos: [
    { k:"cursosTitle",    s:".courses-page .courses-title" },
    { k:"cursosSubtitle", s:".courses-page .courses-subtitle" },
    { k:"curso1Title",    s:".course-card:nth-child(1) h2" },
    { k:"curso1Desc",     s:".course-card:nth-child(1) p" },
    { k:"curso2Title",    s:".course-card:nth-child(2) h2" },
    { k:"curso2Desc",     s:".course-card:nth-child(2) p" },
    { k:"curso3Title",    s:".course-card:nth-child(3) h2" },
    { k:"curso3Desc",     s:".course-card:nth-child(3) p" },
  ],

  // /cursos/tia-portal
  // (el contenido de esta página se traduce con el motor dinámico
  //  TIA_DICT / traducirPaginaTia más abajo, porque tiene mucho texto
  //  fijo en el HTML — módulos, botones, badges, quiz — que no pasa
  //  por el objeto T)
  tia: [],

  // /dudas  — las cards se reconstruyen dinámicamente vía JS (ver applyFAQ)
  dudas: [
    { k:"dudasTitle",    s:".courses-page .courses-title" },
    { k:"dudasSubtitle", s:".courses-page .courses-subtitle" },
  ],

  // /tienda
  tienda: [
    { k:"tiendaTitle",    s:".courses-page .courses-title" },
    { k:"tiendaSubtitle", s:".courses-page .courses-subtitle" },
  ],

  // /comunidad
  comunidad: [
    { k:"comunidadNuevas",    s:"#orden-nuevas" },
    { k:"comunidadPopulares", s:"#orden-populares" },
    { k:"comunidadSinResp",   s:"#orden-sin-respuesta" },
    { k:"comunidadHacer",     s:"#form-pregunta-box h3" },
    { k:"comunidadCancelar",  s:"#form-pregunta-box button:first-of-type" },
    { k:"comunidadPublicar",  s:"#form-pregunta-box button[onclick='publicarPregunta()']" },
  ],

  home: [],
}

// Placeholders — solo comunidad
const PLACEHOLDERS = [
  { k:"comunidadTituloPlaceholder", s:"#comunidadTitulo" },
  { k:"comunidadTextoPlaceholder",  s:"#comunidadTexto" },
]

// =========================================================
//  TRADUCCIÓN DINÁMICA — /cursos/tia-portal
//  Esta página tiene mucho texto fijo directo en el HTML
//  (títulos de módulo, descripciones, botones, badges de
//  estado PENDIENTE/COMPLETADO, quiz) que no pasa por el
//  objeto T ni por MAP_POR_PAGINA. Se traduce por diccionario
//  de texto exacto: la primera vez que se ve un elemento se
//  guarda su texto original (español) en data-i18n-es, y desde
//  ahí se alterna ES/EN sin perder el original.
// =========================================================
const TIA_DICT = {
  // Encabezado
  "CURSO PLC SIEMENS TIA PORTAL": "PLC SIEMENS TIA PORTAL COURSE",
  "30 módulos de automatización industrial con videos, PDFs y simulaciones reales.":
    "30 modules of industrial automation with videos, PDFs and real simulations.",

  // Tarjeta de descarga de TIA Portal
  "DESCARGAR TIA PORTAL": "DOWNLOAD TIA PORTAL",
  "Antes de comenzar instala TIA Portal para poder realizar todas las prácticas, simulaciones y ejercicios incluidos en los módulos.":
    "Before you start, install TIA Portal so you can complete all the practices, simulations and exercises included in the modules.",
  "Incluye:": "Includes:",
  "Descargar TIA Portal": "Download TIA Portal",
  "Configuración inicial": "Initial configuration",
  "Activación de PLCSIM": "PLCSIM activation",
  "Preparación para los siguientes módulos": "Preparation for the following modules",
  "VER VIDEO DE INSTALACIÓN": "WATCH INSTALLATION VIDEO",

  // Botones genéricos reutilizados en varios módulos
  "ABRIR PDF": "OPEN PDF",
  "DESCARGAR PDF": "DOWNLOAD PDF",
  "MARCAR COMPLETADO": "MARK AS COMPLETE",
  "✅ COMPLETADO (clic para quitar)": "✅ COMPLETED (click to remove)",
  "PENDIENTE": "PENDING",
  "✅ COMPLETADO": "✅ COMPLETED",
  "🖥️ SIMULAR PLC": "🖥️ SIMULATE PLC",
  "⬇️ DESCARGAR PROYECTO": "⬇️ DOWNLOAD PROJECT",
  "🔒 BLOQUEADO": "🔒 LOCKED",
  "VOLVER A CURSOS": "BACK TO COURSES",

  // Módulo 1
  "MÓDULO 1 - INTRODUCCIÓN A PLC": "MODULE 1 - INTRODUCTION TO PLC",
  "Aprende qué es un PLC Siemens, funcionamiento de CPU, módulos y arquitectura industrial.":
    "Learn what a Siemens PLC is, CPU operation, modules and industrial architecture.",

  // Módulo 2
  "MÓDULO 2 - PROGRAMACIÓN LADDER": "MODULE 2 - LADDER PROGRAMMING",
  "Programación Ladder industrial desde cero: contactos NO/NC, bobinas, temporizadores y enclavamientos.":
    "Industrial Ladder programming from scratch: NO/NC contacts, coils, timers and interlocks.",
  "Aprende programación Ladder industrial desde cero: contactos NO/NC, bobinas, temporizadores TON, TOF, TP y enclavamientos.":
    "Learn industrial Ladder programming from scratch: NO/NC contacts, coils, TON, TOF, TP timers and interlocks.",
  "📘 GUÍA LADDER PDF": "📘 LADDER GUIDE PDF",
  "⚡ INICIAR PRÁCTICA": "⚡ START PRACTICE",
  "🧠 TEST DE PROGRAMACIÓN LADDER": "🧠 LADDER PROGRAMMING TEST",
  "➡ SIGUIENTE PREGUNTA": "➡ NEXT QUESTION",
  "✅ TEST FINALIZADO": "✅ TEST COMPLETED",
  "Has completado las 8 preguntas de programación Ladder.":
    "You have completed all 8 Ladder programming questions.",
  "✅ CORRECTO": "✅ CORRECT",
  "❌ INCORRECTO": "❌ INCORRECT",
  "1. ¿Qué hace un contacto normalmente abierto (NO)?": "1. What does a normally open (NO) contact do?",
  "Permite el paso lógico cuando se activa": "Allows logical flow when activated",
  "Bloquea siempre la corriente": "Always blocks the current",
  "Apaga automáticamente el PLC": "Automatically turns off the PLC",
  "2. ¿Qué representa una bobina en Ladder?": "2. What does a coil represent in Ladder?",
  "Una resistencia eléctrica": "An electrical resistor",
  "Una salida o memoria del PLC": "A PLC output or memory",
  "Un transformador": "A transformer",
  "3. ¿Para qué sirve un temporizador TON?": "3. What is a TON timer used for?",
  "Activar una salida con retardo": "Activate an output with a delay",
  "Apagar el PLC": "Turn off the PLC",
  "Generar pulsos infinitos": "Generate infinite pulses",
  "4. ¿Qué hace un contacto normalmente cerrado (NC)?": "4. What does a normally closed (NC) contact do?",
  "Permite paso lógico cuando está desactivado": "Allows logical flow when deactivated",
  "Siempre está energizado": "Is always energized",
  "Genera una alarma": "Generates an alarm",
  "5. ¿Qué realiza un temporizador TOF?": "5. What does a TOF timer do?",
  "Retarda el encendido": "Delays turn-on",
  "Mantiene la salida activa tras apagar la entrada": "Keeps the output active after the input turns off",
  "Reinicia el PLC": "Restarts the PLC",
  "6. ¿Qué hace un temporizador TP?": "6. What does a TP timer do?",
  "Genera un pulso temporizado": "Generates a timed pulse",
  "Apaga motores": "Turns off motors",
  "Controla temperatura": "Controls temperature",
  "7. ¿Qué es un enclavamiento industrial?": "7. What is an industrial interlock?",
  "Un sistema que mantiene activada una salida": "A system that keeps an output active",
  "Un tipo de sensor": "A type of sensor",
  "Un variador de frecuencia": "A frequency drive",
  "8. ¿Qué lenguaje usan comúnmente los PLC industriales?": "8. What language do industrial PLCs commonly use?",

  // Módulo 3
  "⚡ MÓDULO 3 - ENTRADAS Y SALIDAS": "⚡ MODULE 3 - INPUTS AND OUTPUTS",
  "Configuración de sensores industriales, entradas y salidas digitales.":
    "Configuration of industrial sensors, digital inputs and outputs.",
  "📘 PDF MÓDULO 3": "📘 MODULE 3 PDF",

  // Módulo 4
  "⏱️ MÓDULO 4 - TEMPORIZADORES TON, TOF Y TP": "⏱️ MODULE 4 - TON, TOF AND TP TIMERS",
  "Temporizadores industriales en sistemas PLC Siemens y procesos automatizados reales.":
    "Industrial timers in Siemens PLC systems and real automated processes.",
  "Aprende a utilizar temporizadores industriales en sistemas PLC Siemens y procesos automatizados reales.":
    "Learn to use industrial timers in Siemens PLC systems and real automated processes.",
  "📘 PDF MÓDULO 4": "📘 MODULE 4 PDF",
  "📝 Quiz - Temporizadores": "📝 Quiz - Timers",
  "1. ¿Qué hace un temporizador TON?": "1. What does a TON timer do?",
  "Activa una salida inmediatamente": "Activates an output immediately",
  "Genera un retardo al encendido": "Generates a turn-on delay",
  "Genera pulsos continuos": "Generates continuous pulses",
  "2. ¿Qué hace un temporizador TOF?": "2. What does a TOF timer do?",
  "Genera un pulso fijo": "Generates a fixed pulse",
  "Retarda el apagado": "Delays turn-off",
  "3. ¿Qué hace un temporizador TP?": "3. What does a TP timer do?",
  "Genera un pulso de duración fija": "Generates a fixed-duration pulse",
  "Mantiene una salida permanente": "Keeps an output permanently on",
  "✅ Correcto. TON genera retardo al encendido.": "✅ Correct. TON generates a turn-on delay.",
  "❌ Incorrecto. TON genera un retardo al encendido.": "❌ Incorrect. TON generates a turn-on delay.",
  "✅ Correcto. TOF retarda el apagado.": "✅ Correct. TOF delays turn-off.",
  "❌ Incorrecto. TOF retrasa el apagado de la salida.": "❌ Incorrect. TOF delays the output turn-off.",
  "✅ Correcto. TP genera un pulso temporizado.": "✅ Correct. TP generates a timed pulse.",
  "❌ Incorrecto. TP genera un pulso de duración fija.": "❌ Incorrect. TP generates a fixed-duration pulse.",

  // Módulo 5
  "🔢 MÓDULO 5 - CONTADORES CTU Y CTD": "🔢 MODULE 5 - CTU AND CTD COUNTERS",
  "Contadores industriales CTU y CTD para conteo de piezas y automatización de producción.":
    "Industrial CTU and CTD counters for parts counting and production automation.",
  "Programación de contadores industriales CTU y CTD para conteo de piezas y automatización de producción.":
    "Programming of industrial CTU and CTD counters for parts counting and production automation.",
  "📘 PDF MÓDULO 5": "📘 MODULE 5 PDF",

  // Módulo 6
  "🔄 MÓDULO 6 - MARCAS Y MEMORIAS": "🔄 MODULE 6 - FLAGS AND MEMORY",
  "Marcas internas (M), variables globales y memorias remanentes en PLC Siemens TIA Portal.":
    "Internal flags (M), global variables and retentive memory in Siemens PLC TIA Portal.",
  "Uso de marcas internas (M), variables globales y memorias remanentes en PLC Siemens TIA Portal para lógica avanzada.":
    "Use of internal flags (M), global variables and retentive memory in Siemens PLC TIA Portal for advanced logic.",
  "📄 PDF MÓDULO 6": "📄 MODULE 6 PDF",

  // Módulo 7
  "➗ MÓDULO 7 - OPERACIONES MATEMÁTICAS": "➗ MODULE 7 - MATH OPERATIONS",
  "Suma, resta, multiplicación, división y conversión de tipos de datos en TIA Portal.":
    "Addition, subtraction, multiplication, division and data type conversion in TIA Portal.",
  "Instrucciones matemáticas en Ladder: suma, resta, multiplicación, división y conversión de tipos de datos en TIA Portal.":
    "Math instructions in Ladder: addition, subtraction, multiplication, division and data type conversion in TIA Portal.",
  "📄 PDF MÓDULO 7": "📄 MODULE 7 PDF",

  // Módulo 8
  "📊 MÓDULO 8 - ANALOGICAS Y PID": "📊 MODULE 8 - ANALOG SIGNALS AND PID",
  "Señales analógicas 4-20mA y 0-10V, escalado de señales y control PID básico.":
    "4-20mA and 0-10V analog signals, signal scaling and basic PID control.",
  "Lectura de señales analógicas 4-20mA y 0-10V, escalado de señales y control PID básico en PLC Siemens.":
    "Reading 4-20mA and 0-10V analog signals, signal scaling and basic PID control in Siemens PLC.",
  "📄 DESCARGAR PDF": "📄 DOWNLOAD PDF",

  // Módulo 9
  "🏭 MÓDULO 9 - PROYECTO INTEGRADOR BÁSICO": "🏭 MODULE 9 - BASIC INTEGRATIVE PROJECT",
  "Proyecto real: control de cinta transportadora con sensores, motores, contadores y temporizadores.":
    "Real project: conveyor belt control with sensors, motors, counters and timers.",
  "Proyecto real integrador: control de cinta transportadora con sensores, motores, contadores y temporizadores en TIA Portal.":
    "Real integrative project: conveyor belt control with sensors, motors, counters and timers in TIA Portal.",

  // Banner premium
  "⚡ DESBLOQUEA EL CURSO COMPLETO": "⚡ UNLOCK THE FULL COURSE",
  "Accede a los 21 módulos avanzados (10 al 30) con una sola compra. Tu acceso se activa automáticamente después del pago.":
    "Access the 21 advanced modules (10 to 30) with a single purchase. Your access activates automatically after payment.",
  "💳 ACTIVAR PREMIUM — $ 1.990 CLP": "💳 ACTIVATE PREMIUM — $9.90 USD",
  "Acceso inmediato tras confirmar el pago": "Immediate access after confirming payment",
  "¿Ya pagaste y no se activó? Espera unos segundos y recarga la página. Si el acceso no se activa escríbenos a":
    "Already paid and it didn't activate? Wait a few seconds and reload the page. If access doesn't activate, write to us at",
  "$ 1.990 CLP": "$9.90 USD",
  "Contenido Premium": "Premium Content",
  "💳 Activar Premium": "💳 Activate Premium",
  "ACCEDER": "ACCESS",
  "21 MÓDULOS PREMIUM": "21 PREMIUM MODULES",
  "🔒 MÓDULO 10": "🔒 MODULE 10",
  "🔒 MÓDULO 11": "🔒 MODULE 11",
  "🔒 MÓDULO 12": "🔒 MODULE 12",
  "🔒 MÓDULO 13": "🔒 MODULE 13",
  "🔒 MÓDULO 14": "🔒 MODULE 14",
  "🔒 MÓDULO 15": "🔒 MODULE 15",
  "🔒 MÓDULO 16-30": "🔒 MODULE 16-30",
  "Funciones FC y FB": "FC and FB functions",
  "Bloques de datos DB": "DB data blocks",
  "HMI Siemens KTP": "Siemens KTP HMI",
  "SCADA con WinCC": "SCADA with WinCC",
  "PROFINET Industrial": "Industrial PROFINET",
  "Modbus TCP/RTU": "Modbus TCP/RTU",
  "+15 módulos avanzados": "+15 advanced modules",

  // Módulos premium 10-30 (tarjetas completas, generadas por Jinja)
  "🔒 MÓDULO 10 - FUNCIONES FC Y FB": "🔒 MODULE 10 - FC AND FB FUNCTIONS",
  "Programación estructurada con bloques de función FC, FB y bloques de datos DB en TIA Portal.":
    "Structured programming with FC, FB function blocks and DB data blocks in TIA Portal.",
  "🔒 MÓDULO 11 - BLOQUES DE DATOS DB": "🔒 MODULE 11 - DB DATA BLOCKS",
  "Creación y uso de bloques de datos globales e instancia para almacenar y transferir información entre bloques.":
    "Creating and using global and instance data blocks to store and transfer information between blocks.",
  "🔒 MÓDULO 12 - HMI SIEMENS KTP": "🔒 MODULE 12 - SIEMENS KTP HMI",
  "Diseño de pantallas HMI profesionales KTP700/KTP900 con animaciones, botones y comunicación con PLC.":
    "Design of professional KTP700/KTP900 HMI screens with animations, buttons and PLC communication.",
  "🔒 MÓDULO 13 - SCADA CON WINCC": "🔒 MODULE 13 - SCADA WITH WINCC",
  "Supervisión industrial, alarmas, tendencias y monitoreo en tiempo real con WinCC en TIA Portal.":
    "Industrial supervision, alarms, trends and real-time monitoring with WinCC in TIA Portal.",
  "🔒 MÓDULO 14 - PROFINET INDUSTRIAL": "🔒 MODULE 14 - INDUSTRIAL PROFINET",
  "Configuración de redes PROFINET, dispositivos IO, diagnóstico y topología de red industrial Siemens.":
    "Configuration of PROFINET networks, IO devices, diagnostics and Siemens industrial network topology.",
  "🔒 MÓDULO 15 - MODBUS TCP Y RTU": "🔒 MODULE 15 - MODBUS TCP AND RTU",
  "Comunicación Modbus TCP y RTU entre PLC, variadores, sensores y sistemas SCADA industriales.":
    "Modbus TCP and RTU communication between PLCs, drives, sensors and industrial SCADA systems.",
  "🔒 MÓDULO 16 - ETHERNET/IP Y OPC UA": "🔒 MODULE 16 - ETHERNET/IP AND OPC UA",
  "Integración de dispositivos con Ethernet/IP y servidor OPC UA para industria 4.0 y SCADA moderno.":
    "Device integration with Ethernet/IP and OPC UA server for Industry 4.0 and modern SCADA.",
  "🔒 MÓDULO 17 - CONTROL PID AVANZADO": "🔒 MODULE 17 - ADVANCED PID CONTROL",
  "Configuración y ajuste de lazos de control PID para temperatura, presión y flujo en procesos industriales.":
    "Configuration and tuning of PID control loops for temperature, pressure and flow in industrial processes.",
  "🔒 MÓDULO 18 - VARIADORES SINAMICS G120": "🔒 MODULE 18 - SINAMICS G120 DRIVES",
  "Control de variadores de frecuencia Siemens SINAMICS G120 desde PLC por PROFINET y Modbus.":
    "Control of Siemens SINAMICS G120 frequency drives from PLC via PROFINET and Modbus.",
  "🔒 MÓDULO 19 - MOTORES Y ARRANCADORES": "🔒 MODULE 19 - MOTORS AND STARTERS",
  "Control de motores trifásicos, arrancadores suaves, inversión de giro y protecciones eléctricas desde PLC.":
    "Control of three-phase motors, soft starters, direction reversal and electrical protections from PLC.",
  "🔒 MÓDULO 20 - SEGURIDAD FUNCIONAL": "🔒 MODULE 20 - FUNCTIONAL SAFETY",
  "Implementación de paradas de emergencia, SIL, categorías de seguridad y módulos F en TIA Portal.":
    "Implementation of emergency stops, SIL, safety categories and F-modules in TIA Portal.",
  "🔒 MÓDULO 21 - DIAGNÓSTICO Y MANTENIMIENTO": "🔒 MODULE 21 - DIAGNOSTICS AND MAINTENANCE",
  "Herramientas de diagnóstico TIA Portal, tabla de observación, forzado de variables y mantenimiento preventivo.":
    "TIA Portal diagnostic tools, watch table, variable forcing and preventive maintenance.",
  "🔒 MÓDULO 22 - PROYECTO CINTA TRANSPORTADORA": "🔒 MODULE 22 - CONVEYOR BELT PROJECT",
  "Proyecto industrial completo: cinta transportadora con clasificación de piezas, sensores y HMI.":
    "Complete industrial project: conveyor belt with part sorting, sensors and HMI.",
  "🔒 MÓDULO 23 - PROYECTO LLENADO DE TANQUES": "🔒 MODULE 23 - TANK FILLING PROJECT",
  "Control automático de nivel con sensores analógicos, válvulas y PID en sistema de tanques industriales.":
    "Automatic level control with analog sensors, valves and PID in an industrial tank system.",
  "🔒 MÓDULO 24 - PROYECTO CONTROL DE ACCESO": "🔒 MODULE 24 - ACCESS CONTROL PROJECT",
  "Sistema de acceso industrial con lectores, RFID, HMI y registro de eventos en PLC Siemens.":
    "Industrial access system with readers, RFID, HMI and event logging in Siemens PLC.",
  "🔒 MÓDULO 25 - PROYECTO LÍNEA DE PRODUCCIÓN": "🔒 MODULE 25 - PRODUCTION LINE PROJECT",
  "Automatización completa de una línea de producción multi-estación con PLC, HMI, robots y SCADA.":
    "Complete automation of a multi-station production line with PLC, HMI, robots and SCADA.",
  "🔒 MÓDULO 26 - INDUSTRIA 4.0 E IIoT": "🔒 MODULE 26 - INDUSTRY 4.0 AND IIoT",
  "Conectividad industrial IoT: MQTT, nube, dashboards y análisis de datos desde PLC Siemens.":
    "Industrial IoT connectivity: MQTT, cloud, dashboards and data analysis from Siemens PLC.",
  "🔒 MÓDULO 27 - GEMELO DIGITAL": "🔒 MODULE 27 - DIGITAL TWIN",
  "Concepto y aplicación de gemelos digitales industriales con TIA Portal y simuladores avanzados.":
    "Concept and application of industrial digital twins with TIA Portal and advanced simulators.",
  "🔒 MÓDULO 28 - PROGRAMACIÓN SCL AVANZADA": "🔒 MODULE 28 - ADVANCED SCL PROGRAMMING",
  "Lenguaje de alto nivel SCL en TIA Portal: estructuras, arrays, punteros y algoritmos avanzados.":
    "High-level SCL language in TIA Portal: structures, arrays, pointers and advanced algorithms.",
  "🔒 MÓDULO 29 - GRAFCET Y SFC": "🔒 MODULE 29 - GRAFCET AND SFC",
  "Programación secuencial con GRAFCET y SFC en TIA Portal para máquinas y líneas de producción.":
    "Sequential programming with GRAFCET and SFC in TIA Portal for machines and production lines.",
  "🔒 MÓDULO 30 - PROYECTO FINAL CERTIFICADO": "🔒 MODULE 30 - CERTIFIED FINAL PROJECT",
  "Proyecto final integrador con todos los conocimientos del curso. Incluye certificado de finalización.":
    "Final integrative project with everything learned in the course. Includes a completion certificate.",
}

let tiaTraduciendo = false

// Traduce (o restaura) un elemento hoja de texto según el idioma actual,
// guardando siempre el original en español la primera vez que se ve.
function traducirNodoTia(el) {
  if (el.dataset.i18nEs === undefined) el.dataset.i18nEs = el.textContent
  const original = el.dataset.i18nEs
  const clave = original.trim()
  el.textContent = (langActual === "en" && TIA_DICT[clave]) ? TIA_DICT[clave] : original
}

function traducirPaginaTia() {
  const roots = [document.querySelector(".courses-page"), document.getElementById("auth-area")].filter(Boolean)
  if (!roots.length || tiaTraduciendo) return
  tiaTraduciendo = true

  roots.forEach(root => {
    // Cualquier elemento "hoja" (sin hijos de tipo elemento) con texto propio
    root.querySelectorAll("h1, h2, h3, p, span, button, strong, div, a, small").forEach(el => {
      if (el.children.length > 0) return
      if (!el.textContent || !el.textContent.trim()) return
      traducirNodoTia(el)
    })
  })

  // Caso especial: el párrafo "¿Ya pagaste...?" tiene un <a href="mailto:">
  // dentro, así que no es un nodo hoja puro — se traduce solo su primer
  // nodo de texto, dejando intacto el link del correo.
  const courseRoot = document.querySelector(".courses-page")
  const mailP = courseRoot && courseRoot.querySelector("p:has(a[href^='mailto:'])")
  if (mailP) {
    const first = mailP.childNodes[0]
    if (first && first.nodeType === 3) {
      if (mailP.dataset.i18nEs === undefined) mailP.dataset.i18nEs = first.textContent
      const clave = mailP.dataset.i18nEs.trim()
      first.textContent = (langActual === "en" && TIA_DICT[clave]) ? TIA_DICT[clave] + " " : mailP.dataset.i18nEs
    }
  }

  tiaTraduciendo = false
}

// El contenido de /cursos/tia-portal cambia dinámicamente (acordeón de
// módulos, badges PENDIENTE/COMPLETADO, quiz interactivo, overlay de
// módulos bloqueados y menú de usuario insertados por firebase-auth.js).
// Un MutationObserver reaplica la traducción cada vez que aparece texto
// nuevo, para que nada se quede pegado en español al usar la página.
function observarPaginaTia() {
  const targets = [document.querySelector(".courses-page"), document.getElementById("auth-area")].filter(Boolean)
  if (!targets.length) return
  let debounce = null
  const obs = new MutationObserver(() => {
    if (tiaTraduciendo) return
    clearTimeout(debounce)
    debounce = setTimeout(traducirPaginaTia, 30)
  })
  targets.forEach(t => obs.observe(t, { childList: true, characterData: true, subtree: true }))
}

// =========================================================
//  PAGO EN INGLÉS → PAYPAL
//  El flujo normal (openPaymentFlow, en firebase-auth.js) lleva al
//  Checkout Pro de MercadoPago, pensado para pagos en pesos chilenos.
//  Si el usuario está viendo la página en inglés, lo mandamos en
//  cambio a PayPal (pago en USD), interceptando el clic ANTES de que
//  se ejecute el onclick="openPaymentFlow()" del botón.
// =========================================================
const PAYPAL_LINK = "https://www.paypal.com/ncp/payment/K2A32WD88T8HS"

document.addEventListener("click", (e) => {
  if (langActual !== "en") return
  const btn = e.target.closest('[onclick="openPaymentFlow()"]')
  if (!btn) return
  e.preventDefault()
  e.stopPropagation()
  e.stopImmediatePropagation()
  window.open(PAYPAL_LINK, "_blank", "noopener")
}, true) // fase de captura: se adelanta al onclick inline del botón

// =========================================================
//  MOTOR DE TRADUCCIÓN
// =========================================================
let langActual = localStorage.getItem("aulaplc-lang") || "es"

function applyMap(map, t) {
  map.forEach(({ k, s }) => {
    if (!t[k]) return
    document.querySelectorAll(s).forEach(el => { el.textContent = t[k] })
  })
}

window.setLang = function(lang) {
  langActual = lang
  localStorage.setItem("aulaplc-lang", lang)
  const t = T[lang]

  // Estilos botones selector
  const btnES = document.getElementById("lang-btn-es")
  const btnEN = document.getElementById("lang-btn-en")
  if (btnES && btnEN) {
    const on  = "padding:4px 10px;border-radius:6px;border:1px solid #388bfd;background:#388bfd;color:#fff;font-size:11px;font-weight:700;cursor:pointer;font-family:Orbitron;"
    const off = "padding:4px 10px;border-radius:6px;border:1px solid #374151;background:transparent;color:#94a3b8;font-size:11px;font-weight:700;cursor:pointer;font-family:Orbitron;"
    btnES.style.cssText = lang === "es" ? on : off
    btnEN.style.cssText = lang === "en" ? on : off
  }

  // Mapa global (header/nav) — siempre
  applyMap(MAP_GLOBAL, t)

  // Mapa de la página actual
  const pagina = paginaActual()
  if (MAP_POR_PAGINA[pagina]) applyMap(MAP_POR_PAGINA[pagina], t)

  // Placeholders (comunidad)
  PLACEHOLDERS.forEach(({ k, s }) => {
    const el = document.querySelector(s)
    if (el && t[k]) el.placeholder = t[k]
  })

  // ── FAQ: reconstruir cards en /dudas ──
  if (pagina === "dudas" && t.faq) {
    const grid = document.querySelector(".courses-page .courses-grid")
    if (grid) {
      grid.innerHTML = ""
      t.faq.forEach(([titulo, desc]) => {
        const card = document.createElement("div")
        card.className = "course-card"
        card.innerHTML = `<h2>${titulo}</h2><p>${desc}</p>`
        grid.appendChild(card)
      })
    }
  }

  // ── Botones FORZAR en /simulador-plc ──
  if (pagina === "plc") {
    document.querySelectorAll(".sidebar .btn").forEach(btn => {
      const txt = btn.textContent.trim()
      if (txt === "FORZAR" || txt === "FORCE") btn.textContent = t.simForzar
    })
  }

  // ── Tienda: botones "VER PRODUCTO" y filtros ──
  if (pagina === "tienda") {
    document.querySelectorAll(".store-btn").forEach(a => {
      a.textContent = t.btnVerProducto
    })

    // Etiqueta FILTRAR:
    const filtrarEl = document.querySelector(".courses-page > div > span")
    if (filtrarEl) filtrarEl.textContent = t.tiendaFiltrar

    // Botones de filtro (TODOS / SENSORES / etc.)
    const filterMap = {
      all:         t.tiendaTodos,
      plc:         "PLC",
      hmi:         "HMI",
      sensor:      t.tiendaSensores,
      cable:       t.tiendaCables,
      fuente:      t.tiendaFuente,
      luces:       t.tiendaLuces,
      interruptor: t.tiendaInterruptor,
      variador:    t.tiendaVariador,
    }
    document.querySelectorAll("[onclick^='filterStore']").forEach(btn => {
      const match = btn.getAttribute("onclick").match(/'([^']+)'/)
      if (match && filterMap[match[1]]) btn.textContent = filterMap[match[1]]
    })
  }

  // ── TIA Portal: módulos, botones, badges y quiz ──
  if (pagina === "tia") {
    traducirPaginaTia()
  }

  // ── Comunidad: botón "Nueva pregunta" ──
  if (pagina === "comunidad") {
    const btnNueva = document.getElementById("btn-nueva-pregunta")
    if (btnNueva) {
      btnNueva.innerHTML = `<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"/></svg> ${t.comunidadNueva}`
    }
  }

  // Actualiza <html lang="">
  document.documentElement.lang = lang
}

// =========================================================
//  INYECTAR SELECTOR ES / EN EN EL HEADER
// =========================================================
function insertLangSelector() {
  const status = document.querySelector(".top-status")
  if (!status) return
  const wrapper = document.createElement("div")
  wrapper.style.cssText = "display:flex;align-items:center;gap:6px;margin-right:10px;"
  wrapper.innerHTML = `
    <button id="lang-btn-es" onclick="setLang('es')"
      style="padding:4px 10px;border-radius:6px;border:1px solid #388bfd;background:#388bfd;color:#fff;font-size:11px;font-weight:700;cursor:pointer;font-family:Orbitron;">
      ES
    </button>
    <button id="lang-btn-en" onclick="setLang('en')"
      style="padding:4px 10px;border-radius:6px;border:1px solid #374151;background:transparent;color:#94a3b8;font-size:11px;font-weight:700;cursor:pointer;font-family:Orbitron;">
      EN
    </button>
  `
  status.insertBefore(wrapper, status.firstChild)
}

// =========================================================
//  INICIALIZAR
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  insertLangSelector()
  setLang(langActual)
  if (paginaActual() === "tia") observarPaginaTia()
})

// =========================================================
//  API PÚBLICA — útil para llamar desde otros scripts
//  Ejemplo: aplica traducciones después de cargar contenido
//  dinámico (comunidad, quiz, etc.)
//    window.T        → objeto de traducciones
//    window.setLang  → cambia idioma
//    window.getLang  → devuelve idioma actual
// =========================================================
window.getLang  = () => langActual
window.T        = T