import CounterWebComponent from './CounterWebComponent';
import FormRendererWebComponent from './FormRendererWebComponent';

customElements.define('react-counter', CounterWebComponent);
customElements.define('form-renderer', FormRendererWebComponent);

export { CounterWebComponent, FormRendererWebComponent };