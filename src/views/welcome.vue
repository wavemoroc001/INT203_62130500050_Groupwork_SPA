<template>
  <div
    class="h-screen min-w-full flex flex-col justify-items-center justify-center relative"
  >
    <nav-bar />
    <img
      class=" filter brightness-50 h-full object-fill bg-black"
      src="../assets/bg/airplane-taking-off-from-airport1.jpeg"
    />
    <div
      class="absolute space-y-2 justify-self-center border border-white p-10 flex flex-col left-1/3  "
    >
      <h1 class="absoulte top-1/4 text-5xl text-white font-bold">
        Welcome to Flight Scanner
      </h1>
      <h3 class="text-2xl text-white">Application for booking flight</h3>
      <router-link class="mt-10" to="/booking-flight">
        <base-button
          :text-size="`text-xl`"
          :bgcolor="`bg-coolblue`"
          :text-color="`text-white`"
          :label="`Let's begin`"
        />
      </router-link>
    </div>
  </div>
</template>
<script>
export default {};
</script>
