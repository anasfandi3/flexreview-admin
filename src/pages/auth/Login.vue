<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Flex review dashboard</h2>
        </div>

        <div
            class="bg-indigo-50 rounded-md shadow-lg border border-indigo-100 p-5 mt-10 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="space-y-6">
                <div>
                    <label for="username" class="block text-sm/6 font-medium text-gray-900">Username</label>
                    <div class="mt-2">
                        <input v-model="username" type="text" name="username" required autocomplete="username"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
                    </div>
                    <div class="mt-2">
                        <input v-model="password" type="password" name="password" required
                            autocomplete="current-password"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <button @click="login" type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                        in</button>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/AuthStore';
import { ref } from 'vue';
const authStore = useAuthStore()

const username = ref<string | undefined>(undefined)
const password = ref<string | undefined>(undefined)

async function login() {
    if (!(username.value && password.value)) {
        alert('please fill your info')
        return
    }
    try {
        await authStore.login(username.value, password.value)
        router.push({ name: 'dashboard' })
    } catch (e) {
        alert('Login failed')
        console.error(e)
    }
}
</script>