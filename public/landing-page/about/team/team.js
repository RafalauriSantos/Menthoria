// teams.js - Script para a página de equipe do Menthoria

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function () {
    inicializarTeams();
});

// Inicializa o sistema da página de equipe
function inicializarTeams() {
    console.log('👥 Página da equipe inicializada');
    
    // Atualizar ano no footer
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Inicializar animações de entrada
    const elementosAnimados = document.querySelectorAll(
        '.missao-text, .missao-imagem, ' +
        '.dev-card, ' +
        '.tecnologia-card, ' +
        '.especialista-card, ' +
        '.valor-cultura, ' +
        '.join-text, .join-image'
    );
    observarElementos(elementosAnimados);
    
    // Inicializar animações de números
    inicializarAnimacoesNumeros();
    
    // Inicializar seção de desenvolvimento
    inicializarEquipeDesenvolvimento();
    
    // Inicializar acessibilidade
    inicializarAcessibilidadeTeams();
    
    // Inicializar menu mobile (se disponível)
    if (typeof inicializarMenuMobile === 'function') {
        inicializarMenuMobile();
    }
}

// Observador de interseção para animações
function observarElementos(elementos) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elementos.forEach(el => {
        if (!el.classList.contains('animate-fade-in-up') && 
            !el.classList.contains('animate-slide-in-right')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        }
    });
}

// Animação dos números
function inicializarAnimacoesNumeros() {
    const numeros = document.querySelectorAll('.estatistica .numero');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numero = entry.target;
                const valorFinal = parseInt(numero.getAttribute('data-count')) || 0;
                animarContagem(numero, valorFinal);
                observer.unobserve(numero);
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });

    numeros.forEach(numero => {
        observer.observe(numero);
    });
}

function animarContagem(elemento, valorFinal) {
    let valorAtual = 0;
    const duracao = 2000; // 2 segundos
    const incremento = valorFinal / (duracao / 16); // 60fps
    
    function atualizar() {
        valorAtual += incremento;
        if (valorAtual >= valorFinal) {
            valorAtual = valorFinal;
            elemento.textContent = valorFinal;
            return;
        }
        
        elemento.textContent = Math.floor(valorAtual);
        requestAnimationFrame(actualizar);
    }
    
    requestAnimationFrame(actualizar);
}

// Efeitos de hover e interações na equipe
function inicializarEquipeDesenvolvimento() {
    console.log('👨‍💻 Equipe de desenvolvimento inicializada');
    
    // Efeitos de hover nos cards de desenvolvedores
    const devCards = document.querySelectorAll('.dev-card');
    
    devCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            const avatar = this.querySelector('.avatar-container img');
            if (avatar) {
                avatar.style.transform = 'scale(1.1)';
                avatar.style.borderColor = 'hsl(var(--primary))';
            }
        });
        
        card.addEventListener('mouseleave', function () {
            const avatar = this.querySelector('.avatar-container img');
            if (avatar) {
                avatar.style.transform = 'scale(1)';
                avatar.style.borderColor = 'hsl(var(--primary-foreground))';
            }
        });
        
        // Clicar no card mostra mais informações (somente se não for um link)
        card.addEventListener('click', function (e) {
            if (!e.target.closest('.dev-link')) {
                const nome = this.querySelector('.dev-nome').textContent;
                const cargo = this.querySelector('.dev-cargo').textContent;
                mostrarDetalhesDev(nome, cargo);
            }
        });
        
        // Navegação por teclado
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');
        const nomeDev = card.querySelector('.dev-nome').textContent;
        card.setAttribute('aria-label', `Desenvolvedor: ${nomeDev}`);
        
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const nome = this.querySelector('.dev-nome').textContent;
                const cargo = this.querySelector('.dev-cargo').textContent;
                mostrarDetalhesDev(nome, cargo);
            }
        });
    });
    
    // Efeitos nos links de contato
    const devLinks = document.querySelectorAll('.dev-link');
    
    devLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
        
        // Feedback visual ao clicar
        link.addEventListener('click', function (e) {
            e.stopPropagation();
            const platform = this.classList.contains('linkedin') ? 'LinkedIn' : 'GitHub';
            const nome = this.closest('.dev-card').querySelector('.dev-nome').textContent;
            anunciarParaLeitorDeTela(`Abrindo ${platform} de ${nome}`);
        });
    });
    
    // Efeitos nas tecnologias
    const tecnologiaCards = document.querySelectorAll('.tecnologia-card');
    
    tecnologiaCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            const icon = this.querySelector('.tecnologia-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function () {
            const icon = this.querySelector('.tecnologia-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
        
        // Navegação por teclado
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');
        const tituloTec = card.querySelector('h3').textContent;
        card.setAttribute('aria-label', `Tecnologia: ${tituloTec}`);
    });
}

// Acessibilidade
function inicializarAcessibilidadeTeams() {
    // Navegação por teclado em todos os cards
    const todosCards = document.querySelectorAll(
        '.dev-card, ' +
        '.tecnologia-card, ' +
        '.especialista-card, ' +
        '.valor-cultura'
    );
    
    todosCards.forEach((card, index) => {
        card.addEventListener('keydown', function (e) {
            // Navegação com setas
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextCard = todosCards[index + 1] || todosCards[0];
                nextCard.focus();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevCard = todosCards[index - 1] || todosCards[todosCards.length - 1];
                prevCard.focus();
            }
            
            // Navegação vertical (apenas para dev cards)
            if (card.classList.contains('dev-card')) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    // Navega para o próximo card na mesma coluna
                    const currentIndex = index;
                    const cardsPerRow = window.innerWidth >= 1024 ? 4 : 
                                      window.innerWidth >= 768 ? 2 : 1;
                    const nextIndex = currentIndex + cardsPerRow;
                    if (nextIndex < todosCards.length) {
                        todosCards[nextIndex].focus();
                    }
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    // Navega para o card anterior na mesma coluna
                    const currentIndex = index;
                    const cardsPerRow = window.innerWidth >= 1024 ? 4 : 
                                      window.innerWidth >= 768 ? 2 : 1;
                    const prevIndex = currentIndex - cardsPerRow;
                    if (prevIndex >= 0) {
                        todosCards[prevIndex].focus();
                    }
                }
            }
        });
    });
    
    // Foco nos links internos
    const linksInternos = document.querySelectorAll('a[href^="#"]');
    linksInternos.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                setTimeout(() => {
                    targetElement.focus();
                }, 300);
            }
        });
    });
}

function mostrarDetalhesDev(nome, cargo) {
    const mensagem = `Saiba mais sobre ${nome}, ${cargo}. Especialista em desenvolvimento full-stack para educação inclusiva.`;
    mostrarNotificacao(mensagem, 'info');
    anunciarParaLeitorDeTela(mensagem);
}

// Funções auxiliares
function mostrarNotificacao(mensagem, tipo = 'info') {
    // Usar a função de notificação do sistema principal se disponível
    if (typeof showNotification === 'function') {
        showNotification(mensagem, tipo);
    } else {
        // Implementação alternativa simples
        const notificacao = document.createElement('div');
        notificacao.className = 'notification';
        notificacao.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${tipo === 'success' ? '#4ECDC4' : tipo === 'error' ? '#FF6B6B' : '#4D96FF'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            max-width: 300px;
            animation: slideIn 0.3s ease;
        `;
        notificacao.textContent = mensagem;
        
        // Adicionar animação CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notificacao);
        
        setTimeout(() => {
            if (notificacao.parentNode) {
                notificacao.style.animation = 'slideOut 0.3s ease forwards';
                
                // Adicionar animação de saída
                const outroStyle = document.createElement('style');
                outroStyle.textContent = `
                    @keyframes slideOut {
                        from { transform: translateX(0); opacity: 1; }
                        to { transform: translateX(100%); opacity: 0; }
                    }
                `;
                document.head.appendChild(outroStyle);
                
                setTimeout(() => {
                    if (notificacao.parentNode) {
                        notificacao.parentNode.removeChild(notificacao);
                    }
                    if (outroStyle.parentNode) {
                        outroStyle.parentNode.removeChild(outroStyle);
                    }
                }, 300);
            }
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }, 3000);
    }
}

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

// Scroll suave para seções
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerHeight = document.getElementById('header')?.offsetHeight || 80;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Focar no elemento alvo após scroll
            setTimeout(() => {
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
            }, 500);
        }
    });
});

// Atalhos de teclado globais
document.addEventListener('keydown', function (e) {
    // Ctrl/Cmd + 1 para focar na equipe de desenvolvimento
    if ((e.ctrlKey || e.metaKey) && e.key === '1') {
        e.preventDefault();
        const primeiroDev = document.querySelector('.dev-card');
        if (primeiroDev) primeiroDev.focus();
    }
    
    // Ctrl/Cmd + 2 para focar nas tecnologias
    if ((e.ctrlKey || e.metaKey) && e.key === '2') {
        e.preventDefault();
        const primeiraTecnologia = document.querySelector('.tecnologia-card');
        if (primeiraTecnologia) primeiraTecnologia.focus();
    }
    
    // Ctrl/Cmd + 3 para focar nos especialistas
    if ((e.ctrlKey || e.metaKey) && e.key === '3') {
        e.preventDefault();
        const primeiroEspecialista = document.querySelector('.especialista-card');
        if (primeiroEspecialista) primeiroEspecialista.focus();
    }
    
    // Ctrl/Cmd + H para voltar ao hero
    if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        const hero = document.querySelector('.hero-teams');
        if (hero) hero.focus();
    }
});

// Função de fallback para imagens
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.avatar-container img');
    images.forEach(img => {
        img.onerror = function() {
            const initials = this.alt.split(' ')
                .map(name => name[0])
                .join('')
                .toUpperCase()
                .substring(0, 2);
            
            this.style.display = 'none';
            
            const fallback = document.createElement('div');
            fallback.style.cssText = `
                width: 150px;
                height: 150px;
                border-radius: 50%;
                background: hsl(var(--primary));
                color: hsl(var(--primary-foreground));
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2.5rem;
                font-weight: bold;
                font-family: 'Montserrat', sans-serif;
            `;
            fallback.textContent = initials;
            
            this.parentNode.appendChild(fallback);
        };
    });
});

// Exporta funções para uso global
window.TeamsApp = {
    mostrarMembro: (index) => {
        const membros = document.querySelectorAll('.dev-card');
        if (membros[index]) {
            const nome = membros[index].querySelector('.dev-nome').textContent;
            const cargo = membros[index].querySelector('.dev-cargo').textContent;
            mostrarDetalhesDev(nome, cargo);
        }
    },
    animarNumeros: () => {
        inicializarAnimacoesNumeros();
    },
    recarregarAnimacoes: () => {
        inicializarTeams();
    }
};