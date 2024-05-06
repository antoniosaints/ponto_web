import { defineStore } from "pinia";
import httpService from "@/services/http";
import toast from "@/services/toast";


export const batidasStore = defineStore("batidasStore", () => {

  const saveBatida = async (local) => {
    try {
      local.horario = new Date().toLocaleTimeString({
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });;
      const save = await httpService('batidas', 'POST', local);
      console.log(save);
    } catch (error) {
      toast.error(error.message, 'Ops..');
    }

  };
  return {
    saveBatida,
  };
});
