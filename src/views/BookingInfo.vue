<template>
  <div class="min-w-full h-screen">
    <nav-bar />
    <div
      class="grid grid-cols-4 mt-11 grid-rows-none place-content-center-center mx-36 gap-4"
    >
      <div
        id="flightInfo"
        class="col-span-1 grid gap-1 shadow-lg  border-black rounded-lg p-4 space-y-2"
      >
        <img
          :src="require(`../assets/AirlineLogo/${chooseFlight.logo}`)"
          class="w-8/12 mt-3 place-self-center"
        />
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
      </div>
      <form
        class="col-span-3 grid place-items-start grid-cols-12 rounded-lg space-x-1 border border-gray-500"
      >
        <h2 class="mt-5 text-2xl font-semibold col-span-12 place-self-center">
          Customer Infomation
        </h2>

        <div class="col-span-12 space-x-4 pl-14 ">
          <label for="title" class="text-xl ">Title</label>
          <select class="border rounded-lg" id="title" v-model="customer.title">
            <option>Ms.</option>
            <option>Mrs.</option>
            <option>Mr.</option>
          </select>
          <label for="fname" class="text-xl ">Firstname</label>
          <input
            id="fname"
            name="fname"
            v-model.lazy="customer.fname"
            class="border rounded-md"
          />
          <label for="lname" class="text-xl">Lastname</label>
          <input
            id="lname"
            name="lname"
            v-model.lazy="customer.lname"
            class="border rounded-md col-span-4"
          />
        </div>
        <div class="col-span-12 row-span-2 space-x-4 pl-14">
          <label for="address" class="text-xl">Address</label>
          <input
            id="address"
            name="address"
            v-model="customer.address"
            class="border rounded-lg"
          />

          <label for="tel" class="text-xl">Tel.</label>
          <input
            id="tel"
            name="tel"
            v-model="customer.tel"
            class="border rounded-lg"
          />
        </div>
        <div class=" col-span-12 row-span-2 space-x-4 ml-14">
          <label for="dob" class="text-xl">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            v-model="customer.dob"
            class="border rounded-lg"
          />

          <label for="meal">Speacial Meal</label>
          <select v-model="customer.meal" class="border rounded-lg">
            <option disabled value="">Please Select</option>
            <option
              v-for="meal in meals"
              :key="meal.value"
              value="{{meal.value}}"
              >{{ meal.name }}</option
            >
          </select>
        </div>
        <button
          class="ml-14 p-4 bg-green-600 text-white font-semibold col-span-3 rounded-xl"
          @click="validateTicket"
        >
          Booking Now!
        </button>
        <button
          class="ml-14 p-4 bg-red-500 text-white font-semibold
        col-span-3 rounded-xl"
          @click="resetValue"
        >
          Reset
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flightID: this.$route.params.flightID,
      chooseFlight: [],
      customer: {
        id : "1756",
        title: "",
        fname: "",
        lname: "",
        address: "",
        tel: "",
        dob: "",
        meal: "",
        flightId: "",
      },
      meals: [],
    };
  },
  methods: {
    validateTicket() {
        this.customer.id = Math.floor((Math.random() +1) * 100000)
        this.booking(this.customer)
    },
    resetValue() {
      this.customer.title = "";
      this.customer.fname = "";
      this.customer.lname = "";
      this.customer.address = "";
      this.customer.tel = "";
      this.customer.dob = "";
      this.customer.meal = "";
      this.customer.flightId = "";
    },
    async booking(customer) {
      // const alreadyCustomer = await fetch(`http://localhost:5000/myflight/${customer.id}`)
      // if(Object.keys(alreadyCustomer).length !== 0) {
      //   await fetch(`http://localhost:5000/myflight/${alreadyCustomer.id}`)
      // }
      await fetch("http://localhost:5000/myflight", {
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
          flights: customer.flight,
        }),
      });
    },
  },
  async created() {
    const flight = await fetch(`http://localhost:5000/flights/${this.flightID}`)
    //const res = await fetch(`http://localhost:5000/fligths/2`);
    const meal = await fetch(`http://localhost:5000/meals`);
    this.chooseFlight = await flight.json();
    this.meals = await meal.json();
  },
};
</script>
