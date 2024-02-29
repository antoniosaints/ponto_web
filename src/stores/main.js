import { defineStore } from "pinia"
import { onMounted, ref } from "vue"


export const useMainStore = defineStore("main", () => {
    const isAuth = ref(true)
    const darkMode = ref(false)

    onMounted(() => {
        darkMode.value = JSON.parse(localStorage.getItem("darkMode"))
    })

    return { isAuth, darkMode }
})