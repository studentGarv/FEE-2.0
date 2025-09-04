// ARASAKA Android Systems Division - Main JavaScript

class ArasakaSystem {
    constructor() {
        this.currentMode = 'consumer';
        this.secretModeUnlocked = false;
        this.neuralLinkActive = false;
        this.secretSequence = [];
        this.secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        this.currentTheme = 'dark';
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeSystem());
        } else {
            this.initializeSystem();
        }
    }

    initializeSystem() {
        this.setupLoadingScreen();
        this.setupEventListeners();
        this.setupSecretMode();
        this.setupParticleBackground();
        this.initializeTheme();
        
        // Start the loading sequence
        this.startLoadingSequence();
    }

    setupLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const progressBar = document.querySelector('.loading-progress');
        const loadingText = document.querySelector('.loading-text');
        
        const loadingSteps = [
            'INITIALIZING NEURAL NETWORKS...',
            'LOADING ANDROID DATABASE...',
            'ESTABLISHING QUANTUM LINKS...',
            'VERIFYING SECURITY PROTOCOLS...',
            'ARASAKA SYSTEMS ONLINE'
        ];
        
        let currentStep = 0;
        
        const updateLoading = () => {
            if (currentStep < loadingSteps.length) {
                loadingText.textContent = loadingSteps[currentStep];
                currentStep++;
                setTimeout(updateLoading, 600);
            }
        };
        
        updateLoading();
    }

    startLoadingSequence() {
        setTimeout(() => {
            document.getElementById('loading-screen').classList.add('fade-out');
            setTimeout(() => {
                document.getElementById('loading-screen').style.display = 'none';
                this.showWelcomeMessage();
            }, 500);
        }, 3000);
    }

    showWelcomeMessage() {
        const aiGuide = window.aiGuide;
        if (aiGuide) {
            aiGuide.showMessage('Welcome to ARASAKA Android Systems Division. I am AKIRA, your AI assistant. How may I help you today?');
        }
    }

    setupEventListeners() {
        // Mode switching
        const modeButtons = document.querySelectorAll('.mode-btn');
        modeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchMode(e.target.dataset.mode));
        });

        // Neural Link button
        const neuralLinkBtn = document.getElementById('neuralLinkBtn');
        if (neuralLinkBtn) {
            neuralLinkBtn.addEventListener('click', () => this.toggleNeuralLink());
        }

        // Theme toggle button
        const themeToggleBtn = document.getElementById('themeToggle');
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => this.toggleTheme());
        }

        // CTA buttons
        const exploreCatalogBtn = document.getElementById('exploreCatalog');
        if (exploreCatalogBtn) {
            exploreCatalogBtn.addEventListener('click', () => this.scrollToSection('catalog'));
        }

        const scheduleDemoBtn = document.getElementById('scheduleDemo');
        if (scheduleDemoBtn) {
            scheduleDemoBtn.addEventListener('click', () => this.scheduleDemo());
        }

        // Android cards
        const androidCards = document.querySelectorAll('.android-card');
        androidCards.forEach(card => {
            card.addEventListener('click', (e) => this.selectAndroid(e.currentTarget));
        });

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.getAttribute('href').substring(1);
                this.scrollToSection(section);
                this.updateActiveNavLink(e.target);
            });
        });

        // Secret trigger
        const secretTrigger = document.getElementById('secretTrigger');
        if (secretTrigger) {
            let clickCount = 0;
            secretTrigger.addEventListener('click', () => {
                clickCount++;
                if (clickCount >= 5) {
                    this.unlockSecretMode();
                    clickCount = 0;
                }
                setTimeout(() => { clickCount = Math.max(0, clickCount - 1); }, 2000);
            });
        }

        // Keyboard secret sequence
        document.addEventListener('keydown', (e) => this.handleSecretSequence(e));

        // Window scroll for navbar effects
        window.addEventListener('scroll', () => this.handleScroll());
    }

    initializeTheme() {
        // Check for saved theme preference or default to 'dark'
        const savedTheme = localStorage.getItem('arasaka-theme') || 'dark';
        this.setTheme(savedTheme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        
        // Create theme transition effect
        this.createThemeTransitionEffect();
        
        // Update AI guide message
        const aiGuide = window.aiGuide;
        if (aiGuide) {
            const message = newTheme === 'light' 
                ? 'Corporate daylight mode activated. Professional interface enabled.'
                : 'Cyberpunk night mode activated. Enhanced neural interface online.';
            aiGuide.showMessage(message);
        }
    }

    setTheme(theme) {
        this.currentTheme = theme;
        
        // Update HTML attribute
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update theme toggle icon
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
        
        // Save preference
        localStorage.setItem('arasaka-theme', theme);
        
        // Update particle colors for current theme
        this.updateParticleColors(theme);
        
        // Notify animation system of theme change
        if (window.animationSystem) {
            window.animationSystem.updateTheme(theme);
        }
        
        // Update AI guide for theme
        if (window.aiGuide) {
            window.aiGuide.updateForTheme();
        }
    }

    createThemeTransitionEffect() {
        // Create a smooth transition overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${this.currentTheme === 'light' ? '#ffffff' : '#000000'};
            opacity: 0;
            z-index: 9998;
            pointer-events: none;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(overlay);
        
        // Trigger transition
        setTimeout(() => {
            overlay.style.opacity = '0.8';
        }, 10);
        
        // Complete transition
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }, 150);
    }

    updateParticleColors(theme) {
        // Update particle system colors based on theme
        if (window.animationSystem) {
            const colors = theme === 'light' 
                ? ['#cc0029', '#0099cc', '#00cc66'] 
                : ['#ff0033', '#00ffff', '#00ff41'];
            
            // This would be implemented in the animation system
            // For now, we'll just log the change
            console.log(`Particle colors updated for ${theme} theme:`, colors);
        }
    }

    switchMode(mode) {
        if (mode === 'secret' && !this.secretModeUnlocked) {
            this.showAccessDenied();
            return;
        }

        this.currentMode = mode;
        
        // Update mode buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.mode === mode) {
                btn.classList.add('active');
            }
        });

        // Update mode sections
        document.querySelectorAll('.mode-section').forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(mode + 'Mode');
        if (targetSection) {
            targetSection.classList.add('active');
            if (mode === 'secret') {
                targetSection.classList.add('secret-mode-reveal');
            }
        }

        // Update AI guide message
        this.updateAIGuideForMode(mode);
        
        // Update hero title visibility
        this.updateHeroTitle(mode);
    }

    updateAIGuideForMode(mode) {
        const aiGuide = window.aiGuide;
        if (!aiGuide) return;

        const messages = {
            consumer: 'Browsing consumer androids. Perfect companions for home and family life.',
            corporate: 'Viewing corporate solutions. Advanced androids for business environments.',
            secret: 'Welcome to classified operations. Proceed with extreme caution.'
        };

        aiGuide.showMessage(messages[mode] || messages.consumer, mode);
    }

    updateHeroTitle(mode) {
        const titleSecret = document.querySelector('.title-secret');
        if (titleSecret) {
            if (mode === 'secret') {
                titleSecret.style.opacity = '1';
                titleSecret.classList.add('secret-title-reveal');
            } else {
                titleSecret.style.opacity = '0';
                titleSecret.classList.remove('secret-title-reveal');
            }
        }
    }

    setupSecretMode() {
        // Add secret mode button after corporate mode is unlocked
        const modeSelector = document.getElementById('modeSelector');
        if (modeSelector && !document.querySelector('[data-mode="secret"]')) {
            const secretBtn = document.createElement('button');
            secretBtn.className = 'mode-btn secret';
            secretBtn.dataset.mode = 'secret';
            secretBtn.textContent = 'CLASSIFIED';
            secretBtn.style.display = 'none';
            modeSelector.appendChild(secretBtn);
            
            secretBtn.addEventListener('click', (e) => this.switchMode(e.target.dataset.mode));
        }
    }

    handleSecretSequence(e) {
        this.secretSequence.push(e.code);
        
        // Keep only the last 10 keys
        if (this.secretSequence.length > 10) {
            this.secretSequence.shift();
        }
        
        // Check if sequence matches
        if (this.secretSequence.length === 10) {
            const matches = this.secretSequence.every((key, index) => key === this.secretCode[index]);
            if (matches) {
                this.unlockSecretMode();
                this.secretSequence = [];
            }
        }
    }

    unlockSecretMode() {
        if (this.secretModeUnlocked) return;

        this.secretModeUnlocked = true;
        
        // Show warning overlay
        this.showWarningOverlay();
        
        // Show secret mode button
        const secretBtn = document.querySelector('[data-mode="secret"]');
        if (secretBtn) {
            secretBtn.style.display = 'block';
            secretBtn.classList.add('neural-link-active');
        }
        
        // AI guide warning
        const aiGuide = window.aiGuide;
        if (aiGuide) {
            aiGuide.showMessage('WARNING: Classified access granted. Unauthorized personnel will be terminated.', 'secret');
        }
        
        // Add sound effect (if audio is implemented)
        this.playSecretUnlockSound();
    }

    showWarningOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'warning-overlay';
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.remove();
        }, 500);
    }

    showAccessDenied() {
        const modeSelector = document.getElementById('modeSelector');
        if (modeSelector) {
            modeSelector.classList.add('access-denied');
            setTimeout(() => {
                modeSelector.classList.remove('access-denied');
            }, 300);
        }

        const aiGuide = window.aiGuide;
        if (aiGuide) {
            aiGuide.showMessage('ACCESS DENIED. Insufficient clearance level.', 'error');
        }
    }

    toggleNeuralLink() {
        this.neuralLinkActive = !this.neuralLinkActive;
        const neuralLinkBtn = document.getElementById('neuralLinkBtn');
        
        if (this.neuralLinkActive) {
            neuralLinkBtn.classList.add('neural-link-active');
            neuralLinkBtn.textContent = 'NEURAL LINKED';
        } else {
            neuralLinkBtn.classList.remove('neural-link-active');
            neuralLinkBtn.textContent = 'NEURAL LINK';
        }

        const aiGuide = window.aiGuide;
        if (aiGuide) {
            const message = this.neuralLinkActive 
                ? 'Neural link established. Enhanced AI assistance activated.'
                : 'Neural link disconnected. Standard assistance mode.';
            aiGuide.showMessage(message);
        }
    }

    selectAndroid(card) {
        const androidType = card.dataset.android;
        const isClassified = card.classList.contains('classified');
        
        if (isClassified && this.currentMode !== 'secret') {
            this.showAccessDenied();
            return;
        }

        // Remove previous selections
        document.querySelectorAll('.android-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        // Show android details or customization
        this.showAndroidDetails(androidType);
    }

    showAndroidDetails(androidType) {
        const aiGuide = window.aiGuide;
        if (!aiGuide) return;

        const androidDetails = {
            companion: 'Companion Series: Advanced emotional AI with empathy protocols. Perfect for elderly care and family interaction.',
            assistant: 'Home Assistant: Multi-task domestic android with 200+ household functions and 47 language support.',
            tutor: 'Education Tutor: Adaptive learning AI that grows with your child. Covers 15+ subjects for ages 3-99.',
            security: 'Security Division: Military-grade protection android with 360° threat detection and 0.3s response time.',
            reception: 'Reception Unit: Professional corporate android with enterprise protocol suite and 89 language support.',
            industrial: 'Industrial Worker: Heavy-duty manufacturing android with 2000kg lift capacity and ±0.1mm precision.',
            mercenary: 'CLASSIFIED: Combat-enhanced tactical unit. Extreme lethality rating. Military authorization required.',
            spy: 'CLASSIFIED: Deep-cover infiltration android with adaptive camouflage and quantum data mining capabilities.',
            saboteur: 'CLASSIFIED: Infrastructure disruption specialist with integrated EMP and demolition expertise.'
        };

        const message = androidDetails[androidType] || 'Android information classified.';
        aiGuide.showMessage(message);

        // Navigate to laboratory for customization
        setTimeout(() => {
            this.scrollToSection('laboratory');
        }, 2000);
    }

    scheduleDemo() {
        const aiGuide = window.aiGuide;
        if (aiGuide) {
            aiGuide.showMessage('Demo scheduling initiated. An ARASAKA representative will contact you within 24 hours.');
        }
        
        // Here you would typically open a modal or form
        // For now, we'll just show a notification
        this.showNotification('Demo Request Sent', 'success');
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    updateActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    handleScroll() {
        const navbar = document.querySelector('.main-nav');
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            const bgColor = this.currentTheme === 'light' 
                ? 'rgba(245, 245, 245, 0.98)' 
                : 'rgba(10, 10, 10, 0.98)';
            navbar.style.background = bgColor;
        } else {
            const bgColor = this.currentTheme === 'light' 
                ? 'rgba(245, 245, 245, 0.95)' 
                : 'rgba(10, 10, 10, 0.95)';
            navbar.style.background = bgColor;
        }
    }

    setupParticleBackground() {
        // Setup Three.js particle background for hero section
        const canvas = document.getElementById('heroCanvas');
        if (!canvas || !window.THREE) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
        
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setClearColor(0x000000, 0);

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 20;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.005,
            color: this.currentTheme === 'light' ? 0xcc0029 : 0xff0033,
            transparent: true,
            opacity: this.currentTheme === 'light' ? 0.6 : 0.8
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        camera.position.z = 5;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            
            particlesMesh.rotation.x += 0.0005;
            particlesMesh.rotation.y += 0.0005;
            
            renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        const bgColor = this.currentTheme === 'light' ? 'var(--bg-secondary)' : 'var(--bg-secondary)';
        const borderColor = type === 'success' ? 'var(--terminal-green)' : 'var(--primary-red)';
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: 6px;
            border-left: 4px solid ${borderColor};
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            box-shadow: ${this.currentTheme === 'light' ? '0 4px 15px rgba(0, 0, 0, 0.1)' : '0 4px 15px rgba(0, 0, 0, 0.3)'};
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    playSecretUnlockSound() {
        // Placeholder for audio implementation
        // You can add actual audio files later
        console.log('🔓 SECRET MODE UNLOCKED');
    }
}

// Initialize the system when the page loads
window.arasakaSystem = new ArasakaSystem();

// CSS animations for notifications
const notificationStyles = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);
