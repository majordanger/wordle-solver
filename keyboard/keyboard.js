const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    // eventHandlers: {
    //     oninput: null,
    //     onclose: null
    // },

    // properties: {
    //     value: "",
    //     capsLock: false
    // },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".tile").forEach(element => {
            element.addEventListener("focus", () => {
                this.open();
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            
            "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
            "A", "S", "D", "F", "G", "H", "J", "K", "L",
            "Z", "X", "C", "V", "B", "N", "M", "?",
            "done", "space", "backspace"
        ];

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["P", "L", "?"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        document.querySelector(".last-selected-tile").focus();
                        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Backspace'}));
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        document.querySelector(".last-selected-tile").focus();
                        document.dispatchEvent(new KeyboardEvent('keydown', {'key': ' '}));
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.textContent = 'CLOSE';
                    // keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                    });

                    break;

                default:
                    keyElement.textContent = key;

                    keyElement.addEventListener("click", (event) => {
                        document.querySelector(".last-selected-tile").focus();
                        document.dispatchEvent(new KeyboardEvent('keydown', {'key': key}));
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    // _triggerEvent(handlerName) {
    //     if (typeof this.eventHandlers[handlerName] == "function") {
    //         this.eventHandlers[handlerName](this.properties.value);
    //     }
    // },

    // _toggleCapsLock() {
    //     this.properties.capsLock = !this.properties.capsLock;

    //     for (const key of this.elements.keys) {
    //         if (key.childElementCount === 0) {
    //             key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
    //         }
    //     }
    // },

    open() {
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.elements.main.classList.add("keyboard--hidden");
    }
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});
