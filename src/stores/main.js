import { defineStore } from "pinia"
import { ref } from "vue"


export const useMainStore = defineStore("main", () => {
    const isAuth = ref(true)

    return { isAuth}
})