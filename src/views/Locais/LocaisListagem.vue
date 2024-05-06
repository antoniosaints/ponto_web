<template>
  <div class="p-4">
    <!-- Breadcrumb -->
    <nav
      class="flex px-5 py-3 mb-4 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li class="inline-flex items-center">
          <a href="#"
            class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
            <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
              viewBox="0 0 20 20">
              <path
                d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            Relatorios
          </a>
        </li>
        <li>
          <div class="flex items-center">
            <svg class="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 9 4-4-4-4" />
            </svg>
            <a href="#"
              class="ms-1 text-sm font-medium text-gray-900 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Listagem
              de locais</a>
          </div>
        </li>
      </ol>
    </nav>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <TableComponent>
        <TheadComponent>
          <tr>
            <ThComponent> Nome </ThComponent>
            <ThComponent> Cor </ThComponent>
            <ThComponent> Latitude / Longitude </ThComponent>
            <ThComponent> Raio </ThComponent>
            <ThComponent alinhar="justify-end"> Opções </ThComponent>
          </tr>
        </TheadComponent>
        <tbody>
          <tr v-for="location in storeLocales.locations" :key="location.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ location.nome }}
            </th>
            <td class="px-6 py-4">{{ location.cor || '-' }}</td>
            <td class="px-6 py-4">{{ location.latlon }}</td>
            <td class="px-6 py-4">{{ location.raio }}</td>
            <td class="px-6 py-4 text-right">
              <a href="javascript:void(0)" @click="storeLocales.deleteLocation(location.id)"
                class="font-medium mr-3 text-red-600 dark:text-red-500 hover:underline">Deletar</a>
              <a href="javascript:void(0)" @click="editarUsuario(location.id)"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
            </td>
          </tr>
        </tbody>
      </TableComponent>
    </div>
    <Modal ref="modalNovoLocal" modalName="Novo local" buttonName="Novo local" colorButton="bg-blue-700">
      <NovoLocalView @userCreated="modalNovoLocal.toggleModal()" />
    </Modal>
    <div data-dial-init class="fixed end-4 bottom-20 group">
      <button type="button" aria-expanded="false" @click="novoLocal"
        class="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
        <svg class="w-5 h-5 transition-transform group-hover:rotate-45" aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 1v16M1 9h16" />
        </svg>
        <span class="sr-only">Novo local</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import TableComponent from "@/components/Flowbite/Table/TableComponent.vue";
import TheadComponent from "@/components/Flowbite/Table/TheadComponent.vue";
import ThComponent from "@/components/Flowbite/Table/ThComponent.vue";
import Modal from "@/components/Flowbite/Modal.vue";
import NovoLocalView from "@/views/Locais/NovoLocalView.vue";
import { LocationStore } from "@/stores/Locais/locationStore";
const storeLocales = LocationStore();

const modalNovoLocal = ref(null); //  do caralho

onMounted(() => {
  storeLocales.getLocations();
});

const novoLocal = () => {
  modalNovoLocal.value.toggleModal();
};
</script>
