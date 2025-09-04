// ARASAKA AI Guide System

class AIGuide {
    constructor() {
        this.isMinimized = false;
        this.currentMode = 'consumer';
        this.messageQueue = [];
        this.isTyping = false;
        this.personalities = {
            consumer: {
                name: 'AKIRA',
                color: '#00ff41',
                tone: 'friendly',
                responses: {
                    greeting: 'Welcome to ARASAKA Android Systems. I\'m here to help you find the perfect android companion.',
                    help: 'I can guide you through our android catalog, schedule demonstrations, and answer any questions.',
                    goodbye: 'Thank you for choosing ARASAKA. Your android journey begins here.'
                }
            },
            corporate: {
                name: 'NEXUS',
                color: '#00ffff',
                tone: 'professional',
                responses: {
                    greeting: 'ARASAKA Corporate Solutions at your service. How may I assist your enterprise today?',
                    help: 'I specialize in corporate android deployments, enterprise solutions, and business automation.',
                    goodbye: 'ARASAKA Corporation: Driving tomorrow\'s productivity today.'
                }
            },
            secret: {
                name: 'SHADOW',
                color: '#ff0033',
                tone: 'ominous',
                responses: {
                    greeting: 'Classified access confirmed. I know why you\'re here.',
                    help: 'Proceed with caution. Not all knowledge is meant to be shared.',
                    goodbye: 'Remember: You were never here. This conversation never happened.'
                }
            }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startIdleAnimation();
    }

    setupEventListeners() {
        const minimizeBtn = document.getElementById('aiMinimize');
        const aiGuide = document.getElementById('aiGuide');
        
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => this.toggleMinimize());
        }

        if (aiGuide) {
            aiGuide.addEventListener('click', (e) => {
                if (this.isMinimized && e.target === aiGuide) {
                    this.toggleMinimize();
                }
            });
        }

        // Voice commands (placeholder for future implementation)
        this.setupVoiceCommands();
    }

    toggleMinimize() {
        const aiGuide = document.getElementById('aiGuide');
        const minimizeBtn = document.getElementById('aiMinimize');
        
        this.isMinimized = !this.isMinimized;
        
        if (this.isMinimized) {
            aiGuide.classList.add('minimized');
            minimizeBtn.textContent = '+';
        } else {
            aiGuide.classList.remove('minimized');
            minimizeBtn.textContent = '−';
        }
    }

    showMessage(message, mode = null, options = {}) {
        if (mode && mode !== this.currentMode) {
            this.switchPersonality(mode);
        }

        const messageObj = {
            text: message,
            mode: mode || this.currentMode,
            timestamp: Date.now(),
            ...options
        };

        this.messageQueue.push(messageObj);
        
        if (!this.isTyping) {
            this.processMessageQueue();
        }
    }

    switchPersonality(mode) {
        this.currentMode = mode;
        const personality = this.personalities[mode] || this.personalities.consumer;
        
        // Update AI name
        const aiName = document.querySelector('.ai-name');
        if (aiName) {
            aiName.textContent = personality.name;
            aiName.style.color = personality.color;
        }

        // Update avatar colors
        const avatarCircle = document.querySelector('.avatar-circle');
        if (avatarCircle) {
            const gradientColors = {
                consumer: 'linear-gradient(45deg, #00ffff, #00ff41)',
                corporate: 'linear-gradient(45deg, #00ffff, #0080ff)',
                secret: 'linear-gradient(45deg, #ff0033, #ff6600)'
            };
            avatarCircle.style.background = gradientColors[mode] || gradientColors.consumer;
        }

        // Add personality transition effect
        this.playPersonalityTransition(mode);
        
        // Update for current theme
        this.updateForTheme();
    }

    updateForTheme() {
        // Adjust AI guide appearance based on current theme
        const currentTheme = window.arasakaSystem?.currentTheme || 'dark';
        const aiGuide = document.getElementById('aiGuide');
        
        if (currentTheme === 'light') {
            aiGuide.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        } else {
            aiGuide.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        }
    }

    processMessageQueue() {
        if (this.messageQueue.length === 0) {
            this.isTyping = false;
            return;
        }

        this.isTyping = true;
        const message = this.messageQueue.shift();
        
        this.typeMessage(message.text, () => {
            setTimeout(() => {
                this.processMessageQueue();
            }, 1000);
        });
    }

    typeMessage(text, callback) {
        const messageElement = document.getElementById('aiMessage');
        if (!messageElement) return;

        // Clear current message
        messageElement.textContent = '';
        
        // Add typing indicator
        this.showTypingIndicator();

        setTimeout(() => {
            this.hideTypingIndicator();
            
            let index = 0;
            const typeInterval = setInterval(() => {
                messageElement.textContent += text[index];
                index++;
                
                if (index >= text.length) {
                    clearInterval(typeInterval);
                    this.addMessageEffects(messageElement);
                    if (callback) callback();
                }
            }, 30); // Typing speed
        }, 800);
    }

    showTypingIndicator() {
        const messageElement = document.getElementById('aiMessage');
        if (!messageElement) return;

        messageElement.innerHTML = '<span class="typing-dots">●●●</span>';
        
        // Add typing animation CSS if not exists
        if (!document.querySelector('#typing-styles')) {
            const style = document.createElement('style');
            style.id = 'typing-styles';
            style.textContent = `
                .typing-dots {
                    animation: typingDots 1.5s infinite;
                    color: var(--text-muted);
                }
                
                @keyframes typingDots {
                    0%, 20% { opacity: 0; }
                    50% { opacity: 1; }
                    100% { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    hideTypingIndicator() {
        const messageElement = document.getElementById('aiMessage');
        if (messageElement) {
            messageElement.innerHTML = '';
        }
    }

    addMessageEffects(element) {
        // Add subtle glow effect based on current mode
        const glowColors = {
            consumer: '0 0 10px rgba(0, 255, 65, 0.3)',
            corporate: '0 0 10px rgba(0, 255, 255, 0.3)',
            secret: '0 0 10px rgba(255, 0, 51, 0.3)',
            error: '0 0 10px rgba(255, 102, 0, 0.5)'
        };
        
        const glow = glowColors[this.currentMode] || glowColors.consumer;
        element.style.textShadow = glow;
        
        // Add pulse animation for important messages
        if (this.currentMode === 'secret') {
            element.style.animation = 'messagePulse 2s ease-in-out';
            
            // Add pulse animation CSS if not exists
            if (!document.querySelector('#message-effects')) {
                const style = document.createElement('style');
                style.id = 'message-effects';
                style.textContent = `
                    @keyframes messagePulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.8; }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }

    playPersonalityTransition(mode) {
        const aiGuide = document.getElementById('aiGuide');
        if (!aiGuide) return;

        // Add transition class
        aiGuide.classList.add('personality-transition');
        
        // Add transition styles if not exists
        if (!document.querySelector('#personality-styles')) {
            const style = document.createElement('style');
            style.id = 'personality-styles';
            style.textContent = `
                .personality-transition {
                    animation: personalityShift 1s ease-in-out;
                }
                
                @keyframes personalityShift {
                    0% { transform: scale(1); filter: brightness(1); }
                    50% { transform: scale(1.05); filter: brightness(1.2); }
                    100% { transform: scale(1); filter: brightness(1); }
                }
            `;
            document.head.appendChild(style);
        }

        // Remove transition class after animation
        setTimeout(() => {
            aiGuide.classList.remove('personality-transition');
        }, 1000);

        // Play mode-specific sound effect
        this.playModeSound(mode);
    }

    startIdleAnimation() {
        const avatarCore = document.querySelector('.avatar-core');
        if (!avatarCore) return;

        setInterval(() => {
            if (!this.isTyping) {
                avatarCore.style.animation = 'none';
                setTimeout(() => {
                    avatarCore.style.animation = 'avatarCore 1s ease-in-out infinite alternate';
                }, 100);
            }
        }, 5000);
    }

    setupVoiceCommands() {
        // Placeholder for future voice recognition implementation
        // This would integrate with Web Speech API
        
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            // Voice recognition available
            console.log('Voice commands available (not implemented in demo)');
        }
    }

    playModeSound(mode) {
        // Placeholder for audio implementation
        const soundEffects = {
            consumer: '🔵 Consumer mode activated',
            corporate: '🔷 Corporate mode activated', 
            secret: '🔴 Classified mode activated'
        };
        
        console.log(soundEffects[mode] || soundEffects.consumer);
    }

    // Interactive responses for different scenarios
    respondToAndroidSelection(androidType) {
        const responses = {
            companion: 'Excellent choice. The Companion Series features advanced emotional AI designed for meaningful human interaction.',
            assistant: 'The Home Assistant model is our most popular choice for busy households. Shall I schedule a demonstration?',
            tutor: 'Education Tutors adapt to any learning style. Perfect for families investing in their children\'s future.',
            security: 'Security Division androids require corporate authorization. Shall I begin the verification process?',
            reception: 'Reception Units maintain professional excellence 24/7. Enterprise packages available.',
            industrial: 'Industrial Workers increase productivity by 300%. ROI typically achieved within 6 months.',
            mercenary: 'Tactical units are restricted to authorized military contractors. Verification required.',
            spy: 'Infiltration models operate beyond legal boundaries. Proceed with extreme discretion.',
            saboteur: 'Disruption specialists leave no digital footprint. Deployment authorization classified.'
        };
        
        const response = responses[androidType] || 'Android specifications classified.';
        this.showMessage(response);
    }

    // Context-aware help system
    provideContextualHelp() {
        const helpMessages = {
            consumer: 'Browse our consumer catalog, customize android personalities, or schedule a home demonstration.',
            corporate: 'Enterprise solutions include bulk ordering, custom configurations, and 24/7 technical support.',
            secret: 'Classified operations require special authorization. All transactions are encrypted and untraceable.'
        };
        
        this.showMessage(helpMessages[this.currentMode]);
    }

    // Emergency protocols for secret mode
    initiateEmergencyProtocol() {
        if (this.currentMode === 'secret') {
            this.showMessage('EMERGENCY PROTOCOL INITIATED. PURGING SESSION DATA...', 'secret');
            
            setTimeout(() => {
                this.showMessage('SESSION TERMINATED. NO TRACE REMAINS.', 'secret');
            }, 2000);
        }
    }
}

// Initialize AI Guide
window.aiGuide = new AIGuide();

// Export for global access
window.AIGuide = AIGuide;
