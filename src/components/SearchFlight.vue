<template>
  <form
    class="space-x-2  p-6 bg-blue-900 flex flex-col"
    @submit.prevent="validateForm"
  >
    <div class="mb-3 flex space-x-2 justify-start">
      <input
        id="oneway"
        type="radio"
        class="mt-1.5"
        name="tickettype"
        checked
      />
      <label for="oneway" class="text-white font-medium">One way</label>
      <input id="return" type="radio" class="mt-1.5" name="tickettype" />
      <label for="return" class="text-white font-medium">Return</label>
    </div>

    <!-- <input type="radio" />Return -->

    <div class="grid grid-cols-5 gap-1">
      <label for="form" class="form-text-s">From</label>
      <label for="to" class="form-text-s">To</label>
      <label for="depart" class="form-text-s">Depart</label>
      <label for="depart" class="form-text-s">Return</label>
      <label for="cabinclass" class="form-text-s">Cabin Class</label>

      <select
        id="from"
        v-model="searchFlight.from"
        class="border border-gray-200 rounded-l-sm"
      >
        <option
          v-for="(a, index) in airportList"
          :key="index"
          :value="a.iata_code"
          :selected="isSelected"
        >
          {{ a.iata_code }} - {{ a.country }}
        </option>
      </select>

      <select id="to" class="border border-gray-200">
        <option value="BKK">BKK - Thailand </option>
        <option value="LHR" selected>LHR - United Kingdom</option>
        <option value="SFO">SFO - United State</option>
      </select>

      <input
        type="Date"
        id="depart"
        value="departDate"
        class="border border-gray-200"
      />

      <input
        type="Date"
        id="return"
        value="returnDate"
        class="border border-gray-200"
      />

      <select id="cabinclass" class="border border-gray-200 rounded-r-sm">
        <option value="BKK">Economy</option>
        <option value="LHR">Bussiness Class</option>
        <option value="SFO">First Class</option>
      </select>
    </div>
    <button class="bg-green-500 text-white p-2 rounded-md font-bold mt-3">
      Search Flight!
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      searchFlight: {
        ticketType: "",
        from: "",
        to: "",
        departDate: "",
        returnDate: "",
        cabinClass: "",
      },
      airportList: [],
      isSelected : true
    };
  },
  methods: {
    validateForm() {
      alert(`SearchInfo\n
            ticketType: ${this.searchFlight.ticketType}\n
            from: ${this.searchFlight.from}\n
            to: ${this.searchFlight.to}\n
            departDate: ${this.searchFlight.departDate}\n
            returnDate: ${this.searchFlight.returnDate}\n
            cabinClass: ${this.searchFlight.cabinClass}`);
    },
  },
  async created() {
    const res = await fetch("http://localhost:5000/airports");
    this.airportList = await res.json();
    console.log(this.airportList);
  },
};
</script>
