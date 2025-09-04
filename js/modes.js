// ARASAKA Mode Management System

class ModeManager {
    constructor() {
        this.currentMode = 'consumer';
        this.previousMode = null;
        this.modeHistory = [];
        this.modeData = {
            consumer: {
                theme: 'consumer',
                title: 'Android Companions for Modern Life',
                description: 'Discover the perfect android companion for your home and family.',
                catalogType: 'consumer',
                aiPersonality: 'friendly',
                features: ['Home assistance', 'Companionship', 'Education', 'Entertainment']
            },
            corporate: {
                theme: 'corporate',
                title: 'Enterprise Android Solutions',
                description: 'Advanced androids designed for business environments and industrial applications.',
                catalogType: 'corporate',
                aiPersonality: 'professional',
                features: ['Security', 'Reception', 'Manufacturing', 'Data processing']
            },
            secret: {
                theme: 'secret',
                title: 'Classified Operations Division',
                description: 'Specialized androids for government contracts and classified missions.',
                catalogType: 'blackmarket',
                aiPersonality: 'classified',
                features: ['Combat operations', 'Espionage', 'Sabotage', 'Elimination']
            }
        };
        
        this.init();
    }

    init() {
        this.setupModeTransitions();
        this.setupModeValidation();
    }

    switchMode(targetMode, force = false) {
        // Validate mode access
        if (!this.validateModeAccess(targetMode) && !force) {
            this.handleAccessDenied(targetMode);
            return false;
        }

        // Store previous mode
        this.previousMode = this.currentMode;
        this.modeHistory.push(this.currentMode);
        
        // Keep history manageable
        if (this.modeHistory.length > 10) {
            this.modeHistory.shift();
        }

        // Execute mode switch
        this.executeModeSwitchTransition(targetMode);
        
        return true;
    }

    validateModeAccess(mode) {
        switch (mode) {
            case 'consumer':
            case 'corporate':
                return true;
            case 'secret':
                return window.arasakaSystem?.secretModeUnlocked || false;
            default:
                return false;
        }
    }

    executeModeSwitchTransition(targetMode) {
        // Start transition
        this.startModeTransition();
        
        // Update mode data
        this.currentMode = targetMode;
        
        // Update UI elements
        this.updateModeUI(targetMode);
        
        // Update theme
        this.applyModeTheme(targetMode);
        
        // Update catalog
        this.updateCatalogDisplay(targetMode);
        
        // Trigger mode-specific effects
        this.triggerModeEffects(targetMode);
        
        // Complete transition
        setTimeout(() => {
            this.completeModeTransition();
        }, 500);
    }

    startModeTransition() {
        const body = document.body;
        body.classList.add('mode-transitioning');
        
        // Add transition overlay
        const overlay = document.createElement('div');
        overlay.className = 'mode-transition-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255,0,51,0.2), rgba(0,0,0,0.8));
            z-index: 9998;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
        
        document.body.appendChild(overlay);
        
        // Trigger overlay animation
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);
        
        // Remove overlay
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }, 200);
    }

    updateModeUI(mode) {
        const modeData = this.modeData[mode];
        
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
            
            // Add special effects for secret mode
            if (mode === 'secret') {
                targetSection.classList.add('secret-mode-reveal');
                this.triggerSecretModeEffects();
            }
        }

        // Update page title
        document.title = `ARASAKA // ${modeData.title}`;
    }

    applyModeTheme(mode) {
        const body = document.body;
        
        // Remove previous theme classes
        body.classList.remove('theme-consumer', 'theme-corporate', 'theme-secret');
        
        // Add new theme class
        body.classList.add(`theme-${mode}`);
        
        // Update CSS custom properties for mode-specific theming
        const root = document.documentElement;
        const themeColors = {
            consumer: {
                'primary-accent': '#00ff41',
                'secondary-accent': '#00ffff',
                'mode-glow': 'rgba(0, 255, 65, 0.3)'
            },
            corporate: {
                'primary-accent': '#00ffff',
                'secondary-accent': '#0080ff',
                'mode-glow': 'rgba(0, 255, 255, 0.3)'
            },
            secret: {
                'primary-accent': '#ff0033',
                'secondary-accent': '#ff6600',
                'mode-glow': 'rgba(255, 0, 51, 0.5)'
            }
        };

        const colors = themeColors[mode];
        Object.keys(colors).forEach(property => {
            root.style.setProperty(`--${property}`, colors[property]);
        });
    }

    updateCatalogDisplay(mode) {
        const modeData = this.modeData[mode];
        
        // Update section title
        const sectionTitle = document.querySelector(`#${mode}Mode .section-title`);
        if (sectionTitle) {
            sectionTitle.textContent = modeData.title.toUpperCase();
        }

        // Update android cards visibility and styling
        this.updateAndroidCards(mode);
        
        // Update pricing displays
        this.updatePricingDisplay(mode);
    }

    updateAndroidCards(mode) {
        const cards = document.querySelectorAll('.android-card');
        
        cards.forEach(card => {
            const androidType = card.dataset.android;
            
            // Add mode-specific styling
            card.classList.remove('consumer-style', 'corporate-style', 'secret-style');
            card.classList.add(`${mode}-style`);
            
            // Update card actions based on mode
            const actionBtn = card.querySelector('.card-action');
            if (actionBtn) {
                this.updateCardAction(actionBtn, mode, androidType);
            }
            
            // Add mode-specific animations
            this.addCardAnimations(card, mode);
        });
    }

    updateCardAction(button, mode, androidType) {
        const actionTexts = {
            consumer: {
                default: 'CUSTOMIZE',
                companion: 'ADOPT NOW',
                assistant: 'CONFIGURE',
                tutor: 'CUSTOMIZE'
            },
            corporate: {
                default: 'REQUEST QUOTE',
                security: 'AUTHORIZE',
                reception: 'DEPLOY',
                industrial: 'ORDER NOW'
            },
            secret: {
                default: 'ACCESS RESTRICTED',
                mercenary: 'DEPLOY ASSET',
                spy: 'ACTIVATE AGENT',
                saboteur: 'AUTHORIZE MISSION'
            }
        };

        const modeActions = actionTexts[mode] || actionTexts.consumer;
        button.textContent = modeActions[androidType] || modeActions.default;
        
        // Add mode-specific click handlers
        button.onclick = () => this.handleCardAction(mode, androidType);
    }

    handleCardAction(mode, androidType) {
        const aiGuide = window.aiGuide;
        
        if (mode === 'secret' && !this.validateSecretAccess(androidType)) {
            this.showSecretAccessDenied();
            return;
        }

        // Mode-specific actions
        switch (mode) {
            case 'consumer':
                this.handleConsumerAction(androidType);
                break;
            case 'corporate':
                this.handleCorporateAction(androidType);
                break;
            case 'secret':
                this.handleSecretAction(androidType);
                break;
        }
    }

    handleConsumerAction(androidType) {
        const aiGuide = window.aiGuide;
        aiGuide?.showMessage(`Customizing ${androidType} android. Redirecting to laboratory...`);
        
        setTimeout(() => {
            window.arasakaSystem?.scrollToSection('laboratory');
        }, 1500);
    }

    handleCorporateAction(androidType) {
        const aiGuide = window.aiGuide;
        aiGuide?.showMessage(`Generating enterprise quote for ${androidType} deployment. Contact information required.`);
        
        // Would typically open a contact form or quote generator
        this.showQuoteModal(androidType);
    }

    handleSecretAction(androidType) {
        const aiGuide = window.aiGuide;
        aiGuide?.showMessage(`Initiating classified deployment protocol for ${androidType}. Verify authorization codes.`, 'secret');
        
        // Would typically require additional security verification
        this.showAuthorizationModal(androidType);
    }

    addCardAnimations(card, mode) {
        // Remove previous animations
        card.classList.remove('consumer-hover', 'corporate-hover', 'secret-hover');
        
        // Add mode-specific hover effects
        card.classList.add(`${mode}-hover`);
        
        // Add enter animation
        card.style.animation = `${mode}CardEnter 0.5s ease-out`;
        
        setTimeout(() => {
            card.style.animation = '';
        }, 500);
    }

    triggerModeEffects(mode) {
        switch (mode) {
            case 'consumer':
                this.triggerConsumerEffects();
                break;
            case 'corporate':
                this.triggerCorporateEffects();
                break;
            case 'secret':
                this.triggerSecretModeEffects();
                break;
        }
    }

    triggerConsumerEffects() {
        // Friendly, welcoming effects
        this.createParticleEffect('#00ff41', 'gentle');
    }

    triggerCorporateEffects() {
        // Professional, efficient effects
        this.createParticleEffect('#00ffff', 'structured');
    }

    triggerSecretModeEffects() {
        // Dark, ominous effects
        this.createParticleEffect('#ff0033', 'aggressive');
        this.addStaticEffect();
        this.triggerSecurityScan();
    }

    createParticleEffect(color, style) {
        // Create temporary particle effects
        const particles = [];
        const numParticles = style === 'aggressive' ? 50 : 30;
        
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${Math.random() * window.innerWidth}px;
                top: ${Math.random() * window.innerHeight}px;
                animation: particleFloat 2s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            particles.push(particle);
        }
        
        // Clean up particles
        setTimeout(() => {
            particles.forEach(particle => particle.remove());
        }, 2000);
    }

    addStaticEffect() {
        const static = document.createElement('div');
        static.className = 'static-effect';
        static.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><filter id="static"><feTurbulence baseFrequency="0.9"/></filter></defs><rect width="100" height="100" filter="url(%23static)" opacity="0.03"/></svg>');
            pointer-events: none;
            z-index: 9997;
            animation: staticFlicker 0.1s infinite;
        `;
        
        document.body.appendChild(static);
        
        setTimeout(() => {
            static.remove();
        }, 1000);
    }

    triggerSecurityScan() {
        const scanLine = document.createElement('div');
        scanLine.style.cssText = `
            position: fixed;
            top: -2px;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #ff0033, transparent);
            z-index: 9999;
            animation: securityScan 2s ease-in-out;
        `;
        
        document.body.appendChild(scanLine);
        
        setTimeout(() => {
            scanLine.remove();
        }, 2000);
    }

    completeModeTransition() {
        document.body.classList.remove('mode-transitioning');
        
        // Update AI guide
        const aiGuide = window.aiGuide;
        if (aiGuide) {
            aiGuide.switchPersonality(this.currentMode);
        }
        
        // Log mode switch
        console.log(`Mode switched to: ${this.currentMode.toUpperCase()}`);
    }

    handleAccessDenied(mode) {
        const aiGuide = window.aiGuide;
        aiGuide?.showMessage('ACCESS DENIED. Insufficient clearance level.', 'error');
        
        // Visual feedback
        this.showAccessDeniedEffect();
    }

    showAccessDeniedEffect() {
        const effect = document.createElement('div');
        effect.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 0, 51, 0.9);
            color: white;
            padding: 20px 40px;
            border-radius: 10px;
            font-family: var(--font-primary);
            font-weight: bold;
            font-size: 1.2rem;
            z-index: 10000;
            animation: accessDeniedEffect 1s ease-out forwards;
        `;
        effect.textContent = 'ACCESS DENIED';
        
        document.body.appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
        }, 1000);
    }

    setupModeValidation() {
        // Additional security for secret mode
        if (this.currentMode === 'secret') {
            this.startSecurityMonitoring();
        }
    }

    setupModeTransitions() {
        // Add transition CSS if not already present
        if (!document.querySelector('#mode-transitions')) {
            const style = document.createElement('style');
            style.id = 'mode-transitions';
            style.textContent = `
                @keyframes particleFloat {
                    0% { opacity: 0; transform: translateY(0) scale(0); }
                    50% { opacity: 1; transform: translateY(-50px) scale(1); }
                    100% { opacity: 0; transform: translateY(-100px) scale(0); }
                }
                
                @keyframes staticFlicker {
                    0%, 100% { opacity: 0.03; }
                    50% { opacity: 0.06; }
                }
                
                @keyframes securityScan {
                    0% { top: -2px; }
                    100% { top: 100vh; }
                }
                
                @keyframes accessDeniedEffect {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                    100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                }
                
                @keyframes consumerCardEnter {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes corporateCardEnter {
                    0% { opacity: 0; transform: translateX(-20px); }
                    100% { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes secretCardEnter {
                    0% { opacity: 0; transform: scale(0.9) rotateX(10deg); }
                    100% { opacity: 1; transform: scale(1) rotateX(0deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Utility methods
    getPreviousMode() {
        return this.previousMode;
    }

    getModeHistory() {
        return [...this.modeHistory];
    }

    getCurrentModeData() {
        return this.modeData[this.currentMode];
    }
}

// Initialize Mode Manager
window.modeManager = new ModeManager();

// Export for global access
window.ModeManager = ModeManager;
