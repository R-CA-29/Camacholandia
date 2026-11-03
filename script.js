// ============ NAVBAR SCROLL EFFECT ============
const navbar = document.getElementById('navbar');
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    if (window.scrollY > 500) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

// ============ SCROLL TO TOP ============
scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============ MOBILE MENU ============
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
    });
});

// ============ COPIAR IP ============
function setupCopyButton(btnId, ipId) {
    const btn = document.getElementById(btnId);
    const ipEl = document.getElementById(ipId);
    
    if (!btn || !ipEl) return;
    
    btn.addEventListener('click', async () => {
        const ip = ipEl.textContent.trim();
        try {
            await navigator.clipboard.writeText(ip);
            const icon = btn.querySelector('i');
            const originalText = btn.innerHTML;
            
            btn.classList.add('copied');
            btn.innerHTML = '<i class="fa-solid fa-check"></i> COPIADO';
            
            setTimeout(() => {
                btn.classList.remove('copied');
                btn.innerHTML = originalText;
            }, 2000);
        } catch (err) {
            console.error('Error al copiar:', err);
            alert('IP: ' + ip);
        }
    });
}

setupCopyButton('copyBtn', 'server-ip');
setupCopyButton('copyBtn2', 'server-ip-2');

// ============ PARTÍCULAS FLOTANTES ============
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        
        // Colores variados
        const colors = ['#4ade80', '#a855f7', '#fbbf24', '#ec4899'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
        
        container.appendChild(particle);
    }
}

createParticles();

// ============ REVEAL ON SCROLL ============
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ============ CONTADOR ANIMADO ============
const statNumbers = document.querySelectorAll('.stat-number[data-target]');

const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            countObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => countObserver.observe(el));

function animateCounter(element, target) {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (target >= 100 ? '+' : '');
    }, 16);
}

// ============ SMOOTH SCROLL PARA LINKS ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============ EFECTO PARALLAX SUAVE EN HERO ============
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    if (hero && heroContent) {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
        }
    }
});

// ============ EFECTO TILT EN TARJETAS ============
const cards = document.querySelectorAll('.mode-card, .staff-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ============ MENSAJE EN CONSOLA ============
console.log('%c⛏️ CamachoLandia - Máquinas y Dragones ⚔️', 
    'background: linear-gradient(135deg, #4ade80, #a855f7); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px;');
console.log('%c¡Bienvenido al código del servidor!', 
    'color: #4ade80; font-size: 14px; font-weight: bold;');