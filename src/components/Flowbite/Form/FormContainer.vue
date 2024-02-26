<template>
  <form @submit.prevent="SendForm" class="max-w-auto mx-auto gap-3">
    <slot></slot>
    <button class="bg-blue-700 mt-4 w-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" type="submit">Enviar</button>
  </form>
</template>

<script setup>
  const emit = defineEmits(["submit"]);

  const SendForm = () => {
    emit("submit");
  };
</script>
