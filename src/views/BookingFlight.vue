<template>
  <div class="min-w-screen min-h-screen relative">
    <nav-bar />
    <img
      class="opacity-75 min-w-full min-h-full bg-cover"
      src="../assets/bg/airplane-taking-off-from-airport.jpeg"
    />
    <h3 class="text-5xl text-black absolute top-80 left-96">
      Let the journey begin
    </h3>
    <search-flight class="absolute top-96 left-96" />
    <!-- <search-flight class="absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4" /> -->
  </div>
</template>
<script>
import SearchFlight from "../components/SearchFlight.vue";
export default {
  components: {
    SearchFlight,
  },data() {
      return {
         
      }
  },
};
</script>
