<script setup>
  import { ref } from "vue";
  import ButtonDrawerMobile from "@/components/Flowbite/ButtonDrawerMobile.vue";
  import DrawerMobile from "@/components/Flowbite/DrawerMobile.vue";
  import iconComponent from "@/components/Fontawesome/IconComponent.vue";

  const dark = ref(localStorage.getItem("darkMode") === "true" ? "dark" : "");

  const updateTheme = (valor) => {
    dark.value = valor ? "dark" : "";
  };
</script>
<template>
  <div :class="dark" class="bg-gray-100 text-white">
    <router-view
      @darkMode="updateTheme"
      class="isMobile overflow-auto p-4 bg-gray-100 dark:bg-gray-900"
    ></router-view>

    <DrawerMobile>
      <ButtonDrawerMobile to="/" nome="Ponto"
        ><iconComponent icon="clock"
      /></ButtonDrawerMobile>
      <ButtonDrawerMobile to="/relatorios/lista" nome="Relatório"
        ><iconComponent icon="file-lines"
      /></ButtonDrawerMobile>
      <ButtonDrawerMobile to="/espelho" nome="Espelho"
        ><iconComponent icon="list-check"
      /></ButtonDrawerMobile>
      <ButtonDrawerMobile to="/perfil" nome="Perfil"
        ><iconComponent icon="user"
      /></ButtonDrawerMobile>
    </DrawerMobile>
  </div>
</template>
<style scoped>
  .isMobile {
    height: calc(100vh - 64px);
  }
</style>
