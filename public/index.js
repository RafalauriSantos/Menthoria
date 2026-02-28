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
    const temaSalvo = localStorage.getItem('menthoriaTheme');
    const preferenciaSistema = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const tema = temaSalvo || DEFAULT_THEME;
    
    aplicarTema(tema);
    
    // Observa mudanças no tema do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(evento) {
        if (!localStorage.getItem('menthoriaTheme')) {
            aplicarTema(evento.matches ? 'dark' : 'light');
        }
    });
}

// Alterna o tema entre claro e escuro
function alternarTema() {
    const temaAtual = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
    
    aplicarTema(novoTema);
    localStorage.setItem('menthoriaTheme', novoTema);
}

// Aplica o tema especificado
function aplicarTema(tema) {
    if (tema === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
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