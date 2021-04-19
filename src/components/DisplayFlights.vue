<template>
  <base-card
    class=" border h-36 p-4"
    v-for="flight in filtedFlights"
    :key="flight.id"
  >
    <router-link
      :to="`/booking-info/${flight.id}`"
      class="grid grid-rows-1 grid-cols-4"
    >
      <div class="grid grid-cols-6 place-items-center col-span-4  gap-x-5">
        <div class="text-base grid">
          <img
            :src="require(`../assets/AirlineLogo/${flight.logo}`)"
            class="h-16 place-self-center"
          />
          <h3 class="text-black">Flight ID</h3>
          <span>{{ flight.id }}</span>
        </div>
        <div>
          <h3 class="text-display-flights-head">From → To</h3>
          <span class="">{{ flight.from }} - {{ flight.to }}</span>
        </div>
        <div>
          <h3 class="text-display-flights-head">Depart</h3>
          <span>{{ flight.departDate }} </span>
          <span>{{ flight.departTime }}</span>
        </div>
        <div>
          <h3 class="text-display-flights-head">Arrived</h3>
          <span>{{ flight.arrivedDate }} </span>
          <span> {{ flight.arrivedTime }}</span>
        </div>
        <div>
          <span class="text-display-flights-head">Cabin Class</span>
          <h3>{{ flight.cabinClass }}</h3>
        </div>
        <div>
          <span class="text-display-flights-head">Total Traveltime</span>
          <h3>{{ flight.travelTime }}</h3>
        </div>
      </div>
    </router-link>
  </base-card>
  <div v-if="!filtedFlights.length" class="text-black text-2xl self-center">
    <h3>No Flight yet !</h3>
    <h3>⊙︿⊙</h3>
  </div>
</template>

<script>
export default {
  props: {
    filtedFlights: {
      type: Array,
      require: true,
    },
  },
};
</script>
