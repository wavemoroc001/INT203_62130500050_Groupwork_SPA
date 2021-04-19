<template>
  <div class="min-w-full h-screen">
    <nav-bar />
    <div
      class=" flex mt-11 grid-rows-none place-content-center gap-4 "
    >
      <base-card
        id="flightInfo"
        class="col-span-1 grid gap-1 shadow-lg  border-black rounded-lg p-4 space-y-2"
      >
        <!-- <img
           :src="require(`../assets/AirlineLogo/${chooseFlight.logo}`)"
          class="w-8/12 mt-3 place-self-center"
        /> -->
        <h3 class="text-xl font-medium">Flight Infomation</h3>
        <div class="">
          <span>Flight Id : </span>
          <span>{{ chooseFlight.id }}</span>
        </div>
        <div>
          <span>Airline : </span>
          <span>{{ chooseFlight.airline }}</span>
        </div>
        <div class="">
          <span>Depart : </span>
          <span>{{ chooseFlight.departDate }} | </span>
          <span>{{ chooseFlight.departTime }}</span>
        </div>
        <div class="">
          <span>Arrived : </span>
          <span>{{ chooseFlight.arrivedDate }} | </span>
          <span>{{ chooseFlight.arrivedTime }}</span>
        </div>
        <div>
          <span>Total Travel Time : </span>
          <span>{{ chooseFlight.travelTime }}</span>
        </div>
        <div>
          <span>Cabin Class : </span>
          <span>{{ chooseFlight.cabinClass }}</span>
        </div>
        <div>
          <span>Price :</span>
          <span>{{ chooseFlight.price }}</span>
        </div>
      </base-card>
      <base-customer-form class="" @customer-info="getCustomerInfo"/>
    </div>
  </div>
</template>

<script>
import BaseCustomerForm from '../components/BaseCustomerForm.vue'
export default {
  components: { BaseCustomerForm },
  data() {
    return {
      flightID: this.$route.params.flightID,
      chooseFlight: []
    };
  },
  methods: {
    getCustomerInfo(customer) {
      this.booking(customer,this.flightID);
      this.$router.push
    },
    getImage(flight){
      return String(`../assets/AirlineLogo/${flight.logo}`).toString()
    },
    async booking(customer) {
      console.log(customer.meal)
      const custRes = await fetch("http://localhost:5000/customers", {
        method: "POST",
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
      custRes.status === 200 ? console.log('Customer ADDED') : console.log('Failed to ADD');
      const flightRes = await fetch("http://localhost:5000/myflight",{
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: this.flightID,
          customer : customer.id
        }),
      });
      flightRes.status === 200 ? console.log('Flight has been booked') : console.log('Failed to Flight Booked')
    },
  },
  async created() {
    const flight = await fetch(`http://localhost:5000/flights/${this.flightID}`);
    this.chooseFlight = await flight.json();
  }
};
</script>
