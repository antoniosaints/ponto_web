<template>
    <div>
        <label :for="randomId" for="hs-color-input" class="block text-sm font-medium mb-2 dark:text-white">{{ label }}</label>
        <input type="color"
            :id="randomId"
            @input="$emit('update:modelValue', $event.target.value)"
            :value="modelValue"
            required
            class="p-1 h-10 w-full block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-gray-700"
            id="hs-color-input" title="Choose your color">
    </div>
</template>

<script setup>
const randomId = Math.random().toString(36).substring(7);
defineProps({
    modelValue: {
        type: String,
        default: "#2563eb"
    },
    label: {
        type: String,
        default: "Label (label)"
    }
})
</script>