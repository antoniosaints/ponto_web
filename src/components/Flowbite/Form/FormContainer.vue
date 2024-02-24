<template>
    <form @submit.prevent="SendForm" class="max-w-full mx-auto gap-3">
        <slot></slot>
        <button type="submit">Enviar</button>
    </form>
</template>

<script setup>
const emit = defineEmits(["submit"])

const SendForm = () => {
    emit('submit')
}
</script>