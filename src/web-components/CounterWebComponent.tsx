import React from 'react';
import ReactDOM from 'react-dom/client';
import Counter from '../components/Counter';

class CounterWebComponent extends HTMLElement {
    private reactRoot?: ReactDOM.Root;
    private currentAngularCallback: Function | null = null;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
                padding: 10px;
                border: 1px solid #ccc;
                font-family: Arial, sans-serif;
            }
        `;
        this.shadowRoot!.appendChild(style);
    }

    connectedCallback() {
        this.mount();
    }

    disconnectedCallback() {
        this.unmount();
    }

    static get observedAttributes() {
        return ['initial-count'];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (name === 'initial-count' && this.reactRoot) {
            this.unmount();
            this.mount();
        }
    }

    private mount() {
        if (!this.reactRoot) {
            this.reactRoot = ReactDOM.createRoot(this.shadowRoot!);
        }

        const initialCount = parseInt(this.getAttribute('initial-count') || '0', 10);

        const callAngularFunction = (newCount: number) => {
            this.dispatchEvent(new CustomEvent('reactToAngularEvent', { detail: { count: newCount } }));
        };

        this.currentAngularCallback = callAngularFunction;

        this.reactRoot.render(
            <React.StrictMode>
                <Counter initialCount={initialCount} angularCallback={callAngularFunction} />
            </React.StrictMode>
        );
    }

    private unmount() {
        if (this.reactRoot) {
            this.reactRoot.unmount();
            this.reactRoot = undefined;
        }
        this.currentAngularCallback = null;
    }
}

export default CounterWebComponent;
