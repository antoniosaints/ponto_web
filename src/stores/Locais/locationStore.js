import { defineStore } from "pinia"
import { onMounted, ref } from "vue"
import httpService from "@/services/http"
import toast from "@/services/toast"
import swalert from "@/services/swal"


export const LocationStore = defineStore("LocationStore", () => {
    const locations = ref([])

    onMounted(async () => {
        locations.value = await httpService("locais_trabalho")
    })

    const getLocations = async () => {
        const locales = await httpService("locais_trabalho")
        locations.value = locales.data
        return locales
    }

    const getLocation = async (id) => {
        const location = await httpService(`locais_trabalho?id=${id}`)
        return location
    }

    const storeLocation = async (location) => {
        try {
            swalert.fire({
                title: "Salvando ...",
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                    swalert.showLoading()
                },
                didClose: () => {
                    swalert.close()
                },
            })
            await httpService("locais_trabalho", "POST", location);
            swalert.close();
            await getLocations();
            toast.success("Local adicionado com sucesso!", "Sucesso")
        } catch (error) {
            toast.error(error.message, "Ops..")
        }
    }

    const updateLocation = async (id, location) => {
        await httpService(`locais_trabalho?id=${id}`, "PATCH", location)
        await getLocations()
    }

    const deleteLocation = async (id) => {
        try {
            swalert.fire({
                title: "Tem certeza?",
                text: "Você irá remover o local de trabalho selecionado!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim, remover!",
                cancelButtonText: "Cancelar",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await httpService(`locais_trabalho?id=${id}`, "DELETE");
                    await getLocations();
                    toast.success("Local removido com sucesso!", "Sucesso");
                }
            })
        } catch (error) {
            toast.error(error.message, "Ops..");
        }
    }
    return { locations, getLocations, getLocation, storeLocation, updateLocation, deleteLocation }
})