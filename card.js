if (!customElements.get("ha-data-table")) {
  await import("/frontend_latest/components/data-table/ha-data-table.js");
}

/*export const loadHaForm = async () => {
  if (customElements.get("ha-data-table") && customElements.get("ha-slider") && customElements.get("ha-combo-box")) return;

  await customElements.whenDefined("partial-panel-resolver");
  const ppr = document.createElement('partial-panel-resolver');
  ppr.hass = {
    panels: [{
      url_path: "tmp",
      component_name: "config",
    }]
  };
  ppr._updateRoutes();
  await ppr.routerOptions.routes.tmp.load();

  await customElements.whenDefined("ha-panel-config");
  const cpr = document.createElement("ha-panel-config");
  await cpr.routerOptions.routes.automation.load();
}

loadHaForm();
*/
const event = new CustomEvent('ha-request-load-components', {
                    detail: {
                        components: ['ha-data-table']
                    },
                    bubbles: true,
                    composed: true
                });
                //document.dispatchEvent(event);

class MyDataTableCard extends HTMLElement {
  setConfig(config) {
    this.config = config;
  }

  set hass(hass) {
    if (!this.content) {
      this.innerHTML = `
        <ha-card header="Device Status">
          <div class="card-content">
            <ha-data-table></ha-data-table>
          </div>
        </ha-card>
      `;

      this.content = this.querySelector("ha-data-table");

      // Define columns
      this.content.columns = [
        {
          title: "Name",
          path: "name",
          sortable: true,
        },
        {
          title: "State",
          path: "state",
          sortable: true,
        },
        {
          title: "Last Updated",
          path: "updated",
          sortable: true,
        },
      ];
    }

    // Example data
    const rows = [
      {
        id: 1,
        name: "Living Room Sensor",
        state: hass.states["sensor.living_room_temperature"]?.state || "unknown",
        updated:
          hass.states["sensor.living_room_temperature"]?.last_updated || "-",
      },
      {
        id: 2,
        name: "Kitchen Sensor",
        state: hass.states["sensor.kitchen_temperature"]?.state || "unknown",
        updated:
          hass.states["sensor.kitchen_temperature"]?.last_updated || "-",
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
