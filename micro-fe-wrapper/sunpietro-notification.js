(function() {
    const template = document.createElement('template');

    template.innerHTML = `
<style>
    *,
    *:after,
    *:before {
        box-sizing: border-box;
    }

    #container {
        position: relative;
        padding: 8px 16px;
        border: 1px solid #ddd;
        color: #231231;
        display: grid;
        grid-template-areas: 
            'title btn'
            'message btn';
        grid-gap: 16px;
    }

    #title {
        grid-area: title;
    }
    
    #title-text {
        margin-top: 0;
    }

    #message {
        grid-area: message;
    }

    #btn {
        grid-area: btn;
        position: absolute;
        top: 0;
        right: -8px;
        font-size: 24px;
        background: none;
        border: 0;
        border-radius: 50%;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 32px;
        height: 32px;
        width: 32px;
        cursor: pointer;
        transition: background .2s ease-in-out, color .2s ease-in-out;
    }

    #btn:hover,
    #btn:focus {
        background: #eee;
        color: #fff;
    }

    #container[type="error"] {
        background: #dc3545;
        color: #fff;
    }

    #container[type="info"] {
        background: #17a2b8;
        color: #fff;
    }

    #container[type="success"] {
        background: #28a745;
        color: #fff;
    }

    #container[type="default"] {
        background: #6c757d;
        color: #fff;
    }

    #container[type="warning"] {
        background: #ffc107;
    }
</style>
<section id="container">
    <div id="title"><slot name="title"><h3 id="title-text">Notification title</h3></slot></div>
    <div id="message"><slot>Sample message</slot></div>
    <button type="button" id="btn">&times;</button>
</section>`;

    class Notification extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });

            this.shadowRoot.appendChild(template.content.cloneNode(true));
            this._onClose.bind(this);
        }

        get type() {
            return this.getAttribute('type');
        }

        set type(newValue) {
            this.setAttribute('type', newValue);
        }

        get hidden() {
            return this.getAttribute('hidden');
        }

        set hidden(newVal) {
            this.setAttribute('hidden', !!newVal);
        }

        static get observedAttributes() {
            return ['type'];
        }

        connectedCallback() {
            this.btnClose = this.shadowRoot.querySelector('#btn');
            this.container = this.shadowRoot.querySelector('#container');

            this.btnClose.addEventListener('click', this._onClose, false);

            if (!this.hasAttribute('type')) {
                this.setAttribute('type', 'default');
            }

            this.container.setAttribute('type', this.getAttribute('type'));
        }

        disconnectedCallback() {
            this.btnClose.removeEventListener('click', this._onClose);
        }

        attributesChangedCallback(name, oldVal, newVal) {
            console.log('attributesChangedCallback', { name, oldVal, newVal });
        }

        _onClose() {
            this.dispatchEvent(
                new CustomEvent('close', {
                    bubbles: true,
                    cancelable: false,
                    composed: true, // important! without it events cannot get out of web component
                    // https://developer.mozilla.org/en-US/docs/Web/API/Event/composed
                    detail: {}
                })
            );
        }
    }

    window.customElements.define('sunpietro-notification', Notification);
})();
