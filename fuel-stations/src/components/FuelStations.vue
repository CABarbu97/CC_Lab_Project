<template>
  <div class="container">
    <h3>All Fuel Stations</h3>
    <div v-if="message" class="alert alert-success">{{ this.message }}</div>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
           
            <th>OrgId</th>
            <th>Org</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Gasoline Price</th>
            <th>Diesel Price</th>
            <th>LPG Price</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="station in stations" v-bind:key="station.orgId">
          
            <td>{{ station.orgId }}</td>
            <td>{{ station.org }}</td>
            <td>{{ station.coords.lat }}</td>
            <td>{{ station.coords.long }}</td>
            <td>{{ station.prices.gasoline }}</td>
            <td>{{ station.prices.diesel }}</td>
            <td>{{ station.prices.lpg }}</td>
            <td>
            <button class="btn btn-warning" v-on:click="updateFuelStation(station.orgId)">
                Update
              </button>
            </td>
            <td>
             <button class="btn btn-danger" v-on:click="deleteFuelStation(station.orgId)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <button class="btn btn-success" v-on:click="addFuelStation()">Add</button>
      </div>
    </div>
  </div>
</template>
<script>
import FuelStationDataService from "../service/FuelStationDataService";

export default {
  name: "FuelStations",
  data() {
    return {
      fuelStations: [],
      message: "",
    };
  },
  methods: {
    refreshFuelStations() {
      FuelStationDataService.retrieveAllFuelStations().then((res) => {
        this.fuelStations = res.data;
      });
    },
    addFuelStation() {
      this.$router.push(`/fuelStation/-1`);
    },
    updateFuelStation(orgId) {
      this.$router.push(`/fuelStation/${orgId}`);
    },
    deleteFuelStation(orgId) {
      FuelStationDataService.deleteFuelStation(orgId).then(() => {
        this.refreshFuelStations();
      });
    },
  },
  created() {
    this.refreshFuelStations();
  },
};
</script>