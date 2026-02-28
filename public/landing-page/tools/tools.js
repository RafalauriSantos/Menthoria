// Dados das funcionalidades - versão roxo educacional
const FUNCIONALIDADES_DETALHES = {
    'gestao-grupos': {
        titulo: 'Gestão de Grupos',
        icone: 'users',
        descricao: 'Organize alunos por turmas e escolas de forma intuitiva, facilitando o acompanhamento individualizado e a gestão educacional inclusiva.',
        caracteristicas: [
            'Criação e gerenciamento de turmas ilimitadas',
            'Organização hierárquica por escolas e unidades',
            'Perfis individuais detalhados de alunos',
            'Filtros avançados por características específicas',
            'Atribuição de múltiplos professores por turma',
            'Importação em massa de dados'
        ],
        beneficios: [
            'Redução de 60% no tempo de organização administrativa',
            'Visão completa do contexto educacional',
            'Facilidade na organização de atividades',
            'Acompanhamento personalizado por aluno',
            'Compartilhamento seguro de informações',
            'Relatórios automáticos por grupo'
        ]
    },
    'relatorios-detalhados': {
        titulo: 'Relatórios Detalhados',
        icone: 'file-alt',
        descricao: 'Crie relatórios de progresso completos com texto, fotos e anexos, documentando cada conquista do aluno de forma estruturada e acessível.',
        caracteristicas: [
            'Modelos personalizáveis de relatórios',
            'Inclusão de mídia (fotos, vídeos, áudios)',
            'Marcadores visuais de progresso',
            'Exportação em múltiplos formatos (PDF, Word, CSV)',
            'Assinatura digital para validação',
            'Histórico completo de versões'
        ],
        beneficios: [
            'Documentação completa do desenvolvimento',
            'Facilidade na comunicação com famílias',
            'Base de dados para tomada de decisões',
            'Registro histórico do progresso',
            'Otimização de reuniões pedagógicas',
            'Conformidade com requisitos legais'
        ]
    },
    'acesso-familias': {
        titulo: 'Acesso Seguro para Famílias',
        icone: 'shield-alt',
        descricao: 'Famílias podem acompanhar o progresso de seus filhos através de acesso controlado e seguro, promovendo a transparência e participação ativa.',
        caracteristicas: [
            'Portal familiar dedicado e intuitivo',
            'Controle granular de permissões',
            'Sistema de comunicação seguro',
            'Notificações em tempo real (push, email, SMS)',
            'Acesso via dispositivos móveis',
            'Autenticação de dois fatores'
        ],
        beneficios: [
            'Fortalecimento da parceria escola-família',
            'Transparência no processo educacional',
            'Participação ativa das famílias',
            'Segurança total dos dados (LGPD)',
            'Comunicação eficiente e organizada',
            'Redução de reuniões presenciais'
        ]
    },
    'acessibilidade-total': {
        titulo: 'Acessibilidade Total',
        icone: 'universal-access',
        descricao: 'Interface otimizada para leitores de tela, alto contraste e navegação por teclado, garantindo acesso universal a todos os usuários.',
        caracteristicas: [
            'Compatibilidade total com leitores de tela (NVDA, JAWS)',
            'Modo alto contraste ajustável',
            'Navegação completa por teclado',
            'Texto aumentável sem quebrar layout',
            'Alternativas textuais para toda mídia',
            'Tradutor para Libras integrado'
        ],
        beneficios: [
            'Inclusão digital de todos os usuários',
            'Experiência consistente em diferentes dispositivos',
            'Conformidade com WCAG 2.1 nível AA',
            'Facilidade de uso para pessoas com deficiência',
            'Interface adaptável às necessidades individuais',
            'Certificação de acessibilidade'
        ]
    },
    'galeria-momentos': {
        titulo: 'Galeria de Momentos',
        icone: 'camera',
        descricao: 'Capture e organize fotos das atividades e conquistas dos alunos, criando um portfólio visual do desenvolvimento educacional.',
        caracteristicas: [
            'Upload de fotos e vídeos com compressão inteligente',
            'Organização por data, aluno e atividade',
            'Compartilhamento controlado com famílias',
            'Marcadores de progresso visual',
            'Armazenamento em nuvem seguro',
            'Criação automática de linhas do tempo'
        ],
        beneficios: [
            'Registro visual do desenvolvimento',
            'Fortalecimento da memória afetiva',
            'Facilidade na documentação pedagógica',
            'Compartilhamento positivo com famílias',
            'Base para avaliações qualitativas',
            'Portfólio digital permanente'
        ]
    },
    'exportacao-dados': {
        titulo: 'Exportação de Dados',
        icone: 'download',
        descricao: 'Exporte relatórios completos em PDF para compartilhar com equipes multidisciplinares e famílias, mantendo a segurança e formatação adequada.',
        caracteristicas: [
            'Formato PDF personalizável e acessível',
            'Estruturação inteligente de dados',
            'Suporte a múltiplos idiomas',
            'Compartilhamento seguro por link',
            'Marca d\'água de confidencialidade',
            'Exportação em lote'
        ],
        beneficios: [
            'Facilidade no compartilhamento de informações',
            'Padronização de documentos',
            'Otimização de processos burocráticos',
            'Segurança na troca de dados sensíveis',
            'Compatibilidade com outros sistemas',
            'Redução de custos com impressão'
        ]
    },
    'planejamento-aulas': {
        titulo: 'Planejamento de Aulas',
        icone: 'calendar-alt',
        descricao: 'Crie e organize planos de aula adaptados para educação inclusiva, com recursos específicos para diferentes necessidades educacionais.',
        caracteristicas: [
            'Modelos de planos de aula inclusivos',
            'Adaptações por tipo de necessidade',
            'Integração de recursos multimídia',
            'Calendário escolar integrado',
            'Lembretes e notificações automáticas',
            'Biblioteca de atividades colaborativa'
        ],
        beneficios: [
            'Otimização do tempo de planejamento',
            'Personalização para cada aluno',
            'Organização do ano letivo',
            'Facilidade na adaptação curricular',
            'Registro histórico de planejamentos',
            'Compartilhamento entre professores'
        ]
    },
    'avaliacoes-personalizadas': {
        titulo: 'Avaliações Personalizadas',
        icone: 'chart-bar',
        descricao: 'Crie avaliações adaptadas às necessidades específicas de cada aluno, com métricas de progresso detalhadas e relatórios automáticos.',
        caracteristicas: [
            'Modelos de avaliação adaptáveis',
            'Métricas personalizáveis por habilidade',
            'Gráficos interativos de progresso',
            'Comparação temporal de resultados',
            'Relatórios automáticos de evolução',
            'Análise preditiva de desempenho'
        ],
        beneficios: [
            'Avaliação justa e personalizada',
            'Identificação precisa de necessidades',
            'Monitoramento contínuo do progresso',
            'Base data-driven para intervenções',
            'Otimização do processo avaliativo',
            'Feedback imediato para alunos e famílias'
        ]
    }
};

// Estado da aplicação
const AppState = {
    modalAberto: false,
    categoriaAtual: 'todas',
    elementoFocadoAntesModal: null
};

// Cache de elementos DOM
let DOM = {};

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function () {
    inicializarElementosDOM();
    inicializarFerramentas();
    inicializarFiltros();
    inicializarModal();
    inicializarEventos();
    inicializarAcessibilidade();
    atualizarAnoFooter();
    
    console.log('🔧 Sistema de ferramentas Menthoria v2.1.1 inicializado');
});

// Inicializa os elementos DOM em cache
function inicializarElementosDOM() {
    DOM = {
        modal: document.getElementById('modal-detalhes'),
        modalTitulo: document.getElementById('modal-titulo'),
        modalCorpo: document.getElementById('modal-corpo'),
        modalFechar: document.getElementById('modal-fechar'),
        funcionalidadesGrid: document.getElementById('funcionalidades-grid'),
        emptyState: document.getElementById('funcionalidades-empty'),
        limparFiltrosBtn: document.getElementById('limpar-filtros'),
        filtroBtns: document.querySelectorAll('.filtro-btn'),
        botoesDetalhes: document.querySelectorAll('.btn-detalhes'),
        scrollToToolsBtn: document.querySelector('.scroll-to-tools'),
        header: document.getElementById('header'),
        yearElement: document.getElementById('currentYear')
    };
}

// Inicializa o sistema de ferramentas
function inicializarFerramentas() {
    // Adiciona animação de entrada escalonada para os cards
    const cards = document.querySelectorAll('.tool-card');
    cards.forEach((card, index) => {
        card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
        card.style.opacity = '0';
    });
}

// Sistema de filtros
function inicializarFiltros() {
    if (!DOM.filtroBtns.length) return;

    DOM.filtroBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const categoria = this.dataset.categoria;
            aplicarFiltro(categoria);
            
            // Atualiza ARIA
            DOM.filtroBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            AppState.categoriaAtual = categoria;
        });
    });

    // Limpar filtros
    if (DOM.limparFiltrosBtn) {
        DOM.limparFiltrosBtn.addEventListener('click', function () {
            const btnTodas = document.querySelector('.filtro-btn[data-categoria="todas"]');
            if (btnTodas) {
                btnTodas.click();
            }
        });
    }
}

// Aplica o filtro de categoria
function aplicarFiltro(categoria) {
    if (!DOM.funcionalidadesGrid) return;
    
    const cards = DOM.funcionalidadesGrid.querySelectorAll('.tool-card');
    let visibleCount = 0;

    cards.forEach(card => {
        if (categoria === 'todas' || card.dataset.categoria === categoria) {
            card.style.display = 'flex';
            visibleCount++;
            card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });

    // Mostra/oculta estado vazio
    if (visibleCount === 0) {
        if (DOM.emptyState) {
            DOM.emptyState.style.display = 'block';
        }
        if (DOM.funcionalidadesGrid) {
            DOM.funcionalidadesGrid.style.display = 'none';
        }
    } else {
        if (DOM.emptyState) {
            DOM.emptyState.style.display = 'none';
        }
        if (DOM.funcionalidadesGrid) {
            DOM.funcionalidadesGrid.style.display = 'grid';
        }
    }

    // Anuncia mudança para leitores de tela
    anunciarParaLeitorDeTela(`${visibleCount} funcionalidades encontradas`);
}

// Sistema de modal
function inicializarModal() {
    if (!DOM.modal) return;

    // Abrir modal via botões de detalhes
    if (DOM.botoesDetalhes.length) {
        DOM.botoesDetalhes.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const funcionalidadeId = this.dataset.funcionalidade;
                abrirModal(funcionalidadeId);
            });
        });
    }

    // Fechar modal
    if (DOM.modalFechar) {
        DOM.modalFechar.addEventListener('click', fecharModal);
    }

    // Fechar ao clicar no overlay
    const modalOverlay = DOM.modal.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', fecharModal);
    }

    // Fechar com ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && AppState.modalAberto) {
            fecharModal();
        }
    });
}

// Abre o modal com detalhes da funcionalidade
function abrirModal(funcionalidadeId) {
    const dados = FUNCIONALIDADES_DETALHES[funcionalidadeId];
    
    if (!dados) {
        console.error('❌ Funcionalidade não encontrada:', funcionalidadeId);
        return;
    }

    // Salva elemento focado para retornar depois
    AppState.elementoFocadoAntesModal = document.activeElement;
    AppState.modalAberto = true;

    // Atualiza conteúdo do modal
    if (DOM.modalTitulo) {
        DOM.modalTitulo.textContent = dados.titulo;
    }
    
    if (DOM.modalCorpo) {
        DOM.modalCorpo.innerHTML = criarConteudoModal(dados);
    }

    // Abre modal
    DOM.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Foca no botão de fechar
    setTimeout(() => {
        if (DOM.modalFechar) {
            DOM.modalFechar.focus();
        }
    }, 150);

    anunciarParaLeitorDeTela(`Modal aberto: ${dados.titulo}`);
}

// Fecha o modal
function fecharModal() {
    if (!DOM.modal) return;
    
    DOM.modal.setAttribute('aria-hidden', 'true');
    AppState.modalAberto = false;
    document.body.style.overflow = '';

    // Retorna foco ao elemento que abriu o modal
    if (AppState.elementoFocadoAntesModal) {
        setTimeout(() => {
            AppState.elementoFocadoAntesModal.focus();
        }, 150);
    }

    anunciarParaLeitorDeTela('Modal fechado');
}

// Cria o conteúdo HTML do modal
function criarConteudoModal(dados) {
    return `
        <div class="modal-detalhes">
            <div class="modal-icon">
                <i class="fas fa-${dados.icone}" aria-hidden="true"></i>
            </div>
            
            <div class="modal-descricao">
                <p>${dados.descricao}</p>
            </div>
            
            <div class="modal-caracteristicas">
                <h4>Características Principais</h4>
                <ul>
                    ${dados.caracteristicas.map(carac => `<li>${carac}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-beneficios">
                <h4>Benefícios</h4>
                <ul>
                    ${dados.beneficios.map(beneficio => `<li>${beneficio}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-acoes">
                <button class="btn btn-primary" onclick="FerramentasApp.experimentarFuncionalidade('${dados.titulo}')">
                    <i class="fas fa-play-circle" aria-hidden="true"></i>
                    Experimentar
                </button>
                <button class="btn btn-outline" onclick="FerramentasApp.fecharModal()">
                    Fechar
                </button>
            </div>
        </div>
    `;
}

// Função para experimentar funcionalidade (versão demo)
function experimentarFuncionalidade(nome) {
    fecharModal();
    
    // Criar overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-demo-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        backdrop-filter: blur(3px);
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    `;
    
    // Criar modal de demonstração
    const modalDemo = document.createElement('div');
    modalDemo.className = 'modal-demo';
    modalDemo.setAttribute('role', 'dialog');
    modalDemo.setAttribute('aria-modal', 'true');
    modalDemo.setAttribute('aria-labelledby', 'demo-titulo');
    modalDemo.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: hsl(var(--card));
        padding: 2rem;
        border-radius: var(--radius);
        box-shadow: var(--shadow-2xl);
        z-index: 10000;
        max-width: 400px;
        width: 90%;
        text-align: center;
        border: 1px solid hsl(var(--border));
        animation: modalDemoIn 0.3s ease forwards;
    `;
    
    modalDemo.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            <i class="fas fa-${getIconePorNome(nome)}" style="font-size: 3rem; color: hsl(var(--primary));"></i>
        </div>
        <h3 id="demo-titulo" style="margin-bottom: 1rem; color: hsl(var(--foreground));">✨ Demonstração</h3>
        <p style="margin-bottom: 1.5rem; color: hsl(var(--muted-foreground));">
            Funcionalidade <strong>"${nome}"</strong> em breve disponível para teste!
        </p>
        <p style="margin-bottom: 1.5rem; font-size: 0.9rem; color: hsl(var(--muted-foreground));">
            Enquanto isso, explore os detalhes completos da ferramenta.
        </p>
        <button class="btn btn-primary" id="fechar-demo">
            Entendi
        </button>
    `;
    
    // Função para fechar
    const fecharDemo = () => {
        overlay.remove();
        modalDemo.remove();
        // Retornar foco para o botão que abriu
        if (AppState.elementoFocadoAntesModal) {
            AppState.elementoFocadoAntesModal.focus();
        }
    };
    
    // Event listeners
    overlay.addEventListener('click', fecharDemo);
    modalDemo.querySelector('#fechar-demo').addEventListener('click', fecharDemo);
    
    // Fechar com ESC
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            fecharDemo();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
    
    document.body.appendChild(overlay);
    document.body.appendChild(modalDemo);
    
    // Foco no botão
    setTimeout(() => {
        modalDemo.querySelector('#fechar-demo').focus();
    }, 100);
    
    anunciarParaLeitorDeTela(`Demonstração da funcionalidade ${nome} aberta`);
}

// Função auxiliar para mapear ícones
function getIconePorNome(nome) {
    const icones = {
        'Gestão de Grupos': 'users',
        'Relatórios Detalhados': 'file-alt',
        'Acesso Seguro para Famílias': 'shield-alt',
        'Acessibilidade Total': 'universal-access',
        'Galeria de Momentos': 'camera',
        'Exportação de Dados': 'download',
        'Planejamento de Aulas': 'calendar-alt',
        'Avaliações Personalizadas': 'chart-bar'
    };
    return icones[nome] || 'rocket';
}

// Inicializa eventos gerais
function inicializarEventos() {
    // Scroll suave para ferramentas
    if (DOM.scrollToToolsBtn) {
        DOM.scrollToToolsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            scrollParaTools();
        });
    }

    // Atualizar ano no footer
    atualizarAnoFooter();
}

// Scroll suave para seção de ferramentas
function scrollParaTools() {
    const toolsSection = document.getElementById('tools');
    if (toolsSection && DOM.header) {
        const headerHeight = DOM.header.offsetHeight;
        const targetPosition = toolsSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Foco na seção após scroll
        setTimeout(() => {
            toolsSection.setAttribute('tabindex', '-1');
            toolsSection.focus();
        }, 500);
    }
}

// Atualiza o ano no footer
function atualizarAnoFooter() {
    if (DOM.yearElement) {
        DOM.yearElement.textContent = new Date().getFullYear();
    }
}

// Função auxiliar para anunciar para leitores de tela
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

// API pública
window.FerramentasApp = {
    abrirModal: (id) => {
        if (id && FUNCIONALIDADES_DETALHES[id]) {
            abrirModal(id);
        }
    },
    fecharModal: () => {
        fecharModal();
    },
    filtrarPorCategoria: (categoria) => {
        if (categoria) {
            const btn = document.querySelector(`.filtro-btn[data-categoria="${categoria}"]`);
            if (btn) btn.click();
        }
    },
    experimentarFuncionalidade: (nome) => {
        experimentarFuncionalidade(nome);
    },
    scrollParaTools: () => {
        scrollParaTools();
    }
};