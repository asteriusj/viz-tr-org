

class CoolTimer extends HTMLElement {
    
  constructor() {
    // Always call parent constructor first
    super();

    // Get template content from DOM
    const template = document.getElementById("cool-timer");
    const templateContent = template.content;

    // Create new Shadow Root
    const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
      templateContent.cloneNode(true)
    );
  }
    
    // Called when the element is first connected to the DOM
  connectedCallback() {
    // `this` will always reference the custom element instance (which extends from HTMLElement, in this case)
    // First, get timer span reference
    const timerDisplay = this.shadowRoot.getElementById("timer");

    // Set a 'second' count at 0
    let elapsedSeconds = 0;

    // Every second, increment elapsed seconds and update timer display
    this.timer = setInterval(() => {
      elapsedSeconds++;
      timerDisplay.innerHTML = elapsedSeconds;
    }, 1000);
  }

  // Called when custom element is removed
  disconnectedCallback() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
  
  
}

customElements.define("cool-timer", CoolTimer);