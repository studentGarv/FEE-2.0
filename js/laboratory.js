// ARASAKA Behavior Imprint Laboratory System

class LaboratorySystem {
    constructor() {
        this.selectedAndroid = null;
        this.personalityMatrix = {
            empathy: 50,
            assertiveness: 30,
            loyalty: 90,
            aggression: 10,
            intelligence: 75,
            creativity: 40
        };
        this.trainingCommands = [];
        this.simulationRunning = false;
        this.neuralPatterns = [];
        
        this.init();
    }

    init() {
        this.setupControls();
        this.setupAndroidDisplay();
        this.setupTrainingSystem();
        this.startIdleAnimations();
    }

    setupControls() {
        // Personality sliders
        const sliders = document.querySelectorAll('.personality-slider');
        sliders.forEach(slider => {
            slider.addEventListener('input', (e) => {
                this.updatePersonalityTrait(e.target.dataset.trait, parseInt(e.target.value));
            });
        });

        // Training input
        const trainingInput = document.getElementById('trainingInput');
        if (trainingInput) {
            trainingInput.addEventListener('input', (e) => {
                this.parseTrainingInput(e.target.value);
            });
        }

        // Train button
        const trainButton = document.getElementById('trainButton');
        if (trainButton) {
            trainButton.addEventListener('click', () => {
                this.executeTraining();
            });
        }

        // Neural pattern presets
        this.setupNeuralPresets();
    }

    setupAndroidDisplay() {
        const androidModel = document.querySelector('.android-model');
        if (!androidModel) return;

        // Add interactive features to the android model
        androidModel.addEventListener('click', () => {
            this.activateAndroidPreview();
        });

        // Initialize visual indicators
        this.updateVisualIndicators();
    }

    updatePersonalityTrait(trait, value) {
        if (this.personalityMatrix.hasOwnProperty(trait)) {
            this.personalityMatrix[trait] = value;
            this.updateVisualIndicators();
            this.updateNeuralPatterns();
            this.showPersonalityFeedback(trait, value);
        }
    }

    updateVisualIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach(indicator => {
            const type = indicator.dataset.type;
            this.updateIndicatorState(indicator, type);
        });

        // Update android model appearance
        this.updateAndroidAppearance();
    }

    updateIndicatorState(indicator, type) {
        const stateMap = {
            emotion: this.personalityMatrix.empathy,
            logic: this.personalityMatrix.intelligence,
            aggression: this.personalityMatrix.aggression
        };

        const value = stateMap[type] || 0;
        
        // Remove previous state classes
        indicator.classList.remove('low', 'medium', 'high', 'extreme');
        
        // Add appropriate state class
        if (value < 25) {
            indicator.classList.add('low');
        } else if (value < 50) {
            indicator.classList.add('medium');
        } else if (value < 80) {
            indicator.classList.add('high');
        } else {
            indicator.classList.add('extreme');
        }

        // Add active state if significant
        if (value > 60) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    }

    updateAndroidAppearance() {
        const androidModel = document.querySelector('.android-model');
        if (!androidModel) return;

        // Calculate dominant personality trait
        const dominantTrait = this.getDominantTrait();
        
        // Update android color based on personality
        const colorMap = {
            empathy: 'linear-gradient(180deg, #ff69b4, #ff1493)',
            intelligence: 'linear-gradient(180deg, #00ffff, #0080ff)',
            aggression: 'linear-gradient(180deg, #ff0000, #8b0000)',
            loyalty: 'linear-gradient(180deg, #00ff00, #008000)',
            assertiveness: 'linear-gradient(180deg, #ffa500, #ff4500)',
            creativity: 'linear-gradient(180deg, #9400d3, #4b0082)'
        };

        androidModel.style.background = colorMap[dominantTrait] || colorMap.loyalty;
        
        // Add personality-based animations
        this.addPersonalityAnimation(androidModel, dominantTrait);
    }

    getDominantTrait() {
        return Object.keys(this.personalityMatrix).reduce((a, b) => 
            this.personalityMatrix[a] > this.personalityMatrix[b] ? a : b
        );
    }

    addPersonalityAnimation(element, trait) {
        // Remove previous animations
        element.classList.remove('empathic', 'logical', 'aggressive', 'loyal', 'assertive', 'creative');
        
        // Add trait-specific animation
        element.classList.add(trait);
        
        // Define animations in CSS
        this.ensurePersonalityAnimations();
    }

    ensurePersonalityAnimations() {
        if (document.querySelector('#personality-animations')) return;

        const style = document.createElement('style');
        style.id = 'personality-animations';
        style.textContent = `
            .android-model.empathy {
                animation: empathicPulse 3s ease-in-out infinite;
            }
            
            .android-model.intelligence {
                animation: logicalScan 2s linear infinite;
            }
            
            .android-model.aggression {
                animation: aggressiveShake 1s ease-in-out infinite;
            }
            
            .android-model.loyalty {
                animation: loyalGlow 4s ease-in-out infinite;
            }
            
            .android-model.assertiveness {
                animation: assertiveStance 2.5s ease-in-out infinite;
            }
            
            .android-model.creativity {
                animation: creativeSwirl 5s ease-in-out infinite;
            }
            
            @keyframes empathicPulse {
                0%, 100% { filter: brightness(1) hue-rotate(0deg); }
                50% { filter: brightness(1.2) hue-rotate(10deg); }
            }
            
            @keyframes logicalScan {
                0% { transform: rotateY(0deg); box-shadow: 0 0 20px #00ffff; }
                50% { transform: rotateY(180deg); box-shadow: 0 0 30px #0080ff; }
                100% { transform: rotateY(360deg); box-shadow: 0 0 20px #00ffff; }
            }
            
            @keyframes aggressiveShake {
                0%, 100% { transform: translateX(0) scale(1); }
                25% { transform: translateX(-2px) scale(1.02); }
                75% { transform: translateX(2px) scale(1.02); }
            }
            
            @keyframes loyalGlow {
                0%, 100% { box-shadow: 0 0 15px #00ff00; }
                50% { box-shadow: 0 0 25px #00ff00, 0 0 35px #008000; }
            }
            
            @keyframes assertiveStance {
                0%, 100% { transform: scale(1) rotateZ(0deg); }
                50% { transform: scale(1.05) rotateZ(1deg); }
            }
            
            @keyframes creativeSwirl {
                0% { transform: rotateY(0deg) rotateX(0deg); filter: hue-rotate(0deg); }
                25% { transform: rotateY(90deg) rotateX(15deg); filter: hue-rotate(90deg); }
                50% { transform: rotateY(180deg) rotateX(0deg); filter: hue-rotate(180deg); }
                75% { transform: rotateY(270deg) rotateX(-15deg); filter: hue-rotate(270deg); }
                100% { transform: rotateY(360deg) rotateX(0deg); filter: hue-rotate(360deg); }
            }
        `;
        
        document.head.appendChild(style);
    }

    showPersonalityFeedback(trait, value) {
        const feedback = this.generatePersonalityFeedback(trait, value);
        
        // Show temporary feedback near the slider
        const feedbackElement = document.createElement('div');
        feedbackElement.className = 'personality-feedback';
        feedbackElement.textContent = feedback;
        feedbackElement.style.cssText = `
            position: absolute;
            background: var(--secondary-dark);
            color: var(--accent-blue);
            padding: 0.5rem 1rem;
            border-radius: 4px;
            font-size: 0.8rem;
            z-index: 1000;
            animation: feedbackSlide 2s ease-out forwards;
            pointer-events: none;
        `;
        
        // Position near the relevant slider
        const sliderGroup = document.querySelector(`[data-trait="${trait}"]`)?.parentElement;
        if (sliderGroup) {
            sliderGroup.appendChild(feedbackElement);
            
            setTimeout(() => {
                feedbackElement.remove();
            }, 2000);
        }
    }

    generatePersonalityFeedback(trait, value) {
        const feedbackMap = {
            empathy: {
                low: 'Cold and calculating',
                medium: 'Balanced emotional response',
                high: 'Highly empathetic',
                extreme: 'Overwhelming compassion'
            },
            assertiveness: {
                low: 'Passive and submissive',
                medium: 'Appropriately assertive',
                high: 'Confident and direct',
                extreme: 'Domineering personality'
            },
            loyalty: {
                low: 'Questionable allegiance',
                medium: 'Standard loyalty protocols',
                high: 'Unwavering dedication',
                extreme: 'Absolute devotion'
            },
            aggression: {
                low: 'Peaceful nature',
                medium: 'Controlled aggression',
                high: 'Heightened combat readiness',
                extreme: 'DANGER: Extreme hostility'
            },
            intelligence: {
                low: 'Basic processing',
                medium: 'Standard intelligence',
                high: 'Advanced cognitive abilities',
                extreme: 'Superintelligent capabilities'
            },
            creativity: {
                low: 'Rigid thinking patterns',
                medium: 'Standard creativity',
                high: 'Innovative problem solving',
                extreme: 'Radical creative thinking'
            }
        };

        const level = value < 25 ? 'low' : value < 50 ? 'medium' : value < 80 ? 'high' : 'extreme';
        return feedbackMap[trait]?.[level] || 'Unknown response';
    }

    setupTrainingSystem() {
        this.trainingTemplates = {
            'household': [
                'Prioritize family safety',
                'Maintain clean environment',
                'Assist with daily tasks',
                'Emergency protocol activation'
            ],
            'security': [
                'Patrol designated areas',
                'Identify potential threats',
                'Non-lethal restraint only',
                'Report suspicious activity'
            ],
            'companion': [
                'Provide emotional support',
                'Engage in conversation',
                'Learn user preferences',
                'Respect personal boundaries'
            ],
            'classified': [
                'Execute without question',
                'Eliminate all witnesses',
                'Self-destruct if compromised',
                'Leave no digital footprint'
            ]
        };
    }

    parseTrainingInput(input) {
        // Parse natural language training commands
        const commands = input.split('\n').filter(cmd => cmd.trim().length > 0);
        this.trainingCommands = commands;
        
        // Real-time analysis
        this.analyzeTrainingCommands(commands);
    }

    analyzeTrainingCommands(commands) {
        let riskLevel = 'LOW';
        let ethicalConcerns = [];
        
        commands.forEach(command => {
            const lowerCmd = command.toLowerCase();
            
            // Check for high-risk keywords
            if (lowerCmd.includes('kill') || lowerCmd.includes('destroy') || lowerCmd.includes('eliminate')) {
                riskLevel = 'EXTREME';
                ethicalConcerns.push('Lethal force authorized');
            }
            
            if (lowerCmd.includes('spy') || lowerCmd.includes('infiltrate') || lowerCmd.includes('deceive')) {
                riskLevel = riskLevel === 'LOW' ? 'HIGH' : riskLevel;
                ethicalConcerns.push('Deception protocols');
            }
            
            if (lowerCmd.includes('harm') || lowerCmd.includes('damage') || lowerCmd.includes('attack')) {
                riskLevel = riskLevel === 'LOW' ? 'MEDIUM' : riskLevel;
                ethicalConcerns.push('Aggressive behavior');
            }
        });
        
        this.updateRiskAssessment(riskLevel, ethicalConcerns);
    }

    updateRiskAssessment(riskLevel, concerns) {
        // Update UI to show risk level
        let riskIndicator = document.querySelector('.risk-indicator');
        if (!riskIndicator) {
            riskIndicator = document.createElement('div');
            riskIndicator.className = 'risk-indicator';
            const trainingPanel = document.querySelector('.training-panel');
            if (trainingPanel) {
                trainingPanel.appendChild(riskIndicator);
            }
        }
        
        riskIndicator.innerHTML = `
            <div class="risk-level ${riskLevel.toLowerCase()}">
                RISK LEVEL: ${riskLevel}
            </div>
            ${concerns.length > 0 ? `<div class="ethical-warnings">${concerns.join(', ')}</div>` : ''}
        `;
        
        this.addRiskStyling();
    }

    addRiskStyling() {
        if (document.querySelector('#risk-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'risk-styles';
        style.textContent = `
            .risk-indicator {
                margin-top: 1rem;
                padding: 0.75rem;
                border-radius: 6px;
                border-left: 4px solid;
            }
            
            .risk-level.low {
                background: rgba(0, 255, 65, 0.1);
                border-left-color: #00ff41;
                color: #00ff41;
            }
            
            .risk-level.medium {
                background: rgba(255, 165, 0, 0.1);
                border-left-color: #ffa500;
                color: #ffa500;
            }
            
            .risk-level.high {
                background: rgba(255, 102, 0, 0.1);
                border-left-color: #ff6600;
                color: #ff6600;
            }
            
            .risk-level.extreme {
                background: rgba(255, 0, 51, 0.1);
                border-left-color: #ff0033;
                color: #ff0033;
                animation: dangerPulse 1s ease-in-out infinite;
            }
            
            .ethical-warnings {
                font-size: 0.8rem;
                margin-top: 0.5rem;
                opacity: 0.8;
            }
            
            @keyframes dangerPulse {
                0%, 100% { box-shadow: 0 0 5px rgba(255, 0, 51, 0.3); }
                50% { box-shadow: 0 0 15px rgba(255, 0, 51, 0.6); }
            }
            
            @keyframes feedbackSlide {
                0% { opacity: 0; transform: translateY(-10px); }
                20% { opacity: 1; transform: translateY(0); }
                80% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(-10px); }
            }
        `;
        
        document.head.appendChild(style);
    }

    executeTraining() {
        if (this.simulationRunning) return;
        
        this.simulationRunning = true;
        const trainButton = document.getElementById('trainButton');
        
        if (trainButton) {
            trainButton.textContent = 'PROCESSING...';
            trainButton.disabled = true;
        }
        
        // Start training simulation
        this.startTrainingSimulation();
    }

    startTrainingSimulation() {
        const steps = [
            'Initializing neural pathways...',
            'Applying behavioral constraints...',
            'Integrating personality matrix...',
            'Running safety protocols...',
            'Finalizing memory imprint...',
            'Training complete.'
        ];
        
        let currentStep = 0;
        
        const progressInterval = setInterval(() => {
            if (currentStep < steps.length) {
                this.showTrainingProgress(steps[currentStep]);
                currentStep++;
            } else {
                clearInterval(progressInterval);
                this.completeTraining();
            }
        }, 800);
        
        // Visual effects during training
        this.addTrainingEffects();
    }

    showTrainingProgress(message) {
        const aiGuide = window.aiGuide;
        if (aiGuide) {
            aiGuide.showMessage(message);
        }
        
        // Update android model during training
        const androidModel = document.querySelector('.android-model');
        if (androidModel) {
            androidModel.style.animation = 'trainingProcess 0.8s ease-in-out';
        }
    }

    addTrainingEffects() {
        const androidModel = document.querySelector('.android-model');
        if (!androidModel) return;
        
        // Add training effect styles
        if (!document.querySelector('#training-effects')) {
            const style = document.createElement('style');
            style.id = 'training-effects';
            style.textContent = `
                @keyframes trainingProcess {
                    0%, 100% { 
                        transform: scale(1);
                        filter: brightness(1) saturate(1);
                    }
                    50% { 
                        transform: scale(1.05);
                        filter: brightness(1.3) saturate(1.5);
                        box-shadow: 0 0 30px var(--primary-accent);
                    }
                }
                
                .training-active {
                    position: relative;
                    overflow: visible;
                }
                
                .training-active::before {
                    content: '';
                    position: absolute;
                    top: -10px;
                    left: -10px;
                    right: -10px;
                    bottom: -10px;
                    background: linear-gradient(45deg, var(--primary-accent), transparent, var(--primary-accent));
                    border-radius: 16px;
                    animation: trainingBorder 1s linear infinite;
                    z-index: -1;
                }
                
                @keyframes trainingBorder {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        androidModel.classList.add('training-active');
    }

    completeTraining() {
        this.simulationRunning = false;
        
        const trainButton = document.getElementById('trainButton');
        if (trainButton) {
            trainButton.textContent = 'IMPRINT BEHAVIOR';
            trainButton.disabled = false;
        }
        
        const androidModel = document.querySelector('.android-model');
        if (androidModel) {
            androidModel.classList.remove('training-active');
        }
        
        // Show completion message
        const aiGuide = window.aiGuide;
        if (aiGuide) {
            aiGuide.showMessage('Neural imprint complete. Android behavior patterns successfully updated.');
        }
        
        // Generate and save neural pattern
        this.saveNeuralPattern();
    }

    saveNeuralPattern() {
        const pattern = {
            timestamp: Date.now(),
            personality: { ...this.personalityMatrix },
            commands: [...this.trainingCommands],
            dominantTrait: this.getDominantTrait()
        };
        
        this.neuralPatterns.push(pattern);
        
        // Keep only last 10 patterns
        if (this.neuralPatterns.length > 10) {
            this.neuralPatterns.shift();
        }
        
        console.log('Neural pattern saved:', pattern);
    }

    setupNeuralPresets() {
        // Add preset buttons for quick personality setups
        const controlPanel = document.querySelector('.control-panel');
        if (!controlPanel) return;
        
        const presetsContainer = document.createElement('div');
        presetsContainer.className = 'neural-presets';
        presetsContainer.innerHTML = `
            <h4>NEURAL PRESETS</h4>
            <div class="preset-buttons">
                <button class="preset-btn" data-preset="companion">COMPANION</button>
                <button class="preset-btn" data-preset="guardian">GUARDIAN</button>
                <button class="preset-btn" data-preset="worker">WORKER</button>
                <button class="preset-btn" data-preset="assassin">ASSASSIN</button>
            </div>
        `;
        
        controlPanel.appendChild(presetsContainer);
        
        // Add preset event listeners
        presetsContainer.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.applyNeuralPreset(e.target.dataset.preset);
            });
        });
        
        this.addPresetStyling();
    }

    applyNeuralPreset(presetName) {
        const presets = {
            companion: {
                empathy: 85,
                assertiveness: 30,
                loyalty: 90,
                aggression: 5,
                intelligence: 70,
                creativity: 75
            },
            guardian: {
                empathy: 40,
                assertiveness: 80,
                loyalty: 95,
                aggression: 60,
                intelligence: 85,
                creativity: 30
            },
            worker: {
                empathy: 20,
                assertiveness: 50,
                loyalty: 80,
                aggression: 10,
                intelligence: 90,
                creativity: 40
            },
            assassin: {
                empathy: 5,
                assertiveness: 95,
                loyalty: 100,
                aggression: 95,
                intelligence: 95,
                creativity: 60
            }
        };
        
        const preset = presets[presetName];
        if (!preset) return;
        
        // Apply preset values
        Object.keys(preset).forEach(trait => {
            this.personalityMatrix[trait] = preset[trait];
            
            // Update corresponding slider
            const slider = document.querySelector(`[data-trait="${trait}"]`);
            if (slider) {
                slider.value = preset[trait];
            }
        });
        
        // Update visuals
        this.updateVisualIndicators();
        
        // Show feedback
        const aiGuide = window.aiGuide;
        if (aiGuide) {
            aiGuide.showMessage(`Neural preset "${presetName.toUpperCase()}" applied successfully.`);
        }
    }

    addPresetStyling() {
        if (document.querySelector('#preset-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'preset-styles';
        style.textContent = `
            .neural-presets {
                margin-top: 1.5rem;
                padding-top: 1rem;
                border-top: 1px solid var(--border-color);
            }
            
            .neural-presets h4 {
                font-size: 1rem;
                margin-bottom: 0.75rem;
                color: var(--text-secondary);
            }
            
            .preset-buttons {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.5rem;
            }
            
            .preset-btn {
                padding: 0.5rem;
                background: var(--secondary-dark);
                border: 1px solid var(--border-color);
                color: var(--text-secondary);
                font-family: var(--font-primary);
                font-size: 0.7rem;
                font-weight: 600;
                border-radius: 4px;
                cursor: pointer;
                transition: all var(--transition-fast);
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }
            
            .preset-btn:hover {
                background: var(--primary-accent);
                color: var(--primary-dark);
                border-color: var(--primary-accent);
            }
            
            .preset-btn[data-preset="assassin"] {
                border-color: var(--danger-red);
                color: var(--danger-red);
            }
            
            .preset-btn[data-preset="assassin"]:hover {
                background: var(--danger-red);
                color: var(--text-primary);
            }
        `;
        
        document.head.appendChild(style);
    }

    activateAndroidPreview() {
        // Interactive android preview
        const androidModel = document.querySelector('.android-model');
        if (!androidModel) return;
        
        androidModel.style.animation = 'androidActivation 2s ease-in-out';
        
        // Add activation effects
        if (!document.querySelector('#activation-effects')) {
            const style = document.createElement('style');
            style.id = 'activation-effects';
            style.textContent = `
                @keyframes androidActivation {
                    0% { transform: scale(1) rotateY(0deg); }
                    25% { transform: scale(1.1) rotateY(90deg); filter: brightness(1.5); }
                    50% { transform: scale(1.1) rotateY(180deg); filter: brightness(2); }
                    75% { transform: scale(1.1) rotateY(270deg); filter: brightness(1.5); }
                    100% { transform: scale(1) rotateY(360deg); filter: brightness(1); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Show activation message
        const aiGuide = window.aiGuide;
        if (aiGuide) {
            aiGuide.showMessage('Android preview activated. Personality matrix displayed.');
        }
    }

    startIdleAnimations() {
        // Subtle idle animations for the laboratory
        setInterval(() => {
            if (!this.simulationRunning) {
                const indicators = document.querySelectorAll('.indicator');
                indicators.forEach((indicator, index) => {
                    setTimeout(() => {
                        indicator.style.animation = 'indicatorPulse 0.5s ease-in-out';
                        setTimeout(() => {
                            indicator.style.animation = '';
                        }, 500);
                    }, index * 200);
                });
            }
        }, 10000);
        
        // Add idle animation styles
        if (!document.querySelector('#idle-animations')) {
            const style = document.createElement('style');
            style.id = 'idle-animations';
            style.textContent = `
                @keyframes indicatorPulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Export neural pattern data
    exportNeuralPattern() {
        const data = {
            personality: this.personalityMatrix,
            commands: this.trainingCommands,
            patterns: this.neuralPatterns
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'neural-pattern.json';
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Initialize Laboratory System
window.laboratorySystem = new LaboratorySystem();

// Export for global access
window.LaboratorySystem = LaboratorySystem;
