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
