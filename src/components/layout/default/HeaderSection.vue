<template>
  <header
    class="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between">
    <div class="flex items-center gap-8">
      <div class="relative group hidden md:block">
        <Search
          class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
        <input type="text" placeholder="Search anything... (Press /)"
          class="pl-10 pr-4 py-2 w-64 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
      </div>

      <button class="p-2 md:hidden hover:bg-slate-100 rounded-lg">
        <Menu class="h-5 w-5 text-slate-600" />
      </button>
    </div>

    <div class="flex items-center gap-4">

      <div class="h-6 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>

      <button class="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
        <Bell class="h-5 w-5" />
        <span class="absolute top-2 right-2 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
      </button>

      <button class="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors hidden sm:block">
        <HelpCircle class="h-5 w-5" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import {
  Search,
  Bell,
  Plus,
  Menu,
  HelpCircle
} from 'lucide-vue-next'
</script>