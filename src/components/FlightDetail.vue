<template>
  <div
    class=" pt-4  col-span-3 row-span-1 rounded border grid grid-cols-5 place-content-center "
    :class="{ 'shadow-lg': !displayDetail }"
  >
    <div class="col-span-1 bg-salmon place-self-center">
      <img class="h-16 row-span-2 " :src="getImageAirline(flight)" />
    </div>
    <div class="col-span-1">
      <h3 class="font-medium text-xl">Flight Id</h3>
      <h3 class="text-base ">{{ flight.id }}</h3>
    </div>
    <div class="">
      <h3 class="text-xl font-medium">From → To</h3>
      <span>{{ flight.from }} → </span>
      <span>{{ flight.to }}</span>
    </div>
    <div class="">
      <h3 class="text-xl font-medium">Depart</h3>
      <span>{{ flight.departDate }} | </span>
      <span>{{ flight.departTime }}</span>
    </div>
    <div class="ml-16 place-self-center" @click="toggelDetail">
      <img class="h-7" src="../assets/icon/dropdown.png" />
    </div>

    <div
      v-if="displayDetail"
      class=" rounded-lg col-span-5 grid grid-cols-4 place-content-center mt-3"
    >
      <div class="col-span-1">
        <h3 class="font-medium text-xl">Total Time Travel</h3>
        <span>{{ flight.travelTime }}</span>
      </div>
      <div class="">
        <h3 class="font-medium text-xl">CabinClass :</h3>
        <span>{{ flight.cabinClass }}</span>
      </div>
      <div>
        <h3 class="font-medium text-xl">Price :</h3>
        <span>{{ flight.price }}</span>
      </div>
      <div class="col-span-1">
        <button
          class="bg-red-500 font-bold text-xl text-white p-2 rounded-lg"
          @click="cancelTrip(flight.id)"
        >
          Cancel Trip!
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  emits: ["cancelTrip"],
  props: {
    bookedFlight: {
      type: Array,
      require: true,
    },
    flight: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      displayDetail: false,
    };
  },
  methods: {
    cancelTrip(flightID) {
      this.$emit("cancelTrip", flightID);
    },
    toggelDetail() {
      this.displayDetail = !this.displayDetail;
    },
    getImageAirline(flight) {
      return require(`../assets/AirlineLogo/${flight.logo}`);
    },
    
  },
};
</script>
