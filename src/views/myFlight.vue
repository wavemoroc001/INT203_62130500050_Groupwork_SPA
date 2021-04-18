<template>
  <div class="min-w-full h-screen">
    <nav-bar />
    <div
      class="grid grid-cols-4 mt-11 grid-rows-none place-content-center-center mx-36 gap-4"
    >
      <div
        id="customerInfo"
        class="col-span-1 grid gap-1 shadow-lg  border-black rounded-lg p-4 space-y-1 static"
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
          class=" pt-4  col-span-3 row-span-1 rounded border grid grid-cols-5 place-content-center "
          :class="{ 'shadow-lg': !displayDetail }"
          v-for="flight in bookedFlight"
          :key="flight.id"
        >
          <div class="col-span-1 bg-salmon place-self-center">
            <img
              class="h-16 row-span-2 "
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
        <div class="place-self-center" v-if="!bookedFlight">
          <h3>No Flight yet !</h3>
          <h3>⊙︿⊙</h3>
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
      displayDetail: false,
    };
  },
  methods: {
    filtersFlight(BookedFlightId, flights) {
      let filted = [];
      let f, b;
      for (f in flights) {
        for (b in BookedFlightId) {
          if (BookedFlightId[b].id === flights[f].id)
            filted.push(flights[f]);
        }
      }
      return filted;
    },
    toggelDetail() {
      this.displayDetail = !this.displayDetail;
      console.log(this.displayDetail);
    },
    async cancelTrip (flightId) {
          const res = await fetch(`http://localhost:5000/myflight/${flightId}`,{
            method: "DELETE"
      })
        res.status === 200 ?
        this.bookedFlight = this.bookedFlight.filter(flight => flight.id !== flightId) : console.log(`Can not delete!`)
    }
  },
  async created() {
    const cust = await fetch(`http://localhost:5000/customers/1756`);
    const allFlights = await fetch(`http://localhost:5000/flights`);
    const bookedFlightId = await fetch (`http://localhost:5000/myflight`)
    
    this.customer = await cust.json();
    this.flights = await allFlights.json();
    this.bookedFlight = this.filtersFlight(await bookedFlightId.json(), this.flights);
    //console.log(this.bookedFlight);
  },
};
</script>

<style></style>
