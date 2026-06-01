export const loadHaForm = async () => {
    if (customElements.get("ha-data-table") && customElements.get("ha-slider") && customElements.get("ha-combo-box")) return;

    await customElements.whenDefined("partial-panel-resolver");
    const ppr = document.createElement("partial-panel-resolver");
    ppr.hass = {
        panels: [
            {
                url_path: "tmp",
                component_name: "config",
            },
        ],
    };
    ppr._updateRoutes();
    await ppr.routerOptions.routes.tmp.load();

    await customElements.whenDefined("ha-panel-config");
    const cpr = document.createElement("ha-panel-config");
    await cpr.routerOptions.routes.automation.load();
};

loadHaForm();

class MyDataTableCard extends HTMLElement {
    setConfig(config) {
        this.config = config;
    }

    set hass(hass) {
        if (!this.content) {
            this.innerHTML = `
            <ha-data-table></ha-data-table>
            `;

            this.content = this.querySelector("ha-data-table");

            this.content.hass = hass;

            this.content.selectable = true;

            this.content.clickable = true;

            let items;

            hass.callWS({type: 'simple_inventory/list_items', inventory_id: '01KRB3BHY5BZN5W69A07SVT6YW'}).then(e => items = e.items);

            console.log(items);

            this.content.addEventListener('row-click', (e) => console.log(e.detail));

            // Define columns
            this.content.columns = [
                {
                    title: "Name",
                    path: "name",
                    sortable: true,
                    template: (entry) => entry.name || "—",
                },
                {
                    title: "State",
                    path: "state",
                    sortable: true,
                    template: (entry) => entry.state || "—",
                },
                {
                    title: "Last Updated",
                    path: "updated",
                    sortable: true,
                    template: (entry) => entry.updated || "—",
                },
            ];
        }

        // Example data
        const rows = [
            {
                id: 1,
                name: "Living Room Sensor",
                state: hass.states["sensor.living_room_temperature"]?.state || "unknown",
                updated: hass.states["sensor.living_room_temperature"]?.last_updated || "-",
            },
            {
                id: 2,
                name: "Kitchen Sensor",
                state: hass.states["sensor.kitchen_temperature"]?.state || "unknown",
                updated: hass.states["sensor.kitchen_temperature"]?.last_updated || "-",
            },
        ];

        // Assign data
        this.content.data = rows;
    }

    getCardSize() {
        return 3;
    }
}

customElements.define("my-data-table-card", MyDataTableCard);
