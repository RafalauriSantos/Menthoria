// ===== THEME MANAGEMENT =====
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.querySelector('.mobile-theme');

// Function to set theme
function setTheme(theme) {
    // Remove todas as classes de tema
    document.documentElement.classList.remove('light', 'dark');
    
    // Remove atributos de tema se existirem
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.removeAttribute('data-theme-mode');
    
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.add('light');
    }
    
    localStorage.setItem('menthoria-theme', theme);
    
    // Update toggle position
    updateThemeToggle();
}

// Function to get current theme
function getCurrentTheme() {
    const savedTheme = localStorage.getItem('menthoria-theme');
    if (savedTheme) return savedTheme;
    
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    
    return 'light';
}

// Function to update theme toggle appearance
function updateThemeToggle() {
    const isDark = document.documentElement.classList.contains('dark');
    
    // Update toggle slider position
    const slider = document.querySelector('.theme-toggle-slider');
    if (slider) {
        slider.style.transform = isDark ? 'translateX(1.75rem)' : 'translateX(2px)';
    }
    
    // Update mobile toggle if exists
    const mobileSlider = document.querySelector('.mobile-theme .theme-toggle-slider');
    if (mobileSlider) {
        mobileSlider.style.transform = isDark ? 'translateX(1.75rem)' : 'translateX(2px)';
    }
}

// Function to toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Initialize theme
function initTheme() {
    const theme = getCurrentTheme();
    setTheme(theme);
}

// Garantir que os event listeners existam antes de adicionar
document.addEventListener('DOMContentLoaded', function() {
    // Reatribuir referências após o DOM estar carregado
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.querySelector('.mobile-theme');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }
    
    initTheme();
});

// ===== MOBILE MENU =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

// Toggle mobile menu
function toggleMobileMenu() {
    if (!mobileMenu || !mobileMenuBtn) return;
    
    mobileMenu.classList.toggle('active');
    
    // Toggle icon
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.className = 'fas fa-times';
        document.body.style.overflow = 'hidden';
    } else {
        icon.className = 'fas fa-bars';
        document.body.style.overflow = '';
    }
}

// Event listener para mobile menu
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

// Fechar mobile menu ao clicar em um link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});