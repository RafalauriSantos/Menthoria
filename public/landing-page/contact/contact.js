// contact.js - Script para a página de contato do Menthoria

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function () {
    inicializarContact();
    inicializarFormularioContato();
    inicializarCanaisContato();
    inicializarModalAgendamento();
    inicializarMapa();
    inicializarAcessibilidadeContact();
});

// Inicializa o sistema da página de contato
function inicializarContact() {
    console.log('📞 Página de contato inicializada');
    
    // Atualizar ano no footer
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Inicializar animações de entrada
    const elementosAnimados = document.querySelectorAll('.canal-card, .info-item, .faq-item, .localizacao-info, .localizacao-mapa');
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

// Sistema do formulário de contato
function inicializarFormularioContato() {
    const formulario = document.getElementById('form-contato');
    const campoMensagem = document.getElementById('mensagem');
    const contador = document.getElementById('contador');
    const btnEnviar = formulario.querySelector('button[type="submit"]');
    const btnTexto = btnEnviar.querySelector('.btn-text');
    const btnLoading = btnEnviar.querySelector('.btn-loading');
    
    // Inicializar contador de caracteres
    if (campoMensagem && contador) {
        campoMensagem.addEventListener('input', function () {
            const caracteres = this.value.length;
            contador.textContent = caracteres;
            
            if (caracteres > 1000) {
                contador.style.color = 'hsl(var(--destructive))';
                this.classList.add('error');
            } else {
                contador.style.color = 'hsl(var(--muted-foreground))';
                this.classList.remove('error');
            }
        });
    }
    
    // Validação em tempo real
    const campos = formulario.querySelectorAll('.form-input');
    campos.forEach(campo => {
        campo.addEventListener('blur', validarCampoContato);
        campo.addEventListener('input', limparErroCampo);
    });
    
    // Submissão do formulário
    formulario.addEventListener('submit', async function (e) {
        e.preventDefault();
        
        // Valida todos os campos
        const campos = formulario.querySelectorAll('.form-input');
        let valido = true;
        
        campos.forEach(campo => {
            if (!validarCampoContato({ target: campo })) {
                valido = false;
            }
        });
        
        if (!valido) {
            // Foca no primeiro campo com erro
            const primeiroErro = formulario.querySelector('.form-input.error');
            if (primeiroErro) {
                primeiroErro.focus();
            }
            return;
        }
        
        // Mostra estado de carregamento
        mostrarCarregamentoBotao(btnEnviar, btnTexto, btnLoading, true);
        
        try {
            // Simula envio do formulário
            await simularEnvioFormulario();
            
            // Sucesso
            mostrarNotificacao('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            formulario.reset();
            if (contador) contador.textContent = '0';
            
        } catch (erro) {
            console.error('Erro ao enviar formulário:', erro);
            mostrarNotificacao('Erro ao enviar mensagem. Tente novamente.', 'error');
        } finally {
            mostrarCarregamentoBotao(btnEnviar, btnTexto, btnLoading, false);
        }
    });
    
    function validarCampoContato(evento) {
        const campo = evento.target;
        const valor = campo.value.trim();
        let valido = true;
        let mensagem = '';
        
        limparErroCampo(evento);
        
        // Validação de campo obrigatório
        if (campo.required && !valor) {
            valido = false;
            mensagem = 'Este campo é obrigatório';
        }
        
        // Validação de e-mail
        else if (campo.type === 'email' && valor) {
            if (!validarEmail(valor)) {
                valido = false;
                mensagem = 'Digite um e-mail válido';
            }
        }
        
        // Validação de telefone
        else if (campo.type === 'tel' && valor) {
            if (!validarTelefone(valor)) {
                valido = false;
                mensagem = 'Digite um telefone válido';
            }
        }
        
        // Validação de mensagem
        else if (campo.id === 'mensagem' && valor) {
            if (valor.length > 1000) {
                valido = false;
                mensagem = 'A mensagem deve ter no máximo 1000 caracteres';
            } else if (valor.length < 10) {
                valido = false;
                mensagem = 'A mensagem deve ter pelo menos 10 caracteres';
            }
        }
        
        if (!valido) {
            mostrarErroCampo(campo, mensagem);
        }
        
        return valido;
    }
    
    function limparErroCampo(evento) {
        const campo = evento.target;
        campo.classList.remove('error');
        
        const elementoErro = campo.parentNode.querySelector('.error-message');
        if (elementoErro) {
            elementoErro.style.display = 'none';
        }
    }
    
    function mostrarErroCampo(campo, mensagem) {
        campo.classList.add('error');
        
        const elementoErro = campo.parentNode.querySelector('.error-message');
        if (elementoErro) {
            elementoErro.textContent = mensagem;
            elementoErro.style.display = 'block';
        }
        
        // Anuncia erro para leitores de tela
        anunciarParaLeitorDeTela(`Erro: ${mensagem}`);
    }
}

// Sistema dos canais de contato
function inicializarCanaisContato() {
    const botoesCanal = document.querySelectorAll('.btn-canal');
    
    botoesCanal.forEach(botao => {
        botao.addEventListener('click', function () {
            const canal = this.dataset.canal;
            abrirCanalContato(canal);
        });
    });
    
    function abrirCanalContato(canal) {
        switch (canal) {
            case 'email':
                window.location.href = 'mailto:contato@menthoria.com?subject=Contato%20Menthoria';
                break;
                
            case 'whatsapp':
                window.open('https://wa.me/5511999999999?text=Olá! Gostaria de mais informações sobre o Menthoria', '_blank');
                break;
                
            case 'telefone':
                window.location.href = 'tel:+551133333333';
                break;
                
            case 'suporte':
                mostrarNotificacao('Sistema de chat em desenvolvimento. Use o WhatsApp para atendimento imediato.', 'info');
                break;
        }
        
        anunciarParaLeitorDeTela(`Abrindo ${canal} para contato`);
    }
}

// Sistema do mapa
function inicializarMapa() {
    const btnMapa = document.getElementById('abrir-mapa');
    
    if (btnMapa) {
        btnMapa.addEventListener('click', function () {
            window.open('https://www.google.com/maps/place/Av.+Paulista,+1000+-+Bela+Vista,+São+Paulo+-+SP,+01310-100', '_blank');
            anunciarParaLeitorDeTela('Abrindo localização no mapa');
        });
    }
}

// Sistema de modal de agendamento (simplificado)
function inicializarModalAgendamento() {
    const btnAgendar = document.getElementById('agendar-demo');
    
    if (btnAgendar) {
        btnAgendar.addEventListener('click', function () {
            mostrarNotificacao('Funcionalidade de agendamento em desenvolvimento. Entre em contato pelo telefone ou e-mail para agendar uma demonstração.', 'info');
            anunciarParaLeitorDeTela('Sistema de agendamento de demonstração');
        });
    }
}

// Acessibilidade
function inicializarAcessibilidadeContact() {
    // Navegação por teclado nos canais de contato
    const canais = document.querySelectorAll('.canal-card');
    
    canais.forEach((canal, index) => {
        canal.setAttribute('tabindex', '0');
        canal.setAttribute('role', 'button');
        
        canal.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const botao = this.querySelector('.btn-canal');
                if (botao) botao.click();
            }
            
            // Navegação com setas
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextCanal = canais[index + 1] || canais[0];
                nextCanal.focus();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevCanal = canais[index - 1] || canais[canais.length - 1];
                prevCanal.focus();
            }
        });
    });
    
    // Navegação no FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((item, index) => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'article');
        
        item.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = this.querySelector('.btn-link');
                if (link) link.click();
            }
        });
    });
}

// Funções auxiliares
function mostrarCarregamentoBotao(botao, texto, loading, carregando) {
    if (carregando) {
        texto.style.display = 'none';
        loading.style.display = 'flex';
        botao.disabled = true;
    } else {
        texto.style.display = 'inline';
        loading.style.display = 'none';
        botao.disabled = false;
    }
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarTelefone(telefone) {
    // Aceita formatos: (11) 99999-9999, 11 99999-9999, 11999999999
    const regex = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/;
    return regex.test(telefone);
}

function simularEnvioFormulario() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simula falhas ocasionais (10% de chance)
            if (Math.random() < 0.1) {
                reject(new Error('Erro de rede simulado'));
            } else {
                resolve();
            }
        }, 1500);
    });
}

function mostrarNotificacao(mensagem, tipo = 'info') {
    // Usar a função de notificação do sistema principal se disponível
    if (typeof showNotification === 'function') {
        showNotification(mensagem, tipo);
    } else {
        // Implementação alternativa simples
        const notificacao = document.createElement('div');
        notificacao.className = `notification notification-${tipo}`;
        notificacao.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${tipo === 'success' ? '#4ECDC4' : tipo === 'error' ? '#FF6B6B' : '#4D96FF'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            max-width: 300px;
        `;
        notificacao.textContent = mensagem;
        
        document.body.appendChild(notificacao);
        
        setTimeout(() => {
            if (notificacao.parentNode) {
                notificacao.parentNode.removeChild(notificacao);
            }
        }, 5000);
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

// Atalhos de teclado globais
document.addEventListener('keydown', function (e) {
    // Ctrl/Cmd + 1 para focar no formulário
    if ((e.ctrlKey || e.metaKey) && e.key === '1') {
        e.preventDefault();
        const primeiroCampo = document.getElementById('nome');
        if (primeiroCampo) primeiroCampo.focus();
    }
    
    // Ctrl/Cmd + 2 para focar nos canais
    if ((e.ctrlKey || e.metaKey) && e.key === '2') {
        e.preventDefault();
        const primeiroCanal = document.querySelector('.canal-card');
        if (primeiroCanal) primeiroCanal.focus();
    }
    
    // Ctrl/Cmd + 3 para abrir mapa
    if ((e.ctrlKey || e.metaKey) && e.key === '3') {
        e.preventDefault();
        const btnMapa = document.getElementById('abrir-mapa');
        if (btnMapa) btnMapa.click();
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