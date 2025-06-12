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
const app = new App();