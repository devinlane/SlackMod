function applyStyle() {
    let styleSheet = document.createElement("style")
    styleSheet.innerText = `
        .custom-menu_item__li button:hover {
            background-color: var(--p-huddle__hover_item);
            color: var(--p-huddle__active_item_text);
            text-decoration: none;
        }
        .p-workspace_switcher_prototype {
            width: 45px;
        }
        .p-ia4_client.p-ia4_client--workspace-switcher-rail-visible {
            grid-template-columns: 0px 1fr;
            grid-template-rows: 45px auto;
        }
        .p-ia4_client .p-client_workspace_wrapper {
            grid-template-columns: 0px auto;
        }
        .p-ia4_client .p-client_workspace_wrapper .p-tab_rail {
            display: none;
        }
        .p-ia4_client.p-ia4_client--workspace-switcher-prototype-on .p-client_workspace--including_tab_rail {
            grid-template-columns: 0px auto;
        }
        .p-ia4_client.p-ia4_client--workspace-switcher-rail-visible .p-client_workspace_wrapper {
            width: 100vw;
        }
        .p-ia4_client--workspace-switcher-rail-visible .p-control_strip {
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
        .p-ia4_client.p-ia4_client--workspace-switcher-rail-visible .p-client_workspace__layout {
            box-shadow: none;
        }
        .p-ia4_client.p-ia4_client--workspace-switcher-rail-visible .p-client_workspace_wrapper .p-client_workspace {
            padding-right: 0px;
        }
        .p-ia4_client.p-ia4_client--workspace-switcher-rail-visible .p-view_contents--primary {
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
        .p-ia4_client--workspace-switcher-rail-visible .p-workspace_switcher_prototype {
            position: fixed;
            left: 0px;
            top: 0px;
            width: auto;
            margin-top: 0px;
            margin-left: 4px;
        }
        .p-workspace_switcher_prototype .p-team_sidebar--classic_nav {
            flex-direction: row;
            gap: 10px;
            margin: 0px;
            height: 45px;
            padding: 0px;
        }
        .p-team_sidebar--classic_nav .p-team_sidebar__teams {
            flex-direction: row;
            gap: 10px;
            padding: 4px;
        }
        .c-button-unstyled.p-team_sidebar__item {
            margin: 0px;
        }
        .p-workspace_switcher_prototype .p-team_sidebar__icon_button+.p-team_sidebar__icon_button {
            margin: 0px;
        }
        .p-workspace_switcher_prototype .p-team_sidebar__icon_button {
            margin: 0px;
        }
        .p-ia4_client.p-ia4_client--workspace-switcher-rail-visible .p-ia4_top_nav {
            height: 45px;
        }
    `;
    styleSheet.id = "slack-custom-theme";
    document.head.appendChild(styleSheet);
}

(async function main() {
    if (!document || !document?.querySelector('.p-ia4_client_container')) {
        // try every 500ms until the document is ready
        await sleep(500);
        main();
    } else {
        applyStyle();

        document.addEventListener('keydown', function(event) {
            if (event.key === 'F5') {
                event.preventDefault();
                applyStyle();
            }
        });
    }

})();

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

