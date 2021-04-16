<template>
  <div class="grid grid-rows-3">
    <img src="../assets/AirlineLogo/airasia.png" class="h-24" />
    <div class="grid grid-col-3">
      <span>Depart : 02.00 AM</span>
      <span>Arrived : 09.45 AM</span>
      <span>Total Traveltime : 20 Hours 20 min</span>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    filterFlights: {
      type: Array,
      require: true,
    },
  },
};
</script>
