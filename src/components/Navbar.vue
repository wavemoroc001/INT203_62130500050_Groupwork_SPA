<template>
  <nav class="w-full p-2 bg-white shadow-md h-16 flex justify-evenly">

    
    <a href="/" class="flex ml-36">
      <img :src="require('../assets/icon/icon.svg')" class="h-12" />
      <span class="ml-3 nb">Flights Scanner</span>
    </a>
    
    <a class="nb" href="/about"><span>About</span></a>
    <a class="nb" href="/booking-flight"><span>Booking flight</span></a>
    <a class="nb mr-36" href="/booking-info"><span>Your Booking Flight</span></a>
 
  </nav>
</template>
<script>
export default {};
</script>
