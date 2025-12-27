import { defineStore } from 'pinia'
import { computed, ref } from 'vue';
import type { User } from '@/types/auth'
import axiosInstance from "@/axios"

export const useAuthStore = defineStore('AuthStore', () => {
    //state
    const user = ref<User | null>(null);
    const authenticated = ref<boolean>(false)
    //getters
    const authUser = computed(()=>user.value)
    // This is a mock authentication.. Ideally we save the user token and authenticate a real user
    // but since auth is not required for this task I am making it a simple auth mock
    const isAuthenticated = computed(()=>authenticated.value)

    //actions
    async function login(username: string | undefined, password: string | undefined){
        try {
            const response = await axiosInstance.post('/login', {
                username,
                password
            })
            if (response.status == 200){
                user.value = response?.data?.data
                localStorage.setItem('user', JSON.stringify(response.data.data))
                authenticated.value = true
            } else {
                authenticated.value = false
            }
        } catch (e) {
            authenticated.value = false
            console.error('Login failed', e)
            throw e
        }
    }
    function logout(){
        user.value = null
        authenticated.value = false
    }

    //public
    //I put user object in returns because pinia persist works only on the returned values here
    return {
        authenticated,
        authUser,
        isAuthenticated,
        login,
        logout,
    }
}, { persist: true })