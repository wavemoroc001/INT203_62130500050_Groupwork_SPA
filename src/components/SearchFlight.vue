<template>
  <form
    class="space-x-2  p-6 bg-coolblue flex flex-col"
    @submit.prevent="validateForm"
  >
    <div class="mb-3 flex space-x-2 justify-start">
      <label for="oneway" class="text-white font-medium">One way</label>
    </div>

    <div class="grid grid-cols-4 gap-1">
      <label for="form" class="form-text-s">From</label>
      <label for="to" class="form-text-s">To</label>
      <label for="depart" class="form-text-s">Depart</label>
      <label for="cabinclass" class="form-text-s">Cabin Class</label>

      <select
        id="from"
        v-model="flightsCriteria.from"
        class="border border-gray-200 rounded-l-sm"
      >
        <option
          v-for="(a, index) in airportList.filter(
            (a) => a.iata_code !== flightsCriteria.to
          )"
          :key="index"
          :value="a.iata_code"
          :selected="a.iata_code === 'BKK'"
        >
          {{ a.iata_code }} - {{ a.country }}
        </option>
      </select>

      <select
        id="to"
        class="border border-gray-200"
        v-model="flightsCriteria.to"
      >
        <option
          v-for="(a, index) in airportList.filter(
            (a) => a.iata_code !== flightsCriteria.from
          )"
          :key="index"
          :value="a.iata_code"
          :selected="a.iata_code === 'SFO'"
        >
          {{ a.iata_code }} - {{ a.country }}
        </option>
      </select>

      <input
        type="Date"
        id="depart"
        class="border border-gray-200"
        v-model="flightsCriteria.departDate"
      />

      <select
        id="cabinclass"
        class="border border-gray-200 rounded-r-sm"
        v-model="flightsCriteria.cabinClass"
      >
        <option selected value="Economic">Economic</option>
        <option value="Business Class">Business Class</option>
        <option value="First Class">First Class</option>
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
      flightsCriteria: {
        from: "",
        to: "",
        departDate: "",
        cabinClass: "",
      },
      airportList: [],
      errors: {
        isTicketType: false,
        isFrom: false,
        isTo: false,
        isDepartDate: false,
        isReturnDate: false,
        isCabinClass: false,
      },
      isSearch: false,
    };
  },
  emits: ["search-flight", "is-search"],
  methods: {
    validateForm() {
      // this.flightsCriteria.isFrom ? '' : this.errors.isFrom = true;
      // this.flightsCriteria.isTo ? '' : this.errors.isTo = true;
      // this.flightsCriteria.isDepartDate ? '' : this.errors.isDepartDate = true;
      // this.flightsCriteria.cabinClass ? '' : this.errors.isCabinClass =true;
      this.$emit("is-search", (this.isSearch = true));
      this.$emit("search-flight", this.flightsCriteria);
      this.isSearch = false;
      //this.setDefaultValue();
    },
    setDefaultValue() {
      const currentDate = new Date();
      const returnDate = new Date();
      returnDate.setDate(currentDate.getDate() + 1);
      this.flightsCriteria.departDate = currentDate.toLocaleDateString("fr-ca");
      this.flightsCriteria.cabinClass = "Economic";
      this.flightsCriteria.from = "";
      this.flightsCriteria.to = "";
    },
  },
  async created() {
    const res = await fetch("http://localhost:5000/airports");
    this.airportList = await res.json();
    this.setDefaultValue();
  },
};
</script>
