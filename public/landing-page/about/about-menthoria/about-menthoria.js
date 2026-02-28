// about.js - Script para a página sobre do Menthoria

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function () {
    inicializarAbout();
    inicializarAnimacoesNumeros();
    inicializarAcessibilidadeAbout();
});

// Inicializa o sistema da página sobre
function inicializarAbout() {
    console.log('📖 Página sobre inicializada');
    
    // Atualizar ano no footer
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
    }
    
    // Inicializar animações de entrada
    const elementosAnimados = document.querySelectorAll('.timeline-item, .valor-card, .numero-card, .vantagem-card');
    observarElementos(elementosAnimados);
}

// Observador de interseção para animações
function observarElementos(elementos) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elementos.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Animação dos números
function inicializarAnimacoesNumeros() {
    const numeros = document.querySelectorAll('.numero-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numero = entry.target;
                const valorFinal = parseInt(numero.getAttribute('data-count'));
                animarContagem(numero, valorFinal);
                observer.unobserve(numero);
            }
        });
    }, { threshold: 0.5 });

    numeros.forEach(numero => {
        observer.observe(numero);
    });
}

function animarContagem(elemento, valorFinal) {
    let valorAtual = 0;
    const incremento = valorFinal / 100;
    const duracao = 2000; // 2 segundos
    const intervalo = duracao / 100;
    
    const timer = setInterval(() => {
        valorAtual += incremento;
        if (valorAtual >= valorFinal) {
            valorAtual = valorFinal;
            clearInterval(timer);
        }
        elemento.textContent = Math.floor(valorAtual);
    }, intervalo);
}

// Acessibilidade
function inicializarAcessibilidadeAbout() {
    // Navegação por teclado na timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'article');
        item.setAttribute('aria-label', `Evento ${index + 1} da nossa história`);
        
        item.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const year = this.querySelector('.timeline-year').textContent;
                const title = this.querySelector('h4').textContent;
                anunciarParaLeitorDeTela(`${year}: ${title}`);
            }
        });
    });
    
    // Navegação nos cards de valores
    const valorCards = document.querySelectorAll('.valor-card, .numero-card, .vantagem-card');
    valorCards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');
    });
}

// Funções auxiliares
function anunciarParaLeitorDeTela(mensagem) {
    // Cria um elemento para anunciar mudanças para leitores de tela
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
    
    // Remove após um tempo
    setTimeout(() => {
        if (anuncio.parentNode) {
            anuncio.parentNode.removeChild(anuncio);
        }
    }, 1000);
}

// Atalhos de teclado globais para a página sobre
document.addEventListener('keydown', function (e) {
    // Ctrl/Cmd + 1 para focar na timeline
    if ((e.ctrlKey || e.metaKey) && e.key === '1') {
        e.preventDefault();
        const primeiroItem = document.querySelector('.timeline-item');
        if (primeiroItem) primeiroItem.focus();
    }
    
    // Ctrl/Cmd + 2 para focar nos valores
    if ((e.ctrlKey || e.metaKey) && e.key === '2') {
        e.preventDefault();
        const primeiroValor = document.querySelector('.valor-card');
        if (primeiroValor) primeiroValor.focus();
    }
    
    // Ctrl/Cmd + 3 para focar nos números
    if ((e.ctrlKey || e.metaKey) && e.key === '3') {
        e.preventDefault();
        const primeiroNumero = document.querySelector('.numero-card');
        if (primeiroNumero) primeiroNumero.focus();
    }
});

// Scroll suave para seções
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});