<template>
  <nav class="w-full  bg-white shadow-md h-16 flex justify-evenly items-center">
      <a href="/" class="flex ml-36 items-center">
        <img :src="require('../assets/icon/icon.svg')" class="h-12" />
        <span class="ml-3 nb">Flights Scanner</span>
      </a>

      <!-- <a class="nb" href="/about"><span>About</span></a> -->
      <a class="nb" href="/booking-flight"><span>Booking flight</span></a>
      <a class="nb mr-36" href="/my-flight"
        ><span>Your Booking Flight</span></a>
  </nav>
</template>
<script>
export default {};
</script>
