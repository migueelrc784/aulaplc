// =========================================================
//  AULA PLC — FIREBASE AUTH + CONTROL DE ACCESO PREMIUM
//  Archivo: firebase-auth.js
//  
//  INSTRUCCIONES DE INSTALACIÓN:
//  1. Ve a https://console.firebase.google.com
//  2. Crea un proyecto (ej: "aulaplc")
//  3. Agrega una app Web (icono </>)
//  4. Copia tu configuración en el objeto firebaseConfig abajo
//  5. En Firebase Console → Authentication → Sign-in method → activa Google
//  6. En Firebase Console → Firestore Database → Crear base de datos
//  7. Agrega este archivo a tu HTML (ver instrucciones al final)
// =========================================================

// ─── 1. TU CONFIGURACIÓN DE FIREBASE ────────────────────
// Reemplaza estos valores con los de tu proyecto en Firebase Console
// Menú: Configuración del proyecto → Tus apps → SDK de Firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCQkoc5CNrs-LfT1Tls_LrSWEm8MLanYZA",
    authDomain: "aulaplc-2a611.firebaseapp.com",
    projectId: "aulaplc-2a611",
    storageBucket: "aulaplc-2a611.firebasestorage.app",
    messagingSenderId: "349449305280",
    appId: "1:349449305280:web:d5a5d7baf3377cfa6a0125",
    measurementId: "G-WKD00BSZCG"
};

// ─── 2. INICIALIZACIÓN ───────────────────────────────────
const app      = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth     = getAuth(app);
const db       = getFirestore(app);
const provider = new GoogleAuthProvider();

// ─── 3. ESTADO GLOBAL DEL USUARIO ───────────────────────
// currentUser  → objeto del usuario autenticado (o null)
// isPremium    → true si el usuario pagó el curso
let currentUser = null;
let isPremium   = false;

// ─── 4. LISTENER PRINCIPAL ──────────────────────────────
// Se ejecuta automáticamente cuando:
// - La página carga (verifica si ya había sesión activa)
// - El usuario inicia o cierra sesión

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Usuario autenticado
    currentUser = user;

    // Verifica si es Premium consultando Firestore
    isPremium = await checkPremiumStatus(user.uid);

    // Guarda o actualiza sus datos en Firestore
    await saveUserToFirestore(user);

    // Actualiza la UI del header
    renderUserLoggedIn(user, isPremium);

    // Actualiza los módulos (bloquea/desbloquea según premium)
    updateModulesAccess(isPremium);

    console.log(`✅ Sesión activa: ${user.displayName} | Premium: ${isPremium}`);
  } else {
    // No hay sesión
    currentUser = null;
    isPremium   = false;

    renderUserLoggedOut();
    updateModulesAccess(false);

    console.log("ℹ️ Sin sesión activa");
  }
});

// ─── 5. FUNCIONES DE AUTENTICACIÓN ──────────────────────

// Abre el popup de Google y autentica al usuario
async function loginWithGoogle() {
  try {
    showAuthLoading(true);
    const result = await signInWithPopup(auth, provider);
    closeLoginModal();
    console.log("✅ Login exitoso:", result.user.displayName);
  } catch (error) {
    console.error("❌ Error en login:", error.message);

    // Mensajes de error en español
    const errores = {
      "auth/popup-closed-by-user":    "Cerraste la ventana antes de iniciar sesión.",
      "auth/popup-blocked":           "El navegador bloqueó la ventana. Permite pop-ups para este sitio.",
      "auth/cancelled-popup-request": "Operación cancelada.",
      "auth/network-request-failed":  "Sin conexión a internet. Intenta de nuevo.",
    };
    const msg = errores[error.code] || "Error al iniciar sesión. Intenta de nuevo.";
    showAuthError(msg);
  } finally {
    showAuthLoading(false);
  }
}

// Cierra la sesión del usuario
async function logout() {
  try {
    await signOut(auth);
    closeUserMenu();
    console.log("✅ Sesión cerrada");
  } catch (error) {
    console.error("❌ Error al cerrar sesión:", error.message);
  }
}

// ─── 6. FIRESTORE — USUARIOS ────────────────────────────

// Verifica si el usuario es premium en Firestore
// Retorna true o false
async function checkPremiumStatus(uid) {
  try {
    const docRef  = doc(db, "usuarios", uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().premium === true;
    }
    return false;
  } catch (error) {
    console.error("❌ Error verificando premium:", error);
    return false;
  }
}

// Guarda/actualiza el usuario en Firestore
// Usa merge:true para no sobreescribir premium si ya existe
async function saveUserToFirestore(user) {
  try {
    const docRef = doc(db, "usuarios", user.uid);
    await setDoc(docRef, {
      nombre:     user.displayName,
      email:      user.email,
      foto:       user.photoURL,
      ultimoLogin: serverTimestamp(),
    }, { merge: true });  // ← merge:true es clave: no toca el campo "premium"
  } catch (error) {
    console.error("❌ Error guardando usuario:", error);
  }
}

// ─── 7. CONTROL DE MÓDULOS ──────────────────────────────
// Lee todos los elementos con data-requiere-premium="true"
// y los muestra u oculta según el estado del usuario

function updateModulesAccess(premium) {
  // Módulos bloqueados — tienen data-requiere-premium="true"
  const elementosBloqueados = document.querySelectorAll('[data-requiere-premium="true"]');
  
  elementosBloqueados.forEach(el => {
    if (premium) {
      // Usuario premium: muestra el contenido
      el.classList.remove("locked");
      el.style.display = "";
      
      // Quita el candado si existe
      const lockOverlay = el.querySelector(".lock-overlay");
      if (lockOverlay) lockOverlay.remove();
    } else {
      // Usuario sin premium: bloquea el contenido
      el.classList.add("locked");
      
      // Agrega overlay de candado si no existe
      if (!el.querySelector(".lock-overlay")) {
        el.insertAdjacentHTML("beforeend", `
          <div class="lock-overlay">
            <span class="lock-icon">🔒</span>
            <p>Contenido Premium</p>
            <button class="btn premium-btn" onclick="openLoginModal()">
              Activar acceso
            </button>
          </div>
        `);
      }
    }
  });

  // Banner del gate premium (la sección "ACTIVAR CURSO PREMIUM")
  const premiumGate = document.getElementById("premium-gate");
  if (premiumGate) {
    premiumGate.style.display = premium ? "none" : "block";
  }
}

// ─── 8. RENDERIZADO DE LA UI ─────────────────────────────

function renderUserLoggedIn(user, premium) {
  const authArea = document.getElementById("auth-area");
  if (!authArea) return;

  authArea.innerHTML = `
    <div class="auth-user-wrapper" style="position:relative">
      <img 
        src="${user.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.displayName) + '&background=161e2c&color=00bcd4'}" 
        alt="${user.displayName}"
        class="user-avatar"
        onclick="toggleUserMenu()"
        title="${user.displayName}"
      />
      ${premium ? '<span class="premium-dot" title="Premium activo"></span>' : ''}
      
      <!-- Menú desplegable -->
      <div class="user-menu" id="user-menu" style="display:none">
        <div class="user-menu-header">
          <div class="user-menu-name">${user.displayName}</div>
          <div class="user-menu-email">${user.email}</div>
          <span class="user-menu-badge ${premium ? 'badge-premium' : 'badge-free'}">
            ${premium ? '⚡ Premium' : 'Gratis'}
          </span>
        </div>
        
        ${!premium ? `
          <button class="user-menu-item" onclick="openPaymentFlow()">
            💳 Activar Premium
          </button>
        ` : ''}
        
        <button class="user-menu-item danger" onclick="logout()">
          Cerrar sesión
        </button>
      </div>
    </div>
  `;
}

function renderUserLoggedOut() {
  const authArea = document.getElementById("auth-area");
  if (!authArea) return;

  authArea.innerHTML = `
    <button class="btn-google" onclick="openLoginModal()">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Iniciar sesión
    </button>
  `;
}

function showAuthLoading(show) {
  const btn = document.querySelector(".btn-google-full");
  if (!btn) return;
  btn.disabled  = show;
  btn.innerHTML = show 
    ? `<span style="opacity:.6">Conectando con Google...</span>`
    : `<svg viewBox="0 0 24 24" width="20" height="20">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
       </svg>
       Continuar con Google`;
}

function showAuthError(msg) {
  const errEl = document.getElementById("auth-error");
  if (errEl) {
    errEl.textContent = msg;
    errEl.style.display = "block";
    setTimeout(() => { errEl.style.display = "none"; }, 5000);
  }
}

// ─── 9. MODAL DE LOGIN ───────────────────────────────────

function openLoginModal() {
  let modal = document.getElementById("login-modal");
  
  // Si el modal no existe en el HTML, lo crea dinámicamente
  if (!modal) {
    document.body.insertAdjacentHTML("beforeend", `
      <div class="modal-backdrop" id="login-modal" onclick="handleModalBackdropClick(event)">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          
          <button class="modal-close" onclick="closeLoginModal()" aria-label="Cerrar">✕</button>
          
          <div class="modal-logo">PLC</div>
          
          <h2 id="modal-title">Accede a Aula PLC</h2>
          <p>Inicia sesión para guardar tu progreso y acceder a los módulos que hayas desbloqueado.</p>
          
          <button class="btn-google-full" onclick="loginWithGoogle()">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar con Google
          </button>
          
          <!-- Mensaje de error (oculto por defecto) -->
          <p id="auth-error" style="display:none; color:var(--red); font-size:12px; margin-top:10px; text-align:center;"></p>
          
          <p style="font-size:11px; color:var(--text-muted); margin-top:16px;">
            Al ingresar aceptas los términos del servicio. No guardamos contraseñas.
          </p>
        </div>
      </div>
    `);
    modal = document.getElementById("login-modal");
  }
  
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeLoginModal() {
  const modal = document.getElementById("login-modal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
}

// Cierra el modal si el usuario hace clic en el backdrop (fuera del modal)
function handleModalBackdropClick(event) {
  if (event.target.id === "login-modal") {
    closeLoginModal();
  }
}

// ─── 10. MENÚ DE USUARIO ────────────────────────────────

function toggleUserMenu() {
  const menu = document.getElementById("user-menu");
  if (!menu) return;
  
  const isVisible = menu.style.display !== "none";
  menu.style.display = isVisible ? "none" : "block";
  
  // Cierra el menú si el usuario hace clic afuera
  if (!isVisible) {
    setTimeout(() => {
      document.addEventListener("click", closeUserMenuOnClickOutside, { once: true });
    }, 10);
  }
}

function closeUserMenu() {
  const menu = document.getElementById("user-menu");
  if (menu) menu.style.display = "none";
}

function closeUserMenuOnClickOutside(e) {
  const wrapper = document.querySelector(".auth-user-wrapper");
  if (wrapper && !wrapper.contains(e.target)) {
    closeUserMenu();
  }
}

// ─── 11. FLUJO DE PAGO MERCADOPAGO ──────────────────────
// Cuando el usuario hace clic en "Activar Premium":
// 1. Si no está logueado → abre el modal de login primero
// 2. Si está logueado → redirige a MercadoPago con su email como referencia

function openPaymentFlow() {
  closeUserMenu();
  
  if (!currentUser) {
    // No está logueado: pide login primero
    openLoginModal();
    return;
  }
  
  // URL de tu link de MercadoPago
  // Abre en nueva pestaña para no perder la sesión
  const mpUrl = "https://mpago.li/1ZTgeFf";
  window.open(mpUrl, "_blank");
  
  // Muestra instrucciones después del pago
  showPostPaymentInstructions();
}

function showPostPaymentInstructions() {
  const existing = document.getElementById("payment-instructions");
  if (existing) return;
  
  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-backdrop" id="payment-instructions" onclick="if(event.target.id==='payment-instructions') this.remove()">
      <div class="modal" style="max-width:440px">
        <button class="modal-close" onclick="document.getElementById('payment-instructions').remove()">✕</button>
        
        <div style="font-size:32px; margin-bottom:16px;">💳</div>
        <h2>Completa tu pago</h2>
        <p style="margin-top:8px;">Se abrió la ventana de MercadoPago. Una vez que confirmes el pago:</p>
        
        <ol style="text-align:left; margin:16px 0; padding-left:20px; font-size:13px; color:var(--text-secondary); line-height:2;">
          <li>El acceso se activa automáticamente en minutos</li>
          <li>Recarga esta página</li>
          <li>Los módulos premium se desbloquean solos</li>
        </ol>
        
        <p class="payment-note">
          ¿Problemas? Escríbenos a 
          <a href="mailto:angelchandia0098@gmail.com">angelchandia0098@gmail.com</a>
        </p>
      </div>
    </div>
  `);
}

// ─── 12. TECLA ESC PARA CERRAR MODALES ──────────────────
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLoginModal();
    closeUserMenu();
  }
});

// ─── 13. EXPORTAR FUNCIONES AL SCOPE GLOBAL ─────────────
// Necesario para que los onclick del HTML puedan llamarlas
window.loginWithGoogle   = loginWithGoogle;
window.logout            = logout;
window.openLoginModal    = openLoginModal;
window.closeLoginModal   = closeLoginModal;
window.toggleUserMenu    = toggleUserMenu;
window.openPaymentFlow   = openPaymentFlow;
window.handleModalBackdropClick = handleModalBackdropClick;

