<template>
    <!-- <div class="grid grid-rows-3"> -->
    <nav-bar/>
    <img class="opacity-80" src="../assets/bg/airplane-taking-off-from-airport.jpeg">
    <search-flight></search-flight>
    <!-- </div> -->
</template>
<script>
import SearchFlight from '../components/SearchFlight.vue'
export default {
    components : {
        SearchFlight
        }
}
</script>