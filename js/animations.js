// ARASAKA Animation System

class AnimationSystem {
    constructor() {
        this.animationQueue = [];
        this.isAnimating = false;
        this.particleSystems = [];
        this.glitchEffects = [];
        
        this.init();
    }

    init() {
        this.setupParticleSystem();
        this.setupGlitchEffects();
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.startAnimationLoop();
    }

    setupParticleSystem() {
        // Create particle container
        const particleContainer = document.createElement('div');
        particleContainer.id = 'particle-container';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        document.body.appendChild(particleContainer);
        
        // Start background particles
        this.createBackgroundParticles();
    }

    createBackgroundParticles() {
        const container = document.getElementById('particle-container');
        if (!container) return;

        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                this.createParticle(container, 'background');
            }, i * 100);
        }
    }

    createParticle(container, type = 'default', options = {}) {
        const particle = document.createElement('div');
        particle.className = `particle particle-${type}`;
        
        // Get current theme for color adjustment
        const currentTheme = window.arasakaSystem?.currentTheme || 'dark';
        const defaultColor = currentTheme === 'light' ? '#cc0029' : '#ff0033';
        
        const {
            x = Math.random() * window.innerWidth,
            y = Math.random() * window.innerHeight,
            size = Math.random() * 3 + 1,
            color = defaultColor,
            lifetime = 5000,
            speed = Math.random() * 2 + 0.5
        } = options;

        const opacity = currentTheme === 'light' ? Math.random() * 0.5 + 0.3 : Math.random() * 0.7 + 0.3;

        particle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            opacity: ${opacity};
            animation: particleFloat${type} ${lifetime}ms linear infinite;
        `;

        container.appendChild(particle);

        // Remove particle after lifetime
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, lifetime);

        return particle;
    }

    setupGlitchEffects() {
        // Add glitch CSS animations
        if (!document.querySelector('#glitch-animations')) {
            const style = document.createElement('style');
            style.id = 'glitch-animations';
            style.textContent = `
                @keyframes particleFloatbackground {
                    0% {
                        transform: translateY(0) translateX(0) scale(1);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px) scale(0);
                        opacity: 0;
                    }
                }
                
                @keyframes particleFloatdefault {
                    0% {
                        transform: translateY(0) scale(1) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-50px) scale(0) rotate(360deg);
                        opacity: 0;
                    }
                }
                
                .glitch-effect {
                    animation: glitch 0.3s ease-in-out;
                }
                
                @keyframes glitch {
                    0%, 100% { transform: translateX(0); }
                    10% { transform: translateX(-2px) skew(-2deg); }
                    20% { transform: translateX(2px) skew(2deg); }
                    30% { transform: translateX(-1px) skew(-1deg); }
                    40% { transform: translateX(1px) skew(1deg); }
                    50% { transform: translateX(-2px) skew(-2deg); }
                    60% { transform: translateX(2px) skew(2deg); }
                    70% { transform: translateX(-1px) skew(-1deg); }
                    80% { transform: translateX(1px) skew(1deg); }
                    90% { transform: translateX(-2px) skew(-2deg); }
                }
                
                .cyber-glow {
                    animation: cyberGlow 2s ease-in-out infinite;
                }
                
                @keyframes cyberGlow {
                    0%, 100% {
                        text-shadow: 0 0 5px currentColor;
                        filter: brightness(1);
                    }
                    50% {
                        text-shadow: 0 0 15px currentColor, 0 0 25px currentColor;
                        filter: brightness(1.2);
                    }
                }
                
                .hologram-effect {
                    animation: hologram 3s ease-in-out infinite;
                }
                
                @keyframes hologram {
                    0%, 100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    25% {
                        opacity: 0.8;
                        transform: scale(1.02);
                    }
                    50% {
                        opacity: 0.9;
                        transform: scale(0.98);
                    }
                    75% {
                        opacity: 0.85;
                        transform: scale(1.01);
                    }
                }
                
                .matrix-rain {
                    position: relative;
                    overflow: hidden;
                }
                
                .matrix-rain::before {
                    content: '';
                    position: absolute;
                    top: -100%;
                    left: 0;
                    width: 100%;
                    height: 200%;
                    background: linear-gradient(
                        to bottom,
                        transparent,
                        rgba(0, 255, 65, 0.1) 50%,
                        transparent
                    );
                    animation: matrixRain 3s linear infinite;
                }
                
                @keyframes matrixRain {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(100%); }
                }
                
                .scan-line {
                    position: relative;
                    overflow: hidden;
                }
                
                .scan-line::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, var(--primary-red), transparent);
                    animation: scanLine 2s ease-in-out infinite;
                }
                
                @keyframes scanLine {
                    0% { left: -100%; }
                    50% { left: 100%; }
                    100% { left: 100%; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    triggerGlitch(element, intensity = 1) {
        if (!element) return;
        
        element.classList.add('glitch-effect');
        
        // Multiple glitch iterations for higher intensity
        for (let i = 0; i < intensity; i++) {
            setTimeout(() => {
                element.classList.remove('glitch-effect');
                setTimeout(() => {
                    element.classList.add('glitch-effect');
                }, 50);
            }, i * 100);
        }
        
        // Final cleanup
        setTimeout(() => {
            element.classList.remove('glitch-effect');
        }, intensity * 100 + 300);
    }

    createExplosionEffect(x, y, color = '#ff0033') {
        const container = document.getElementById('particle-container');
        if (!container) return;

        // Create multiple particles for explosion
        for (let i = 0; i < 20; i++) {
            const angle = (Math.PI * 2 * i) / 20;
            const velocity = Math.random() * 100 + 50;
            const particleX = x + Math.cos(angle) * 10;
            const particleY = y + Math.sin(angle) * 10;
            
            this.createParticle(container, 'explosion', {
                x: particleX,
                y: particleY,
                size: Math.random() * 4 + 2,
                color: color,
                lifetime: 1000,
                speed: velocity
            });
        }
    }

    setupScrollAnimations() {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements that should animate on scroll
        document.querySelectorAll('.android-card, .section-title, .laboratory').forEach(el => {
            observer.observe(el);
        });
    }

    animateElement(element) {
        if (element.classList.contains('animated')) return;
        
        element.classList.add('animated');
        
        if (element.classList.contains('android-card')) {
            this.animateAndroidCard(element);
        } else if (element.classList.contains('section-title')) {
            this.animateSectionTitle(element);
        } else if (element.classList.contains('laboratory')) {
            this.animateLaboratory(element);
        }
    }

    animateAndroidCard(card) {
        card.style.animation = 'cardSlideIn 0.6s ease-out forwards';
        
        // Add scan line effect
        card.classList.add('scan-line');
        
        // Stagger animation for multiple cards
        const allCards = Array.from(document.querySelectorAll('.android-card'));
        const index = allCards.indexOf(card);
        card.style.animationDelay = `${index * 0.1}s`;
        
        if (!document.querySelector('#card-animations')) {
            const style = document.createElement('style');
            style.id = 'card-animations';
            style.textContent = `
                @keyframes cardSlideIn {
                    0% {
                        opacity: 0;
                        transform: translateY(30px) rotateX(20deg);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) rotateX(0deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    animateSectionTitle(title) {
        title.classList.add('cyber-glow');
        
        // Create typing effect
        const text = title.textContent;
        title.textContent = '';
        
        let i = 0;
        const typingInterval = setInterval(() => {
            title.textContent += text[i];
            i++;
            
            if (i >= text.length) {
                clearInterval(typingInterval);
            }
        }, 50);
    }

    animateLaboratory(lab) {
        lab.classList.add('matrix-rain');
        
        // Animate laboratory controls with delay
        const controls = lab.querySelectorAll('.personality-slider, .training-input');
        controls.forEach((control, index) => {
            setTimeout(() => {
                control.style.animation = 'controlActivate 0.8s ease-out forwards';
            }, index * 100);
        });
        
        if (!document.querySelector('#lab-animations')) {
            const style = document.createElement('style');
            style.id = 'lab-animations';
            style.textContent = `
                @keyframes controlActivate {
                    0% {
                        opacity: 0.5;
                        transform: scale(0.95);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupHoverEffects() {
        // Enhanced hover effects for interactive elements
        document.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('android-card')) {
                this.enhanceCardHover(e.target);
            } else if (e.target.classList.contains('cta-button')) {
                this.enhanceButtonHover(e.target);
            } else if (e.target.classList.contains('nav-link')) {
                this.enhanceNavHover(e.target);
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.classList.contains('android-card')) {
                this.resetCardHover(e.target);
            }
        });
    }

    enhanceCardHover(card) {
        // Add hologram effect
        card.classList.add('hologram-effect');
        
        // Create hover particles
        const rect = card.getBoundingClientRect();
        const container = document.getElementById('particle-container');
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.createParticle(container, 'hover', {
                    x: rect.left + Math.random() * rect.width,
                    y: rect.top + Math.random() * rect.height,
                    size: 2,
                    color: '#00ffff',
                    lifetime: 1000
                });
            }, i * 50);
        }
    }

    resetCardHover(card) {
        card.classList.remove('hologram-effect');
    }

    enhanceButtonHover(button) {
        // Create ripple effect
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        // Add ripple animation if not exists
        if (!document.querySelector('#ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    enhanceNavHover(link) {
        // Create navigation spark effect
        const container = document.getElementById('particle-container');
        const rect = link.getBoundingClientRect();
        
        this.createParticle(container, 'spark', {
            x: rect.left + rect.width / 2,
            y: rect.bottom,
            size: 3,
            color: '#ff0033',
            lifetime: 800
        });
    }

    createDataStream(startElement, endElement, color = '#00ff41') {
        if (!startElement || !endElement) return;
        
        const startRect = startElement.getBoundingClientRect();
        const endRect = endElement.getBoundingClientRect();
        
        const stream = document.createElement('div');
        stream.className = 'data-stream';
        stream.style.cssText = `
            position: fixed;
            width: 2px;
            height: 20px;
            background: linear-gradient(to bottom, ${color}, transparent);
            z-index: 1000;
            pointer-events: none;
            left: ${startRect.left + startRect.width / 2}px;
            top: ${startRect.bottom}px;
            animation: dataFlow 1s ease-in-out forwards;
        `;
        
        document.body.appendChild(stream);
        
        // Calculate path
        const deltaX = (endRect.left + endRect.width / 2) - (startRect.left + startRect.width / 2);
        const deltaY = endRect.top - startRect.bottom;
        
        if (!document.querySelector('#data-stream-animation')) {
            const style = document.createElement('style');
            style.id = 'data-stream-animation';
            style.textContent = `
                @keyframes dataFlow {
                    0% {
                        transform: translateY(0) translateX(0) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(${deltaY}px) translateX(${deltaX}px) scale(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            stream.remove();
        }, 1000);
    }

    startAnimationLoop() {
        // Main animation loop for continuous effects
        const loop = () => {
            this.updateParticles();
            this.updateBackgroundEffects();
            requestAnimationFrame(loop);
        };
        
        requestAnimationFrame(loop);
    }

    updateParticles() {
        // Occasionally create new background particles
        if (Math.random() < 0.02) {
            const container = document.getElementById('particle-container');
            if (container) {
                // Use theme-appropriate colors
                const currentTheme = window.arasakaSystem?.currentTheme || 'dark';
                const colors = currentTheme === 'light' 
                    ? ['#cc0029', '#0099cc'] 
                    : ['#ff0033', '#00ffff'];
                
                this.createParticle(container, 'background', {
                    x: Math.random() * window.innerWidth,
                    y: window.innerHeight + 10,
                    color: colors[Math.floor(Math.random() * colors.length)]
                });
            }
        }
    }

    updateBackgroundEffects() {
        // Random glitch effects on secret mode
        const arasakaSystem = window.arasakaSystem;
        if (arasakaSystem && arasakaSystem.currentMode === 'secret' && Math.random() < 0.001) {
            const elements = document.querySelectorAll('.android-card.classified');
            if (elements.length > 0) {
                const randomElement = elements[Math.floor(Math.random() * elements.length)];
                this.triggerGlitch(randomElement, 1);
            }
        }
    }

    // Public methods for external use
    createModeTransitionEffect(mode) {
        const colors = {
            consumer: '#00ff41',
            corporate: '#00ffff',
            secret: '#ff0033'
        };
        
        const color = colors[mode] || colors.consumer;
        
        // Create transition wave
        const wave = document.createElement('div');
        wave.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, ${color}22, transparent);
            transform: translate(-50%, -50%);
            z-index: 9999;
            pointer-events: none;
            animation: transitionWave 1s ease-out forwards;
        `;
        
        document.body.appendChild(wave);
        
        if (!document.querySelector('#transition-wave')) {
            const style = document.createElement('style');
            style.id = 'transition-wave';
            style.textContent = `
                @keyframes transitionWave {
                    0% {
                        width: 0;
                        height: 0;
                        opacity: 1;
                    }
                    100% {
                        width: 200vw;
                        height: 200vh;
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            wave.remove();
        }, 1000);
    }

    createSecretUnlockEffect() {
        // Dramatic effect for secret mode unlock
        const container = document.getElementById('particle-container');
        
        // Screen flash
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #ff0033;
            z-index: 9999;
            opacity: 0;
            animation: secretFlash 0.5s ease-out;
            pointer-events: none;
        `;
        
        document.body.appendChild(flash);
        
        // Explosion particles
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                this.createParticle(container, 'explosion', {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2,
                    color: '#ff0033',
                    lifetime: 2000
                });
            }, i * 10);
        }
        
        if (!document.querySelector('#secret-flash')) {
            const style = document.createElement('style');
            style.id = 'secret-flash';
            style.textContent = `
                @keyframes secretFlash {
                    0%, 100% { opacity: 0; }
                    50% { opacity: 0.8; }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            flash.remove();
        }, 500);
    }

    cleanup() {
        // Clean up all animations and effects
        const container = document.getElementById('particle-container');
        if (container) {
            container.innerHTML = '';
        }
        
        // Remove animation classes
        document.querySelectorAll('.glitch-effect, .cyber-glow, .hologram-effect, .matrix-rain').forEach(el => {
            el.classList.remove('glitch-effect', 'cyber-glow', 'hologram-effect', 'matrix-rain');
        });
    }

    // Theme management methods
    updateTheme(theme) {
        // Update particle colors and effects based on theme
        this.currentTheme = theme;
        
        // Recreate some particles with new theme colors
        this.refreshParticles();
        
        // Update existing animations if needed
        this.updateAnimationColors(theme);
    }

    refreshParticles() {
        // Clear existing particles and create new ones with theme colors
        const container = document.getElementById('particle-container');
        if (container) {
            // Clear old particles
            container.innerHTML = '';
            
            // Create new particles with appropriate colors
            this.createBackgroundParticles();
        }
    }

    updateAnimationColors(theme) {
        // Update any ongoing animations to match the new theme
        const currentTheme = theme || window.arasakaSystem?.currentTheme || 'dark';
        
        // This could update CSS custom properties for animations
        const root = document.documentElement;
        if (currentTheme === 'light') {
            root.style.setProperty('--particle-primary', '#cc0029');
            root.style.setProperty('--particle-secondary', '#0099cc');
        } else {
            root.style.setProperty('--particle-primary', '#ff0033');
            root.style.setProperty('--particle-secondary', '#00ffff');
        }
    }
}

// Initialize Animation System
window.animationSystem = new AnimationSystem();

// Export for global access
window.AnimationSystem = AnimationSystem;
