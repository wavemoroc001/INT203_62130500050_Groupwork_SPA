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
        value="oneway"
        
        v-model="flightsCriteria.ticketType"
      />
      <label for="oneway" class="text-white font-medium">One way</label>
      <input
        id="return"
        type="radio"
        class="mt-1.5"
        name="tickettype"
        value="return"
        checked
        v-model="flightsCriteria.ticketType"
      />
      <label for="return" class="text-white font-medium">Return</label>
    </div>

    <div class="grid grid-cols-5 gap-1">
      <label for="form" class="form-text-s">From</label>
      <label for="to" class="form-text-s">To</label>
      <label for="depart" class="form-text-s">Depart</label>
      <label for="depart" class="form-text-s">Return</label>
      <label for="cabinclass" class="form-text-s">Cabin Class</label>

      <select
        id="from"
        v-model="flightsCriteria.from"
        class="border border-gray-200 rounded-l-sm">
        <option
          v-for="(a, index) in airportList.filter(a => a.iata_code !== flightsCriteria.to)"
          :key="index"
          :value="a.iata_code"
          :selected="a.iata_code === 'BKK'">
          {{ a.iata_code }} - {{ a.country }}
        </option>
      </select>

      <select id="to" class="border border-gray-200" v-model="flightsCriteria.to">
        <option
          v-for="(a, index) in airportList.filter(a => a.iata_code !== flightsCriteria.from)"
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

      <input
        type="Date"
        id="return"
        class="border border-gray-200"
        v-model="flightsCriteria.returnDate"
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
        ticketType: "",
        from: "",
        to: "",
        departDate: "",
        returnDate: "",
        cabinClass: "",
      },
      airportList: [],
      errors : {
        isTicketType : false,
        isFrom : false,
        isTo : false,
        isDepartDate : false,
        isReturnDate : false,
        isCabinClass : false
      }
    };
  },
  methods: {
    validateForm() {
      // alert(`SearchInfo\n
      //       ticketType: ${this.flightsCriteria.ticketType}\n
      //       from: ${this.flightsCriteria.from}\n
      //       to: ${this.flightsCriteria.to}\n
      //       departDate: ${this.flightsCriteria.departDate}\n
      //       returnDate: ${this.flightsCriteria.returnDate}\n
      //       cabinClass: ${this.flightsCriteria.cabinClass}`);
      this.flightsCriteria.ticketType ? '' : this.errors.isTicketType = true;
      this.flightsCriteria.isFrom ? '' : this.errors.isFrom = true;
      this.flightsCriteria.isTo ? '' : this.errors.isTo = true;
      this.flightsCriteria.isDepartDate ? '' : this.errors.isDepartDate = true;
      this.flightsCriteria.isReturnDate ? '' : this.errors.isReturnDate = true;
      this.flightsCriteria.cabinClass ? '' : this.errors.isCabinClass =true;
      console.log(`emit Event searchFlight`)
      this.$emit('search-flight',this.flightsCriteria);
    },
    setDefaultValue() {
      const currentDate = new Date();
      const returnDate = new Date();
      returnDate.setDate(currentDate.getDate()+1);
      this.flightsCriteria.departDate = currentDate.toLocaleDateString('fr-ca');
      //this.flightsCriteria.returnDate = "One Way Ticket"
      this.flightsCriteria.returnDate = returnDate.toLocaleDateString('fr-ca');
      this.flightsCriteria.ticketType = 'return';
      this.flightsCriteria.cabinClass = 'Economic';
    }
  },
  async created() {
    const res = await fetch("http://localhost:5000/airports");
    this.airportList = await res.json();
    this.setDefaultValue();

  },
};
</script>
