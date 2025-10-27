import React from 'react';
import ReactDOM from 'react-dom/client';
import { FormRendererWrapper } from '../components/forms';

class FormRendererWebComponent extends HTMLElement {
    private reactRoot?: ReactDOM.Root;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.mount();
        this.addEventListener('onDataLoaded', this.handleDataLoaded);
    }

    disconnectedCallback() {
        this.unmount();
        this.removeEventListener('onDataLoaded', this.handleDataLoaded);
    }

    static get observedAttributes() {
        return ['stakeholder'];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (name === 'stakeholder' && oldValue !== newValue) {
            this.unmount();
            this.mount();
        }
    }

    private handleDataLoaded = (event: Event) => {
        const customEvent = event as CustomEvent;
        // Forward the event to the AngularJS world
        this.dispatchEvent(new CustomEvent('form-data-loaded', {
            bubbles: true,
            composed: true,
            detail: customEvent.detail
        }));
    }

    private mount() {
        if (!this.reactRoot) {
            this.reactRoot = ReactDOM.createRoot(this.shadowRoot!);
        }

        const stakeholder = this.getAttribute('stakeholder');

        this.reactRoot.render(
            <React.StrictMode>
                <FormRendererWrapper
                    stakeholder={stakeholder}
                    hostElement={this}
                />
            </React.StrictMode>
        );
    }

    private unmount() {
        if (this.reactRoot) {
            this.reactRoot.unmount();
            this.reactRoot = undefined;
        }
    }
}

export default FormRendererWebComponent;
