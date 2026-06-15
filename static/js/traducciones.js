// =========================================================
//  AULAPLC — SISTEMA DE TRADUCCIÓN ES / EN
//  Archivo: traducciones.js
//  Uso: agregar <script src=".../traducciones.js"></script>
//       justo antes de </body> en index.html
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

    // ── SIMULADOR PLC ──
    simEntradas:   "ENTRADAS DIGITALES",
    simSalidas:    "SALIDAS PLC",
    simMotor:      "MOTOR TRIFÁSICO",
    simEventos:    "EVENTOS PLC",
    simForzar:     "FORZAR",
    simSimular:    "SIMULAR PLC",

    // ── CURSOS ──
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

    // ── TIA PORTAL ──
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

    // ── VFD ──
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

    // ── DUDAS ──
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
      ["¿QUÉ ES UN TEMPORIZADOR TON?", "Activa una salida después de un tiempo determinado."],
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

    // ── TIENDA ──
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

    // ── COMUNIDAD ──
    comunidadTitle:   "Comunidad AulaPlc",
    comunidadSubtitle:"Hace una pregunta, responde y aprende junto a otros técnicos.",
    comunidadNueva:   "Nueva pregunta",
    comunidadHacer:   "Hacer una pregunta",
    comunidadTituloPlaceholder: "Título claro y concreto de tu pregunta",
    comunidadTextoPlaceholder:  "Describe el problema con detalle. Incluye qué probaste, qué resultado obtienes y qué esperabas.",
    comunidadCancelar:  "Cancelar",
    comunidadPublicar:  "Publicar pregunta",
    comunidadNuevas:    "🕐 Nuevas",
    comunidadPopulares: "🔥 Populares",
    comunidadSinResp:   "💬 Sin respuesta",
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
    mod5Desc:       "Programming of industrial CTU and CTD counters used in production, part counting and industrial automation.",
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
    premiumYaPagaste:"Already paid? Log out and log back in. If access doesn't activate within 5 minutes contact us at",
    mod6Sub:        "Advanced functions FC and FB",
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
      ["WHAT IS A TON TIMER?", "Activates an output after a set time."],
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
    comunidadNuevas:    "🕐 New",
    comunidadPopulares: "🔥 Popular",
    comunidadSinResp:   "💬 Unanswered",
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
//  MAPA: clave → selector(es) CSS + propiedad
// =========================================================
const MAP = [
  // LOADER
  { k:"loaderTitle",   s:"#loader h1" },
  { k:"loaderText",    s:"#loader p" },

  // HEADER
  { k:"appTitle",      s:".title" },
  { k:"appSubtitle",   s:".subtitle" },

  // NAV — en orden del DOM
  { k:"navCursos",     s:".nav-btn:nth-child(1)" },
  { k:"navComunidad",  s:".nav-btn:nth-child(2)" },
  { k:"navSimPLC",     s:".nav-btn:nth-child(3)" },
  { k:"navSimVFD",     s:".nav-btn:nth-child(4)" },
  { k:"navDudas",      s:".nav-btn:nth-child(5)" },
  { k:"navTienda",     s:".nav-btn:nth-child(6)" },

  // SIMULADOR PLC
  { k:"simEntradas",   s:"#simulatorSection .panel:nth-child(1) h2" },
  { k:"simSalidas",    s:"#simulatorSection .panel:nth-child(2) h2" },
  { k:"simMotor",      s:"#simulatorSection .panel:nth-child(3) h2" },
  { k:"simEventos",    s:"#simulatorSection .panel:nth-child(4) h2" },
  { k:"simSimular",    s:".toolbar .btn.green:nth-child(1)" },

  // CURSOS
  { k:"cursosTitle",    s:"#coursesSection .courses-title" },
  { k:"cursosSubtitle", s:"#coursesSection .courses-subtitle" },

  // TIA PORTAL
  { k:"tiaTitle",       s:"#tiaPortalSection .courses-title" },
  { k:"tiaSubtitle",    s:"#tiaPortalSection .courses-subtitle" },
  { k:"btnVolverCursos",s:"#tiaPortalSection .btn.red" },

  // VFD TABS
  { k:"vfdControl",     s:".vfd-tab:nth-child(1)" },
  { k:"vfdParametros",  s:".vfd-tab:nth-child(2)" },
  { k:"vfdMonitoreo",   s:".vfd-tab:nth-child(3)" },
  { k:"vfdAlarmas",     s:".vfd-tab:nth-child(4)" },
  { k:"vfdRefFreq",     s:"#tab-control .vfd-card:nth-child(1) h3" },
  { k:"vfdComandos",    s:"#tab-control .vfd-card:nth-child(2) h3" },
  { k:"vfdArrancar",    s:".cmd-btn.cmd-green:nth-of-type(1)" },
  { k:"vfdReversa",     s:".vfd-command-grid .cmd-btn.cmd-dark:nth-child(2)" },
  { k:"vfdDetener",     s:".vfd-command-grid .cmd-btn.cmd-red" },
  { k:"vfdGuardarParam",s:"#tab-parametros .cmd-btn.cmd-green" },
  { k:"vfdMonitoreoRT", s:"#tab-monitoreo .vfd-card h3" },
  { k:"vfdHistorial",   s:"#tab-alarmas .vfd-card h3" },
  { k:"vfdResetAlarmas",s:"#tab-alarmas .cmd-btn.cmd-red" },
  { k:"vfdAplicarFreq", s:"#tab-control .cmd-btn.cmd-green" },

  // DUDAS
  { k:"dudasTitle",     s:"#faqSection .courses-title" },
  { k:"dudasSubtitle",  s:"#faqSection .courses-subtitle" },

  // TIENDA
  { k:"tiendaTitle",    s:"#storeSection .courses-title" },
  { k:"tiendaSubtitle", s:"#storeSection .courses-subtitle" },

  // COMUNIDAD
  { k:"comunidadTitle",    s:"#comunidadSection h1" },
  { k:"comunidadSubtitle", s:"#comunidadSection h1 + p" },
  { k:"comunidadNuevas",   s:"#orden-nuevas" },
  { k:"comunidadPopulares",s:"#orden-populares" },
  { k:"comunidadSinResp",  s:"#orden-sin-respuesta" },
  { k:"comunidadHacer",    s:"#form-pregunta-box h3" },
  { k:"comunidadCancelar", s:"#form-pregunta-box button:first-of-type" },
  { k:"comunidadPublicar", s:"#form-pregunta-box button[onclick='publicarPregunta()']" },
]

// Placeholders (input/textarea)
const PLACEHOLDERS = [
  { k:"comunidadTituloPlaceholder", s:"#comunidadTitulo" },
  { k:"comunidadTextoPlaceholder",  s:"#comunidadTexto" },
]

// =========================================================
//  MOTOR DE TRADUCCIÓN
// =========================================================
let langActual = localStorage.getItem("aulaplc-lang") || "es"

window.setLang = function(lang) {
  langActual = lang
  localStorage.setItem("aulaplc-lang", lang)
  const t = T[lang]

  // Botones del selector
  const btnES = document.getElementById("lang-btn-es")
  const btnEN = document.getElementById("lang-btn-en")
  if (btnES && btnEN) {
    const activeStyle  = "padding:4px 10px;border-radius:6px;border:1px solid #388bfd;background:#388bfd;color:#fff;font-size:11px;font-weight:700;cursor:pointer;font-family:Orbitron;"
    const inactiveStyle= "padding:4px 10px;border-radius:6px;border:1px solid #374151;background:transparent;color:#94a3b8;font-size:11px;font-weight:700;cursor:pointer;font-family:Orbitron;"
    btnES.style.cssText = lang === "es" ? activeStyle : inactiveStyle
    btnEN.style.cssText = lang === "en" ? activeStyle : inactiveStyle
  }

  // Aplicar mapa principal
  MAP.forEach(({ k, s }) => {
    const els = document.querySelectorAll(s)
    if (t[k]) els.forEach(el => { el.textContent = t[k] })
  })

  // Placeholders
  PLACEHOLDERS.forEach(({ k, s }) => {
    const el = document.querySelector(s)
    if (el && t[k]) el.placeholder = t[k]
  })

  // FAQ cards — reconstruye todas
  const faqGrid = document.querySelector("#faqSection .courses-grid")
  if (faqGrid && t.faq) {
    faqGrid.innerHTML = ""
    t.faq.forEach(([titulo, desc]) => {
      const card = document.createElement("div")
      card.className = "course-card"
      card.innerHTML = `<h2>${titulo}</h2><p>${desc}</p>`
      faqGrid.appendChild(card)
    })
  }

  // Botones "FORZAR" en simulador
  document.querySelectorAll("#simulatorSection .btn").forEach(btn => {
    const txt = btn.textContent.trim()
    if (txt === "FORZAR" || txt === "FORCE") btn.textContent = t.simForzar
  })

  // Botones de store "VER PRODUCTO ↗"
  document.querySelectorAll(".store-btn").forEach(a => {
    a.textContent = t.btnVerProducto
  })

  // Filtro tienda
  const filtrarLabel = document.querySelector("#storeSection [style*='color:#94a3b8']")
  if (filtrarLabel) filtrarLabel.textContent = t.tiendaFiltrar

  const storeFilterBtns = document.querySelectorAll("#storeSection [onclick^='filterStore']")
  const filterKeys = ["tiendaTodos","plc","hmi","tiendaSensores","tiendaCables","tiendaFuente","tiendaLuces","tiendaInterruptor","tiendaVariador"]
  const filterTexts = [t.tiendaTodos,"PLC","HMI",t.tiendaSensores,t.tiendaCables,t.tiendaFuente,t.tiendaLuces,t.tiendaInterruptor,t.tiendaVariador]
  storeFilterBtns.forEach((btn, i) => { if (filterTexts[i]) btn.textContent = filterTexts[i] })

  // Botón "Nueva pregunta"
  const btnNueva = document.getElementById("btn-nueva-pregunta")
  if (btnNueva) {
    btnNueva.innerHTML = `<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"/></svg> ${t.comunidadNueva}`
  }

  // Actualiza <html lang="">
  document.documentElement.lang = lang
}

// =========================================================
//  INYECTAR BOTONES ES / EN EN EL HEADER
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
})