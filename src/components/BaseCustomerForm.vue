<template>
  <form
    class="col-span-3 rounded-lg space-x-1 border border-gray-500 auto-cols-max flex flex-col justify-items-center"
  >
    <h2 class="mt-5 text-2xl font-semibold self-center">
      Customer Infomation
    </h2>

    <div class="h-16 flex space-x-4 ">
      <div class="flex flex-col mt-1 ml-5">
        <label for="title" class="text-sm ">Title </label>
        <select
          class="border rounded-lg "
          id="title"
          v-model.lazy="customer.title"
        >
          <option>Ms.</option>
          <option>Mrs.</option>
          <option>Mr.</option>
        </select>
      </div>

      <div class="flex flex-col mt-1 w-5/12">
        <label for="fname" class="text-sm">Firstname</label>
        <input
          id="fname"
          name="fname"
          v-model.trim="customer.fname"
          class="border rounded-md w-full"
        />
      </div>

      <div
        class="col-start-7 inline-block col-span-5  grid-rows-2 place-items-start w-5/12"
      >
        <label for="lname" class="text-sm ">Lastname</label>
        <input
          id="lname"
          name="lname"
          v-model.trim="customer.lname"
          class="border rounded-md min-w-full"
        />
      </div>
    </div>

    <div class="h-16 flex space-x-4 ">
      <div class="flex flex-col ml-5 w-7/12">
        <label for="address" class="text-sm">Address</label>
        <input
          id="address"
          name="address"
          v-model="customer.address"
          class="border rounded-lg "
        />
      </div>
      <div class="flex flex-col w-4/12">
        <label for="tel" class="text-sm">Tel.</label>
        <input
          id="tel"
          name="tel"
          v-model="customer.tel"
          class="border rounded-lg"
        />
      </div>
    </div>

    <div class="h-16 flex space-x-4  justify-items-center justify-center">
      <div class="flex flex-col w-4/12 ml-5">
        <label for="dob" class="text-sm">Date of Birth</label>
        <input
          type="date"
          id="dob"
          name="dob"
          v-model="customer.dob"
          class="border rounded-lg"
        />
      </div>
      <div class="flex flex-col ">
        <label for="meal" class="text-sm">Speacial Meal</label>
        <select v-model="customer.meal" class="border rounded-lg">
          <option disabled value="">Please Select</option>
          <option
            v-for="meal in meals"
            :key="meal.value"
            :value="meal.name"
            >{{ meal.name }}</option
          >
        </select>
      </div>
    </div>
    <div class="flex justify-end pr-28">
      
      <button
      class="ml-14 p-4 py-4 bg-green-600  text-white font-semibold rounded-xl"
      @click="validateTicket"
    >
      Booking Now!
    </button>
    <button
      class="ml-14 p-4 bg-red-500 text-white font-semibold
         rounded-xl"
      @click="resetValue"
    >
      Reset
    </button>
    </div>

  
 

  </form>
</template>
<script>
export default {
  data() {
    return {
      customer: {
        id: "1756",
        title: "",
        fname: "",
        lname: "",
        address: "",
        tel: "",
        dob: "",
        meal: "",
      },
      meals: [],
    };
  },
  emits: ["customer-info"],
  methods: {
    validateTicket() {
      this.$emit("customer-info", this.customer);
      this.$router.push({path:'/my-flight'})
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
  },
  async created() {
    const meal = await fetch(`http://localhost:5000/meals`);
    this.meals = await meal.json();
  },
};
</script>
