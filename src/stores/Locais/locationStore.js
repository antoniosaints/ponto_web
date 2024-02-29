import {defineStore} from "pinia"
import { onMounted, ref } from "vue"
import httpService from "@/services/http"


export const LocationStore = defineStore("LocationStore", () => {
    const locations = ref([])

    onMounted(async () => {
        locations.value = await httpService("locais_trabalho")
    })

    const getLocations = async () => {
        const locales = await httpService("locais_trabalho")
        locations.value = locales
        return locales
    }

    const getLocation = async (id) => {
        const location = await httpService(`locais_trabalho/${id}`)
        return location
    }

    const storeLocation = async (location) => {
        await httpService("locais_trabalho", "POST", location)
        await getLocations()
    }

    const updateLocation = async (id, location) => {
        await httpService(`locais_trabalho/${id}`, "PATCH", location)
        await getLocations()
    }

    const deleteLocation = async (id) => {
        await httpService(`locais_trabalho/${id}`, "DELETE")
        await getLocations()
    }
    return {locations, getLocations, getLocation, storeLocation, updateLocation, deleteLocation}
})