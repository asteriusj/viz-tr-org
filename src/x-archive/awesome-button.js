const template = document.createElement('template')
template.innerHTML = `
  <style>
    button {
      background-color: var(--awesome-button-background, white);
    }
  </style>
  <button></button>
`;

class AwesomeButton extends HTMLElement {
  static get observedAttributes() {
    return ['disabled']
  }

  connectedCallback() {
    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  attributesChangedCallback(name, oldVal, newVal) {
    name === 'disabled' &&
    ShadyCSS &&
    ShadyCSS.styleDocument({
      '--awesome-button-background' : newVal ? 'grey' : 'white',
    });
  }
}