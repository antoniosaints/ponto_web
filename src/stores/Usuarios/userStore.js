import { ref } from "vue";
import { defineStore } from "pinia";
import httpService from "@/services/http";

export const userStore = defineStore("userStore", () => {
  const users = ref([]);
  const userEdit = ref(null);

  const defaultUser = {
    nome: "",
    email: "",
    contato: "",
    horario: "",
  }

  const dataUserStore = ref({
    ...defaultUser
  });

  const setUserEdit = async (value) => {
    userEdit.value = value;
    if (value !== null) {
      const { data } = await getUser(value);
      dataUserStore.value = data;
    } else {
      dataUserStore.value = defaultUser;
    }
  };

  const getUsers = async () => {
    const data = await httpService("usuarios");
    users.value = data;
    return data;
  };

  const getUser = async (id) => {
    return await httpService(`usuarios?id=${id}`);
  };

  const storeUser = async () => {
    await httpService("usuarios", "POST", dataUserStore.value);
    await getUsers();
  };

  const updateUser = async (id) => {
    await httpService(`usuarios/${id}`, "PATCH", dataUserStore.value);
    await getUsers();
    dataUserStore.value = defaultUser;
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

export const userMockStore = defineStore("userMockStore", () => {
  const users = ref([]);
  return {
    users,
  }
})
