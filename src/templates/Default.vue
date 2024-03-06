<script setup>
  import ButtonDrawerMobile from "@/components/Flowbite/ButtonDrawerMobile.vue";
  import DrawerMobile from "@/components/Flowbite/DrawerMobile.vue";
  import iconComponent from "@/components/Fontawesome/IconComponent.vue";

</script>
<template>
  <div class="bg-gray-100 text-white">
    <router-view
      class="isMobile overflow-auto p-4 bg-gray-100 dark:bg-gray-900"
    ></router-view>

    <DrawerMobile>
      <ButtonDrawerMobile to="/" nome="Ponto"
        ><iconComponent icon="clock"
      /></ButtonDrawerMobile>
      <ButtonDrawerMobile to="/relatorios/usuarios" nome="Relatório"
        ><iconComponent icon="file-lines"
      /></ButtonDrawerMobile>
      <ButtonDrawerMobile to="/espelho" nome="Espelho"
        ><iconComponent icon="list-check"
      /></ButtonDrawerMobile>
      <ButtonDrawerMobile to="/perfil" nome="Configs"
        ><iconComponent icon="gears"
      /></ButtonDrawerMobile>
    </DrawerMobile>

    <ProfileDrawer />
  </div>
</template>
<style scoped>
  .isMobile {
    height: calc(100vh - 64px);
  }
</style>
