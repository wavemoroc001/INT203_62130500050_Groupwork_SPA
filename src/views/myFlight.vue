<template>
  <div class="min-w-full h-screen">
    <nav-bar />
    <div
      class="grid grid-cols-4 mt-11 grid-rows-none place-content-center-center mx-36 gap-4"
    >
      <div
        id="customerInfo"
        class="col-span-1 grid gap-1 shadow-lg  border-black rounded-lg p-4 space-y-1"
      >
        <img
          :src="require(`../assets/profile/${customer.profilePic}`)"
          class="w-8/12 mt-3 place-self-center"
        />
        <h3 class="text-xl font-medium">Customer Infomation</h3>
        <div class="mt-3">
          <span>Customer Id : </span>
          <span>{{ customer.id }}</span>
        </div>
        <div class="space-x-1">
          <span>Name : </span>
          <span>{{ customer.title }}</span>
          <span>{{ customer.fname }}</span>
          <span>{{ customer.lname }}</span>
        </div>
        <div class="">
          <span>telphone Number : </span>
          <span>{{ customer.tel }}</span>
        </div>
        <div class="">
          <span>Address : </span>
          <span>{{ customer.address }}</span>
        </div>
        <div>
          <span>Date Of Birth : </span>
          <span>{{ customer.dob }}</span>
        </div>
        <div>
          <span>Prefer meal : </span>
          <span>{{ customer.meal }}</span>
        </div>
      </div>
      <div class="grid grid-cols-3 grid-rows-6 col-span-3">
        <h3
          class="col-span-3 row-span-1 text-2xl font-semibold place-self-center"
        >
          Booked Flight
        </h3>
        <div
          class="pl-10 pt-4 shadow-lg col-span-3 row-span-1 rounded border grid grid-cols-4 place-content-center "
          v-for="flight in bookedFlight"
          :key="flight.id"
        >
          <div class="col-span-1 bg-salmon place-self-center">
            <img
              class="h-16 "
              :src="require(`../assets/AirlineLogo/${flight.logo}`)"
            />
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customer: [],
      flights: [],
      bookedFlight: [],
    };
  },
  methods: {
    filtersFlight(customer, flights) {
      let filted = [];
      let flight, cf;
      for (flight in flights) {
        for (cf in customer.flights) {
          if (customer.flights[cf].id === flights[flight].id)
            //console.log(flights[flight]);
            filted.push(flights[flight]);
        }
      }
      return filted;
    },
  },
  async created() {
    const cust = await fetch(`http://localhost:5000/myflight/1756`);
    const historyFlights = await fetch(`http://localhost:5000/flights`);
    this.customer = await cust.json();
    this.flights = await historyFlights.json();
    this.bookedFlight = await this.filtersFlight(this.customer, this.flights);
    console.log(this.bookedFlight);
  },
};
</script>

<style></style>
