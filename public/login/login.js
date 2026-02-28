/**
 * Menthoria - Login
 * Sistema de autenticação e cadastro
 * @version 2.0.0
 */

// ===== VARIÁVEIS DE ESTADO =====
let tipoUsuarioAtual = 'professor';

// ===== CACHE DE ELEMENTOS DOM =====
let DOM = {};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function () {
    inicializarElementos();
    inicializarListeners();
    inicializarTema();
    verificarHashURL();
    atualizarAnoFooter();
    
    // Inicialização sem logs em produção
});

// Inicializa os elementos DOM
function inicializarElementos() {
    DOM = {
        // Containers
        loginContainer: document.getElementById('login-container'),
        signupContainer: document.getElementById('signup-container'),
        
        // Formulários
        loginForm: document.getElementById('login-form'),
        signupForm: document.getElementById('signup-form'),
        
        // Campos
        emailLogin: document.getElementById('email'),
        passwordLogin: document.getElementById('password'),
        signupName: document.getElementById('signup-name'),
        signupEmail: document.getElementById('signup-email'),
        signupPassword: document.getElementById('signup-password'),
        accessCode: document.getElementById('access-code'),
        termsCheckbox: document.getElementById('terms'),
        
        // Botões
        passwordToggles: document.querySelectorAll('.password-toggle'),
        userTypeBtns: document.querySelectorAll('.user-type-btn'),
        showSignupBtn: document.getElementById('show-signup'),
        showLoginBtn: document.getElementById('show-login'),
        
        // Força da senha
        strengthFill: document.querySelector('.strength-fill'),
        strengthText: document.querySelector('.strength-text'),
        
        // Grupo de código de acesso
        accessCodeGroup: document.getElementById('access-code-group'),
        
        // Ano do footer
        yearElement: document.getElementById('currentYear')
    };
}

// ===== LISTENERS DE EVENTOS =====
function inicializarListeners() {
    // Submissão dos formulários
    if (DOM.loginForm) {
        DOM.loginForm.addEventListener('submit', lidarComLogin);
    }

    if (DOM.signupForm) {
        DOM.signupForm.addEventListener('submit', lidarComCadastro);
    }

    // Botões para alternar visibilidade da senha
    DOM.passwordToggles.forEach(btn => {
        btn.addEventListener('click', alternarVisibilidadeSenha);
    });

    // Seleção do tipo de usuário
    DOM.userTypeBtns.forEach(btn => {
        btn.addEventListener('click', selecionarTipoUsuario);
    });

    // Verificador de força da senha
    if (DOM.signupPassword) {
        DOM.signupPassword.addEventListener('input', verificarForcaSenha);
    }

    // Validação em tempo real
    const camposInput = document.querySelectorAll('.form-input');
    camposInput.forEach(input => {
        // Marca campo como 'tocado' quando usuário digitar
        input.addEventListener('input', function() {
            input.dataset.touched = 'true';
            limparErroDoCampo({ target: input });
        });
        
        // Só valida se o usuário já interagiu com o campo
        input.addEventListener('blur', function(e) {
            if (e.target.dataset.touched === 'true') {
                validarCampo(e);
            }
        });
    });

    // Links para alternar entre formulários
    if (DOM.showSignupBtn) {
        DOM.showSignupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            mostrarFormularioCadastro();
        });
    }
    
    if (DOM.showLoginBtn) {
        DOM.showLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            mostrarFormularioLogin();
        });
    }

    // Atalhos de teclado
    document.addEventListener('keydown', lidarComAtalhosTeclado);
}

// ===== FUNÇÕES DE ALTERNÂNCIA DE FORMULÁRIOS =====
function mostrarFormularioLogin() {
    if (DOM.loginContainer && DOM.signupContainer) {
        DOM.loginContainer.style.display = 'block';
        DOM.signupContainer.style.display = 'none';
        
        // Atualiza URL
        history.pushState(null, '', window.location.pathname);
        
        // Foca no primeiro campo
        setTimeout(() => {
            const primeiroCampo = DOM.loginContainer.querySelector('.form-input');
            if (primeiroCampo) primeiroCampo.focus();
        }, 100);
        
        anunciarParaLeitorDeTela('Formulário de login carregado');
    }
}

function mostrarFormularioCadastro() {
    if (DOM.loginContainer && DOM.signupContainer) {
        DOM.loginContainer.style.display = 'none';
        DOM.signupContainer.style.display = 'block';
        
        // Atualiza URL
        history.pushState(null, '', '#signup');
        
        // Foca no primeiro campo
        setTimeout(() => {
            const primeiroCampo = DOM.signupContainer.querySelector('.form-input');
            if (primeiroCampo) primeiroCampo.focus();
        }, 100);
        
        anunciarParaLeitorDeTela('Formulário de cadastro carregado');
    }
}

// Verifica hash na URL para mostrar formulário correto
function verificarHashURL() {
    if (window.location.hash === '#signup') {
        mostrarFormularioCadastro();
    } else {
        mostrarFormularioLogin();
    }
}

// ===== FUNÇÕES DE TEMA =====
function inicializarTema() {
    // Usa o tema do sistema global do Menthoria
    if (window.MenthoriaApp && window.MenthoriaApp.alternarTema) {
        // Tema integrado com MenthoriaApp
    }
}

// ===== FUNÇÕES DE VISIBILIDADE DA SENHA =====
function alternarVisibilidadeSenha(evento) {
    const botao = evento.currentTarget;
    const input = botao.parentNode.querySelector('input');
    const icone = botao.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        botao.setAttribute('aria-label', 'Ocultar senha');
    } else {
        input.type = 'password';
        botao.setAttribute('aria-label', 'Mostrar senha');
    }
}

// ===== FUNÇÕES DE TIPO DE USUÁRIO =====
function selecionarTipoUsuario(evento) {
    const botao = evento.currentTarget;
    const tipo = botao.dataset.type;

    // Atualiza o estado ativo
    DOM.userTypeBtns.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    
    botao.classList.add('active');
    botao.setAttribute('aria-pressed', 'true');

    // Atualiza o tipo de usuário atual
    tipoUsuarioAtual = tipo;

    // Mostra/esconde o campo de código de acesso
    if (DOM.accessCodeGroup) {
        if (tipo === 'family') {
            DOM.accessCodeGroup.style.display = 'block';
            if (DOM.accessCode) DOM.accessCode.required = true;
        } else {
            DOM.accessCodeGroup.style.display = 'none';
            if (DOM.accessCode) DOM.accessCode.required = false;
        }
    }

    // Anuncia a mudança
    const nomeTipo = tipo === 'professor' ? 'Professor/Agente' : 'Família';
    anunciarParaLeitorDeTela(`Tipo de usuário selecionado: ${nomeTipo}`);
}

// ===== FUNÇÕES DE FORÇA DA SENHA =====
function verificarForcaSenha(evento) {
    const senha = evento.target.value;
    const resultado = calcularForcaSenha(senha);

    if (DOM.strengthFill && DOM.strengthText) {
        // Remove todas as classes de força
        DOM.strengthFill.classList.remove('weak', 'fair', 'good', 'strong');
        
        // Adiciona a classe correspondente
        if (senha.length > 0) {
            DOM.strengthFill.classList.add(resultado.nivel);
        }
        
        DOM.strengthText.textContent = senha.length > 0 
            ? `Força da senha: ${resultado.texto}`
            : 'Força da senha';
    }

    // Atualiza acessibilidade
    evento.target.setAttribute('aria-describedby', 'password-strength');
}

function calcularForcaSenha(senha) {
    let pontuacao = 0;

    if (senha.length >= 8) pontuacao += 1;
    if (/[a-z]/.test(senha)) pontuacao += 1;
    if (/[A-Z]/.test(senha)) pontuacao += 1;
    if (/[0-9]/.test(senha)) pontuacao += 1;
    if (/[^A-Za-z0-9]/.test(senha)) pontuacao += 1;

    const niveis = [
        { nivel: 'weak', texto: 'Fraca' },
        { nivel: 'weak', texto: 'Fraca' },
        { nivel: 'fair', texto: 'Regular' },
        { nivel: 'good', texto: 'Boa' },
        { nivel: 'strong', texto: 'Forte' }
    ];

    return niveis[Math.min(pontuacao, 4)];
}

// ===== FUNÇÕES DE VALIDAÇÃO =====
function validarCampo(evento) {
    const input = evento.target;
    const valor = input.value.trim();
    let valido = true;
    let mensagem = '';

    // Limpa erros anteriores
    limparErroDoCampo(evento);

    // Validação de campo obrigatório
    if (input.required && !valor) {
        valido = false;
        mensagem = 'Este campo é obrigatório';
    }

    // Validação de e-mail
    else if (input.type === 'email' && valor) {
        if (!validarEmail(valor)) {
            valido = false;
            mensagem = 'Digite um e-mail válido';
        }
    }

    // Validação de senha
    else if (input.type === 'password' && valor) {
        if (valor.length < 8) {
            valido = false;
            mensagem = 'A senha deve ter pelo menos 8 caracteres';
        }
    }

    // Validação de nome
    else if (input.name === 'name' && valor) {
        if (valor.length < 2) {
            valido = false;
            mensagem = 'O nome deve ter pelo menos 2 caracteres';
        }
    }

    if (!valido) {
        mostrarErroDoCampo(input, mensagem);
    }

    return valido;
}

function mostrarErroDoCampo(input, mensagem) {
    input.classList.add('error');
    input.setAttribute('aria-invalid', 'true');

    // Cria ou atualiza a mensagem de erro
    let elementoErro = input.parentNode.querySelector('.error-message');
    if (!elementoErro) {
        elementoErro = document.createElement('div');
        elementoErro.className = 'error-message';
        input.parentNode.appendChild(elementoErro);
    }

    elementoErro.textContent = mensagem;
    elementoErro.id = `error-${input.name || Math.random()}`;
    elementoErro.setAttribute('role', 'alert');
    input.setAttribute('aria-describedby', elementoErro.id);

    // Move foco para o input com erro
    try { input.focus(); } catch (e) {}

    // Anúncio para leitores de tela (persistente)
    const announcer = document.getElementById('login-announcer');
    if (announcer) announcer.textContent = `Erro: ${mensagem}`;
}

function limparErroDoCampo(evento) {
    const input = evento.target;
    input.classList.remove('error');
    input.removeAttribute('aria-invalid');

    const elementoErro = input.parentNode.querySelector('.error-message');
    if (elementoErro) {
        elementoErro.remove();
    }

    input.removeAttribute('aria-describedby');
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ===== FUNÇÕES DE SUBMISSÃO =====
async function lidarComLogin(evento) {
    evento.preventDefault();

    // Previne múltiplos envios
    const botaoEnviar = evento.target.querySelector('button[type="submit"]');
    if (botaoEnviar && botaoEnviar.disabled) return;

    // Valida todos os campos
    const campos = evento.target.querySelectorAll('.form-input');
    let valido = true;

    campos.forEach(input => {
        if (!validarCampo({ target: input })) {
            valido = false;
        }
    });

    if (!valido) {
        const primeiroErro = evento.target.querySelector('.form-input.error');
        if (primeiroErro) primeiroErro.focus();
        return;
    }

    // Mostra estado de carregamento
    mostrarCarregamentoBotao(botaoEnviar, true);
    botaoEnviar.setAttribute('aria-busy', 'true');

    try {
        // Simula chamada de API
        await simularChamadaApi(1500);

        // Sucesso
        mostrarNotificacao('Login realizado com sucesso! Redirecionando...', 'success');
        anunciarParaLeitorDeTela('Login realizado com sucesso');

        // Simula redirecionamento
        setTimeout(() => {
            window.location.href = '../dashboard/dashboard.html'; // Ajuste conforme sua estrutura
        }, 1500);

    } catch (erro) {
        // Log condicionado a ambiente dev
        if (location.hostname === 'localhost') console.error('Erro de login:', erro);
        mostrarErroDoFormulario(evento.target, 'E-mail ou senha incorretos. Tente novamente.');
        const announcer = document.getElementById('login-announcer');
        if (announcer) announcer.textContent = 'Erro ao fazer login';
    } finally {
        mostrarCarregamentoBotao(botaoEnviar, false);
        botaoEnviar.removeAttribute('aria-busy');
    }
}

async function lidarComCadastro(evento) {
    evento.preventDefault();

    // Valida campos
    const campos = evento.target.querySelectorAll('.form-input');
    let valido = true;

    campos.forEach(input => {
        if (!validarCampo({ target: input })) {
            valido = false;
        }
    });

    // Verifica termos
    if (DOM.termsCheckbox && !DOM.termsCheckbox.checked) {
        valido = false;
        mostrarErroDoCampo(DOM.termsCheckbox, 'Você deve aceitar os termos de uso');
    }

    if (!valido) {
        const primeiroErro = evento.target.querySelector('.form-input.error, input.error');
        if (primeiroErro) primeiroErro.focus();
        return;
    }

    // Mostra carregamento
    const botaoEnviar = evento.target.querySelector('button[type="submit"]');
    if (botaoEnviar && botaoEnviar.disabled) return;
    mostrarCarregamentoBotao(botaoEnviar, true);
    botaoEnviar.setAttribute('aria-busy', 'true');

    try {
        await simularChamadaApi(2000);

        mostrarNotificacao('Conta criada com sucesso! Faça login para continuar.', 'success');
        anunciarParaLeitorDeTela('Conta criada com sucesso');

        // Volta para o login
        setTimeout(() => {
            mostrarFormularioLogin();
        }, 2000);

    } catch (erro) {
        if (location.hostname === 'localhost') console.error('Erro de cadastro:', erro);
        mostrarErroDoFormulario(evento.target, 'Erro ao criar conta. Tente novamente.');
        const announcer = document.getElementById('login-announcer');
        if (announcer) announcer.textContent = 'Erro ao criar conta';
    } finally {
        mostrarCarregamentoBotao(botaoEnviar, false);
        if (botaoEnviar) botaoEnviar.removeAttribute('aria-busy');
    }
}

// ===== FUNÇÕES AUXILIARES =====
function mostrarCarregamentoBotao(botao, carregando) {
    const spanTexto = botao.querySelector('.btn-text');
    const spanCarregamento = botao.querySelector('.btn-loading');

    if (carregando) {
        spanTexto.style.display = 'none';
        spanCarregamento.style.display = 'inline-flex';
        botao.disabled = true;
        botao.setAttribute('aria-disabled', 'true');
    } else {
        spanTexto.style.display = 'inline';
        spanCarregamento.style.display = 'none';
        botao.disabled = false;
        botao.removeAttribute('aria-disabled');
    }
}

function mostrarErroDoFormulario(formulario, mensagem) {
    // Remove erros existentes
    const erroExistente = formulario.querySelector('.form-error');
    if (erroExistente) erroExistente.remove();

    // Cria nova mensagem
    const divErro = document.createElement('div');
    divErro.className = 'form-error';
    divErro.setAttribute('role', 'alert');
    divErro.innerHTML = `
        <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" style="margin-right:.5rem;vertical-align:middle"><path fill="currentColor" d="M11.001 10h2v5h-2zM12 17a1.25 1.25 0 110 2.5A1.25 1.25 0 0112 17z"/></svg>
        <span>${mensagem}</span>
    `;

    formulario.insertBefore(divErro, formulario.firstChild);

    // Remove após 5 segundos
    setTimeout(() => {
        if (divErro.parentNode) divErro.remove();
    }, 5000);
}

function mostrarNotificacao(mensagem, tipo = 'info') {
    // Tenta usar a notificação global do Menthoria
    if (window.MenthoriaApp && window.MenthoriaApp.mostrarNotificacao) {
        window.MenthoriaApp.mostrarNotificacao(mensagem, tipo);
        return;
    }

    // Fallback: notificação própria
    const notificacao = document.createElement('div');
    notificacao.className = `notification-login notification-${tipo}`;
    notificacao.setAttribute('role', 'alert');
    const iconSvg = tipo === 'success'
        ? '<svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" style="margin-right:.5rem;vertical-align:middle"><path fill="currentColor" d="M9.3 16.3L4.7 11.7 3.3 13.1 9.3 19.1 21 7.4 19.6 6z"></path></svg>'
        : '<svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" style="margin-right:.5rem;vertical-align:middle"><path fill="currentColor" d="M11 15h2v2h-2zm0-8h2v6h-2z"/><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path></svg>';

    notificacao.innerHTML = `${iconSvg}<span>${mensagem}</span>`;

    document.body.appendChild(notificacao);

    setTimeout(() => {
        notificacao.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            if (notificacao.parentNode) notificacao.remove();
        }, 300);
    }, 4500);
}

function simularChamadaApi(atraso = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, atraso);
    });
}

function anunciarParaLeitorDeTela(mensagem) {
    // Use announcer region if present, fallback to dynamic element
    const announcer = document.getElementById('login-announcer');
    if (announcer) {
        announcer.textContent = mensagem;
        return;
    }

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
        if (anuncio.parentNode) anuncio.remove();
    }, 1000);
}

function atualizarAnoFooter() {
    if (DOM.yearElement) {
        DOM.yearElement.textContent = new Date().getFullYear();
    }
}

function lidarComAtalhosTeclado(evento) {
    // Ctrl/Cmd + Enter para submeter
    if ((evento.ctrlKey || evento.metaKey) && evento.key === 'Enter') {
        const formularioAtivo = document.querySelector('form:not([style*="display: none"])');
        if (formularioAtivo) {
            const botaoEnviar = formularioAtivo.querySelector('button[type="submit"]');
            if (botaoEnviar && !botaoEnviar.disabled) {
                botaoEnviar.click();
            }
        }
    }

    // Alt + L - Login
    if (evento.altKey && evento.key === 'l') {
        evento.preventDefault();
        mostrarFormularioLogin();
    }

    // Alt + S - Signup
    if (evento.altKey && evento.key === 's') {
        evento.preventDefault();
        mostrarFormularioCadastro();
    }

    // Alt + T - Toggle theme (já existe no index.js)
}

// ===== API PÚBLICA =====
window.LoginApp = {
    mostrarFormularioLogin,
    mostrarFormularioCadastro,
    alternarVisibilidadeSenha,
    selecionarTipoUsuario,
    lidarComLogin,
    lidarComCadastro
};