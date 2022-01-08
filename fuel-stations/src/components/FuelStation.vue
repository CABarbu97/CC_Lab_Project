<template>
  <div>
    <h3>Fuel Station</h3>
    <div class="container">
      <form @submit="validateAndSubmit">
        <div v-if="errors.length">
          <div
            class="alert alert-danger"
            v-bind:key="index"
            v-for="(error, index) in errors"
          >
            {{ error }}
          </div>
        </div>
        <fieldset class="form-group">
          <label>ORG</label>
          <input type="text" class="form-control" v-model="org" />
        </fieldset>
        <p>Coordinates:</p>
        <fieldset class="form-group">
          <label>Lat</label>
          <input type="text" class="form-control" v-model="lat" />
        </fieldset>

        <fieldset class="form-group">
          <label>Long</label>
          <input type="text" class="form-control" v-model="long" />
        </fieldset>
        <p>Prices:</p>
        <fieldset class="form-group">
          <label>Gasoline</label>
          <input type="text" class="form-control" v-model="gasoline" />
        </fieldset>

        <fieldset class="form-group">
          <label>Diesel</label>
          <input type="text" class="form-control" v-model="diesel" />
        </fieldset>

        <fieldset class="form-group">
          <label>LPG</label>
          <input type="text" class="form-control" v-model="lpg" />
        </fieldset>

        <button class="btn btn-success" type="submit">Save</button>
      </form>
    </div>
  </div>
</template>
<script>
import FuelStationDataService from "../service/FuelStationDataService";

export default {
  name: "FuelStation",
  data() {
    return {
      database: "",
      collection: "",
      Document: {
        orgId: "",
        org: "",
        coords: {
          lat: "",
          long: ""
        },
        prices: {
          gasoline: "",
          diesel: "",
          lpg: ""
        },
      },
      errors: [],
    };
  },
  computed: {
    orgId() {
      return this.$route.params.orgId;
    },
  },
  methods: {
    refreshStationDetails() {
      FuelStationDataService.retrieve(this.orgId).then((res) =>{ 
        this.orgId = res.data.orgId;
        this.org = res.data.org;
        this.coords.lat = res.data.coords.lat;
        this.coords.long = res.data.coords.long;
        this.prices.gasoline = res.data.prices.gasoline;
        this.prices.diesel = res.data.prices.diesel;
        this.prices.lpg = res.data.prices.lpg;
      });
    },
    validateAndSubmit(e) {
      e.preventDefault();
      this.errors = [];
      if (!this.org) {
        this.errors.push("Enter valid values");
      } else if (this.org.length <= 3) {
        this.errors.push("Enter atleast 3 characters in First Name");
      }
      if (!this.coords.lat) {
        this.errors.push("Enter valid latitude");
      }
      if (!this.coords.long) {
        this.errors.push("Enter valid longitude");
      }
      if (!this.prices.gasoline || this.prices.gasoline.length < 0) {
        this.errors.push("Enter valid gasoline price");
      }
      if (!this.prices.diesel || this.prices.diesel.length < 0) {
        this.errors.push("Enter valid diesel price");
      }
      if (!this.prices.lpg || this.prices.lpg.length < 0) {
        this.errors.push("Enter valid lpg price");
      }
      if (this.errors.length === 0) {
        if (this.orgId == -1) {
          FuelStationDataService.createFuelStation({
            org : this.org,
            lat : this.coords.lat,
            long : this.coords.long,
            gasoline : this.prices.gasoline,
            diesel : this.prices.diesel,
            lpg : this.prices.lpg
          }).then(() => {
            this.$router.push("/fuelStations");
          });
        } else {
          FuelStationDataService.updateFuelStation(this.orgId, {
            org : this.org,
            lat : this.coords.lat,
            long : this.coords.long,
            gasoline : this.prices.gasoline,
            diesel : this.prices.diesel,
            lpg : this.prices.lpg
          }).then(() => {
            this.$router.push("/fuelStations");
          });
        }
      }
    },
  },
  created() {
    this.refreshStationDetails();
  },
};
</script>
