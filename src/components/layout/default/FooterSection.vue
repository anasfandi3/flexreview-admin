<template>
  <footer
    class="h-12 border-t border-slate-200 bg-white px-8 flex items-center justify-between text-xs font-medium text-slate-500">
    <div class="flex items-center gap-6">
      <div class="flex items-center gap-2">
        <div class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </div>
        <span class="text-slate-600">All systems operational</span>
      </div>
      <span class="hidden sm:inline text-slate-300">|</span>
      <p class="hidden sm:block">&copy; {{ new Date().getFullYear() }} The Flex.</p>
    </div>

    <div class="flex items-center gap-6">
      <div class="flex items-center gap-4">
        <a href="#" class="hover:text-indigo-600 transition-colors">Support</a>
        <a href="#" class="hover:text-indigo-600 transition-colors">Privacy</a>
        <a href="#" class="hover:text-indigo-600 transition-colors">Docs</a>
      </div>

      <div
        class="hidden md:flex items-center gap-1.5 px-2 py-1 bg-slate-100 rounded text-[10px] uppercase tracking-wider text-slate-500">
        <Cpu class="h-3 w-3" />
        v2.4.0-stable
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Cpu } from 'lucide-vue-next'
</script>