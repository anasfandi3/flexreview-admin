<template>
  <main class="flex-1 overflow-y-auto bg-slate-50/50 p-6 md:p-8">
    <div class="max-w-7xl mx-auto">

      <router-view v-slot="{ Component }">
        <transition name="fade-slide" mode="out-in" appear>
          <component :is="Component" />
        </transition>
      </router-view>

    </div>
  </main>
</template>

<style scoped>
/* Smooth Page Transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s ease-out;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>