<template>
  <div class="bg-gray-100 text-white">
    <router-view class="isMobile overflow-auto"></router-view>

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
      <ButtonDrawerMobile to="/home/perfil" nome="Perfil"
        ><iconComponent icon="user"
      /></ButtonDrawerMobile>
    </DrawerMobile>
  </div>
</template>
<style scoped>
.isMobile {
  height: calc(100vh - 64px);
}

@media (max-width: 768px) {
  .isMobile {
    height: calc(100vh - 64px);
  }
}
</style>
<script setup>
import ButtonDrawerMobile from "@/components/Flowbite/ButtonDrawerMobile.vue";
import DrawerMobile from "@/components/Flowbite/DrawerMobile.vue";
import iconComponent from "@/components/Fontawesome/iconComponent.vue";
</script>