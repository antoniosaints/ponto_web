<script setup>
import ButtonDrawerMobile from "@/components/Flowbite/ButtonDrawerMobile.vue";
import DrawerMobile from "@/components/Flowbite/DrawerMobile.vue";
import iconComponent from "@/components/Fontawesome/IconComponent.vue";
defineOptions({ name: "template padrão" });

function isMobileDevice() {
  return window.innerWidth <= 768 && window.innerHeight <= 1024;
}
</script>
<template>
  <div class="bg-gray-100 text-white">
    <router-view :class="{ 'isMobile': !isMobileDevice() }" class="overflow-auto p-4 bg-gray-100 dark:bg-gray-900 h-screen"></router-view>

    <DrawerMobile v-if="!isMobileDevice()">
      <ButtonDrawerMobile to="/" nome="Ponto">
        <iconComponent icon="clock" />
      </ButtonDrawerMobile>
      <ButtonDrawerMobile to="/relatorios/usuarios" nome="Relatório">
        <iconComponent icon="file-lines" />
      </ButtonDrawerMobile>
      <ButtonDrawerMobile to="/espelho" nome="Espelho">
        <iconComponent icon="list-check" />
      </ButtonDrawerMobile>
      <ButtonDrawerMobile to="/perfil" nome="Configs">
        <iconComponent icon="gears" />
      </ButtonDrawerMobile>
    </DrawerMobile>
  </div>
</template>
<style scoped>
.isMobile {
  height: calc(100vh - 64px);
}
</style>
