<script setup>
  import { ref } from "vue";
  const dark = ref(localStorage.getItem("darkMode") === "true" ? "dark" : "");
</script>

<template>
  <div :class="dark">
    <router-view></router-view>
  </div>
</template>
