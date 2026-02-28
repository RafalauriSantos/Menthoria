// CONSTANTES GLOBAIS
const CURRENT_YEAR = new Date().getFullYear();
const APP_VERSION = '1.0.0';
const APP_NAME = 'Menthoria';
const DEFAULT_THEME = 'light';

// Elementos do DOM
let header;
let themeToggle;
let mobileMenuBtn;
let mobileMenu;
let currentYearElement;

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function () {
    inicializarApp();
});

// ===== ICON REPLACEMENT (Font Awesome → inline SVG) =====
// Maps common Font Awesome icon names to small inline SVGs.
const _iconMap = {
    'book-open': '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7a2 2 0 0 1 2-2c2.5 0 4 1 7 1s4.5-1 7-1a2 2 0 0 1 2 2v12a1 1 0 0 1-1 1c-2.5 0-4-1-7-1s-4.5 1-7 1a1 1 0 0 1-1-1V7z"></path></svg>',
    'chevron-down': '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',
    'info-circle': '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
    'users': '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M17 21v-2a4 4 0 0 0-3-3.87"></path><path d="M7 21v-2a4 4 0 0 1 3-3.87"></path><circle cx="9" cy="7" r="4"></circle><circle cx="17" cy="7" r="4"></circle></svg>',
    'sun': '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>',
    'moon': '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>',
    'bars': '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><rect x="3" y="6" width="18" height="2"></rect><rect x="3" y="11" width="18" height="2"></rect><rect x="3" y="16" width="18" height="2"></rect></svg>',
    'eye': '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"></path><circle cx="12" cy="12" r="3"></circle></svg>',
    'spinner': '<svg viewBox="0 0 50 50" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="4"><circle cx="25" cy="25" r="20" stroke-opacity="0.25"></circle><path d="M45 25a20 20 0 0 0-20-20" stroke-opacity="1"></path></svg>',
    'arrow-right': '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>',
    'times': '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
};

function _replaceIcons() {
    document.querySelectorAll('i').forEach(i => {
        const cls = Array.from(i.classList).find(c => c.startsWith('fa-'));
        if (!cls) return;
        const key = cls.replace('fa-', '');
        const svg = _iconMap[key];
        if (!svg) return; // leave unknown icons as-is for now

        const span = document.createElement('span');
        span.className = 'icon icon-' + key.replace(/[^a-z0-9\-]/gi, '-');
        span.setAttribute('role', i.getAttribute('role') || 'img');
        span.setAttribute('aria-hidden', i.getAttribute('aria-hidden') || 'true');
        span.innerHTML = svg;

        // preserve spin class
        if (i.classList.contains('fa-spin') || i.classList.contains('fa-spinner')) {
            span.classList.add('icon-spin');
        }

        i.replaceWith(span);
    });
}

document.addEventListener('DOMContentLoaded', _replaceIcons);

// Inicializa o aplicativo
function inicializarApp() {
    
    inicializarElementos();
    inicializarListeners();
    inicializarTema();
    atualizarAnoFooter();
    
    anunciarParaLeitorDeTela(`${APP_NAME} carregado. Ano atual: ${CURRENT_YEAR}`);
}

// Inicializa os elementos do DOM
function inicializarElementos() {
    header = document.getElementById('header');
    themeToggle = document.getElementById('themeToggle');
    mobileMenuBtn = document.getElementById('mobileMenuBtn');
    mobileMenu = document.getElementById('mobileMenu');
    currentYearElement = document.getElementById('currentYear');
}

// Inicializa os event listeners
function inicializarListeners() {
    // Scroll listener para header
    window.addEventListener('scroll', lidarComScroll);
    
    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', alternarTema);
    }
    
    // Menu mobile
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', alternarMenuMobile);
        
        // Fecha menu ao clicar fora
        document.addEventListener('click', function(event) {
            if (mobileMenu.classList.contains('active') && 
                !event.target.closest('.mobile-menu') && 
                !event.target.closest('.mobile-menu-btn')) {
                alternarMenuMobile();
            }
        });
    }
    
    // Links do menu mobile
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu.classList.contains('active')) {
                alternarMenuMobile();
            }
        });
    });
    
    // Atalhos de teclado
    document.addEventListener('keydown', function(evento) {
        // Alt + T para alternar tema
        if (evento.altKey && evento.key === 't') {
            evento.preventDefault();
            alternarTema();
        }
        
        // Alt + M para alternar menu mobile
        if (evento.altKey && evento.key === 'm') {
            evento.preventDefault();
            alternarMenuMobile();
        }
        
        // Esc para fechar menu mobile
        if (evento.key === 'Escape' && mobileMenu.classList.contains('active')) {
            alternarMenuMobile();
        }
    });
}

// Lida com o scroll da página
function lidarComScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Inicializa o tema
function inicializarTema() {
    // Compatibilidade: aceitar chaves antigas ou novas
    const temaSalvoV1 = localStorage.getItem('menthoriaTheme');
    const temaSalvoV2 = localStorage.getItem('menthoria-theme');
    const preferenciaSistema = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const tema = temaSalvoV2 || temaSalvoV1 || DEFAULT_THEME || preferenciaSistema;

    aplicarTema(tema);
    updateThemeToggle();

    // Observa mudanças no tema do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(evento) {
        if (!localStorage.getItem('menthoria-theme') && !localStorage.getItem('menthoriaTheme')) {
            aplicarTema(evento.matches ? 'dark' : 'light');
            updateThemeToggle();
        }
    });
}

// Alterna o tema entre claro e escuro
function alternarTema() {
    const temaAtual = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const novoTema = temaAtual === 'dark' ? 'light' : 'dark';

    aplicarTema(novoTema);
    // Salva em key canonical
    localStorage.setItem('menthoria-theme', novoTema);
}

// Aplica o tema especificado
function aplicarTema(tema) {
    if (tema === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    // Atualiza o toggle visual
    updateThemeToggle();
}

// Atualiza o controle visual do toggle de tema (slider e ícone)
function updateThemeToggle() {
    const isDark = document.documentElement.classList.contains('dark');
    const slider = document.querySelector('.theme-toggle-slider');
    if (slider) {
        slider.style.transform = isDark ? 'translateX(1.75rem)' : 'translateX(2px)';
    }
    // Atualiza atributo aria-pressed/label no botão
    const btn = document.getElementById('themeToggle');
    if (btn) {
        btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        btn.setAttribute('aria-label', isDark ? 'Alternar para tema claro' : 'Alternar para tema escuro');
    }
}

// Alterna o menu mobile
function alternarMenuMobile() {
    mobileMenu.classList.toggle('active');
    mobileMenuBtn.setAttribute('aria-expanded', mobileMenu.classList.contains('active'));
    
    const mensagem = mobileMenu.classList.contains('active') 
        ? 'Menu mobile aberto' 
        : 'Menu mobile fechado';
    anunciarParaLeitorDeTela(mensagem);
}

// Atualiza o ano no footer usando a constante CURRENT_YEAR
function atualizarAnoFooter() {
    if (currentYearElement) {
        currentYearElement.textContent = CURRENT_YEAR;
    }
}

// Anuncia mudanças para leitores de tela
function anunciarParaLeitorDeTela(mensagem) {
    const anuncio = document.createElement('div');
    anuncio.setAttribute('aria-live', 'polite');
    anuncio.setAttribute('aria-atomic', 'true');
    anuncio.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    anuncio.textContent = mensagem;
    
    document.body.appendChild(anuncio);
    
    setTimeout(() => {
        if (anuncio.parentNode) {
            anuncio.parentNode.removeChild(anuncio);
        }
    }, 1000);
}

// Mostra notificações
function mostrarNotificacao(mensagem, tipo = 'info') {
    // Remove notificações existentes
    const notificacoesExistentes = document.querySelectorAll('.notification');
    notificacoesExistentes.forEach(notificacao => {
        if (notificacao.parentNode) {
            notificacao.parentNode.removeChild(notificacao);
        }
    });
    
    const notificacao = document.createElement('div');
    notificacao.className = `notification notification-${tipo}`;
    notificacao.setAttribute('role', 'alert');
    notificacao.setAttribute('aria-live', 'assertive');
    
    // Estilos base
    notificacao.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: var(--radius);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        max-width: 300px;
        animation: slideIn 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    
    // Cores baseadas no tipo
    const cores = {
        success: { bg: '#4ECDC4', text: '#fff', icon: 'fa-check-circle' },
        error: { bg: '#FF6B6B', text: '#fff', icon: 'fa-exclamation-circle' },
        warning: { bg: '#FFD166', text: '#333', icon: 'fa-exclamation-triangle' },
        info: { bg: '#4D96FF', text: '#fff', icon: 'fa-info-circle' }
    };
    
    const cor = cores[tipo] || cores.info;
    notificacao.style.backgroundColor = cor.bg;
    notificacao.style.color = cor.text;
    
    notificacao.innerHTML = `
        <i class="fas ${cor.icon}"></i>
        <span>${mensagem}</span>
    `;
    
    // Adiciona animação CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notificacao);
    
    // Remove após 5 segundos
    setTimeout(() => {
        if (notificacao.parentNode) {
            notificacao.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                if (notificacao.parentNode) {
                    notificacao.parentNode.removeChild(notificacao);
                }
                if (style.parentNode) {
                    style.parentNode.removeChild(style);
                }
            }, 300);
        }
    }, 5000);
}

// Scroll suave para âncoras
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header?.offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Foca no elemento alvo após scroll
                setTimeout(() => {
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus();
                }, 500);
            }
        });
    });
});

// Função para verificar se está em um dispositivo móvel
function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// Função para obter informações do navegador
function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    let browser = 'Desconhecido';
    
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) browser = 'Safari';
    else if (userAgent.includes('Edg')) browser = 'Edge';
    
    return {
        nome: browser,
        mobile: isMobileDevice(),
        userAgent: userAgent
    };
}

// Função para fazer log de eventos
function logEvento(evento, dados = {}) {
    const timestamp = new Date().toISOString();
    const infoNavegador = getBrowserInfo();
    
    const logEntry = {
        timestamp,
        evento,
        dados,
        navegador: infoNavegador.nome,
        mobile: infoNavegador.mobile,
        url: window.location.href,
        tema: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    };
    
    // Para desenvolvimento, log no console
    console.log(`📝 LOG: ${evento}`, logEntry);
    
    // Aqui você poderia enviar para um serviço de analytics
    // Ex: enviarParaAnalytics(logEntry);
}

// Inicializa tracking de eventos
function inicializarTracking() {
    // Track cliques em links
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            const link = e.target;
            logEvento('click_link', {
                href: link.href,
                text: link.textContent.trim(),
                target: link.target
            });
        }
    });
    
    // Track submissões de formulários
    document.addEventListener('submit', function(e) {
        if (e.target.tagName === 'FORM') {
            const form = e.target;
            logEvento('submit_form', {
                id: form.id,
                action: form.action,
                method: form.method
            });
        }
    });
}

// Função para verificar a conexão
function verificarConexao() {
    if (!navigator.onLine) {
        mostrarNotificacao('Você está offline. Algumas funcionalidades podem não estar disponíveis.', 'warning');
    }
    
    window.addEventListener('online', () => {
        mostrarNotificacao('Conexão restabelecida!', 'success');
    });
    
    window.addEventListener('offline', () => {
        mostrarNotificacao('Você está offline.', 'warning');
    });
}

// Exporta funções para uso global
window.MenthoriaApp = {
    CURRENT_YEAR,
    APP_VERSION,
    APP_NAME,
    alternarTema,
    alternarMenuMobile,
    mostrarNotificacao,
    logEvento,
    getBrowserInfo,
    isMobileDevice
};

// Inicializa tracking e verificação de conexão quando a página carrega
window.addEventListener('load', function() {
    inicializarTracking();
    verificarConexao();
    
    // Log do carregamento inicial
    logEvento('pagina_carregada', {
        tempoCarregamento: performance.now(),
        temaInicial: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    });
});