import { ref } from "vue";
import { defineStore } from "pinia";
import httpService from "@/services/http";

export const userStore = defineStore("userStore", () => {
    const users = ref([]);

    const getUsers = async () => {
        const data = await httpService("usuarios")
        users.value = data
        return data
    }

    const getUser = async (id) => {
        return await httpService(`usuarios/${id}`) 
    }

    const storeUser = async (user) => {
        await httpService("usuarios", "POST", user)
        await getUsers()
    }

    const updateUser = async (id, user) => {
        await httpService(`usuarios/${id}`, "PATCH", user)
        await getUsers()
    }

    const deleteUser = async (id) => {
        await httpService(`usuarios/${id}`, "DELETE")
        await getUsers()
    }

    return { users, getUser, getUsers, storeUser, updateUser, deleteUser }
})