<template>
  <div>
    <button
      @click="toggleModal"
      class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      type="button"
    >
      {{ buttonText }}
    </button>

    <div
      :id="modalId"
      tabindex="-1"
      class="hidden fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
    >
      <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div
        class="relative bg-white rounded-lg shadow-md dark:bg-gray-700"
        style="z-index: 99999"
      >
        <button
          @click="hideModal"
          type="button"
          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          :data-modal-hide="modalId"
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Fechar</span>
        </button>
        <div class="p-4 md:p-5 text-center">
          <div class="p-4 md:p-5 text-center">
            <svg
              class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3
              class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
            >
              {{ textMessage }}
            </h3>
            <button
            @click="confirmado"
              type="button"
              class="text-white bg-cyan-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              {{ textButtonConfirm }}
            </button>
            <button
              @click="hideModal"
              :data-modal-hide="modalId"
              type="button"
              class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              {{ textButtonCancel }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { ref, defineEmits } from "vue";

const emit = defineEmits(['isConfirmed']);
export default {
  props: {
    buttonText: {
      type: String,
      default: "Texto do botão (buttonText)",
    },
    textMessage: {
      type: String,
      default: "Mensagem de retorno (textMessage)",
    },
    textButtonConfirm: {
      type: String,
      default: "Texto confirmar (textButtonConfirm)",
    },
    textButtonCancel: {
      type: String,
      default: "Texto cancelar (textButtonCancel)",
    },
    modalIdPrefix: {
      type: String,
      default: "modal",
    },
  },
  setup(props) {
    const modalId = ref(
      `${props.modalIdPrefix}-${Math.random().toString(36).substring(7)}`
    );

    const toggleModal = () => {
      const modal = document.getElementById(modalId.value);
      modal.classList.toggle("hidden");
    };

    const hideModal = () => {
      const modal = document.getElementById(modalId.value);
      modal.classList.add("hidden");
    };

    const confirmado = () => {
        emit('isConfirmed', true);
    }

    return {
      modalId,
      toggleModal,
      hideModal,
    };
  },
};
</script>
  
  <style>
/* Estilos do modal aqui */
</style>
  