<script setup>
import { onMounted, ref } from "vue";
import ButtonDrawerMobile from "@/components/Flowbite/ButtonDrawerMobile.vue";
import DrawerMobile from "@/components/Flowbite/DrawerMobile.vue";
import iconComponent from "@/components/Fontawesome/IconComponent.vue";

const computedDark = ref("");

onMounted(() => {
  computedDark.value = localStorage.getItem('darkMode') ? 'dark' : "";
})
const toggleDark = (value) => {
    computedDark.value = value == true ? 'dark' : '';
}
</script>
<template>
  <div :class="computedDark" class="bg-gray-100 text-white">
    
    <router-view @toggleDarkMode="toggleDark" class="isMobile bg-slate-100 dark:bg-gray-900 overflow-auto p-4"></router-view>

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
