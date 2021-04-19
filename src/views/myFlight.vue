<template>
  <div class="min-w-full h-screen">
    <nav-bar />
    <div
      class="flex mt-11 grid-rows-none justify-items-center justify-center mx-36 gap-4"
    >
      <div
        id="customerInfo"
        class=" shadow-lg  border-black rounded-lg p-4 space-y-1 flex flex-col justify-items-center justify-center relative"
      >
        <button class="self-end" @click="editCustomer">
          <img class="w-10" :src="require('../assets/icon/edit.png')" />
        </button>
        <img :src="getImageProfile()" class="w-8/12 mt-3 self-center" />
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
        <flight-detail
          :bookedFlight="bookedFlight"
          v-for="flight in bookedFlight"
          :key="flight.id"
          :flight="flight"
          @cancelTrip="cancelTrip(flight.id)"
        ></flight-detail>
        <div class="place-self-center" v-if="!bookedFlight">
          <h3>No Flight yet !</h3>
          <h3>⊙︿⊙</h3>
        </div>
      </div>
      <div v-if="isEdit" class="absolute bg-white w-9/12 flex flex-col">
        <button class="self-end" @click="closePopUp">
          <img class="h-8 " :src="require('../assets/icon/close.png')" />
        </button>
        <base-customer-form
          :customerProps="customer"
          :method="`PUT`"
          :label="`Save`"
          @customer-info="putCustomer"
          class="p-4"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FlightDetail from "../components/FlightDetail.vue";
import BaseCustomerForm from "../components/BaseCustomerForm.vue";
export default {
  components: { FlightDetail, BaseCustomerForm },
  data() {
    return {
      customer: "",
      flights: [],
      bookedFlight: [],
      isEdit: false,
    };
  },
  methods: {
    filtersFlight(BookedFlightId, flights) {
      let filted = [];
      let f, b;
      for (f in flights) {
        for (b in BookedFlightId) {
          if (BookedFlightId[b].id === flights[f].id) filted.push(flights[f]);
        }
      }
      return filted;
    },
    closePopUp() {
      this.isEdit = false;
    },
    getImageProfile() {
      return require(`../assets/profile/min.jpeg`);
    },
    async cancelTrip(flightId) {
      const res = await fetch(`http://localhost:5000/myflight/${flightId}`, {
        method: "DELETE",
      });
      res.status === 200
        ? (this.bookedFlight = this.bookedFlight.filter(
            (flight) => flight.id !== flightId
          ))
        : console.log(`Can not delete!`);
    },
    editCustomer() {
      this.isEdit = true;
    },
    async putCustomer(customer) {
      const editRes = await fetch(`http://localhost:5000/customers/1756`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: customer.id,
          title: customer.title,
          fname: customer.fname,
          lname: customer.lname,
          address: customer.address,
          tel: customer.tel,
          dob: customer.dob,
          meal: customer.meal,
        }),
      });
      editRes.status === 200
        ? console.log("Customer Edited")
        : console.log("Failed to edit!");
      this.isEdit = false;
      this.$router.push({ path: "/myflight" });
    },
  },
  async created() {
    const cust = await fetch(`http://localhost:5000/customers/1756`);
    const allFlights = await fetch(`http://localhost:5000/flights`);
    const bookedFlightId = await fetch(`http://localhost:5000/myflight?`);

    this.customer = await cust.json();
    this.flights = await allFlights.json();
    this.bookedFlight = this.filtersFlight(
      await bookedFlightId.json(),
      this.flights
    );
  },
};
</script>
