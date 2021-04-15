<template>
  <div class="w-full h-screen">
    <search-flight class="absolute top-8 "></search-flight>
  </div>
</template>
<script>
import SearchFlight from "../components/SearchFlight.vue";
export default {
  components: {
    SearchFlight,
  },
};
</script>
