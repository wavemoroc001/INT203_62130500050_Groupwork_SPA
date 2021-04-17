<template>
  <div class="min-w-full h-screen flex flex-col justify-items-center ">
      <nav-bar/>
      <span class="text-2xl">This is flights ID :</span>
      <span class="text-2xl">{{flightID}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flightID: this.$route.params.flightID,
      chooseFlight : []
    }
  },async created() {
      const res = await fetch(`http://localhost:5000/fligths/${this.flightID}`)
      this.chooseFlight = await res.json();
      console.log(this.chooseFlight);
  },
};
</script>
