// Modern JavaScript Demo - GitHub Copilot Agent Showcase
// Using ES2024+ features and cutting-edge Web APIs

// 🎯 Custom Web Component with Shadow DOM (ES2024)
class CustomCounter extends HTMLElement {
    #count = 0;
    #step = 1;
    #shadow;

    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'closed' });
        this.#count = parseInt(this.getAttribute('start')) || 0;
        this.#step = parseInt(this.getAttribute('step')) || 1;
        this.render();
    }

    render() {
        this.#shadow.innerHTML = `
            <style>
                .counter {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 15px;
                    background: linear-gradient(45deg, #4f46e5, #06b6d4);
                    border-radius: 12px;
                    color: white;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 18px;
                    font-weight: bold;
                }
                button {
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    color: white;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 18px;
                    transition: all 0.2s ease;
                }
                button:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(1.1);
                }
                .count {
                    min-width: 60px;
                    text-align: center;
                }
            </style>
            <div class="counter">
                <button id="dec">−</button>
                <span class="count">${this.#count}</span>
                <button id="inc">+</button>
            </div>
        `;

        this.#shadow.getElementById('inc').onclick = () => this.increment();
        this.#shadow.getElementById('dec').onclick = () => this.decrement();
    }

    increment() {
        this.#count += this.#step;
        this.updateDisplay();
    }

    decrement() {
        this.#count -= this.#step;
        this.updateDisplay();
    }

    updateDisplay() {
        const countElement = this.#shadow.querySelector('.count');
        countElement.textContent = this.#count;
        countElement.style.transform = 'scale(1.2)';
        setTimeout(() => countElement.style.transform = 'scale(1)', 150);
    }
}

// Register the custom element
customElements.define('custom-counter', CustomCounter);

// 🚀 Modern Event Handling with Async/Await and AbortController
class ModernEventHandler {
    #controller = new AbortController();

    constructor() {
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const signal = this.#controller.signal;

        // Smooth scrolling with modern event options
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', this.handleNavClick.bind(this), { 
                signal, 
                passive: false 
            });
        });

        // CTA Button with haptic feedback
        document.querySelector('.cta-button')?.addEventListener('click', 
            this.handleCTAClick.bind(this), { signal });

        // Performance-optimized scroll handling with throttling
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) return;
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
                scrollTimeout = null;
            }, 16); // ~60fps
        }, { signal, passive: true });
    }

    async handleNavClick(e) {
        e.preventDefault();
        
        // Add haptic feedback if available
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }

        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Modern smooth scrolling with options
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });

            // Update URL without page reload
            history.pushState(null, '', targetId);
        }
    }

    async handleCTAClick() {
        const target = document.querySelector('#demo');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }

    handleScroll() {
        const header = document.querySelector('header');
        const scrollY = window.scrollY;
        
        // Dynamic header styling based on scroll
        header.style.background = scrollY > 100 
            ? 'rgba(255, 255, 255, 0.98)' 
            : 'rgba(255, 255, 255, 0.95)';
        
        header.style.backdropFilter = scrollY > 100 ? 'blur(20px)' : 'blur(10px)';
    }

    destroy() {
        this.#controller.abort();
    }
}

// 🎮 Interactive Demo Functions
const DemoFunctions = {
    // AI Assistant Simulation
    async demonstrateAI() {
        const responses = [
            "🧠 Analyzing your request...",
            "✨ Generating optimized code...",
            "🚀 Code ready! Added interactive elements!",
            "💡 Tip: Try asking for responsive design patterns!"
        ];

        const card = event.target.closest('.feature-card');
        const demo = card.querySelector('.feature-demo');
        
        for (const response of responses) {
            demo.innerHTML = `<div class="ai-response">${response}</div>`;
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        setTimeout(() => {
            demo.innerHTML = '<button class="demo-btn" onclick="demonstrateAI()">Try AI Assistant</button>';
        }, 3000);
    },

    // Modern JavaScript Examples
    async showModernJS() {
        const examples = [
            "🔥 Optional Chaining: user?.profile?.name",
            "⚡ Nullish Coalescing: config ?? defaultConfig", 
            "🎯 Array.at(): items.at(-1)",
            "🚀 Top-level await: const data = await fetch(url)"
        ];

        const card = event.target.closest('.feature-card');
        const demo = card.querySelector('.feature-demo');
        
        for (const example of examples) {
            demo.innerHTML = `<code style="background: #f0f0f0; padding: 10px; border-radius: 5px; display: block; margin: 5px 0;">${example}</code>`;
            await new Promise(resolve => setTimeout(resolve, 1500));
        }
        
        setTimeout(() => {
            demo.innerHTML = '<button class="demo-btn" onclick="showModernJS()">See Examples</button>';
        }, 4000);
    },

    // Interactive Component Demo
    createInteractiveDemo() {
        const card = event.target.closest('.feature-card');
        const demo = card.querySelector('.feature-demo');
        
        demo.innerHTML = `
            <div style="text-align: center; padding: 15px;">
                <div id="live-demo" style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4); color: white; padding: 20px; border-radius: 10px; cursor: pointer; transition: transform 0.3s;">
                    Click me! 🎉
                </div>
            </div>
        `;

        const liveDemo = demo.querySelector('#live-demo');
        let clicks = 0;
        
        liveDemo.onclick = () => {
            clicks++;
            liveDemo.textContent = `Clicked ${clicks} times! 🚀`;
            liveDemo.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => liveDemo.style.transform = 'scale(1) rotate(0deg)', 200);
        };
    },

    // Deployment Simulation
    async simulateDeployment() {
        const steps = [
            "📦 Building project...",
            "🔍 Running tests...", 
            "🚀 Deploying to GitHub Pages...",
            "✅ Live at: https://yoursite.github.io"
        ];

        const card = event.target.closest('.feature-card');
        const demo = card.querySelector('.feature-demo');
        
        for (const step of steps) {
            demo.innerHTML = `<div style="color: #10b981; font-weight: 600;">${step}</div>`;
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        setTimeout(() => {
            demo.innerHTML = '<button class="demo-btn" onclick="simulateDeployment()">Deploy Now</button>';
        }, 3000);
    }
};

// Make demo functions globally available
Object.assign(window, DemoFunctions);

// 🎨 Advanced Animation Controller
class AnimationController {
    #observer;
    #animations = new Map();

    constructor() {
        this.setupIntersectionObserver();
        this.initializeAnimations();
    }

    setupIntersectionObserver() {
        this.#observer = new IntersectionObserver(
            entries => entries.forEach(entry => this.handleIntersection(entry)),
            { 
                threshold: [0.1, 0.5], 
                rootMargin: '0px 0px -50px 0px' 
            }
        );

        // Observe all animatable elements
        document.querySelectorAll('.feature-card, .demo-card, .spec-item')
            .forEach(el => this.observeElement(el));
    }

    observeElement(element) {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        this.#observer.observe(element);
    }

    handleIntersection(entry) {
        if (entry.isIntersecting) {
            const delay = Array.from(entry.target.parentElement.children)
                .indexOf(entry.target) * 100;
            
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, delay);
        }
    }

    initializeAnimations() {
        // Morphing shape animation
        window.morphShape = () => {
            const shape = document.getElementById('morphShape');
            if (!shape) return;
            
            const shapes = [
                { borderRadius: '50%', transform: 'rotate(180deg) scale(1.2)' },
                { borderRadius: '0%', transform: 'rotate(45deg) scale(0.8)' },
                { borderRadius: '25%', transform: 'rotate(90deg) scale(1.1)' },
                { borderRadius: '10px', transform: 'rotate(0deg) scale(1)' }
            ];
            
            const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
            Object.assign(shape.style, randomShape);
        };
    }
}

// 🔄 Real-time Features with Modern APIs
class RealTimeFeatures {
    #clockInterval;
    #batteryPromise;

    constructor() {
        this.initializeClock();
        this.initializeBattery();
        this.initializeFetchDemo();
    }

    initializeClock() {
        const updateClock = () => {
            const clockElement = document.getElementById('liveClock');
            if (clockElement) {
                const now = new Date();
                clockElement.textContent = now.toLocaleTimeString('en-US', {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });
            }
        };

        updateClock();
        this.#clockInterval = setInterval(updateClock, 1000);
    }

    async initializeBattery() {
        try {
            if ('getBattery' in navigator) {
                const battery = await navigator.getBattery();
                this.updateBatteryStatus(battery);
                
                battery.addEventListener('chargingchange', () => this.updateBatteryStatus(battery));
                battery.addEventListener('levelchange', () => this.updateBatteryStatus(battery));
            } else {
                this.showBatteryNotSupported();
            }
        } catch (error) {
            this.showBatteryNotSupported();
        }
    }

    updateBatteryStatus(battery) {
        const statusElement = document.getElementById('batteryStatus');
        if (statusElement) {
            const level = Math.round(battery.level * 100);
            const charging = battery.charging ? '⚡ Charging' : '🔋 Battery';
            statusElement.textContent = `${charging}: ${level}%`;
        }
    }

    showBatteryNotSupported() {
        const statusElement = document.getElementById('batteryStatus');
        if (statusElement) {
            statusElement.textContent = '🔋 Battery API not supported';
        }
    }

    initializeFetchDemo() {
        const fetchButton = document.getElementById('fetch-demo');
        const factDisplay = document.getElementById('fact-display');
        
        if (fetchButton && factDisplay) {
            fetchButton.onclick = async () => {
                fetchButton.disabled = true;
                fetchButton.textContent = 'Loading...';
                factDisplay.textContent = 'Fetching an interesting fact...';
                
                try {
                    // Using a fun fact API
                    const response = await fetch('https://api.api-ninjas.com/v1/facts', {
                        headers: { 'X-Api-Key': 'demo' } // This is a demo key
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        factDisplay.textContent = data[0]?.fact || 'Here\'s a fact: JavaScript is awesome!';
                    } else {
                        throw new Error('API request failed');
                    }
                } catch (error) {
                    // Fallback facts
                    const fallbackFacts = [
                        "JavaScript was created in just 10 days by Brendan Eich in 1995!",
                        "The name 'JavaScript' was chosen for marketing reasons, despite having little to do with Java.",
                        "Node.js allows JavaScript to run on servers, not just browsers.",
                        "ES2024 introduces new features like Array.fromAsync() and Promise.withResolvers()!",
                        "Web Components allow you to create reusable custom HTML elements!"
                    ];
                    factDisplay.textContent = fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)];
                }
                
                fetchButton.disabled = false;
                fetchButton.textContent = 'Fetch Random Fact';
            };
        }
    }

    destroy() {
        if (this.#clockInterval) {
            clearInterval(this.#clockInterval);
        }
    }
}

// 🎮 Code Playground with Dynamic Execution
class CodePlayground {
    #editor;
    #output;

    constructor() {
        this.#editor = document.getElementById('codeEditor');
        this.#output = document.getElementById('output');
        this.setupPlayground();
    }

    setupPlayground() {
        // Global functions for the playground
        window.runCode = () => this.executeCode();
        window.clearOutput = () => this.clearOutput();
        window.loadExample = (type) => this.loadExample(type);
    }

    executeCode() {
        if (!this.#editor || !this.#output) return;
        
        const code = this.#editor.value;
        this.clearOutput();
        
        try {
            // Create a safe execution context
            const func = new Function('document', 'console', code);
            
            // Mock console for output capture
            const mockConsole = {
                log: (...args) => {
                    const div = document.createElement('div');
                    div.textContent = args.join(' ');
                    div.style.cssText = 'margin: 5px 0; padding: 5px; background: #f0f0f0; border-radius: 3px;';
                    this.#output.appendChild(div);
                }
            };
            
            // Execute with limited document access
            func(document, mockConsole);
            
        } catch (error) {
            const errorDiv = document.createElement('div');
            errorDiv.textContent = `Error: ${error.message}`;
            errorDiv.style.cssText = 'color: #ef4444; background: #fef2f2; padding: 10px; border-radius: 5px; margin: 5px 0;';
            this.#output.appendChild(errorDiv);
        }
    }

    clearOutput() {
        if (this.#output) {
            this.#output.innerHTML = '';
        }
    }

    loadExample(type) {
        const examples = {
            voice: `// 🎙️ Voice Recognition Example
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    const button = document.createElement('button');
    button.textContent = '🎙️ Start Listening';
    button.style.cssText = 'padding: 12px 24px; background: #10b981; color: white; border: none; border-radius: 8px; cursor: pointer; margin: 10px;';
    
    button.onclick = () => {
        recognition.start();
        button.textContent = '🎤 Listening...';
    };
    
    recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        const div = document.createElement('div');
        div.textContent = \`You said: "\${result}"\`;
        div.style.cssText = 'padding: 10px; background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; margin: 10px 0; color: #1e40af;';
        document.querySelector('#output').appendChild(div);
        button.textContent = '🎙️ Start Listening';
    };
    
    document.querySelector('#output').appendChild(button);
} else {
    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Speech recognition not supported in this browser';
    errorDiv.style.cssText = 'padding: 10px; background: #fef2f2; border: 1px solid #ef4444; border-radius: 8px; margin: 10px 0; color: #dc2626;';
    document.querySelector('#output').appendChild(errorDiv);
}`,

            camera: `// 📷 Camera Access Example
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.createElement('video');
        video.srcObject = stream;
        video.autoplay = true;
        video.style.cssText = 'width: 100%; max-width: 300px; border-radius: 10px; margin: 10px 0;';
        
        const stopBtn = document.createElement('button');
        stopBtn.textContent = '⏹️ Stop Camera';
        stopBtn.style.cssText = 'padding: 8px 16px; background: #ef4444; color: white; border: none; border-radius: 6px; margin: 10px;';
        stopBtn.onclick = () => {
            stream.getTracks().forEach(track => track.stop());
            video.remove();
            stopBtn.remove();
        };
        
        document.querySelector('#output').appendChild(video);
        document.querySelector('#output').appendChild(stopBtn);        } catch (error) {
            const errorDiv = document.createElement('div');
            errorDiv.textContent = 'Camera access denied or not available';
            errorDiv.style.cssText = 'padding: 10px; background: #fef2f2; border: 1px solid #ef4444; border-radius: 8px; margin: 10px 0; color: #dc2626;';
            document.querySelector('#output').appendChild(errorDiv);
        }
}

startCamera();`,

            geolocation: `// 📍 Geolocation Example
if (navigator.geolocation) {
    const button = document.createElement('button');
    button.textContent = '📍 Get Location';
    button.style.cssText = 'padding: 12px 24px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; margin: 10px;';
    
    button.onclick = () => {
        button.textContent = '📡 Getting location...';
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const div = document.createElement('div');
                div.innerHTML = \`
                    <strong>Your Location:</strong><br>
                    Latitude: \${latitude.toFixed(4)}<br>
                    Longitude: \${longitude.toFixed(4)}
                \`;
                div.style.cssText = 'padding: 15px; background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; margin: 10px 0; color: #065f46;';
                document.querySelector('#output').appendChild(div);
                button.textContent = '📍 Get Location';
            },
            (error) => {
                const errorDiv = document.createElement('div');
                errorDiv.textContent = 'Location access denied or not available';
                errorDiv.style.cssText = 'padding: 10px; background: #fef2f2; border: 1px solid #ef4444; border-radius: 8px; margin: 10px 0; color: #dc2626;';
                document.querySelector('#output').appendChild(errorDiv);
                button.textContent = '📍 Get Location';
            }
        );
    };
    
    document.querySelector('#output').appendChild(button);
} else {
    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Geolocation not supported in this browser';
    errorDiv.style.cssText = 'padding: 10px; background: #fef2f2; border: 1px solid #ef4444; border-radius: 8px; margin: 10px 0; color: #dc2626;';
    document.querySelector('#output').appendChild(errorDiv);
}`,

            websocket: `// 🔗 Real-time Data Simulation
class RealTimeDataDemo {
    constructor() {
        this.setupDemo();
    }
    
    setupDemo() {
        const container = document.createElement('div');
        container.style.cssText = 'padding: 20px; background: #f8fafc; border-radius: 10px; margin: 10px 0;';
        
        const title = document.createElement('h4');
        title.textContent = '📊 Live Data Stream';
        title.style.cssText = 'margin: 0 0 15px 0; color: #1f2937; font-weight: bold;';
        
        const dataDisplay = document.createElement('div');
        dataDisplay.id = 'live-data';
        dataDisplay.style.cssText = 'font-family: monospace; font-size: 14px; line-height: 1.6;';
        
        container.appendChild(title);
        container.appendChild(dataDisplay);
        document.querySelector('#output').appendChild(container);
        
        this.startDataStream();
    }
    
    startDataStream() {
        let count = 0;
        const interval = setInterval(() => {
            const timestamp = new Date().toLocaleTimeString();
            const randomValue = Math.floor(Math.random() * 100);
            const status = randomValue > 70 ? '🟢 High' : randomValue > 30 ? '🟡 Medium' : '🔴 Low';
            
            const dataLine = document.createElement('div');
            dataLine.textContent = \`[\${timestamp}] Value: \${randomValue} \${status}\`;
            dataLine.style.cssText = 'padding: 2px 0; border-left: 3px solid #3b82f6; padding-left: 8px; margin: 2px 0; color: #1f2937; background: rgba(59, 130, 246, 0.05);';
            
            const display = document.getElementById('live-data');
            if (display) {
                display.appendChild(dataLine);
                display.scrollTop = display.scrollHeight;
                
                // Keep only last 10 entries
                if (display.children.length > 10) {
                    display.removeChild(display.firstChild);
                }
            }
            
            count++;
            if (count > 20) {
                clearInterval(interval);
                const endMsg = document.createElement('div');
                endMsg.textContent = '📡 Data stream ended';
                endMsg.style.cssText = 'color: #6b7280; font-style: italic; margin-top: 10px;';
                display?.appendChild(endMsg);
            }
        }, 500);
    }
}

new RealTimeDataDemo();`
        };

        if (this.#editor && examples[type]) {
            this.#editor.value = examples[type];
            this.#editor.focus();
        }
    }
}

// 🚀 Application Initialization
class App {
    #eventHandler;
    #animationController;
    #realTimeFeatures;
    #codePlayground;

    constructor() {
        this.initialize();
    }

    async initialize() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            await new Promise(resolve => 
                document.addEventListener('DOMContentLoaded', resolve)
            );
        }

        // Initialize all modules
        this.#eventHandler = new ModernEventHandler();
        this.#animationController = new AnimationController();
        this.#realTimeFeatures = new RealTimeFeatures();
        this.#codePlayground = new CodePlayground();

        // Set build time in footer
        this.updateBuildTime();
        
        // Initialize easter egg
        this.initializeEasterEgg();

        console.log('🚀 GitHub Copilot Agent demo initialized with modern JavaScript!');
    }

    updateBuildTime() {
        const buildTimeElement = document.getElementById('buildTime');
        if (buildTimeElement) {
            buildTimeElement.textContent = `Built ${new Date().toLocaleDateString()}`;
        }
    }

    initializeEasterEgg() {
        let sequence = [];
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        
        document.addEventListener('keydown', (e) => {
            sequence.push(e.code);
            if (sequence.length > konamiCode.length) {
                sequence.shift();
            }
            
            if (sequence.join(',') === konamiCode.join(',')) {
                this.activateEasterEgg();
                sequence = [];
            }
        });
    }

    activateEasterEgg() {
        // Create floating emoji effect
        const emojis = ['🤖', '⚡', '🚀', '✨', '🎉', '💻', '🔥'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                emoji.style.cssText = `
                    position: fixed;
                    top: -50px;
                    left: ${Math.random() * 100}vw;
                    font-size: 2rem;
                    pointer-events: none;
                    z-index: 9999;
                    animation: fall 3s linear forwards;
                `;
                
                document.body.appendChild(emoji);
                
                setTimeout(() => emoji.remove(), 3000);
            }, i * 100);
        }
        
        // Add the fall animation
        if (!document.getElementById('fall-animation')) {
            const style = document.createElement('style');
            style.id = 'fall-animation';
            style.textContent = `
                @keyframes fall {
                    to {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Rainbow effect
        document.body.style.animation = 'rainbow 2s ease infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 4000);
        
        console.log('🎉 Easter egg activated! Konami code detected!');
    }

    destroy() {
        this.#eventHandler?.destroy();
        this.#realTimeFeatures?.destroy();
    }
}

// 🎯 Initialize the application
const app = new App();