<template>
  <aside class="w-64 h-screen bg-white border-r border-slate-200 flex flex-col transition-all duration-300">
    <div class="p-6 flex items-center gap-3">
      <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
        F
      </div>
      <span class="text-xl font-semibold text-slate-800 tracking-tight">The Flex</span>
    </div>

    <nav class="flex-1 px-4 space-y-1">
      <div v-for="item in navItems" :key="item.name">
        <RouterLink @click="changeActive(item.name)" :to="{ name: item.name }" :class="[
          item.active
            ? 'bg-indigo-50 text-indigo-600'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
          'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors'
        ]">
          <component :is="item.icon" class="mr-3 h-5 w-5" />
          {{ item.label }}
        </RouterLink>
      </div>
    </nav>

    <div class="p-4 border-t border-slate-100">
      <button @click="logout()"
        class="hover:cursor-pointer flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50/50 rounded-xl transition-all duration-200 group">
        <LogOut class="h-5 w-5 text-slate-400 group-hover:text-rose-500 transition-colors" />
        <span>Logout</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/AuthStore';
import {
  LayoutDashboard,
  BarChart3,
  LogOut
} from 'lucide-vue-next'
import router from '@/router';

const authStore = useAuthStore()
const navItems = ref([
  { name: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, active: true },
  { name: 'reviews', label: 'Reviews', icon: BarChart3, active: false },
])

function changeActive(name: string) {
  navItems.value.forEach(item => {
    if (item.name == name) {
      item.active = true
    } else {
      item.active = false
    }
  })
}
function logout() {
  authStore.logout();
  router.push({ name: 'login' })
}
</script>