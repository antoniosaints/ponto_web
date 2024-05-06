<template>
    <div class="flex flex-col gap-2">
        <div class="flex gap-2">
            <input type="date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Data início">
            <input type="date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Data início">
        </div>
        <button type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Aplicar</button>
        <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2">
            <div v-for="dia in dias" :key="dia"
                class="flex gap-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div class="flex ml-2 my-2 flex-col w-1/6 items-center">
                    <h5 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        0{{ dia }}/03
                    </h5>
                    <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Sexta</p>
                </div>
                <div class="flex">
                    <div class="flex flex-col">
                        <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Entradas e saídas</p>
                        <p
                            class="text-sm rounded-md px-2 font-normal bg-slate-200 dark:bg-slate-700 text-gray-900 text-bold dark:text-gray-200">
                            08:00 - 12:00 - 13:00 - 17:00</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const dias = Array.from({ length: 9 }, (_, i) => i + 1);
</script>