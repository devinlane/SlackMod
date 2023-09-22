(async function main() {
    if (!document || !document?.querySelector('.p-ia4_client_container')) {
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
            .p-ia4_client--with-workspace-switcher-prototype .p-tab_rail {
                display: none;
            }
            .p-workspace_switcher_prototype {
                width: 45px;
            }
            .p-ia4_client.p-ia4_client--with-workspace-switcher-prototype {
                grid-template-columns: 45px 1fr;
            }
            .p-ia4_client .p-client_workspace--including_tab_rail {
                grid-template-columns: 0px auto;
            }
            .p-ia4_client--with-workspace-switcher-prototype .p-control_strip {
                position: fixed;
                right: 42px;
                top: 2px;
                position: fixed;
                left: inherit;
                bottom: inherit;
                flex-direction: row;
                gap: 15px;
                width: auto;
            }
            .p-ia4_client.p-ia4_client--with-workspace-switcher-prototype .p-client_workspace__layout {
                box-shadow: none;
            }
            .p-ia4_client.p-ia4_client--with-workspace-switcher-prototype .p-view_contents--primary {
                box-shadow: none;
            }
            .p-ia4_channel_list .p-channel_sidebar--iap1 .p-channel_sidebar__section_heading {
                padding-right: 0px;
                margin-right: 0px;
            }
            .p-channel_sidebar--iap1 .p-channel_sidebar__section_heading .p-channel_sidebar__section_heading_label, .p-drag_layer .p-channel_sidebar__section_heading .p-channel_sidebar__section_heading_label {
                padding-right: 0px;
            }
            .p-channel_sidebar__section_heading_right {
                display: none;
            }

        `;
        styleSheet.id = "slack-custom-theme"
        document.head.appendChild(styleSheet)
    }

})();

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

