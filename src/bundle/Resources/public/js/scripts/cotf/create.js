(function(global, doc, eZ, React, ReactDOM, Translator, Routing) {
    const btns = doc.querySelectorAll('.ez-btn--cotf-create');
    const udwContainer = doc.getElementById('react-udw');
    const token = doc.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
    const closeUDW = () => ReactDOM.unmountComponentAtNode(udwContainer);
    const onConfirm = (items) => {
        closeUDW();

        global.location.href = Routing.generate('_ezpublishLocation', { locationId: items[0].id });
    };
    const onCancel = () => closeUDW();
    const openUDW = (event) => {
        event.preventDefault();

        const config = JSON.parse(event.currentTarget.dataset.udwConfig);
        const title = Translator.trans(/*@Desc("Create content")*/ 'dashboard.create.title', {}, 'universal_discovery_widget');

        ReactDOM.render(
            React.createElement(eZ.modules.UniversalDiscovery, {
                onConfirm,
                onCancel,
                title,
                activeTab: 'create',
                visibleTabs: ['create'],
                multiple: false,
                startingLocationId: eZ.adminUiConfig.universalDiscoveryWidget.startingLocationId,
                restInfo: { token, siteaccess },
                ...config,
            }),
            udwContainer
        );
    };

    btns.forEach((btn) => btn.addEventListener('click', openUDW, false));
})(window, window.document, window.eZ, window.React, window.ReactDOM, window.Translator, window.Routing);
