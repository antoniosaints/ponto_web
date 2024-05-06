<script setup>
import ButtonDrawerMobile from "@/components/Flowbite/ButtonDrawerMobile.vue";
import DrawerMobile from "@/components/Flowbite/DrawerMobile.vue";
import MenuLink from "@/components/Flowbite/Menu/MenuLink.vue";
import iconComponent from "@/components/Fontawesome/IconComponent.vue";
import { useLoginStore } from "@/stores/login";
import { onMounted, onUnmounted, ref } from "vue";
defineOptions({ name: "template padrão" });
const isMobile = ref(window.innerWidth <= 768 && window.innerHeight <= 1024);

function checkMobile() {
  isMobile.value = window.innerWidth <= 768 && window.innerHeight <= 1024;
}

onMounted(() => {
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});
</script>
<template>
  <div class="bg-gray-100 text-white">
    <router-view :class="{ 'isMobile': isMobile }"
      class="overflow-auto p-4 bg-gray-100 ml-64 dark:bg-gray-900 h-screen"></router-view>

    <DrawerMobile v-if="isMobile">
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


    <aside v-if="!isMobile" id="default-sidebar"
      class="dark:bg-gray-800 p-4 fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidenav">

      <div class="py-4 overflow-y-auto">
        <ul class="space-y-2 font-medium">
          <MenuLink icon="clock" label="Ponto" para="/" />
          <MenuLink icon="file-lines" label="Relatórios" para="/relatorios/usuarios" />
          <MenuLink icon="list-check" label="Espelho" para="/espelho" />
          <MenuLink icon="location-dot" label="Locais de trabalho" para="/locais" />
          <MenuLink icon="user" label="Usuários" para="/usuarios/lista" />
          <MenuLink icon="right-from-bracket" @click="useLoginStore().logout()" label="Sair" />
        </ul>
      </div>
    </aside>

  </div>
</template>
<style scoped>
.isMobile {
  height: calc(100vh - 64px);
  margin-left: 0;
}
</style>
