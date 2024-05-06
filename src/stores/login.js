import httpService from "@/services/http"
import Cookies from "js-cookie"
import { defineStore } from "pinia"
import { useMainStore } from "./main"
import router from "@/routes/Router"
import toast from "@/services/toast"


export const useLoginStore = defineStore("login", () => {

    async function login($user) {
        try {
            const user = await httpService("auth", "POST", $user)
            if (user.token) {
                Cookies.set("token", user.token, { expires: 1 })
                Cookies.set("refreshtoken", user.refreshToken, { expires: 7 })
                useMainStore().isAuth = true
                return { success: true, message: user.message }
            } else {
                return { success: false, message: user.message }
            }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    async function logout() {
        Cookies.remove("token")
        Cookies.remove("refreshtoken")
        useMainStore().isAuth = false
        router.push({ path: "/login" })
    }

    const checkToken = async () => {
        try {
            useMainStore().darkMode = JSON.parse(localStorage.getItem("darkMode"));
            const token = Cookies.get("token");
            if (token) {
                const response = await httpService("auth/verify");
                response.status === 200 ? useMainStore().isAuth = true : useMainStore().isAuth = false;

                router.push({ path: "/" });

            } else {
                useMainStore().isAuth = false;
                router.push({ path: "/login" });
            }
        } catch (error) {
            useMainStore().isAuth = false;
            router.push({ path: "/login" });
            toast.error(error.message, 'Ops..');
        }
    };

    return { login, logout, checkToken }
})