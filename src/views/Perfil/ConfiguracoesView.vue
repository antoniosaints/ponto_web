<template>
  <div class="p-4">
    <div class="py-4 overflow-y-auto">
      <ul class="space-y-2 font-medium">
        <MenuLink icon="clock" label="Ponto" to="/" />
        <MenuLink icon="location-dot" label="Locais de trabalho" to="/locais" />
        <MenuLink icon="user" label="Usuários" to="/usuarios/lista" />
        <MenuLink icon="right-from-bracket" label="Sair" to="/login" />
      </ul>
    </div>
    <hr>
    <div class="flex flex-col mt-4">
      <label class="inline-flex items-center mb-5 cursor-pointer" @change="toggleDarkMode">
        <input type="checkbox" v-model="darkMode" value="" class="sr-only peer" />
        <div
          class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
        </div>
        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">DarkMode</span>
      </label>

      <label class="inline-flex items-center mb-5 cursor-pointer">
        <input type="checkbox" value="" class="sr-only peer" checked />
        <div
          class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
        </div>
        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Salvar login</span>
      </label>
    </div>
    <ProfileDrawer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import MenuLink from "@/components/Flowbite/Menu/MenuLink.vue";
import { useMainStore } from "@/stores/main";
const store = useMainStore();

const darkMode = ref(localStorage.getItem("darkMode"));
const emit = defineEmits(["toggleDarkMode", "darkMode"]);

const toggleDarkMode = () => {
  store.darkMode = !store.darkMode;
  emit("darkMode", darkMode.value);
  localStorage.setItem("darkMode", darkMode.value);
};
</script>
