import React from 'react';
import ReactDOM from 'react-dom/client';
import Counter from '../components/Counter';
declare const angular: any; // Add AngularJS type declaration

class CounterWebComponent extends HTMLElement {
    private reactRoot?: ReactDOM.Root;
    private currentAngularCallback: Function | null = null;
    private angularScope: any = null;

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

        // Find the AngularJS scope
        try {
            const ngElement = this.closest('[ng-controller]');
            if (ngElement) {
                // @ts-ignore - angular is from AngularJS global
                const scope = angular.element(ngElement).scope();
                const rootScope = angular.element(document.querySelector('[ng-app]')).injector().get('$rootScope');
                this.angularScope = { scope, rootScope };
            } else {
                console.error('No AngularJS controller found in ancestors');
            }
        } catch (error) {
            console.error('Error finding AngularJS scope:', error);
        }

        const initialCount = parseInt(this.getAttribute('initial-count') || '0', 10);

        const callAngularFunction = (newCount: number) => {
            this.dispatchEvent(new CustomEvent('reactToAngularEvent', { detail: { count: newCount } }));
        };

        this.currentAngularCallback = callAngularFunction;

        this.reactRoot.render(
            <React.StrictMode>
                <Counter 
                    initialCount={initialCount} 
                    angularCallback={callAngularFunction}
                    callAngularScopeFunction={(data) => {
                        if (this.angularScope?.scope) {
                            const { scope, rootScope } = this.angularScope;
                            if (!scope.$$phase && !rootScope.$$phase) {
                                scope.$apply(() => {
                                    scope.updateAngularFromReact(data);
                                });
                            } else {
                                scope.updateAngularFromReact(data);
                            }
                        } else {
                            console.error('No AngularJS scope available');
                        }
                    }}
                />
            </React.StrictMode>
        );
    }

    private unmount() {
        if (this.reactRoot) {
            this.reactRoot.unmount();
            this.reactRoot = undefined;
        }
        this.currentAngularCallback = null;
        this.angularScope = null;
    }
}

export default CounterWebComponent;
