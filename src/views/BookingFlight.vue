<template>
  <div class="min-w-full h-screen flex flex-col relative justify-center items-center">
    <nav-bar />
    <img
      class="opacity-75 w-full h-full object-cover"
      src="../assets/bg/airplane-taking-off-from-airport.jpeg"
    />
    <h3 class="text-5xl font-semibold text-black absolute top-64 left-96">
      Let the journey begin
    </h3>
    <search-flight
      class="absolute top-80 left-96"
      @search-flight="filterFlights"
    />
    <!-- <search-flight class="absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4" /> -->
  </div>
  <div class="min-w-full h-screen flex flex-col relative justify-center items-center">
    <display-flights class=" rounded-lg bg-blue-300 shadow-lg" :filterFlights="flights"/>
  </div>
</template>
<script>
import SearchFlight from "../components/SearchFlight.vue";
import DisplayFlights from "../components/DisplayFlights.vue";
export default {
  components: {
    SearchFlight,
    DisplayFlights
  },
  data() {
    return {
      flights: [],
    };
  },
  methods: {
    async fetchflights() {
      const res = await fetch("http://localhost:5000/fligths");
      const data = res.json();
      return data;
    },
    async filterFlights(flightsCriteria) {
      this.flights = await this.fetchflights();
      this.flights = this.flights.filter( function(flights){
        if(flights.ticketType == flightsCriteria.ticketType &&
           flights.from == flightsCriteria.from &&
           flights.to == flightsCriteria.to &&
           flights.departDate == flightsCriteria.departDate &&
           flights.returnDate == flightsCriteria.returnDate &&
           flights.cabinClass == flightsCriteria.cabinClass) return true;
        return false;
      });
    },
  },
};
</script>
