import { ref } from "vue";
import { defineStore } from "pinia";
import httpService from "@/services/http";

export const userStore = defineStore("userStore", () => {
  const users = ref([]);
  const userEdit = ref(null);

  const dataUserStore = ref({
    name: "",
    color: "",
    category: "",
    price: "",
  });
  
  const setUserEdit = async (value) => {
    userEdit.value = value;
    if (value !== null) {
        dataUserStore.value = await getUser(value);
    }else {
        dataUserStore.value = {
            name: "",
            color: "",
            category: "",
            price: "",
        }
    }
  };

  const getUsers = async () => {
    const data = await httpService("usuarios");
    users.value = data;
    return data;
  };

  const getUser = async (id) => {
    return await httpService(`usuarios/${id}`);
  };

  const storeUser = async () => {
    await httpService("usuarios", "POST", dataUserStore.value);
    await getUsers();
  };

  const updateUser = async (id) => {
    await httpService(`usuarios/${id}`, "PATCH", dataUserStore.value);
    await getUsers();
    dataUserStore.value = {
        name: "",
        color: "",
        category: "",
        price: "",
    }
  };

  const deleteUser = async (id) => {
    await httpService(`usuarios/${id}`, "DELETE");
    await getUsers();
  };

  return {
    users,
    userEdit,
    dataUserStore,
    setUserEdit,
    getUser,
    getUsers,
    storeUser,
    updateUser,
    deleteUser,
  };
});
