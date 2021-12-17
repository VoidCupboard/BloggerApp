<template>
<div class="wrapper">
    <NavBar />
    <router-view />
</div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@500&display=swap');
@import url("https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css");
@import url("https://pro.fontawesome.com/releases/v5.10.0/css/all.css");

body {
    background-color: #2E3440;
    height: 100%;
}
</style>

<script>
import NavBar from "./components/NavBar.vue"

export default {
    name: "App",
    components: {
        NavBar
    }
}
</script>