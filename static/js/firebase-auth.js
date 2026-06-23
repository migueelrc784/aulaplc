// =========================================================
//  AULA PLC — FIREBASE AUTH + CONTROL DE ACCESO PREMIUM
//  Archivo: firebase-auth.js
// =========================================================

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
  serverTimestamp,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ─── 1. CONFIGURACIÓN FIREBASE ───────────────────────────
const firebaseConfig = {
  apiKey:            "AIzaSyCQkoc5CNrs-LfT1Tls_LrSWEm8MLanYZA",
  authDomain:        "aulaplc-2a611.firebaseapp.com",
  projectId:         "aulaplc-2a611",
  storageBucket:     "aulaplc-2a611.firebasestorage.app",
  messagingSenderId: "349449305280",
  appId:             "1:349449305280:web:d5a5d7baf3377cfa6a0125",
  measurementId:     "G-WKD00BSZCG"
};

// ─── 2. INICIALIZACIÓN ───────────────────────────────────
const app      = initializeApp(firebaseConfig);
const auth     = getAuth(app);
const db       = getFirestore(app);
const provider = new GoogleAuthProvider();

// ─── 3. ESTADO GLOBAL ───────────────────────────────────
let currentUser = null;
let isPremium   = false;

// ─── Casino credits ──────────────────────────────────────
let _casinoUnsubscribe  = null;   // listener Firestore activo
let _localCasinoCredits = null;   // último valor que nosotros escribimos (para ignorar eco)

// ─── 4. LISTENER PRINCIPAL ──────────────────────────────
onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    window.currentUserUid = user.uid;
    isPremium   = await checkPremiumStatus(user.uid);

    await saveUserToFirestore(user);
    renderUserLoggedIn(user, isPremium);
    updateModulesAccess(isPremium);
    await loadModuleProgress();   // ← carga progreso guardado

    // Casino: arrancar listener de créditos en tiempo real
    setupCasinoCreditsListener(user.uid);

    // Notificar a casino.html que auth está lista
    window.dispatchEvent(new CustomEvent('casinoAuthReady', {
      detail: { uid: user.uid, user }
    }));

    console.log(`✅ Sesión activa: ${user.displayName} | Premium: ${isPremium}`);
  } else {
    currentUser = null;
    window.currentUserUid = null;
    isPremium   = false;

    // Detener listener de casino si existía
    if (_casinoUnsubscribe) { _casinoUnsubscribe(); _casinoUnsubscribe = null; }
    _localCasinoCredits = null;

    renderUserLoggedOut();
    updateModulesAccess(false);

    console.log("ℹ️ Sin sesión activa");
  }
});

// ─── 5. AUTENTICACIÓN ───────────────────────────────────
async function loginWithGoogle() {
  try {
    showAuthLoading(true);
    const result = await signInWithPopup(auth, provider);
    closeLoginModal();
    console.log("✅ Login exitoso:", result.user.displayName);
  } catch (error) {
    console.error("❌ Error en login:", error.message);
    const errores = {
      "auth/popup-closed-by-user":    "Cerraste la ventana antes de iniciar sesión.",
      "auth/popup-blocked":           "El navegador bloqueó la ventana. Permite pop-ups para este sitio.",
      "auth/cancelled-popup-request": "Operación cancelada.",
      "auth/network-request-failed":  "Sin conexión a internet. Intenta de nuevo.",
    };
    showAuthError(errores[error.code] || "Error al iniciar sesión. Intenta de nuevo.");
  } finally {
    showAuthLoading(false);
  }
}

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
async function checkPremiumStatus(uid) {
  try {
    const docSnap = await getDoc(doc(db, "usuarios", uid));
    return docSnap.exists() ? docSnap.data().premium === true : false;
  } catch (error) {
    console.error("❌ Error verificando premium:", error);
    return false;
  }
}

async function saveUserToFirestore(user) {
  try {
    await setDoc(doc(db, "usuarios", user.uid), {
      nombre:      user.displayName,
      email:       user.email,
      foto:        user.photoURL,
      ultimoLogin: serverTimestamp(),
    }, { merge: true });  // merge:true nunca toca el campo "premium"
  } catch (error) {
    console.error("❌ Error guardando usuario:", error);
  }
}

// ─── 7. PROGRESO DE MÓDULOS ─────────────────────────────
async function saveModuleProgress(moduleId, completed) {
  if (!currentUser) {
    openLoginModal();
    return;
  }
  try {
    await setDoc(doc(db, "usuarios", currentUser.uid), {
      progreso: { [moduleId]: completed }
    }, { merge: true });

    // Actualiza el botón visualmente de inmediato
    const btn = document.getElementById(`completado-${moduleId}`);
    if (btn) {
      btn.innerText = "✅ COMPLETADO";
      btn.classList.remove("green");
      btn.classList.add("blue");
    }

    console.log(`✅ Módulo ${moduleId} guardado`);
  } catch (error) {
    console.error("❌ Error guardando progreso:", error);
  }
}

async function loadModuleProgress() {
  if (!currentUser) return;
  try {
    const docSnap = await getDoc(doc(db, "usuarios", currentUser.uid));
    if (!docSnap.exists()) return;

    const progreso = docSnap.data().progreso || {};
    Object.keys(progreso).forEach(moduleId => {
      if (progreso[moduleId]) {
        const btn = document.getElementById(`completado-${moduleId}`);
        if (btn) {
          btn.innerText = "✅ COMPLETADO";
          btn.classList.remove("green");
          btn.classList.add("blue");
        }
      }
    });
  } catch (error) {
    console.error("❌ Error cargando progreso:", error);
  }
}

// ─── 8. CONTROL DE MÓDULOS PREMIUM ──────────────────────
function updateModulesAccess(premium) {
  document.querySelectorAll('[data-requiere-premium="true"]').forEach(el => {
    if (premium) {
      el.classList.remove("locked");
      el.style.opacity       = "1";
      el.style.pointerEvents = "auto";
      const lockOverlay = el.querySelector(".lock-overlay");
      if (lockOverlay) lockOverlay.remove();

      // Actualiza botones bloqueados a "ACCEDER"
      el.querySelectorAll("button").forEach(btn => {
        if (btn.innerText.includes("BLOQUEADO")) {
          btn.innerText = "ACCEDER";
          btn.classList.remove("yellow");
          btn.classList.add("green");
        }
      });
    } else {
      el.classList.add("locked");
      if (!el.querySelector(".lock-overlay")) {
        el.insertAdjacentHTML("beforeend", `
          <div class="lock-overlay" style="
            position:absolute; inset:0;
            background:rgba(0,0,0,0.7);
            display:flex; flex-direction:column;
            align-items:center; justify-content:center;
            border-radius:20px; z-index:10;
          ">
            <span style="font-size:36px;">🔒</span>
            <p style="color:#fff; margin:10px 0; font-weight:bold;">Contenido Premium</p>
            <button class="btn yellow" onclick="openPaymentFlow()">
              💳 Activar Premium
            </button>
          </div>
        `);
      }
    }
  });

  const premiumGate = document.getElementById("premium-gate");
  if (premiumGate) {
    premiumGate.style.display = premium ? "none" : "block";
  }
}

// ─── 9. RENDERIZADO UI ───────────────────────────────────
function renderUserLoggedIn(user, premium) {
  const authArea = document.getElementById("auth-area");
  if (!authArea) return;

  authArea.innerHTML = `
    <div class="auth-user-wrapper" style="position:relative; display:flex; align-items:center;">
      <img 
        src="${user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}&background=161e2c&color=00bcd4`}" 
        alt="${user.displayName}"
        style="width:36px; height:36px; border-radius:50%; cursor:pointer; border:2px solid ${premium ? '#00ff99' : '#444'};"
        onclick="toggleUserMenu()"
        title="${user.displayName}"
      />
      ${premium ? '<span style="position:absolute;top:-2px;right:-2px;width:10px;height:10px;background:#00ff99;border-radius:50%;border:2px solid #0a0f1a;" title="Premium activo"></span>' : ''}
      
      <div id="user-menu" style="
        display:none; position:absolute; top:46px; right:0;
        background:#0f172a; border:1px solid #1e293b;
        border-radius:12px; padding:12px; min-width:220px;
        z-index:1000; box-shadow:0 8px 32px rgba(0,0,0,0.5);
      ">
        <div style="padding-bottom:10px; border-bottom:1px solid #1e293b; margin-bottom:10px;">
          <div style="font-weight:700; color:#fff; font-size:14px;">${user.displayName}</div>
          <div style="color:#94a3b8; font-size:12px; margin-top:2px;">${user.email}</div>
          <span style="
            display:inline-block; margin-top:8px; padding:3px 10px;
            border-radius:6px; font-size:11px; font-weight:700;
            background:${premium ? '#052e16' : '#1e293b'};
            color:${premium ? '#00ff99' : '#94a3b8'};
            border:1px solid ${premium ? '#00ff99' : '#334155'};
          ">
            ${premium ? '⚡ Premium' : 'Gratis'}
          </span>
        </div>

        ${!premium ? `
          <button onclick="openPaymentFlow()" style="
            width:100%; padding:10px; margin-bottom:8px;
            background:#1d4ed8; color:white; border:none;
            border-radius:8px; cursor:pointer; font-weight:700; font-size:13px;
          ">
            💳 Activar Premium
          </button>
        ` : ''}

        <button onclick="logout()" style="
          width:100%; padding:10px;
          background:#7f1d1d; color:white; border:none;
          border-radius:8px; cursor:pointer; font-weight:700; font-size:13px;
        ">
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
    <button onclick="openLoginModal()" style="
      display:flex; align-items:center; gap:8px;
      padding:8px 14px; background:#1e293b;
      color:#fff; border:1px solid #334155;
      border-radius:8px; cursor:pointer;
      font-family:Orbitron; font-size:11px; font-weight:700;
      letter-spacing:1px;
    ">
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      INICIAR SESIÓN
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
    errEl.textContent  = msg;
    errEl.style.display = "block";
    setTimeout(() => { errEl.style.display = "none"; }, 5000);
  }
}

// ─── 10. MODAL DE LOGIN ──────────────────────────────────
function openLoginModal() {
  let modal = document.getElementById("login-modal");

  if (!modal) {
    document.body.insertAdjacentHTML("beforeend", `
      <div id="login-modal" onclick="handleModalBackdropClick(event)" style="
        position:fixed; inset:0; background:rgba(0,0,0,0.8);
        display:flex; align-items:center; justify-content:center; z-index:9999;
      ">
        <div style="
          background:#0f172a; border:1px solid #1e293b;
          border-radius:16px; padding:36px; max-width:400px; width:90%;
          text-align:center; position:relative;
        " role="dialog" aria-modal="true">

          <button onclick="closeLoginModal()" style="
            position:absolute; top:12px; right:16px;
            background:none; border:none; color:#94a3b8;
            font-size:20px; cursor:pointer;
          ">✕</button>

          <div style="
            width:56px; height:56px; background:#1e293b;
            border-radius:12px; display:flex; align-items:center;
            justify-content:center; margin:0 auto 20px;
            font-weight:900; color:#00d4ff; font-size:18px; font-family:Orbitron;
          ">PLC</div>

          <h2 style="color:#fff; margin-bottom:8px;">Accede a Aula PLC</h2>
          <p style="color:#94a3b8; font-size:14px; margin-bottom:24px;">
            Inicia sesión para guardar tu progreso y acceder a los módulos que hayas desbloqueado.
          </p>

          <button class="btn-google-full" onclick="loginWithGoogle()" style="
            display:flex; align-items:center; justify-content:center; gap:10px;
            width:100%; padding:14px; background:#fff; color:#111;
            border:none; border-radius:10px; cursor:pointer;
            font-weight:700; font-size:14px;
          ">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar con Google
          </button>

          <p id="auth-error" style="display:none; color:#ef4444; font-size:12px; margin-top:12px;"></p>

          <p style="font-size:11px; color:#475569; margin-top:16px;">
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
    modal.style.display  = "none";
    document.body.style.overflow = "";
  }
}

function handleModalBackdropClick(event) {
  if (event.target.id === "login-modal") closeLoginModal();
}

// ─── 11. MENÚ DE USUARIO ────────────────────────────────
function toggleUserMenu() {
  const menu = document.getElementById("user-menu");
  if (!menu) return;
  const isVisible = menu.style.display !== "none";
  menu.style.display = isVisible ? "none" : "block";
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
  if (wrapper && !wrapper.contains(e.target)) closeUserMenu();
}

// ─── 12. FLUJO DE PAGO ──────────────────────────────────
function openPaymentFlow() {
  closeUserMenu();
  if (!currentUser) { openLoginModal(); return; }
  window.open("https://mpago.li/1ZTgeFf", "_blank");
  showPostPaymentInstructions();
}

function showPostPaymentInstructions() {
  if (document.getElementById("payment-instructions")) return;
  document.body.insertAdjacentHTML("beforeend", `
    <div id="payment-instructions" onclick="if(event.target.id==='payment-instructions') this.remove()" style="
      position:fixed; inset:0; background:rgba(0,0,0,0.8);
      display:flex; align-items:center; justify-content:center; z-index:9999;
    ">
      <div style="
        background:#0f172a; border:1px solid #1e293b;
        border-radius:16px; padding:36px; max-width:440px; width:90%;
        text-align:center; position:relative;
      ">
        <button onclick="document.getElementById('payment-instructions').remove()" style="
          position:absolute; top:12px; right:16px;
          background:none; border:none; color:#94a3b8; font-size:20px; cursor:pointer;
        ">✕</button>
        <div style="font-size:36px; margin-bottom:16px;">💳</div>
        <h2 style="color:#fff;">Completa tu pago</h2>
        <p style="color:#94a3b8; margin-top:8px;">Se abrió la ventana de MercadoPago. Una vez confirmado el pago:</p>
        <ol style="text-align:left; margin:16px 0; padding-left:20px; color:#94a3b8; font-size:13px; line-height:2;">
          <li>El acceso se activa en minutos</li>
          <li>Recarga esta página</li>
          <li>Los módulos premium se desbloquean solos</li>
        </ol>
        <p style="font-size:13px; color:#64748b;">
          ¿Problemas? Escríbenos a 
          <a href="mailto:aulaplcsoporte@gmail.com" style="color:#00d4ff;">aulaplcsoporte@gmail.com</a>
        </p>
      </div>
    </div>
  `);
}

// ─── 13. TECLA ESC ──────────────────────────────────────
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeLoginModal(); closeUserMenu(); }
});

// ─── 14. CASINO — CRÉDITOS ──────────────────────────────
/**
 * Listener Firestore en tiempo real.
 * Si el backend (webhook MercadoPago → Flask) actualiza casino_credits,
 * el casino recibe el cambio en milisegundos sin que el usuario haga nada.
 */
function setupCasinoCreditsListener(uid) {
  if (_casinoUnsubscribe) _casinoUnsubscribe();        // cancelar listener anterior

  _casinoUnsubscribe = onSnapshot(doc(db, "usuarios", uid), (snap) => {
    if (!snap.exists()) return;
    const data = snap.data();
    if (typeof data.casino_credits !== 'number') return;

    // Ignorar el eco de nuestra propia escritura
    if (data.casino_credits === _localCasinoCredits) return;

    // Cambio externo (p.ej. webhook del backend acreditó una compra)
    window.dispatchEvent(new CustomEvent('casinoCreditsUpdated', {
      detail: { credits: data.casino_credits }
    }));
  });
}

/** Lee los créditos de casino desde Firestore (una sola vez). */
async function getCasinoCredits() {
  if (!currentUser) return null;
  try {
    const snap = await getDoc(doc(db, "usuarios", currentUser.uid));
    if (!snap.exists()) return null;
    const val = snap.data().casino_credits;
    return typeof val === 'number' ? val : null;
  } catch (e) {
    console.error("❌ Error leyendo casino_credits:", e);
    return null;
  }
}

/** Guarda los créditos de casino en Firestore. */
async function saveCasinoCredits(amount) {
  if (!currentUser || typeof amount !== 'number') return;
  _localCasinoCredits = amount;    // marcar como escritura propia → no disparar evento
  try {
    await setDoc(doc(db, "usuarios", currentUser.uid), {
      casino_credits: amount
    }, { merge: true });
  } catch (e) {
    console.error("❌ Error guardando casino_credits:", e);
    _localCasinoCredits = null;    // permitir reintentos
  }
}

// ─── 15. EXPORTAR AL SCOPE GLOBAL ───────────────────────
window.loginWithGoogle          = loginWithGoogle;
window.logout                   = logout;
window.openLoginModal           = openLoginModal;
window.closeLoginModal          = closeLoginModal;
window.toggleUserMenu           = toggleUserMenu;
window.openPaymentFlow          = openPaymentFlow;
window.handleModalBackdropClick = handleModalBackdropClick;
window.saveModuleProgress       = saveModuleProgress;
window.loadModuleProgress       = loadModuleProgress;
// Casino credits
window.getCasinoCredits         = getCasinoCredits;
window.saveCasinoCredits        = saveCasinoCredits;