<template>
  <div
    class="min-w-full h-screen flex flex-col relative justify-center items-center"
  >
    <nav-bar />
    <img
      class=" w-full h-full object-cover filter brightness-50"
      src="../assets/bg/airplane-taking-off-from-airport.jpeg"
    />

    <div class="absolute flex flex-col space-y-5">
      <h3 class="text-5xl font-semibold text-white">
        Let the journey begin
      </h3>
      <base-card>
        <search-flight
          @search-flight="filterFlights"
          @is-search="popUpSearch"
        />
      </base-card>
    </div>
    <base-card
      class="absolute flex flex-col space-y-2 bg-white p-4 w-10/12 justify-items-center justify-center"
      :class=" {'h-80' : filtedFlights.length < 2}"
      v-if="isSearch">
      <button class="h-8 absolute top-2 right-2" @click="closePopUp">
        <img class="h-8" src="../assets/icon/close.png" />
      </button>

      <display-flights :filtedFlights="filtedFlights" />
    </base-card>
  </div>
</template>
<script>
import SearchFlight from "../components/SearchFlight.vue";
import DisplayFlights from "../components/DisplayFlights.vue";
export default {
  components: {
    SearchFlight,
    DisplayFlights,
  },
  data() {
    return {
      flights: [],
      filtedFlights: [],
      isSearch: false,
    };
  },
  methods: {
    async fetchflights() {
      const res = await fetch("http://localhost:5000/flights");
      const data = await res.json();
      return data;
    },
    async filterFlights(flightsCriteria) {
      this.flights = await this.fetchflights();
      this.filtedFlights = this.flights.filter(function(flight) {
        if (
          flight.from == flightsCriteria.from &&
          flight.to == flightsCriteria.to &&
          flight.departDate == flightsCriteria.departDate &&
          flight.cabinClass == flightsCriteria.cabinClass
        )
          return true;
        return false;
      });
      console.log(this.filtedFlights);
    },
    popUpSearch(isSearch) {
      this.isSearch = isSearch;
    },
    closePopUp() {
      this.isSearch = false;
    },
  },
};
</script>
