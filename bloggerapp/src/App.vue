<template>
  <nav>
      <div class="nav-item" v-on:click="logout()">Logout</div>
  </nav>
  <router-view/>
</template>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css");

</style>
