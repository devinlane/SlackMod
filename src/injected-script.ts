(async function main() {
    if (!document || !document?.querySelector('.p-ia__sidebar_header__info')) {
        // try every 500ms until the document is ready
        await sleep(500);
        main();
    } else {
        let styleSheet = document.createElement("style")
        styleSheet.innerText = `
            .custom-menu_item__li button:hover {
                background-color: var(--p-huddle__hover_item);
                color: var(--p-huddle__active_item_text);
                text-decoration: none;
            }
        `;
        styleSheet.id = "slack-custom-theme"
        document.head.appendChild(styleSheet)
    
        addModsSubmenuToProfileMenu();
    }

})();

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// simulate a click on a node
function clickNodeBySelector(selector: HTMLElement  | null) {
    selector?.dispatchEvent(new Event("click", {bubbles:true}));
    console.log('clicked :)');
}

// create a new submenu item in the user menu
function addModsSubmenuToProfileMenu() {
    const body = document.querySelector('body') as HTMLBodyElement;

    function callback(mutationList: MutationRecord[], observer: MutationObserver) {
        mutationList.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if(body.classList.contains('ReactModal__Body--open')) {
                    const userMenu = document.querySelector('.ReactModal__Content div[role="presentation"] .c-menu__items') as HTMLDivElement;
                    const menuItem = document.createElement('div') as HTMLDivElement;

                    menuItem.className = 'c-menu_item__li custom-menu_item__li';
                    menuItem.setAttribute('data-qa', 'menu_item_button-wrapper');
                    menuItem.innerHTML = `<button class="c-button-unstyled c-menu_item__button" data-qa="menu_item_button" role="menuitem" tabindex="-1" type="button"><div class="c-menu_item__label">Mods</div></button>`;

                    menuItem.addEventListener('click', () => {
                        // open the 'preferences' modal
                        clickNodeBySelector(userMenu.querySelector(':nth-child(8) button'));
                    });
                    
                    userMenu.insertBefore(menuItem, userMenu.querySelector(':nth-child(9)'));
                }
            }
        })
    }

    // Listen for changes to the body element 
    // (when the profile modal is opened or closed it adds/removes the class 'ReactModal__Body--open' to the body element)
    const observer = new MutationObserver(callback)
    observer.observe(<Node>body, {
        attributes: true
    });
}