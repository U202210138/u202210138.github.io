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

