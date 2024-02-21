<template>
    <div class="bg-gray-100 text-white">
        <router-view class="isMobile overflow-auto"></router-view>
        
        <div
          class="fixed bottom-0 left-0 z-50 w-full h-16 bg-gray-100 border-t border-blue-500 dark:bg-gray-700 dark:border-gray-600"
        >
          <div class="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
            <router-link
              to="/"
              type="button"
              class="inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600"
            >
              <iconComponent icon="clock" />
              <span
                class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                >Ponto</span
              >
            </router-link>
            <router-link
              to="/relatorios/lista"
              type="button"
              class="inline-flex flex-col items-center justify-center px-5 border-e border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600"
            >
              <iconComponent icon="file-lines" />
              <span
                class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                >Relatório</span
              >
            </router-link>
            <router-link
              to="/espelho"
              type="button"
              class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
            >
              <iconComponent icon="list-check" />
              <span
                class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                >Espelho</span
              >
            </router-link>
            <router-link
              to="/home/perfil"
              type="button"
              class="inline-flex flex-col items-center justify-center px-5 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 group border-x dark:border-gray-600"
            >
              <iconComponent icon="user" />
              <span
                class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                >Perfil</span
              >
            </router-link>
          </div>
        </div>
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
import iconComponent from "@/components/Fontawesome/iconComponent.vue";
</script>