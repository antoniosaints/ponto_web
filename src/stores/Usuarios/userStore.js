import { defineStore } from "pinia";
import { ref } from "vue";

export const userStore = defineStore("userStore", () => {
    const users = ref([]);

    const getUsers = async () => {
        const response = await fetch("http://localhost:3000/usuarios")
        const data = await response.json()
        users.value = data
        return data
    }

    const storeUser = async (user) => {
        await fetch("http://localhost:3000/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })

        await getUsers()
    }

    const deleteUser = async (id) => {
        await fetch(`http://localhost:3000/usuarios/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(id),
        })

        await getUsers()
    }

    return { users, getUsers, storeUser, deleteUser }
})